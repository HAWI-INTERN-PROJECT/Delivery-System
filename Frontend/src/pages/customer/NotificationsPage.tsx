import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Bell, Gift, ShoppingBag } from 'lucide-react'

// Mock notifications
const mockNotifications = [
  {
    id: 1,
    title: 'Order Delivered',
    message: 'Your order from Kitfo Special has been delivered successfully. Enjoy your meal!',
    time: '2 hours ago',
    type: 'order',
    read: false,
  },
  {
    id: 2,
    title: 'Special Offer!',
    message: 'Get 20% off your next pizza order using code PIZZA20.',
    time: '1 day ago',
    type: 'promo',
    read: true,
  },
  {
    id: 3,
    title: 'System Maintenance',
    message: 'The app will undergo scheduled maintenance tonight at 2 AM.',
    time: '2 days ago',
    type: 'system',
    read: true,
  },
]

export default function NotificationsPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] pb-6">
      <header className="px-6 pt-6 pb-4 bg-white border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-800">Notifications</h1>
          </div>
        </div>
      </header>

      <div className="px-6 py-6 space-y-4 flex-1 overflow-y-auto">
        {mockNotifications.map((notif) => (
          <div
            key={notif.id}
            className={`bg-white rounded-2xl p-4 border flex gap-4 items-start ${
              !notif.read ? 'border-orange-200 bg-orange-50/10' : 'border-gray-50'
            }`}
          >
            <div
              className={`p-2.5 rounded-xl shrink-0 ${
                notif.type === 'order'
                  ? 'bg-blue-50 text-blue-500'
                  : notif.type === 'promo'
                  ? 'bg-green-50 text-green-500'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {notif.type === 'order' && <ShoppingBag className="h-5 w-5" />}
              {notif.type === 'promo' && <Gift className="h-5 w-5" />}
              {notif.type === 'system' && <Bell className="h-5 w-5" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <h4 className={`font-bold text-sm ${!notif.read ? 'text-gray-900' : 'text-gray-800'}`}>
                  {notif.title}
                </h4>
                <span className="text-[10px] text-gray-400 shrink-0 mt-0.5">{notif.time}</span>
              </div>
              <p className={`text-xs mt-1 leading-relaxed ${!notif.read ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>
                {notif.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
