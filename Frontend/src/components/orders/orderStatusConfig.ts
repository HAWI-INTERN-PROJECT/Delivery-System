import type { LucideIcon } from 'lucide-react'
import {
  ClipboardList,
  UtensilsCrossed,
  Package,
  Truck,
  CheckCircle,
} from 'lucide-react'
import type { OrderFilterStatus, OrderStatus } from '@/types/orders'

export interface OrderStatusMeta {
  label: string
  description: string
  badgeClassName: string
  legendClassName: string
  icon: LucideIcon
}

export const ORDER_STATUS_CONFIG: Record<OrderStatus, OrderStatusMeta> = {
  pending: {
    label: 'Pending',
    description: 'The order has been placed by the customer and is waiting for the restaurant to accept.',
    badgeClassName: 'bg-orange-100 text-orange-700',
    legendClassName: 'bg-orange-100 text-orange-700',
    icon: ClipboardList,
  },
  preparing: {
    label: 'Preparing',
    description: 'The restaurant has accepted the order and is preparing the food.',
    badgeClassName: 'bg-amber-100 text-amber-800',
    legendClassName: 'bg-amber-100 text-amber-800',
    icon: UtensilsCrossed,
  },
  ready_for_pickup: {
    label: 'Ready for Pickup',
    description: 'The restaurant has finished preparing the order. Waiting for a driver to pick it up.',
    badgeClassName: 'bg-blue-100 text-blue-700',
    legendClassName: 'bg-blue-100 text-blue-700',
    icon: Package,
  },
  in_transit: {
    label: 'In Transit',
    description: 'The driver has picked up the order and is on the way to the customer.',
    badgeClassName: 'bg-purple-100 text-purple-700',
    legendClassName: 'bg-purple-100 text-purple-700',
    icon: Truck,
  },
  delivered: {
    label: 'Delivered',
    description: 'The driver has delivered the order to the customer.',
    badgeClassName: 'bg-emerald-100 text-emerald-700',
    legendClassName: 'bg-emerald-100 text-emerald-700',
    icon: CheckCircle,
  },
  cancelled: {
    label: 'Cancelled',
    description: 'The order was cancelled before completion.',
    badgeClassName: 'bg-red-100 text-red-700',
    legendClassName: 'bg-red-100 text-red-700',
    icon: ClipboardList,
  },
  rejected: {
    label: 'Rejected',
    description: 'The restaurant rejected the order.',
    badgeClassName: 'bg-red-100 text-red-700',
    legendClassName: 'bg-red-100 text-red-700',
    icon: ClipboardList,
  },
}

export const ORDER_FILTER_OPTIONS: { value: OrderFilterStatus; label: string }[] = [
  { value: 'all', label: 'All Orders' },
  { value: 'pending', label: 'Pending' },
  { value: 'preparing', label: 'Preparing' },
  { value: 'ready_for_pickup', label: 'Ready' },
  { value: 'in_transit', label: 'In Transit' },
  { value: 'delivered', label: 'Delivered' },
]

export const STATUS_LEGEND_STATUSES: OrderStatus[] = [
  'pending',
  'preparing',
  'ready_for_pickup',
  'in_transit',
  'delivered',
]

export function getOrderStatusMeta(status: OrderStatus): OrderStatusMeta {
  return ORDER_STATUS_CONFIG[status]
}

export function formatOrderTotal(amount: number): string {
  return `ETB ${amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
}
