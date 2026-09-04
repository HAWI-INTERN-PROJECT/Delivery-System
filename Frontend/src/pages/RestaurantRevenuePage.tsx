import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  CalendarDays,
} from 'lucide-react'

const revenueData = [
  { day: 'Mon', revenue: 6200, orders: 18 },
  { day: 'Tue', revenue: 7800, orders: 22 },
  { day: 'Wed', revenue: 6900, orders: 20 },
  { day: 'Thu', revenue: 9100, orders: 27 },
  { day: 'Fri', revenue: 8450, orders: 24 },
  { day: 'Sat', revenue: 11200, orders: 32 },
  { day: 'Sun', revenue: 9800, orders: 29 },
]

export default function RestaurantRevenuePage() {
  const maxRevenue = Math.max(
    ...revenueData.map((item) => item.revenue)
  )

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Revenue
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Track your restaurant's financial performance.
            </p>
          </div>

          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium">
            <CalendarDays size={17} />
            Last 7 Days
          </button>

        </div>

      </header>

      <div className="p-8">

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">

            <div className="flex justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Total Revenue
                </p>

                <p className="text-2xl font-bold text-slate-900 mt-2">
                  ETB 59,450
                </p>

                <p className="text-xs text-green-600 mt-3">
                  +14.5% from last week
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                <DollarSign size={21} />
              </div>

            </div>

          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">

            <div className="flex justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Total Orders
                </p>

                <p className="text-2xl font-bold text-slate-900 mt-2">
                  172
                </p>

                <p className="text-xs text-green-600 mt-3">
                  +9.2% from last week
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                <ShoppingBag size={21} />
              </div>

            </div>

          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">

            <div className="flex justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Average Order
                </p>

                <p className="text-2xl font-bold text-slate-900 mt-2">
                  ETB 764
                </p>

                <p className="text-xs text-green-600 mt-3">
                  +5.8% from last week
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-green-50 text-green-500 flex items-center justify-center">
                <TrendingUp size={21} />
              </div>

            </div>

          </div>

        </div>

        {/* Revenue chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

          <div className="mb-8">
            <h2 className="font-semibold text-slate-900">
              Revenue Overview
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Daily revenue for the last 7 days
            </p>
          </div>

          <div className="h-80 flex items-end gap-4 border-b border-l border-slate-200 px-5">

            {revenueData.map((item) => (

              <div
                key={item.day}
                className="flex-1 h-full flex flex-col justify-end items-center gap-2"
              >

                <span className="text-xs text-slate-500">
                  {item.revenue.toLocaleString()}
                </span>

                <div
                  className="w-full max-w-16 bg-orange-500 rounded-t-xl hover:bg-orange-600 transition"
                  style={{
                    height: `${(item.revenue / maxRevenue) * 85}%`,
                  }}
                />

                <span className="text-xs text-slate-400 absolute translate-y-8">
                  {item.day}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Orders per day */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mt-6">

          <h2 className="font-semibold text-slate-900">
            Orders Per Day
          </h2>

          <p className="text-sm text-slate-500 mt-1 mb-6">
            Number of orders received each day
          </p>

          <div className="grid grid-cols-7 gap-4">

            {revenueData.map((item) => (

              <div
                key={item.day}
                className="text-center"
              >

                <div className="h-32 bg-slate-50 rounded-xl flex items-end justify-center overflow-hidden">

                  <div
                    className="w-8 bg-slate-700 rounded-t-lg"
                    style={{
                      height: `${(item.orders / 35) * 100}%`,
                    }}
                  />

                </div>

                <p className="text-xs text-slate-400 mt-2">
                  {item.day}
                </p>

                <p className="text-sm font-semibold text-slate-900">
                  {item.orders}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  )
}