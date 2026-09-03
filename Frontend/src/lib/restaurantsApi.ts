import api from '@/lib/api'
import type {
  Restaurant,
  RestaurantApprovalStatus,
  RestaurantOperationalStatus,
} from '@/types/Restaurants'

interface RestaurantApiRecord {
  id: number
  name: string
  description?: string | null
  address?: string
  phone?: string
  logo?: string | null
  approval_status?: RestaurantApprovalStatus
  approvalStatus?: RestaurantApprovalStatus
  status?: RestaurantOperationalStatus
  operationalStatus?: RestaurantOperationalStatus
  created_at?: string
  createdAt?: string
  category?: string | { name?: string } | null
  manager?: string | { name?: string } | null
  manager_name?: string
  managerName?: string
}

interface LaravelCollection<T> {
  data: T[]
}

interface ApiSuccessWrapper<T> {
  success: boolean
  data: T
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function unwrapList(payload: unknown): RestaurantApiRecord[] {
  if (Array.isArray(payload)) {
    return payload as RestaurantApiRecord[]
  }

  if (isRecord(payload) && Array.isArray(payload.data)) {
    return payload.data as RestaurantApiRecord[]
  }

  if (isRecord(payload) && isRecord(payload.data) && Array.isArray(payload.data.data)) {
    return payload.data.data as RestaurantApiRecord[]
  }

  return []
}

function unwrapRestaurant(payload: unknown): RestaurantApiRecord {
  if (isRecord(payload) && isRecord(payload.data) && 'id' in payload.data) {
    return payload.data as unknown as RestaurantApiRecord
  }

  return payload as RestaurantApiRecord
}

function relationName(value: string | { name?: string } | null | undefined): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value.name ?? ''
}

export function mapRestaurant(record: RestaurantApiRecord): Restaurant {
  const approvalStatus = record.approval_status ?? record.approvalStatus ?? 'pending'
  const operationalStatus = record.status ?? record.operationalStatus ?? 'inactive'

  return {
    id: record.id,
    name: record.name,
    managerName:
      record.managerName ??
      record.manager_name ??
      relationName(record.manager) ??
      '',
    category: relationName(record.category) || record.description?.trim() || 'Uncategorized',
    logo: record.logo ?? null,
    approvalStatus,
    operationalStatus,
    createdAt: record.created_at ?? record.createdAt ?? '',
  }
}

export async function fetchRestaurants(): Promise<Restaurant[]> {
  const response = await api.get<LaravelCollection<RestaurantApiRecord> | ApiSuccessWrapper<RestaurantApiRecord[]> | RestaurantApiRecord[]>(
    '/restaurants',
  )

  return unwrapList(response.data).map(mapRestaurant)
}

export async function updateRestaurantApproval(
  id: number,
  approvalStatus: Extract<RestaurantApprovalStatus, 'approved' | 'rejected'>,
): Promise<Restaurant> {
  const response = await api.patch<LaravelCollection<never> | ApiSuccessWrapper<RestaurantApiRecord> | { data: RestaurantApiRecord }>(
    `/restaurants/${id}/approval-status`,
    { approval_status: approvalStatus },
  )

  return mapRestaurant(unwrapRestaurant(response.data))
}
