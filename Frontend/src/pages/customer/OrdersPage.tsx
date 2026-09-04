import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useOrdersQuery } from '@/hooks/useOrders'
import OrderCard from '@/components/customer/OrderCard'

export default function OrdersPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'all' | 'delivered' | 'cancelled'>('all')

  const { data: orders = [], isLoading } = useOrdersQuery()

  // Filter orders by local tab state
  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'delivered') return order.status === 'delivered'
    if (activeTab === 'cancelled') {
      return order.status === 'cancelled' || order.status === 'rejected'
    }
    return true // 'all'
  })

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] pb-6">
      {/* Top Header */}
      <header className="px-6 pt-6 pb-4 bg-white border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/home')}
            className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">My Orders</h1>
        </div>

        {/* Tab filters */}
        <div className="flex gap-2.5 mt-5 border-b border-gray-50 pb-2">
          {(['all', 'delivered', 'cancelled'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-1 text-xs font-bold transition-all relative ${
                activeTab === tab ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <span className="capitalize">{tab}</span>
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full"></span>
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Orders List Container */}
      <div className="px-6 py-6 space-y-4 flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="text-center py-8 text-sm text-gray-400 font-medium">Loading orders...</div>
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map((order) => <OrderCard key={order.id} order={order} />)
        ) : (
          <div className="text-center py-12 text-gray-400">
            <span className="text-sm font-medium">No orders found in this section.</span>
          </div>
        )}
      </div>
    </div>
  )
}
