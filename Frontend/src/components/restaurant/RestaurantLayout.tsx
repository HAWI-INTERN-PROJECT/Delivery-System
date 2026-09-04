import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  DollarSign,
  Store,
  Settings,
  Building2,
  LogOut,
} from 'lucide-react'
import { useAuthStore } from '@/stores/auth'

const navigation = [
  {
    name: 'Dashboard',
    path: '/restaurant/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Orders',
    path: '/restaurant/orders',
    icon: ShoppingBag,
  },
  {
    name: 'Menu',
    path: '/restaurant/menu',
    icon: UtensilsCrossed,
  },
  {
    name: 'Revenue',
    path: '/restaurant/revenue',
    icon: DollarSign,
  },
  {
    name: 'Restaurant Profile',
    path: '/restaurant/profile',
    icon: Store,
  },
  {
    name: 'Settings',
    path: '/restaurant/settings',
    icon: Settings,
  },
  {
    name: 'My Restaurants',
    path: '/restaurant/restaurants',
    icon: Building2,
  },
]

export default function RestaurantLayout() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 text-white flex flex-col fixed left-0 top-0 bottom-0">

        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
              <UtensilsCrossed size={22} />
            </div>

            <div>
              <h1 className="text-lg font-bold">
                Tenedam
              </h1>

              <p className="text-xs text-slate-400">
                Restaurant Manager
              </p>
            </div>
          </div>
        </div>

        {/* Current restaurant */}
        <div className="px-4 pt-5">
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-3">
            <p className="text-xs text-slate-500 mb-1">
              CURRENT RESTAURANT
            </p>

            <p className="font-medium text-sm">
              My Restaurant
            </p>

            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />

              <span className="text-xs text-slate-400">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">

          {navigation.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${
                    isActive
                      ? 'bg-orange-500 text-white'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                  }`
                }
              >
                <Icon size={19} />

                <span>{item.name}</span>
              </NavLink>
            )
          })}

        </nav>

        {/* User section */}
        <div className="border-t border-slate-800 p-4">

          <div className="flex items-center gap-3 mb-3">

            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-semibold">
              {user?.name?.charAt(0).toUpperCase() || 'M'}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">
                {user?.name || 'Restaurant Manager'}
              </p>

              <p className="text-xs text-slate-500 truncate">
                Manager
              </p>
            </div>

          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-slate-900 hover:text-white transition"
          >
            <LogOut size={18} />

            <span>Logout</span>
          </button>

        </div>

      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 min-h-screen">
        <Outlet />
      </main>

    </div>
  )
}