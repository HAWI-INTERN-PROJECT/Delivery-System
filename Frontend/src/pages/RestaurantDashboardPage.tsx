import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react'

const stats = [
  {
    title: "Today's Orders",
    value: '24',
    change: '+12.5%',
    description: 'vs yesterday',
    icon: ShoppingBag,
  },
  {
    title: 'Active Orders',
    value: '8',
    change: '+3',
    description: 'currently processing',
    icon: Clock,
  },
  {
    title: 'Completed',
    value: '16',
    change: '+8.2%',
    description: 'today',
    icon: CheckCircle2,
  },
  {
    title: "Today's Revenue",
    value: 'ETB 8,450',
    change: '+15.3%',
    description: 'vs yesterday',
    icon: DollarSign,
  },
]

const orders = [
  {
    id: '#ORD-1024',
    customer: 'Abebe Kebede',
    items: '2x Chicken Burger, 1x Coke',
    total: 'ETB 850',
    status: 'New',
  },
  {
    id: '#ORD-1023',
    customer: 'Sara Ahmed',
    items: '1x Special Pizza, 2x Juice',
    total: 'ETB 1,200',
    status: 'Preparing',
  },
  {
    id: '#ORD-1022',
    customer: 'Dawit Tesfaye',
    items: '1x Beef Burger, 1x Fries',
    total: 'ETB 650',
    status: 'Ready',
  },
  {
    id: '#ORD-1021',
    customer: 'Hana Worku',
    items: '2x Pasta, 1x Water',
    total: 'ETB 920',
    status: 'New',
  },
]

export default function RestaurantDashboardPage() {
  return (
    <div className="min-h-screen">

      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-6">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Dashboard
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Welcome back! Here's what's happening with your restaurant today.
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm font-medium text-slate-900">
              Today
            </p>

            <p className="text-xs text-slate-500">
              September 4, 2026
            </p>
          </div>

        </div>

      </header>

      <div className="p-8">

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          {stats.map((stat) => {
            const Icon = stat.icon

            return (
              <div
                key={stat.title}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
              >

                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-sm text-slate-500">
                      {stat.title}
                    </p>

                    <p className="text-2xl font-bold text-slate-900 mt-2">
                      {stat.value}
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                    <Icon size={21} />
                  </div>

                </div>

                <div className="flex items-center gap-2 mt-4">

                  <span className="flex items-center text-xs font-medium text-green-600">
                    <TrendingUp size={13} className="mr-1" />
                    {stat.change}
                  </span>

                  <span className="text-xs text-slate-400">
                    {stat.description}
                  </span>

                </div>

              </div>
            )
          })}

        </div>

        {/* Charts + New Orders */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Revenue Chart */}
          <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

            <div className="flex items-center justify-between mb-6">

              <div>
                <h2 className="font-semibold text-slate-900">
                  Daily Revenue
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Revenue for the last 7 days
                </p>
              </div>

              <button className="text-sm text-orange-500 font-medium hover:text-orange-600">
                View Details
              </button>

            </div>

            {/* Simple chart */}
            <div className="h-64 flex items-end gap-4 border-b border-l border-slate-200 px-4">

              {[45, 62, 52, 75, 68, 88, 80].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 h-full flex items-end"
                >
                  <div
                    className="w-full bg-orange-500 rounded-t-lg hover:bg-orange-600 transition"
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}

            </div>

            <div className="flex justify-between mt-3 px-2 text-xs text-slate-400">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>

          </div>

          {/* Quick summary */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

            <h2 className="font-semibold text-slate-900">
              Performance
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Today's overview
            </p>

            <div className="mt-6 space-y-5">

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-500">
                    Orders
                  </span>

                  <span className="text-sm font-semibold">
                    24 / 30
                  </span>
                </div>

                <div className="h-2 bg-slate-100 rounded-full">
                  <div className="h-2 w-4/5 bg-orange-500 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-500">
                    Completion Rate
                  </span>

                  <span className="text-sm font-semibold">
                    92%
                  </span>
                </div>

                <div className="h-2 bg-slate-100 rounded-full">
                  <div className="h-2 w-[92%] bg-green-500 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-500">
                    Customer Rating
                  </span>

                  <span className="text-sm font-semibold">
                    4.8 / 5
                  </span>
                </div>

                <div className="h-2 bg-slate-100 rounded-full">
                  <div className="h-2 w-[96%] bg-yellow-400 rounded-full" />
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* New Orders */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm">

          <div className="p-6 border-b border-slate-200 flex items-center justify-between">

            <div>
              <h2 className="font-semibold text-slate-900">
                New Orders
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Recent orders that need your attention
              </p>
            </div>

            <button className="flex items-center gap-1 text-sm text-orange-500 font-medium hover:text-orange-600">
              View All
              <ArrowUpRight size={16} />
            </button>

          </div>

          <div className="divide-y divide-slate-100">

            {orders.map((order) => (

              <div
                key={order.id}
                className="p-5 flex flex-col lg:flex-row lg:items-center gap-4 justify-between"
              >

                <div className="flex items-center gap-4">

                  <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                    <ShoppingBag size={19} />
                  </div>

                  <div>
                    <p className="font-medium text-slate-900">
                      {order.id}
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      {order.customer}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      {order.items}
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-6">

                  <div>
                    <p className="font-semibold text-slate-900">
                      {order.total}
                    </p>

                    <span
                      className={`inline-block mt-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        order.status === 'New'
                          ? 'bg-blue-50 text-blue-600'
                          : order.status === 'Preparing'
                            ? 'bg-yellow-50 text-yellow-600'
                            : 'bg-green-50 text-green-600'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <button className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50">
                    View
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  )
}