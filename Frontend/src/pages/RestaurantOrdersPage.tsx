import { useState } from 'react'
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
  User,
  MapPin,
  Phone,
} from 'lucide-react'

type OrderStatus = 'New' | 'Preparing' | 'Ready' | 'Rejected'

interface Order {
  id: string
  customer: string
  phone: string
  address: string
  items: string[]
  total: string
  time: string
  status: OrderStatus
}

const initialOrders: Order[] = [
  {
    id: '#ORD-1024',
    customer: 'Abebe Kebede',
    phone: '0912345678',
    address: 'Bole, Addis Ababa',
    items: ['2x Chicken Burger', '1x French Fries', '1x Coke'],
    total: 'ETB 850',
    time: '2 min ago',
    status: 'New',
  },
  {
    id: '#ORD-1023',
    customer: 'Sara Ahmed',
    phone: '0923456789',
    address: 'Kazanchis, Addis Ababa',
    items: ['1x Special Pizza', '2x Fresh Juice'],
    total: 'ETB 1,200',
    time: '8 min ago',
    status: 'Preparing',
  },
  {
    id: '#ORD-1022',
    customer: 'Dawit Tesfaye',
    phone: '0934567890',
    address: 'Megenagna, Addis Ababa',
    items: ['1x Beef Burger', '1x French Fries'],
    total: 'ETB 650',
    time: '15 min ago',
    status: 'Ready',
  },
  {
    id: '#ORD-1021',
    customer: 'Hana Worku',
    phone: '0945678901',
    address: 'CMC, Addis Ababa',
    items: ['2x Pasta', '1x Mineral Water'],
    total: 'ETB 920',
    time: '21 min ago',
    status: 'New',
  },
]

export default function RestaurantOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus
  ) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId
          ? { ...order, status }
          : order
      )
    )
  }

  const newOrders = orders.filter(
    (order) => order.status === 'New'
  )

  const preparingOrders = orders.filter(
    (order) => order.status === 'Preparing'
  )

  const readyOrders = orders.filter(
    (order) => order.status === 'Ready'
  )

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Orders
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Manage incoming orders and track their progress.
            </p>
          </div>

          <div className="text-sm text-slate-500">
            Today, September 4, 2026
          </div>

        </div>

      </header>

      <div className="p-8">

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          {/* New */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  New Orders
                </p>

                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {newOrders.length}
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                <ShoppingBag size={22} />
              </div>

            </div>

            <p className="text-xs text-blue-600 mt-4 font-medium">
              Waiting for acceptance
            </p>

          </div>

          {/* Preparing */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Preparing
                </p>

                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {preparingOrders.length}
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-500 flex items-center justify-center">
                <Clock size={22} />
              </div>

            </div>

            <p className="text-xs text-yellow-600 mt-4 font-medium">
              Currently being prepared
            </p>

          </div>

          {/* Ready */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Ready
                </p>

                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {readyOrders.length}
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-500 flex items-center justify-center">
                <CheckCircle2 size={22} />
              </div>

            </div>

            <p className="text-xs text-green-600 mt-4 font-medium">
              Ready for delivery
            </p>

          </div>

        </div>

        {/* Orders */}
        <div className="space-y-5">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
            >

              {/* Order top */}
              <div className="p-6 border-b border-slate-100">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                      <ShoppingBag size={21} />
                    </div>

                    <div>

                      <div className="flex items-center gap-3">

                        <h2 className="font-bold text-slate-900">
                          {order.id}
                        </h2>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'New'
                              ? 'bg-blue-50 text-blue-600'
                              : order.status === 'Preparing'
                                ? 'bg-yellow-50 text-yellow-600'
                                : order.status === 'Ready'
                                  ? 'bg-green-50 text-green-600'
                                  : 'bg-red-50 text-red-600'
                          }`}
                        >
                          {order.status}
                        </span>

                      </div>

                      <p className="text-xs text-slate-400 mt-1">
                        {order.time}
                      </p>

                    </div>

                  </div>

                  <div className="text-left lg:text-right">

                    <p className="text-sm text-slate-500">
                      Order Total
                    </p>

                    <p className="text-xl font-bold text-slate-900">
                      {order.total}
                    </p>

                  </div>

                </div>

              </div>

              {/* Order content */}
              <div className="p-6">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                  {/* Customer */}
                  <div>

                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                      Customer
                    </h3>

                    <div className="space-y-3">

                      <div className="flex items-center gap-3">
                        <User
                          size={17}
                          className="text-slate-400"
                        />

                        <span className="text-sm text-slate-700">
                          {order.customer}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone
                          size={17}
                          className="text-slate-400"
                        />

                        <span className="text-sm text-slate-700">
                          {order.phone}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin
                          size={17}
                          className="text-slate-400"
                        />

                        <span className="text-sm text-slate-700">
                          {order.address}
                        </span>
                      </div>

                    </div>

                  </div>

                  {/* Items */}
                  <div>

                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                      Order Items
                    </h3>

                    <div className="space-y-2">

                      {order.items.map((item) => (
                        <div
                          key={item}
                          className="text-sm text-slate-700"
                        >
                          {item}
                        </div>
                      ))}

                    </div>

                  </div>

                  {/* Actions */}
                  <div>

                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                      Actions
                    </h3>

                    <div className="flex flex-wrap gap-2">

                      {order.status === 'New' && (
                        <>
                          <button
                            onClick={() =>
                              updateOrderStatus(
                                order.id,
                                'Preparing'
                              )
                            }
                            className="px-4 py-2.5 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition"
                          >
                            Accept Order
                          </button>

                          <button
                            onClick={() =>
                              updateOrderStatus(
                                order.id,
                                'Rejected'
                              )
                            }
                            className="px-4 py-2.5 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition flex items-center gap-2"
                          >
                            <XCircle size={16} />
                            Reject
                          </button>
                        </>
                      )}

                      {order.status === 'Preparing' && (
                        <button
                          onClick={() =>
                            updateOrderStatus(
                              order.id,
                              'Ready'
                            )
                          }
                          className="px-4 py-2.5 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition flex items-center gap-2"
                        >
                          <CheckCircle2 size={16} />
                          Mark Ready
                        </button>
                      )}

                      {order.status === 'Ready' && (
                        <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                          <CheckCircle2 size={18} />
                          Ready for delivery
                        </div>
                      )}

                      {order.status === 'Rejected' && (
                        <div className="flex items-center gap-2 text-sm text-red-600 font-medium">
                          <XCircle size={18} />
                          Order rejected
                        </div>
                      )}

                    </div>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* Empty state */}
        {orders.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">

            <ShoppingBag
              size={40}
              className="mx-auto text-slate-300"
            />

            <h3 className="font-semibold text-slate-900 mt-4">
              No orders yet
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              New orders will appear here.
            </p>

          </div>
        )}

      </div>

    </div>
  )
}