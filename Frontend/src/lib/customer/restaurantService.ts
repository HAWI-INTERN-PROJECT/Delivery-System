import type { Restaurant, Category, MenuItem } from '../../types/Customer'
import { mockRestaurants } from './mock/restaurants'
import { mockCategories, mockMenuItems } from './mock/categories'

export async function getRestaurants(): Promise<Restaurant[]> {
  // Simulating network latency
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockRestaurants
}

export async function getRestaurant(id: number): Promise<Restaurant | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 150))
  return mockRestaurants.find((r) => r.id === id)
}

export async function getRestaurantMenu(id: number): Promise<MenuItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return mockMenuItems.filter((item) => item.restaurant_id === id)
}

export async function getCategories(): Promise<Category[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockCategories
}
