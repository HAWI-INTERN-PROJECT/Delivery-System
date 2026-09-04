import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import type { Order } from '@/types/Customer'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface OrderCardProps {
  order: Order
}

export default function OrderCard({ order }: OrderCardProps) {
  // Format creation time/relative time
  const formattedTime = new Date(order.created_at).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  // Set standard status badge variants mapping
  const statusBadgeMap: Record<string, 'pending' | 'preparing' | 'ready' | 'delivered' | 'error'> = {
    pending: 'pending',
    preparing: 'preparing',
    ready_for_pickup: 'ready',
    in_transit: 'preparing',
    delivered: 'delivered',
    cancelled: 'error',
    rejected: 'error',
  }

  const badgeTextMap: Record<string, string> = {
    pending: 'Pending',
    preparing: 'Preparing',
    ready_for_pickup: 'Ready for Pickup',
    in_transit: 'In Transit',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    rejected: 'Rejected',
  }

  const itemsSummary = order.order_items
    .map((item) => `${item.menu_item.name} (x${item.quantity})`)
    .join(', ')

  return (
    <Card className="border-none bg-white rounded-2xl shadow-sm mb-4 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="font-bold text-gray-800 text-base">{order.restaurant.name}</h4>
            <p className="text-[11px] text-gray-400 mt-0.5">
              {formattedTime} • #ORD-{order.id.toString().slice(-4)}
            </p>
          </div>
          <Badge variant={statusBadgeMap[order.status] || 'default'}>
            {badgeTextMap[order.status] || order.status}
          </Badge>
        </div>

        <p className="text-xs text-gray-500 line-clamp-1 py-1 border-b border-gray-50 mb-3">
          {itemsSummary}
        </p>

        <div className="flex justify-between items-center">
          <div className="text-sm font-black text-gray-800">ETB {order.total_amount}</div>
          <Link
            to={`/orders/${order.id}`}
            className="flex items-center text-xs text-orange-600 font-bold hover:underline"
          >
            <span>View Details</span>
            <ChevronRight className="h-4 w-4 ml-0.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
