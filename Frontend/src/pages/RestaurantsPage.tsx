import { useEffect, useMemo, useState } from 'react'
import type { RestaurantFilterStatus } from '@/types/Restaurants'
import { useRestaurantAdminActions } from '@/hooks/useRestaurantAdminActions'
import {
  RestaurantFilterChips,
  RestaurantSearchInput,
  RestaurantsTable,
  getRestaurantDisplayStatus,
} from '@/components/restaurants'

export default function RestaurantsPage() {
  const [statusFilter, setStatusFilter] = useState<RestaurantFilterStatus>('all')
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const { restaurants, isLoading, isError, errorMessage, pendingId, approve, suspend, restore, view } =
    useRestaurantAdminActions()

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(searchInput.trim().toLowerCase())
    }, 250)

    return () => window.clearTimeout(timer)
  }, [searchInput])

  const visibleRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const displayStatus = getRestaurantDisplayStatus(restaurant)
      const matchesStatus = statusFilter === 'all' || displayStatus === statusFilter
      const matchesSearch =
        debouncedSearch.length === 0 ||
        restaurant.name.toLowerCase().includes(debouncedSearch) ||
        restaurant.managerName.toLowerCase().includes(debouncedSearch) ||
        restaurant.category.toLowerCase().includes(debouncedSearch)

      return matchesStatus && matchesSearch
    })
  }, [restaurants, statusFilter, debouncedSearch])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <RestaurantSearchInput value={searchInput} onChange={setSearchInput} />
        <RestaurantFilterChips value={statusFilter} onChange={setStatusFilter} />
      </div>

      {isError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage ?? 'Failed to load restaurants. Please try again.'}
        </div>
      )}

      <RestaurantsTable
        restaurants={visibleRestaurants}
        isLoading={isLoading}
        pendingId={pendingId}
        onApprove={approve}
        onSuspend={suspend}
        onRestore={restore}
        onView={view}
      />
    </div>
  )
}
