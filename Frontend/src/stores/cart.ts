import { create } from 'zustand'
import type { CartItem, MenuItem } from '@/types/Customer'
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from '@/lib/customer/cartService'

interface CartState {
  items: CartItem[]
  isLoading: boolean
  error: string | null
  fetchCart: () => Promise<void>
  addItem: (item: MenuItem, quantity?: number) => Promise<void>
  updateQuantity: (id: number, quantity: number) => Promise<void>
  removeItem: (id: number) => Promise<void>
  clearAll: () => Promise<void>
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isLoading: false,
  error: null,

  fetchCart: async () => {
    set({ isLoading: true })
    try {
      const items = await getCart()
      set({ items, isLoading: false })
    } catch (e: any) {
      set({ error: e.message || 'Failed to load cart', isLoading: false })
    }
  },

  addItem: async (item: MenuItem, quantity = 1) => {
    try {
      const items = await addToCart(item, quantity)
      set({ items })
    } catch (e: any) {
      set({ error: e.message || 'Failed to add item' })
    }
  },

  updateQuantity: async (id: number, quantity: number) => {
    try {
      const items = await updateCartItem(id, quantity)
      set({ items })
    } catch (e: any) {
      set({ error: e.message || 'Failed to update quantity' })
    }
  },

  removeItem: async (id: number) => {
    try {
      const items = await removeFromCart(id)
      set({ items })
    } catch (e: any) {
      set({ error: e.message || 'Failed to remove item' })
    }
  },

  clearAll: async () => {
    try {
      await clearCart()
      set({ items: [] })
    } catch (e: any) {
      set({ error: e.message || 'Failed to clear cart' })
    }
  },
}))
