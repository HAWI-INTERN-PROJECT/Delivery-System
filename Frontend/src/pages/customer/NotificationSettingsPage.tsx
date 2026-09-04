import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'

export default function NotificationSettingsPage() {
  const navigate = useNavigate()
  const [orderUpdates, setOrderUpdates] = useState(true)
  const [deliveryUpdates, setDeliveryUpdates] = useState(true)
  const [promotionalUpdates, setPromotionalUpdates] = useState(false)

  const handleSave = () => {
    toast.success('Notification preferences updated')
    navigate('/profile')
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] pb-6">
      {/* Top Header */}
      <header className="px-6 pt-6 pb-4 bg-white border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">Notification Settings</h1>
        </div>
      </header>

      {/* Main Settings List */}
      <div className="px-6 py-6 space-y-6 flex-1 overflow-y-auto">
        <div className="bg-white rounded-3xl p-6 border border-gray-50 space-y-6 shadow-sm">
          <h3 className="text-[10px] uppercase tracking-wider text-gray-400 font-extrabold pb-1 border-b border-gray-50">
            Push Notifications
          </h3>

          {/* Setting item 1 */}
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0 pr-4">
              <h4 className="font-bold text-gray-800 text-sm">Order status updates</h4>
              <p className="text-[10px] text-gray-400 mt-1 leading-normal">
                Get notified when your order status changes
              </p>
            </div>
            <button
              onClick={() => setOrderUpdates(!orderUpdates)}
              className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${
                orderUpdates ? 'bg-orange-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                  orderUpdates ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></span>
            </button>
          </div>

          {/* Setting item 2 */}
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0 pr-4">
              <h4 className="font-bold text-gray-800 text-sm">Delivery updates</h4>
              <p className="text-[10px] text-gray-400 mt-1 leading-normal">
                Driver location and ETA updates
              </p>
            </div>
            <button
              onClick={() => setDeliveryUpdates(!deliveryUpdates)}
              className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${
                deliveryUpdates ? 'bg-orange-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                  deliveryUpdates ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></span>
            </button>
          </div>

          {/* Setting item 3 */}
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0 pr-4">
              <h4 className="font-bold text-gray-800 text-sm">Promotional notifications</h4>
              <p className="text-[10px] text-gray-400 mt-1 leading-normal">
                Deals, discounts, and special offers
              </p>
            </div>
            <button
              onClick={() => setPromotionalUpdates(!promotionalUpdates)}
              className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${
                promotionalUpdates ? 'bg-orange-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                  promotionalUpdates ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></span>
            </button>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-colors shadow-sm text-sm"
        >
          Save Preferences
        </button>
      </div>
    </div>
  )
}
