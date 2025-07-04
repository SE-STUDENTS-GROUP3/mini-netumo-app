import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { login as loginApi } from '@/services/authService'
import { useAuth } from '@/contexts/AuthContext'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { toast } from 'react-toastify'

interface LoginFormData {
  email: string
  password: string
}

export default function Login() {
  const { login: authLogin } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>()

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Authenticate via API
      const { access, refresh } = await loginApi(data)

      // Store tokens
      authLogin({ access, refresh })

      // Redirect + toast
      navigate('/')
      toast.success('Login successfully')
    } catch (error: any) {
      console.error('Login error:', error)
      toast.error(
        error.response?.data?.message || error.message || 'Login failed. Please try again.'
      )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-xs animate-[fadeIn_0.5s_ease-out]">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-lg">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-center">
            <h1 className="text-xl font-bold text-white tracking-wide animate-[slideDown_0.4s_ease-out]">
              Welcome Back
            </h1>
            <p className="mt-1 text-blue-100 text-xs sm:text-sm animate-[fadeIn_0.6s_ease-out]">
              Sign in to access your account
            </p>
          </div>

          <div className="p-4 sm:p-5">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <Input
                placeholder="Email address"
                id="email"
                type="email"
                autoComplete="email"
                required
                error={errors.email?.message}
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />

              <Input
                placeholder="Password"
                id="password"
                type="password"
                autoComplete="current-password"
                required
                error={errors.password?.message}
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />

              <div className="flex items-center justify-between text-xs">
                <label
                  htmlFor="remember-me"
                  className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-3 w-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
                  />
                  Remember me
                </label>
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors text-xs"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full py-2 px-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md text-sm"
                loading={isSubmitting}
              >
                Sign in
              </Button>
            </form>

            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-4 flex justify-center gap-3">
                {/* Google */}
                <button
                  type="button"
                  className="p-2 rounded-full shadow-sm bg-white border hover:bg-gray-100 transition-all duration-200 hover:-translate-y-0.5"
                  aria-label="Continue with GitHub"
                >
                  <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"
                    />
                  </svg>
                </button>

                {/* Twitter */}
                <button
                  type="button"
                  className="p-2 rounded-full shadow-sm bg-white border hover:bg-gray-100 transition-all duration-200 hover:-translate-y-0.5"
                  aria-label="Continue with Twitter"
                >
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="px-4 py-3 bg-gray-50 text-center rounded-b-xl">
            <p className="text-xs text-gray-600">
              Don&apos;t have an account?{' '}
              <Link
                to="/Auth/register"
                className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors text-xs"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
