import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { PlaceOrderData } from '@/lib/customer/orderService'
import { getOrders, getOrder, placeOrder } from '@/lib/customer/orderService'
import { fetchOrders } from '@/lib/ordersApi'
import type { OrdersQueryParams } from '@/types/orders'

// Customer-facing hooks (your partner's code)
export function useOrdersQuery(status?: string) {
  return useQuery({
    queryKey: ['orders', status],
    queryFn: () => getOrders(status),
  })
}

export function useOrderDetailQuery(id: number) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => getOrder(id),
    enabled: !!id,
  })
}

export function usePlaceOrderMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PlaceOrderData) => placeOrder(data),
    onSuccess: () => {
      // Invalidate orders list so it refetches after a new order is placed
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })
}

// Admin-facing hooks (your code)
export function useOrders(params: OrdersQueryParams) {
  return useQuery({
    queryKey: ['orders', params.status ?? 'all', params.search ?? ''],
    queryFn: () => fetchOrders(params),
    staleTime: 30_000,
  })
}