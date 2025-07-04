import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import os from 'os'

export default defineConfig(({ mode }) => {
  // Load env vars from .env files (does NOT mutate process.env)
  // Use prefix 'VITE_' so you only get VITE_* variables
  const envFromFiles = loadEnv(mode, process.cwd(), 'VITE_')

  const machineUser = process.env.USER || process.env.USERNAME || os.userInfo().username
  const machineHost = os.hostname()

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      postcss: './postcss.config.cjs',
    },
    define: {
      // Prefer envFromFiles over process.env, but fallback gracefully
      __APP_ENV__: JSON.stringify(
        envFromFiles.VITE_APP_ENV || process.env.VITE_APP_ENV || 'development'
      ),
      __API_URL__: JSON.stringify(envFromFiles.VITE_API_URL || process.env.VITE_API_URL || ''),
      __WS_URL__: JSON.stringify(envFromFiles.VITE_WS_URL || process.env.VITE_WS_URL || ''),
      __APP_NAME__: JSON.stringify(envFromFiles.VITE_APP_NAME || process.env.VITE_APP_NAME || ''),
      __MACHINE_USER__: JSON.stringify(machineUser),
      __MACHINE_HOST__: JSON.stringify(machineHost),
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      open: false,
      strictPort: true,
      proxy: {
        '/api': {
          target: envFromFiles.VITE_API_URL || process.env.VITE_API_URL || '',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
