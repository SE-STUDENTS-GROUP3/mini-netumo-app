export {}

declare global {
  type STATUS = 'UP' | 'DOWN' | 'UNKNOWN'

  interface MonitorLog {
    id: number
    statusCode: number
    status: STATUS
    latencyMs: number
    error?: string
    createdAt: string
  }

  interface DomainInfo {
    id: number
    sslExpiryDate?: string
    domainExpiryDate?: string
    daysToSslExpiry?: number
    daysToDomainExpiry?: number
    createdAt: string
  }

  interface Alert {
    id: number
    alertType: string
    message: string
    sentAt: string
  }

  interface Target {
    id: string
    ownerId: string
    name: string
    url: string
    logs?: MonitorLog[]
    domainInfos?: DomainInfo[]
    alerts?: Alert[]
    isActive: boolean
    createdAt: string
  }

  interface User {
    id: string
    email: string
    phoneNumber: string
    name: string
    isActive: boolean
    createdAt: string
    updatedAt: string
  }

  interface AuthData {
    access: string | null
    refresh: string | null
  }

  interface ApiResponse<T> {
    timestamp: string
    status: number
    success: boolean
    message: string
    data: T
    path: string
  }

  type AuthResponse = ApiResponse<AuthData>
  type MonitorLogResponse = ApiResponse<MonitorLog>
  type MonitorLogListResponse = ApiResponse<MonitorLog[]>

  type DomainInfoResponse = ApiResponse<DomainInfo>
  type DomainInfoListResponse = ApiResponse<DomainInfo[]>

  type AlertResponse = ApiResponse<Alert>
  type AlertListResponse = ApiResponse<Alert[]>

  type TargetResponse = ApiResponse<Target>
  type TargetListResponse = ApiResponse<Target[]>

  type UserResponse = ApiResponse<User>
  type UserListResponse = ApiResponse<User[]>
}
