import type { Restaurant, RestaurantDisplayStatus, RestaurantFilterStatus } from '@/types/Restaurants'

export interface RestaurantStatusMeta {
  label: string
  badgeClassName: string
  dotClassName: string
}

export const RESTAURANT_STATUS_CONFIG: Record<RestaurantDisplayStatus, RestaurantStatusMeta> = {
  approved: {
    label: 'Approved',
    badgeClassName: 'bg-emerald-50 text-emerald-700',
    dotClassName: 'bg-emerald-500',
  },
  pending: {
    label: 'Pending Approval',
    badgeClassName: 'bg-amber-50 text-amber-700',
    dotClassName: 'bg-amber-500',
  },
  suspended: {
    label: 'Suspended',
    badgeClassName: 'bg-red-50 text-red-700',
    dotClassName: 'bg-red-500',
  },
}

export const RESTAURANT_FILTER_OPTIONS: { value: RestaurantFilterStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'approved', label: 'Approved' },
  { value: 'pending', label: 'Pending Approval' },
  { value: 'suspended', label: 'Suspended' },
]

export function getRestaurantDisplayStatus(restaurant: Restaurant): RestaurantDisplayStatus {
  if (restaurant.operationalStatus === 'suspended') {
    return 'suspended'
  }

  if (restaurant.approvalStatus === 'pending') {
    return 'pending'
  }

  return 'approved'
}

export function getRestaurantInitial(name: string): string {
  const trimmed = name.trim()
  return trimmed ? trimmed.charAt(0).toUpperCase() : '?'
}
