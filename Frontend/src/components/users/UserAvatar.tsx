import { cn } from '@/lib/utils'
import { getUserInitials } from './userConfig'

export interface UserAvatarProps {
  name: string
  className?: string
}

export function UserAvatar({ name, className }: UserAvatarProps) {
  return (
    <div
      className={cn(
        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600',
        className,
      )}
      aria-hidden="true"
    >
      {getUserInitials(name)}
    </div>
  )
}
