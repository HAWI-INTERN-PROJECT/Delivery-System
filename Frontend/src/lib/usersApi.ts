import axios from 'axios'
import api from '@/lib/api'
import type {
  AdminUser,
  RegisterDriverInput,
  RegisterManagerInput,
  UserRole,
  UserStatus,
} from '@/types/Users'

interface UserApiRecord {
  id: number
  name: string
  email: string
  phone?: string
  role?: UserRole
  status?: UserStatus
  created_at?: string
  createdAt?: string
  vehicle_type?: string
  vehicleType?: string
  vehicle_model?: string
  vehicleModel?: string
  plate_number?: string
  plateNumber?: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function unwrapList(payload: unknown): UserApiRecord[] {
  if (Array.isArray(payload)) {
    return payload as UserApiRecord[]
  }

  if (isRecord(payload) && Array.isArray(payload.data)) {
    return payload.data as UserApiRecord[]
  }

  if (isRecord(payload) && isRecord(payload.data) && Array.isArray(payload.data.data)) {
    return payload.data.data as UserApiRecord[]
  }

  return []
}

function unwrapUser(payload: unknown): UserApiRecord | null {
  if (isRecord(payload) && isRecord(payload.data) && 'id' in payload.data) {
    return payload.data as unknown as UserApiRecord
  }

  if (isRecord(payload) && 'id' in payload) {
    return payload as unknown as UserApiRecord
  }

  return null
}

export function mapUser(record: UserApiRecord): AdminUser {
  return {
    id: record.id,
    name: record.name,
    email: record.email,
    phone: record.phone ?? '',
    role: record.role ?? 'customer',
    status: record.status ?? 'active',
    createdAt: record.created_at ?? record.createdAt ?? new Date().toISOString(),
    vehicleType: record.vehicle_type ?? record.vehicleType,
    vehicleModel: record.vehicle_model ?? record.vehicleModel,
    plateNumber: record.plate_number ?? record.plateNumber,
  }
}

export async function fetchUsers(): Promise<AdminUser[]> {
  try {
    const response = await api.get('/users')
    return unwrapList(response.data).map(mapUser)
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return []
    }
    throw error
  }
}

async function createUserOnApi(payload: Record<string, unknown>): Promise<AdminUser | null> {
  try {
    const response = await api.post('/users', payload)
    const record = unwrapUser(response.data)
    return record ? mapUser(record) : null
  } catch (error) {
    if (axios.isAxiosError(error) && (error.response?.status === 404 || error.response?.status === 405)) {
      return null
    }
    throw error
  }
}

export async function createDriver(input: RegisterDriverInput): Promise<AdminUser | null> {
  return createUserOnApi({
    name: input.name,
    email: input.email,
    phone: input.phone,
    role: 'driver',
    vehicle_type: input.vehicleType,
    vehicle_model: input.vehicleModel,
    plate_number: input.plateNumber,
  })
}

export async function createRestaurantManager(input: RegisterManagerInput): Promise<AdminUser | null> {
  return createUserOnApi({
    name: input.name,
    email: input.email,
    phone: input.phone,
    role: 'restaurant_manager',
  })
}
