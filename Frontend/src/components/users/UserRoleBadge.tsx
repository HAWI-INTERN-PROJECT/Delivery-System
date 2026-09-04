import type { UserRole } from '@/types/Users'
import { cn } from '@/lib/utils'
import { USER_ROLE_LABELS } from './userConfig'

export interface UserRoleBadgeProps {
  role: UserRole
  className?: string
}

export function UserRoleBadge({ role, className }: UserRoleBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700',
        className,
      )}
    >
      {USER_ROLE_LABELS[role]}
    </span>
  )
}
