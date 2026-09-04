import { useEffect } from 'react'
import { useCartStore } from '@/stores/cart'

export function useCart() {
  const { items, isLoading, fetchCart, addItem, updateQuantity, removeItem, clearAll } = useCartStore()

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  const totalItemsCount = items.reduce((acc, curr) => acc + curr.quantity, 0)
  const cartSubtotal = items.reduce((acc, curr) => acc + curr.menu_item.price * curr.quantity, 0)
  // Assuming a constant delivery fee or grabbing it from the first restaurant item
  const deliveryFee = items.length > 0 ? 25 : 0
  const cartTotal = cartSubtotal + deliveryFee

  return {
    items,
    isLoading,
    totalItemsCount,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    addItem,
    updateQuantity,
    removeItem,
    clearAll,
  }
}
