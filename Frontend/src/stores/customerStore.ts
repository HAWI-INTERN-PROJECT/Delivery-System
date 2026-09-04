import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CustomerState {
  selectedAddress: string
  contactPhone: string
  setAddress: (address: string) => void
  setPhone: (phone: string) => void
}

export const useCustomerStore = create<CustomerState>()(
  persist(
    (set) => ({
      selectedAddress: 'Home — Bole Sub-City, Woreda 03, House 487, Addis Ababa',
      contactPhone: '+251 91 234 5678',
      setAddress: (address) => set({ selectedAddress: address }),
      setPhone: (phone) => set({ contactPhone: phone }),
    }),
    {
      name: 'customer-storage',
    }
  )
)
