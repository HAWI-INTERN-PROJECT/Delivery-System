import { ChevronRight } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDisplayDate } from '@/lib/formatDisplayDate'
import type { Restaurant, RestaurantDisplayStatus } from '@/types/Restaurants'
import { RestaurantActionButtons } from './RestaurantActionButtons'
import { RestaurantAvatar } from './RestaurantAvatar'
import { RestaurantStatusBadge } from './RestaurantStatusBadge'
import { getRestaurantDisplayStatus } from './restaurantStatusConfig'

export interface RestaurantsTableProps {
  restaurants: Restaurant[]
  isLoading?: boolean
  pendingId?: number | null
  onApprove?: (restaurant: Restaurant) => void
  onSuspend?: (restaurant: Restaurant) => void
  onRestore?: (restaurant: Restaurant) => void
  onView?: (restaurant: Restaurant) => void
}

function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <tr key={index} className="border-b border-gray-100">
          {Array.from({ length: 6 }).map((__, cellIndex) => (
            <td key={cellIndex} className="px-4 py-4">
              <Skeleton className="h-4 w-full max-w-[140px]" />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}

export function RestaurantsTable({
  restaurants,
  isLoading = false,
  pendingId = null,
  onApprove,
  onSuspend,
  onRestore,
  onView,
}: RestaurantsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs font-semibold uppercase tracking-wide text-gray-400">
              <th className="px-4 py-4">Restaurant</th>
              <th className="px-4 py-4">Manager</th>
              <th className="px-4 py-4">Category</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Created</th>
              <th className="px-4 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <TableSkeleton />}

            {!isLoading && restaurants.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                  No restaurants found for the selected filters.
                </td>
              </tr>
            )}

            {!isLoading &&
              restaurants.map((restaurant) => {
                const status: RestaurantDisplayStatus = getRestaurantDisplayStatus(restaurant)
                const isBusy = pendingId === restaurant.id

                return (
                  <tr key={restaurant.id} className="border-b border-gray-100 last:border-b-0">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <RestaurantAvatar name={restaurant.name} logo={restaurant.logo} />
                        <span className="font-semibold text-gray-900">{restaurant.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-700">
                      {restaurant.managerName || '—'}
                    </td>
                    <td className="px-4 py-4 text-gray-700">{restaurant.category}</td>
                    <td className="px-4 py-4">
                      <RestaurantStatusBadge status={status} />
                    </td>
                    <td className="px-4 py-4 text-gray-600">
                      {formatDisplayDate(restaurant.createdAt)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <RestaurantActionButtons
                          status={status}
                          disabled={isBusy}
                          onApprove={() => onApprove?.(restaurant)}
                          onSuspend={() => onSuspend?.(restaurant)}
                          onRestore={() => onRestore?.(restaurant)}
                        />
                        <button
                          type="button"
                          onClick={() => onView?.(restaurant)}
                          className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-700"
                          aria-label={`View ${restaurant.name}`}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
