import { NavLink } from 'react-router-dom'
import { Home, Search, ClipboardList, ShoppingCart, User } from 'lucide-react'
import { useCart } from '@/hooks/useCart'

export default function BottomNav() {
  const { totalItemsCount } = useCart()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-white border-t border-gray-100 flex items-center justify-around px-2 shadow-lg">
      <NavLink
        to="/home"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center flex-1 py-1 text-xs font-medium transition-colors ${
            isActive ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'
          }`
        }
      >
        <Home className="h-5 w-5 mb-0.5" />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/search"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center flex-1 py-1 text-xs font-medium transition-colors ${
            isActive ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'
          }`
        }
      >
        <Search className="h-5 w-5 mb-0.5" />
        <span>Search</span>
      </NavLink>

      <NavLink
        to="/orders"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center flex-1 py-1 text-xs font-medium transition-colors ${
            isActive ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'
          }`
        }
      >
        <ClipboardList className="h-5 w-5 mb-0.5" />
        <span>Orders</span>
      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) =>
          `relative flex flex-col items-center justify-center flex-1 py-1 text-xs font-medium transition-colors ${
            isActive ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'
          }`
        }
      >
        <ShoppingCart className="h-5 w-5 mb-0.5" />
        <span>Cart</span>
        {totalItemsCount > 0 && (
          <span className="absolute top-0 right-1/2 translate-x-4 bg-orange-600 text-white text-[10px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
            {totalItemsCount}
          </span>
        )}
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center flex-1 py-1 text-xs font-medium transition-colors ${
            isActive ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'
          }`
        }
      >
        <User className="h-5 w-5 mb-0.5" />
        <span>Profile</span>
      </NavLink>
    </nav>
  )
}
