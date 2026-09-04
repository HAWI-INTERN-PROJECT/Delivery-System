import { useState } from 'react'
import {
  Bell,
  Clock,
  Lock,
  Mail,
  Save,
  Store,
} from 'lucide-react'

export default function RestaurantSettingsPage() {
  const [available, setAvailable] = useState(true)
  const [newOrders, setNewOrders] = useState(true)
  const [cancellations, setCancellations] = useState(true)
  const [warnings, setWarnings] = useState(true)
  const [revenueSummary, setRevenueSummary] = useState(false)

  const [hours, setHours] = useState({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
    Sunday: false,
  })

  const toggleHour = (day: keyof typeof hours) => {
    setHours((current) => ({
      ...current,
      [day]: !current[day],
    }))
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Settings
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Manage restaurant availability, hours and notifications.
        </p>
      </header>

      <div className="p-8 max-w-5xl space-y-6">

        {/* Availability */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
              <Store size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Restaurant Availability
              </h2>

              <p className="text-sm text-slate-500">
                Control whether customers can place orders.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">

            <div>
              <p className="font-medium text-slate-900">
                Restaurant is currently open
              </p>

              <p className="text-sm text-slate-500 mt-1">
                Customers can see your restaurant and place orders.
              </p>
            </div>

            <button
              onClick={() => setAvailable(!available)}
              className={`relative w-12 h-7 rounded-full transition ${
                available
                  ? 'bg-green-500'
                  : 'bg-slate-300'
              }`}
            >
              <span
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition ${
                  available
                    ? 'left-6'
                    : 'left-1'
                }`}
              />
            </button>

          </div>

        </section>

        {/* Business Hours */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
              <Clock size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Business Hours
              </h2>

              <p className="text-sm text-slate-500">
                Set your restaurant's opening hours.
              </p>
            </div>

          </div>

          <div className="space-y-3">

            {Object.entries(hours).map(([day, enabled]) => (

              <div
                key={day}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-4 rounded-xl bg-slate-50"
              >

                <div className="font-medium text-sm text-slate-700">
                  {day}
                </div>

                <button
                  onClick={() =>
                    toggleHour(day as keyof typeof hours)
                  }
                  className={`w-11 h-6 rounded-full relative ${
                    enabled
                      ? 'bg-green-500'
                      : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full ${
                      enabled
                        ? 'left-6'
                        : 'left-1'
                    }`}
                  />
                </button>

                <input
                  type="time"
                  defaultValue="08:00"
                  disabled={!enabled}
                  className="h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm disabled:opacity-50"
                />

                <input
                  type="time"
                  defaultValue="22:00"
                  disabled={!enabled}
                  className="h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm disabled:opacity-50"
                />

              </div>

            ))}

          </div>

        </section>

        {/* Notifications */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center">
              <Bell size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Notifications
              </h2>

              <p className="text-sm text-slate-500">
                Choose which notifications you receive.
              </p>
            </div>

          </div>

          <div className="space-y-2">

            {[
              {
                title: 'New orders',
                description: 'Get notified when a customer places an order.',
                value: newOrders,
                setter: setNewOrders,
              },
              {
                title: 'Order cancellations',
                description: 'Get notified when an order is cancelled.',
                value: cancellations,
                setter: setCancellations,
              },
              {
                title: 'Item availability warnings',
                description: 'Get warnings when menu items need attention.',
                value: warnings,
                setter: setWarnings,
              },
              {
                title: 'Daily revenue summary',
                description: 'Receive a daily summary of your revenue.',
                value: revenueSummary,
                setter: setRevenueSummary,
              },
            ].map((item) => (

              <div
                key={item.title}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50"
              >

                <div>
                  <p className="font-medium text-sm text-slate-900">
                    {item.title}
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
                    {item.description}
                  </p>
                </div>

                <button
                  onClick={() => item.setter(!item.value)}
                  className={`relative w-11 h-6 rounded-full ${
                    item.value
                      ? 'bg-orange-500'
                      : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full ${
                      item.value
                        ? 'left-6'
                        : 'left-1'
                    }`}
                  />
                </button>

              </div>

            ))}

          </div>

        </section>

        {/* Account */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
              <Lock size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Account & Security
              </h2>

              <p className="text-sm text-slate-500">
                Manage your account information.
              </p>
            </div>

          </div>

          <div className="space-y-4">

            <div>
              <label className="text-sm font-medium text-slate-700">
                Email Address
              </label>

              <div className="relative mt-2">
                <Mail
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value="restaurant@example.com"
                  readOnly
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                />
              </div>
            </div>

            <button className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium hover:bg-slate-50">
              Change Password
            </button>

          </div>

        </section>

        {/* Save */}
        <div className="flex justify-end">

          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600">
            <Save size={18} />
            Save Changes
          </button>

        </div>

      </div>

    </div>
  )
}