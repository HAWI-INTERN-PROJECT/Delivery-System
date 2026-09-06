import type { UserStatus } from '@/types/Users'
import { cn } from '@/lib/utils'
import { USER_STATUS_STYLES } from './userConfig'

export interface UserStatusBadgeProps {
  status: UserStatus
  className?: string
}

export function UserStatusBadge({ status, className }: UserStatusBadgeProps) {
  const meta = status === 'suspended' ? USER_STATUS_STYLES.suspended : USER_STATUS_STYLES.active

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
        meta.badgeClassName,
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', meta.dotClassName)} />
      {meta.label}
    </span>
  )
}
