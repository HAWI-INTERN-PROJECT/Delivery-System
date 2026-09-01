import { ChevronRight } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { formatRelativeTime } from '@/lib/formatRelativeTime'
import type { Order } from '@/types/Orders'
import { formatOrderTotal, getOrderStatusMeta } from './orderStatusConfig'
import { OrderStatusBadge } from './OrderStatusBadge'

export interface OrdersTableProps {
  orders: Order[]
  isLoading?: boolean
  onViewDetails?: (order: Order) => void
}

function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <tr key={index} className="border-b border-border">
          {Array.from({ length: 6 }).map((__, cellIndex) => (
            <td key={cellIndex} className="px-4 py-4">
              <Skeleton className="h-4 w-full max-w-[120px]" />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}

export function OrdersTable({ orders, isLoading = false, onViewDetails }: OrdersTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-4">Order ID</th>
              <th className="px-4 py-4">Customer</th>
              <th className="px-4 py-4">Restaurant</th>
              <th className="min-w-[220px] px-4 py-4">Status &amp; Description</th>
              <th className="px-4 py-4">Total</th>
              <th className="px-4 py-4">View</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <TableSkeleton />}

            {!isLoading && orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                  No orders found for the selected filters.
                </td>
              </tr>
            )}

            {!isLoading &&
              orders.map((order) => {
                const statusMeta = getOrderStatusMeta(order.status)

                return (
                  <tr key={order.id} className="border-b border-border last:border-b-0">
                    <td className="px-4 py-4 font-semibold text-foreground">{order.orderNumber}</td>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-foreground">{order.customer.name}</p>
                      <p className="text-xs text-muted-foreground">{formatRelativeTime(order.createdAt)}</p>
                    </td>
                    <td className="px-4 py-4 text-foreground">{order.restaurant.name}</td>
                    <td className="px-4 py-4">
                      <div className="space-y-2">
                        <OrderStatusBadge status={order.status} />
                        <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
                          {statusMeta.description}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-semibold text-foreground">
                      {formatOrderTotal(order.totalAmount)}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => onViewDetails?.(order)}
                        className="inline-flex items-center gap-0.5 text-sm font-medium text-orange-500 transition-colors hover:text-orange-600"
                      >
                        Details
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
