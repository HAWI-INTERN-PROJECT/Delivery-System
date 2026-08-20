import { useAuthStore } from '@/stores/auth'
import { useNotifications } from '@/hooks/useNotifications'
export default function Navbar({ title = 'Dashboard' }) {
  const { count } = useNotifications()
  const { user } = useAuthStore()
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white w-full">
      <h1 className="text-lg font-semibold">{title}</h1>

      <div className="flex items-center gap-4">
        <div className="relative flex items-center">
          <svg
            className="absolute left-2 text-gray-400"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            placeholder="Search..."
            aria-label="Search"
            className="pl-8 pr-3 py-1.5 border rounded-md text-sm w-48"
          />
        </div>

        <button type="button" aria-label="Notifications" className="relative">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
                 {count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                 {count}
    </span>
  )}
</button>

        <div
              className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm"
              title={user?.name ?? 'Guest'}  >
                {user?.name?.charAt(0).toUpperCase() ?? 'G'}
          </div>
      </div>
    </header>
  )
}