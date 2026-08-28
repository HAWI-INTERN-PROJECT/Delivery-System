export type OrderStatus =
  | 'pending'
  | 'preparing'
  | 'ready_for_pickup'
  | 'in_transit'
  | 'delivered'
  | 'cancelled'
  | 'rejected'

export type OrderFilterStatus =
  | 'all'
  | 'pending'
  | 'preparing'
  | 'ready_for_pickup'
  | 'in_transit'
  | 'delivered'

export interface OrderCustomer {
  id: number
  name: string
}

export interface OrderRestaurant {
  id: number
  name: string
}

export interface Order {
  id: number
  orderNumber: string
  customer: OrderCustomer
  restaurant: OrderRestaurant
  status: OrderStatus
  totalAmount: number
  createdAt: string
}

export interface OrderStats {
  totalToday: number
  pending: number
  preparing: number
  delivered: number
  rejected: number
}

export interface OrdersListResponse {
  stats: OrderStats
  orders: Order[]
}

export interface OrdersQueryParams {
  status?: OrderFilterStatus
  search?: string
}
