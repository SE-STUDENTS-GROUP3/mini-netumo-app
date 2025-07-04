import { StatusCheck } from '@/types/target'
import apiClient from './apiClient'

export const fetchTargets = async (): Promise<Target[]> => {
  const response = await apiClient.get<TargetListResponse>('/targets')
  return response.data.data
}

export const fetchStatusChecks = async (targetId: string): Promise<StatusCheck[]> => {
  const response = await apiClient.get(`/targets/${targetId}/checks`)
  return response.data
}

export const createTarget = async (data: {
  name: string
  url: string
  protocol: 'http' | 'https'
}): Promise<Target> => {
  const response = await apiClient.post('/targets', data)
  return response.data
}

export const deleteTarget = async (id: string): Promise<void> => {
  await apiClient.delete(`/targets/${id}`)
}
