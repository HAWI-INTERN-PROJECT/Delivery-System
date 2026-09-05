import type { UserRole, UserStatus } from '@/types/Users'

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  customer: 'Customer',
  driver: 'Driver',
  restaurant_manager: 'Restaurant Manager',
  admin: 'Administrator',
}

export const USER_FILTER_OPTIONS: { value: 'all' | UserRole; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'customer', label: 'Customer' },
  { value: 'driver', label: 'Driver' },
  { value: 'restaurant_manager', label: 'Restaurant Manager' },
  { value: 'admin', label: 'Administrator' },
]

export const USER_STATUS_STYLES: Record<
  Extract<UserStatus, 'active' | 'suspended'>,
  { label: string; badgeClassName: string; dotClassName: string }
> = {
  active: {
    label: 'Active',
    badgeClassName: 'bg-emerald-50 text-emerald-700',
    dotClassName: 'bg-emerald-500',
  },
  suspended: {
    label: 'Suspended',
    badgeClassName: 'bg-red-50 text-red-700',
    dotClassName: 'bg-red-500',
  },
}

export const VEHICLE_TYPE_OPTIONS = ['Motorcycle', 'Bicycle', 'Car', 'Van', 'Other'] as const

export function getUserInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)

  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()

  return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase()
}
