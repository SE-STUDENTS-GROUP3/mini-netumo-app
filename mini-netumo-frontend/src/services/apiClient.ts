import axios from 'axios'
import { toast } from 'react-toastify'

const apiClient = axios.create({
  baseURL: __API_URL__,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/auth/login'
    }

    toast.error(error.response?.data?.message || error.message)
    return Promise.reject(error)
  }
)

export default apiClient
