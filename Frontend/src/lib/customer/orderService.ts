import type { Order, CartItem, Payment } from '../../types/Customer'
import { mockOrders } from './mock/orders'
import api from '../api'

// Local cache for order changes since backend is mockup only
let localOrdersList = [...mockOrders]

export async function getOrders(status?: string): Promise<Order[]> {
  try {
    const response = await api.get('/orders')
    const list = response.data.data as Order[]
    return status ? list.filter((o) => o.status === status) : list
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return status ? localOrdersList.filter((o) => o.status === status) : localOrdersList
  }
}

export async function getOrder(id: number): Promise<Order | undefined> {
  try {
    const response = await api.get(`/orders/${id}`)
    return response.data.data
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return localOrdersList.find((o) => o.id === id)
  }
}

export interface PlaceOrderData {
  restaurant_id: number
  delivery_address: string
  phone: string
  cartItems: CartItem[]
  subtotal: number
  delivery_fee: number
  total_amount: number
  payment_method: 'telebirr' | 'card'
}

export async function placeOrder(data: PlaceOrderData): Promise<Order> {
  try {
    // Attempt placing order to the API
    const response = await api.post('/orders', {
      restaurant_id: data.restaurant_id,
      delivery_address: data.delivery_address,
      phone: data.phone,
    })
    return response.data.data
  } catch {
    // Fallback simulation
    await new Promise((resolve) => setTimeout(resolve, 300))
    const firstRestaurant = data.cartItems[0]?.menu_item?.restaurant_id
      ? { id: data.restaurant_id, name: 'Restaurant partner', manager_id: 1, address: '', phone: '', delivery_fee: data.delivery_fee, delivery_time: '30 min', rating: 4.5, cuisine: '', approval_status: 'approved', status: 'active' }
      : mockOrders[0].restaurant

    const newOrder: Order = {
      id: Date.now(),
      customer_id: 1,
      restaurant_id: data.restaurant_id,
      driver_id: null,
      subtotal: data.subtotal,
      delivery_fee: data.delivery_fee,
      total_amount: data.total_amount,
      delivery_address: data.delivery_address,
      phone: data.phone,
      status: 'pending',
      assigned_at: null,
      delivered_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      restaurant: { ...mockOrders[0].restaurant, id: data.restaurant_id, name: firstRestaurant.name } as any,
      order_items: data.cartItems.map((item, idx) => ({
        id: idx + 1,
        order_id: Date.now(),
        menu_item_id: item.menu_item_id,
        quantity: item.quantity,
        price: item.menu_item.price,
        menu_item: item.menu_item,
      })),
    }

    localOrdersList = [newOrder, ...localOrdersList]
    return newOrder
  }
}

export async function initiatePayment(orderId: number, paymentMethod: 'telebirr' | 'card'): Promise<Payment> {
  try {
    const response = await api.post(`/orders/${orderId}/payment`, { payment_method: paymentMethod })
    return response.data.data
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return {
      id: Date.now(),
      order_id: orderId,
      payment_method: paymentMethod,
      transaction_reference: 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      amount: 0,
      status: 'paid',
      paid_at: new Date().toISOString(),
    }
  }
}
