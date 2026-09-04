import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Search } from 'lucide-react'
import { useAuthStore } from '@/stores/auth'
import { useRestaurantsQuery, useCategoriesQuery } from '@/hooks/useRestaurants'
import { useCart } from '@/hooks/useCart'
import CategoryChip from '@/components/customer/CategoryChip'
import RestaurantCard from '@/components/customer/RestaurantCard'

// Category icons map
const categoryIcons: Record<string, string> = {
  'Ethiopian Food': '🍲',
  Pizza: '🍕',
  Sushi: '🍣',
  Burgers: '🍔',
  Drinks: '🥤',
}

export default function HomePage() {
  const { user } = useAuthStore()
  const { data: restaurants = [] } = useRestaurantsQuery()
  const { data: categories = [] } = useCategoriesQuery()
  const { items } = useCart()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filter restaurants by category name matches
  const filteredRestaurants = selectedCategory
    ? restaurants.filter((r) => r.cuisine.toLowerCase().includes(selectedCategory.toLowerCase()))
    : restaurants

  // Greeting based on time
  const getGreeting = () => {
    const hours = new Date().getHours()
    if (hours < 12) return 'Good morning,'
    if (hours < 18) return 'Good afternoon,'
    return 'Good evening,'
  }

  // Get active menu items across the mock restaurants for "Popular Items" section
  const popularItems = [
    { id: 1, name: 'Kitfo Special', price: 280, restaurantId: 1, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c' },
    { id: 2, name: 'Doro Wat', price: 220, restaurantId: 1, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] pb-6">
      {/* Top Header Section */}
      <header className="px-6 pt-6 pb-4 bg-white rounded-b-3xl shadow-sm border-b border-gray-50 shrink-0">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
              Delivering to
            </span>
            <h4 className="text-sm font-bold text-gray-800">Bole Sub-City, Addis Ababa</h4>
          </div>
          <Link to="/notifications" className="relative p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
            <Bell className="h-5 w-5 text-gray-700" />
            <span className="absolute top-1 right-1.5 bg-orange-600 rounded-full h-2 w-2"></span>
          </Link>
        </div>

        <div className="mt-4 flex items-center gap-1">
          <div>
            <h2 className="text-sm text-gray-500 font-medium">{getGreeting()}</h2>
            <h1 className="text-2xl font-black text-gray-900 mt-0.5 flex items-center gap-1.5">
              <span>{user?.name || 'Guest'}</span>
              <span className="animate-bounce">👋</span>
            </h1>
          </div>
        </div>

        {/* Search Header Bar */}
        <Link
          to="/search"
          className="mt-5 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors duration-200"
        >
          <Search className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-400 font-medium">Search restaurants or dishes...</span>
        </Link>
      </header>

      {/* Main Content Area */}
      <div className="px-6 py-6 space-y-6 flex-1 overflow-y-auto">
        {/* Promotional Banner */}
        <div className="w-full relative h-36 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl overflow-hidden p-6 shadow-sm flex flex-col justify-center">
          <div className="absolute right-4 bottom-0 opacity-20 text-[100px] pointer-events-none select-none">
            🍔
          </div>
          <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-md w-max">
            Today only
          </span>
          <h3 className="text-lg font-black text-white mt-1 leading-snug">
            Free delivery on <br /> orders over ETB 300
          </h3>
        </div>

        {/* Categories Section */}
        <div>
          <h3 className="font-extrabold text-gray-800 text-lg mb-3.5">Categories</h3>
          <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
            <CategoryChip
              name="All"
              active={selectedCategory === null}
              onClick={() => setSelectedCategory(null)}
              icon="🍽️"
            />
            {categories.map((cat) => (
              <CategoryChip
                key={cat.id}
                name={cat.name}
                active={selectedCategory === cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                icon={categoryIcons[cat.name] || '🍛'}
              />
            ))}
          </div>
        </div>

        {/* Nearby Restaurants Section */}
        <div>
          <div className="flex justify-between items-center mb-3.5">
            <h3 className="font-extrabold text-gray-800 text-lg">Nearby Restaurants</h3>
            <Link to="/restaurants" className="text-xs text-orange-600 font-bold cursor-pointer hover:underline">
              See all
            </Link>
          </div>
          <div>
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((res) => (
                <RestaurantCard key={res.id} restaurant={res} />
              ))
            ) : (
              <p className="text-sm text-gray-400 py-4 text-center font-medium">
                No restaurants found in this category.
              </p>
            )}
          </div>
        </div>

        {/* Popular Items Section */}
        <div>
          <h3 className="font-extrabold text-gray-800 text-lg mb-3.5">Popular Items</h3>
          <div className="flex gap-4 overflow-x-auto no-scrollbar py-1">
            {popularItems.map((item) => (
              <Link
                key={item.id}
                to={`/restaurants/${item.restaurantId}`}
                className="w-44 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow shrink-0 border border-gray-50 flex flex-col"
              >
                <div className="h-28 w-full overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-3.5 flex flex-col justify-between flex-1">
                  <h4 className="font-bold text-gray-800 text-sm truncate">{item.name}</h4>
                  <span className="text-orange-600 font-black text-sm mt-1">ETB {item.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky View Cart Popover */}
      {items.length > 0 && (
        <div className="fixed bottom-20 left-6 right-6 z-40 bg-orange-600 rounded-2xl shadow-lg p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <span className="bg-orange-700 rounded-full h-6 min-w-6 px-1 flex items-center justify-center text-xs font-bold">
              {items.reduce((a, c) => a + c.quantity, 0)}
            </span>
            <span className="text-sm font-bold">Items in Cart</span>
          </div>
          <Link to="/cart" className="text-sm font-black flex items-center gap-1 hover:underline">
            <span>View Cart</span>
          </Link>
        </div>
      )}
    </div>
  )
}
