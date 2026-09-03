import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchRestaurants, updateRestaurantApproval } from '@/lib/restaurantsApi'
import type { Restaurant } from '@/types/Restaurants'

const RESTAURANTS_QUERY_KEY = ['restaurants'] as const

export function useRestaurants() {
  return useQuery({
    queryKey: RESTAURANTS_QUERY_KEY,
    queryFn: fetchRestaurants,
    staleTime: 30_000,
  })
}

export function useApproveRestaurant() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => updateRestaurantApproval(id, 'approved'),
    onSuccess: (updated) => {
      queryClient.setQueryData<Restaurant[]>(RESTAURANTS_QUERY_KEY, (current) => {
        if (!current) return [updated]
        const exists = current.some((restaurant) => restaurant.id === updated.id)
        return exists
          ? current.map((restaurant) => (restaurant.id === updated.id ? updated : restaurant))
          : [...current, updated]
      })
    },
  })
}
