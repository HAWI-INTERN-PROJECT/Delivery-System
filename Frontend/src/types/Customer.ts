export interface Category {
  id: number
  name: string
  description?: string
  created_at?: string
  updated_at?: string
}

export interface MenuItem {
  id: number
  restaurant_id: number
  category_id: number
  name: string
  description?: string
  price: number
  is_available: boolean
  image?: string
  created_at?: string
  updated_at?: string
  ratings_avg?: number
}

export interface Restaurant {
  id: number
  manager_id: number
  name: string
  description?: string
  address: string
  phone: string
  logo?: string
  approval_status: 'pending' | 'approved' | 'rejected'
  status: 'active' | 'inactive' | 'suspended'
  created_at?: string
  updated_at?: string
  delivery_fee: number
  delivery_time: string // e.g. "20-30 min"
  rating: number // e.g. 4.8
  cuisine: string // e.g. "Ethiopian Food, Pizza"
  cover_image?: string
}

export interface CartItem {
  id: number
  customer_id: number
  menu_item_id: number
  quantity: number
  menu_item: MenuItem
  created_at?: string
  updated_at?: string
}

export interface OrderItem {
  id: number
  order_id: number
  menu_item_id: number
  quantity: number
  price: number
  menu_item: MenuItem
  created_at?: string
  updated_at?: string
}

export interface Order {
  id: number
  customer_id: number
  restaurant_id: number
  driver_id?: number | null
  subtotal: number
  delivery_fee: number
  total_amount: number
  delivery_address: string
  phone: string
  status: 'pending' | 'preparing' | 'ready_for_pickup' | 'in_transit' | 'delivered' | 'cancelled' | 'rejected'
  assigned_at?: string | null
  delivered_at?: string | null
  created_at: string
  updated_at: string
  restaurant: Restaurant
  order_items: OrderItem[]
}

export interface Payment {
  id: number
  order_id: number
  payment_method: 'telebirr' | 'card'
  transaction_reference?: string | null
  amount: number
  status: 'pending' | 'paid' | 'failed' | 'refunded'
  paid_at?: string | null
}
