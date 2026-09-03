import type { RestaurantDisplayStatus } from '@/types/Restaurants'
import { cn } from '@/lib/utils'
import { RESTAURANT_STATUS_CONFIG } from './restaurantStatusConfig'

export interface RestaurantStatusBadgeProps {
  status: RestaurantDisplayStatus
  className?: string
}

export function RestaurantStatusBadge({ status, className }: RestaurantStatusBadgeProps) {
  const meta = RESTAURANT_STATUS_CONFIG[status]

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
