import type { OrderStatus } from '@/types/Orders'
import { cn } from '@/lib/utils'
import { getOrderStatusMeta } from './orderStatusConfig'

export interface OrderStatusBadgeProps {
  status: OrderStatus
  className?: string
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const meta = getOrderStatusMeta(status)

  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold',
        meta.badgeClassName,
        className,
      )}
    >
      {meta.label}
    </span>
  )
}
