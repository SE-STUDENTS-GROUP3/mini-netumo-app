import apiClient from './apiClient'
import { User } from '@/types/auth'

interface LoginData {
  email: string
  password: string
}

interface RegisterData extends LoginData {
  name: string
  phoneNumber?: string // Optional
}

// ✅ LOGIN FUNCTION (Matches API: POST /api/auth)
export const login = async (data: LoginData): Promise<{ access: string; refresh: string }> => {
  const response = await apiClient.post('/auth', {
    username: data.email,
    password: data.password,
  })

  return {
    access: response.data.data.access,
    refresh: response.data.data.refresh,
  }
}

// ✅ REGISTER FUNCTION (Adjust this to match your real /users API if needed)
export const register = async (data: RegisterData): Promise<void> => {
  await apiClient.post('/users', {
    email: data.email,
    name: data.name,
    phoneNumber: data.phoneNumber || '+255700000000',
    password: data.password,
  })
}

// ✅ GET USER PROFILE (Workaround using decoded JWT + /users list)
export const getProfile = async (): Promise<User> => {
  const response = await apiClient.get('/users') // or /users
  const users: User[] = response.data.data || []

  const token = localStorage.getItem('token')
  if (!token) throw new Error('No token found')

  const payload = JSON.parse(atob(token.split('.')[1]))
  const email = payload?.sub || payload?.email || ''

  const currentUser = users.find((u) => u.email === email)

  if (!currentUser) {
    return {
      id: '',
      email,
      name: 'Unknown User',
      createdAt: '',
      updatedAt: '',
    }
  }

  return currentUser
}
