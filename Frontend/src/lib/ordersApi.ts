import api from '@/lib/api'
import type { OrdersListResponse, OrdersQueryParams } from '@/types/orders'

interface ApiSuccessResponse<T> {
  success: boolean
  message: string
  data: T
}

export async function fetchOrders(params: OrdersQueryParams = {}): Promise<OrdersListResponse> {
  const response = await api.get<ApiSuccessResponse<OrdersListResponse>>('/orders', {
    params: {
      status: params.status && params.status !== 'all' ? params.status : undefined,
      search: params.search?.trim() || undefined,
    },
  })

  return response.data.data
}
