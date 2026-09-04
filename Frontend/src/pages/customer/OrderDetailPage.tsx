import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Phone, ShieldAlert } from 'lucide-react'
import { useOrderDetailQuery } from '@/hooks/useOrders'
import { Badge } from '@/components/ui/badge'

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const parsedId = Number(id)
  const orderId = !Number.isNaN(parsedId) && parsedId > 0 ? parsedId : null

  const { data: order, isLoading } = useOrderDetailQuery(orderId ?? 0)

  if (orderId === null) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-white px-6">
        <span className="text-sm text-gray-500 font-bold">Invalid order ID</span>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-xl font-bold"
        >
          Go Back
        </button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-white">
        <span className="text-sm text-gray-500 font-medium">Loading order details...</span>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-white px-6">
        <span className="text-sm text-gray-500 font-bold">Order not found</span>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-xl font-bold"
        >
          Go Back
        </button>
      </div>
    )
  }


  // Build standard timeline mappings
  const timelineSteps = [
    { key: 'pending', label: 'Order Placed', desc: 'Waiting for restaurant acceptance' },
    { key: 'preparing', label: 'Preparing Food', desc: 'Chef is cooking your dish' },
    { key: 'ready_for_pickup', label: 'Ready for Pickup', desc: 'Driver will pick up food shortly' },
    { key: 'in_transit', label: 'In Transit', desc: 'Driver is heading to your address' },
    { key: 'delivered', label: 'Delivered', desc: 'Order received successfully' },
  ]

  // Get index of current status
  const currentStatusIdx = timelineSteps.findIndex((step) => step.key === order.status)

  // Status Chip variants mapping
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


  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] pb-6">
      {/* Top Header */}
      <header className="px-6 pt-6 pb-4 bg-white border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/orders')}
            className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-800">Order Status</h1>
            <p className="text-xs text-gray-400 mt-0.5">Order #ORD-{order.id.toString().slice(-4)}</p>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="px-6 py-6 space-y-6 flex-1 overflow-y-auto">
        {/* Restaurant banner card */}
        <div className="bg-white rounded-2xl p-5 border border-gray-50 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0">
            <img src={order.restaurant.logo} alt={order.restaurant.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-extrabold text-gray-800 text-base truncate">{order.restaurant.name}</h3>
            <p className="text-xs text-gray-400 mt-0.5 truncate">{order.restaurant.address}</p>
          </div>
          <Badge variant={statusBadgeMap[order.status] || 'default'}>
            {badgeTextMap[order.status] || order.status}
          </Badge>
        </div>

        {/* Order Status Timeline tracker */}
        {order.status !== 'cancelled' && order.status !== 'rejected' ? (
          <div className="bg-white rounded-2xl p-5 border border-gray-50 space-y-5">
            <h3 className="font-extrabold text-gray-800 text-sm border-b border-gray-50 pb-2">
              Delivery Tracker
            </h3>
            <div className="relative pl-6 space-y-6 border-l-2 border-gray-100">
              {timelineSteps.map((step, idx) => {
                const isActive = idx <= currentStatusIdx
                const isCurrent = idx === currentStatusIdx

                return (
                  <div key={step.key} className="relative">
                    {/* Status dot */}
                    <div
                      className={`absolute -left-[31px] top-0.5 rounded-full h-4 w-4 border-2 flex items-center justify-center transition-all ${
                        isCurrent
                          ? 'border-orange-500 bg-white ring-4 ring-orange-500/20'
                          : isActive
                          ? 'border-orange-500 bg-orange-500'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      {isActive && !isCurrent && <div className="h-1.5 w-1.5 bg-white rounded-full"></div>}
                    </div>

                    <div>
                      <p
                        className={`text-xs font-bold ${
                          isActive ? 'text-gray-800' : 'text-gray-400'
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="bg-red-50 text-red-700 rounded-2xl p-5 border border-red-100 flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-extrabold">This order was {order.status}</p>
              <p className="text-[10px] text-red-500 mt-1 leading-normal">
                If payment was completed, it will be refunded to your account within 1-2 business days.
              </p>
            </div>
          </div>
        )}

        {/* Delivery Details */}
        <div className="bg-white rounded-2xl p-5 border border-gray-50 space-y-4">
          <h3 className="font-extrabold text-gray-800 text-sm border-b border-gray-50 pb-2">
            Delivery Information
          </h3>
          <div className="flex gap-3">
            <MapPin className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-800 font-bold leading-normal">{order.delivery_address}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Delivery destination</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Phone className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-800 font-bold leading-normal">{order.phone}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Contact recipient</p>
            </div>
          </div>
        </div>

        {/* Order details items list */}
        <div className="bg-white rounded-2xl p-5 border border-gray-50 space-y-3">
          <h3 className="font-extrabold text-gray-800 text-sm border-b border-gray-50 pb-2">
            Order Items
          </h3>
          <div className="space-y-2.5">
            {order.order_items.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-xs">
                <div className="text-gray-500 flex items-center gap-1.5">
                  <span className="font-bold text-gray-700">x{item.quantity}</span>
                  <span className="font-medium">{item.menu_item.name}</span>
                </div>
                <span className="font-extrabold text-gray-800">
                  ETB {item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-xs text-gray-500 border-t border-gray-50 pt-3">
            <span>Subtotal</span>
            <span className="font-semibold text-gray-800">ETB {order.subtotal}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Delivery fee</span>
            <span className="font-semibold text-gray-800">ETB {order.delivery_fee}</span>
          </div>
          <div className="flex justify-between text-sm font-black text-gray-800 border-t border-gray-50 pt-3">
            <span>Total</span>
            <span className="text-orange-600 text-base">ETB {order.total_amount}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
