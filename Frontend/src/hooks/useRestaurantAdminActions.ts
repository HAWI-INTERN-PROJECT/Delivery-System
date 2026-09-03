import { useCallback, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useApproveRestaurant, useRestaurants } from '@/hooks/useRestaurants'
import type { Restaurant } from '@/types/Restaurants'
import { getRestaurantDisplayStatus } from '@/components/restaurants/restaurantStatusConfig'

const QUERY_KEY = ['restaurants'] as const
const OVERRIDE_KEY = 'admin-restaurant-status-overrides'

type StatusOverride = Pick<Restaurant, 'approvalStatus' | 'operationalStatus'>

function readOverrides(): Record<number, StatusOverride> {
  try {
    const raw = sessionStorage.getItem(OVERRIDE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Record<number, StatusOverride>
  } catch {
    return {}
  }
}

function writeOverrides(overrides: Record<number, StatusOverride>) {
  sessionStorage.setItem(OVERRIDE_KEY, JSON.stringify(overrides))
}

function applyOverrides(restaurants: Restaurant[], overrides: Record<number, StatusOverride>): Restaurant[] {
  return restaurants.map((restaurant) => {
    const override = overrides[restaurant.id]
    return override ? { ...restaurant, ...override } : restaurant
  })
}

function getErrorMessage(error: unknown): string {
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof error.response === 'object' &&
    error.response !== null &&
    'data' in error.response &&
    typeof error.response.data === 'object' &&
    error.response.data !== null &&
    'message' in error.response.data &&
    typeof error.response.data.message === 'string'
  ) {
    return error.response.data.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Something went wrong. Please try again.'
}

export function useRestaurantAdminActions() {
  const queryClient = useQueryClient()
  const query = useRestaurants()
  const approveMutation = useApproveRestaurant()
  const [overrides, setOverrides] = useState<Record<number, StatusOverride>>(readOverrides)
  const [pendingId, setPendingId] = useState<number | null>(null)

  const restaurants = useMemo(
    () => applyOverrides(query.data ?? [], overrides),
    [query.data, overrides],
  )

  const persistOverride = useCallback((id: number, override: StatusOverride) => {
    setOverrides((current) => {
      const next = { ...current, [id]: override }
      writeOverrides(next)
      return next
    })
  }, [])

  const approve = useCallback(
    async (restaurant: Restaurant) => {
      setPendingId(restaurant.id)
      try {
        await approveMutation.mutateAsync(restaurant.id)
        persistOverride(restaurant.id, {
          approvalStatus: 'approved',
          operationalStatus: 'active',
        })
        toast.success(`${restaurant.name} was approved.`)
      } catch (error) {
        toast.error(getErrorMessage(error))
      } finally {
        setPendingId(null)
      }
    },
    [approveMutation, persistOverride],
  )

  const suspend = useCallback(
    (restaurant: Restaurant) => {
      persistOverride(restaurant.id, {
        approvalStatus: restaurant.approvalStatus,
        operationalStatus: 'suspended',
      })
      queryClient.setQueryData<Restaurant[]>(QUERY_KEY, (current) =>
        (current ?? []).map((item) =>
          item.id === restaurant.id ? { ...item, operationalStatus: 'suspended' } : item,
        ),
      )
      toast.success(`${restaurant.name} was suspended.`)
    },
    [persistOverride, queryClient],
  )

  const restore = useCallback(
    (restaurant: Restaurant) => {
      persistOverride(restaurant.id, {
        approvalStatus: 'approved',
        operationalStatus: 'active',
      })
      queryClient.setQueryData<Restaurant[]>(QUERY_KEY, (current) =>
        (current ?? []).map((item) =>
          item.id === restaurant.id
            ? { ...item, approvalStatus: 'approved', operationalStatus: 'active' }
            : item,
        ),
      )
      toast.success(`${restaurant.name} was restored.`)
    },
    [persistOverride, queryClient],
  )

  const view = useCallback((restaurant: Restaurant) => {
    const status = getRestaurantDisplayStatus(restaurant)
    toast.info(restaurant.name, {
      description: `${restaurant.managerName || 'No manager'} • ${status}`,
    })
  }, [])

  return {
    restaurants,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error ? getErrorMessage(query.error) : null,
    pendingId,
    approve,
    suspend,
    restore,
    view,
  }
}
