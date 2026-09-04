import type { CartItem, MenuItem } from '../../types/Customer'
import api from '../api'
import { useAuthStore } from '../../stores/auth'

// Since Cart backend endpoints might not be implemented, we define a fallback local storage key
const LOCAL_CART_KEY = 'tenadam_local_cart'

function getLocalCart(): CartItem[] {
  try {
    const data = localStorage.getItem(LOCAL_CART_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function saveLocalCart(cart: CartItem[]) {
  localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart))
}

export async function getCart(): Promise<CartItem[]> {
  try {
    const response = await api.get('/cart')
    return response.data.data
  } catch {
    // Return local fallback cart
    return getLocalCart()
  }
}

export async function addToCart(menuItem: MenuItem, quantity: number = 1): Promise<CartItem[]> {
  try {
    const response = await api.post('/cart', { menu_item_id: menuItem.id, quantity })
    return response.data.data
  } catch {
    const cart = getLocalCart()
    const existing = cart.find((item) => item.menu_item_id === menuItem.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      const customerId = useAuthStore.getState().user?.id ?? 0
      cart.push({
        id: Date.now(),
        customer_id: customerId,
        menu_item_id: menuItem.id,
        quantity,
        menu_item: menuItem,
      })
    }
    saveLocalCart(cart)
    return cart
  }
}


export async function updateCartItem(id: number, quantity: number): Promise<CartItem[]> {
  try {
    const response = await api.put(`/cart/${id}`, { quantity })
    return response.data.data
  } catch {
    let cart = getLocalCart()
    if (quantity <= 0) {
      cart = cart.filter((item) => item.id !== id)
    } else {
      const item = cart.find((i) => i.id === id)
      if (item) item.quantity = quantity
    }
    saveLocalCart(cart)
    return cart
  }
}

export async function removeFromCart(id: number): Promise<CartItem[]> {
  try {
    const response = await api.delete(`/cart/${id}`)
    return response.data.data
  } catch {
    const cart = getLocalCart().filter((item) => item.id !== id)
    saveLocalCart(cart)
    return cart
  }
}

export async function clearCart(): Promise<void> {
  try {
    await api.delete('/cart')
  } catch {
    localStorage.removeItem(LOCAL_CART_KEY)
  }
}
