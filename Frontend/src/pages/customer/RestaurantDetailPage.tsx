import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, MapPin, Star } from 'lucide-react'
import { useRestaurantDetailQuery } from '@/hooks/useRestaurants'
import { useRestaurantMenuQuery } from '@/hooks/useRestaurantMenu'
import { useCartStore } from '@/stores/cart'
import MenuItemCard from '@/components/customer/MenuItemCard'
import CategoryChip from '@/components/customer/CategoryChip'

export default function RestaurantDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const parsedId = Number(id)
  const restaurantId = !Number.isNaN(parsedId) && parsedId > 0 ? parsedId : null

  const { data: restaurant, isLoading: loadingDetail } = useRestaurantDetailQuery(restaurantId ?? 0)
  const { data: menuItems = [], isLoading: loadingMenu } = useRestaurantMenuQuery(restaurantId ?? 0)

  const { items, addItem, updateQuantity } = useCartStore()
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)


  // Grab unique category IDs of present items
  const menuCategories = Array.from(new Set(menuItems.map((item) => item.category_id)))
  // Hardcoded category mapping for naming inside mockup
  const categoryNamesMap: Record<number, string> = {
    1: 'Main Dishes',
    2: 'Pizza',
    3: 'Sushi',
    5: 'Drinks',
  }

  // Filter items
  const displayedItems = selectedCategory
    ? menuItems.filter((item) => item.category_id === selectedCategory)
    : menuItems

  if (restaurantId === null) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-white px-6">
        <span className="text-sm text-gray-500 font-bold">Invalid restaurant ID</span>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-xl font-bold"
        >
          Go Back
        </button>
      </div>
    )
  }

  if (loadingDetail || loadingMenu) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-white">
        <span className="text-sm text-gray-500 font-medium">Loading restaurant details...</span>
      </div>
    )
  }

  if (!restaurant) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-white px-6">
        <span className="text-sm text-gray-500 font-bold">Restaurant not found</span>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-xl font-bold"
        >
          Go Back
        </button>
      </div>
    )
  }

  // Calculate cart counts/totals for items in this restaurant
  const itemsInThisRestaurant = items.filter((i) => i.menu_item.restaurant_id === restaurantId)
  const totalCount = itemsInThisRestaurant.reduce((acc, curr) => acc + curr.quantity, 0)
  const subtotal = itemsInThisRestaurant.reduce((acc, curr) => acc + curr.menu_item.price * curr.quantity, 0)

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] pb-24 relative">
      {/* Top Banner Cover Image */}
      <div className="h-52 w-full relative shrink-0">
        <img
          src={restaurant.cover_image || restaurant.logo}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 p-2.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-10 shadow-sm"
        >
          <ArrowLeft className="h-5 w-5 text-gray-800" />
        </button>
      </div>

      {/* Restaurant Header Information Card */}
      <div className="px-6 -mt-10 shrink-0 z-10 relative">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50">
          <div className="flex justify-between items-start gap-4">
            <div>
              <span className="bg-green-50 text-green-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Open now
              </span>
              <h1 className="text-xl font-black text-gray-900 mt-2.5">{restaurant.name}</h1>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 text-amber-700 font-bold text-xs px-2.5 py-1 rounded-full">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span>{restaurant.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 text-xs text-gray-500 font-semibold border-b border-gray-100 pb-4">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>{restaurant.delivery_time}</span>
            <span className="text-gray-300">•</span>
            <span>ETB {restaurant.delivery_fee} delivery</span>
          </div>

          <div className="flex items-start gap-2.5 mt-4 text-xs text-gray-400">
            <MapPin className="h-4 w-4 shrink-0 text-gray-300 mt-0.5" />
            <span className="leading-normal">{restaurant.address}</span>
          </div>
        </div>
      </div>

      {/* Categories chips filter */}
      <div className="mt-6 px-6 shrink-0">
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
          <CategoryChip
            name="Popular"
            active={selectedCategory === null}
            onClick={() => setSelectedCategory(null)}
          />
          {menuCategories.map((catId) => (
            <CategoryChip
              key={catId}
              name={categoryNamesMap[catId] || `Category ${catId}`}
              active={selectedCategory === catId}
              onClick={() => setSelectedCategory(catId)}
            />
          ))}
        </div>
      </div>

      {/* Menu list area */}
      <div className="mt-6 px-6 space-y-4 flex-1 overflow-y-auto">
        {displayedItems.length > 0 ? (
          displayedItems.map((item) => {
            const cartItem = items.find((ci) => ci.menu_item_id === item.id)
            return (
              <MenuItemCard
                key={item.id}
                item={item}
                quantityInCart={cartItem?.quantity}
                onAdd={() => addItem(item, 1)}
                onUpdateQuantity={(q) => {
                  if (cartItem) {
                    updateQuantity(cartItem.id, q)
                  }
                }}
              />
            )
          })
        ) : (
          <p className="text-sm text-gray-400 py-8 text-center font-medium">No items available.</p>
        )}
      </div>

      {/* Bottom Sticky View Cart Action Bar */}
      {totalCount > 0 && (
        <div className="fixed bottom-6 left-6 right-6 z-40 bg-orange-500 rounded-2xl shadow-xl p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <span className="bg-orange-600 rounded-full h-7 min-w-7 px-1 flex items-center justify-center text-xs font-black">
              {totalCount}
            </span>
            <span className="text-sm font-bold">View Cart ({totalCount})</span>
          </div>
          <button
            onClick={() => navigate('/cart')}
            className="text-sm font-black flex items-center gap-1 hover:underline"
          >
            <span>ETB {subtotal}</span>
          </button>
        </div>
      )}
    </div>
  )
}
