import { useQuery } from '@tanstack/react-query'
import { getRestaurantMenu } from '@/lib/customer/restaurantService'

export function useRestaurantMenuQuery(restaurantId: number) {
  return useQuery({
    queryKey: ['restaurant-menu', restaurantId],
    queryFn: () => getRestaurantMenu(restaurantId),
    enabled: !!restaurantId,
  })
}
