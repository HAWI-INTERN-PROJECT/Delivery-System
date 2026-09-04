import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Clock, Trash2 } from 'lucide-react'
import { useRestaurantsQuery } from '@/hooks/useRestaurants'
import { mockMenuItems } from '@/lib/customer/mock/categories'
import RestaurantCard from '@/components/customer/RestaurantCard'

const RECENT_SEARCHES_KEY = 'tenadam_recent_searches'

export default function SearchPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const { data: restaurants = [] } = useRestaurantsQuery()

  // Grab recent search records from LocalStorage
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const data = localStorage.getItem(RECENT_SEARCHES_KEY)
      return data ? JSON.parse(data) : ['Kitfo', 'Pizza', 'Sushi Tokyo']
    } catch {
      return []
    }
  })

  // Add search term to history
  const addRecentSearch = (term: string) => {
    if (!term.trim()) return
    const filtered = recentSearches.filter((s) => s.toLowerCase() !== term.toLowerCase())
    const updated = [term.trim(), ...filtered].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated))
  }

  // Clear history
  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem(RECENT_SEARCHES_KEY)
  }

  // Filter restaurants/dishes matching search
  const filteredRestaurants = query
    ? restaurants.filter(
        (r) =>
          r.name.toLowerCase().includes(query.toLowerCase()) ||
          r.cuisine.toLowerCase().includes(query.toLowerCase())
      )
    : []

  const filteredDishes = query
    ? mockMenuItems.filter((dish) => dish.name.toLowerCase().includes(query.toLowerCase()))
    : []

  const popularNowDishes = mockMenuItems.slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] pb-6">
      {/* Top Header */}
      <header className="px-6 pt-6 pb-4 bg-white border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search dishes, restaurants..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') addRecentSearch(query)
              }}
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium"
            />
          </div>
        </div>
      </header>

      <div className="px-6 py-6 space-y-6 flex-1 overflow-y-auto">
        {/* Results view if queries present */}
        {query ? (
          <div className="space-y-6">
            {filteredRestaurants.length > 0 && (
              <div>
                <h3 className="font-extrabold text-gray-800 text-sm mb-3.5">RESTAURANTS</h3>
                {filteredRestaurants.map((res) => (
                  <RestaurantCard key={res.id} restaurant={res} />
                ))}
              </div>
            )}

            {filteredDishes.length > 0 && (
              <div>
                <h3 className="font-extrabold text-gray-800 text-sm mb-3.5">DISHES</h3>
                <div className="grid grid-cols-2 gap-4">
                  {filteredDishes.map((dish) => (
                    <Link
                      key={dish.id}
                      to={`/restaurants/${dish.restaurant_id}`}
                      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-50 flex flex-col"
                    >
                      {dish.image && (
                        <div className="h-24 w-full overflow-hidden">
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-3.5 flex flex-col justify-between flex-1">
                        <h4 className="font-bold text-gray-800 text-xs truncate">{dish.name}</h4>
                        <span className="text-orange-600 font-black text-xs mt-1">
                          ETB {dish.price}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {filteredRestaurants.length === 0 && filteredDishes.length === 0 && (
              <p className="text-sm text-gray-400 py-8 text-center font-medium">
                No matches found for "{query}"
              </p>
            )}
          </div>
        ) : (
          <>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-extrabold text-gray-400 text-xs uppercase tracking-wider">
                    Recent Searches
                  </h3>
                  <button
                    onClick={clearRecentSearches}
                    className="p-1 hover:text-red-500 text-gray-400 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-2.5">
                  {recentSearches.map((term, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setQuery(term)
                        addRecentSearch(term)
                      }}
                      className="flex items-center gap-3 w-full py-2 border-b border-gray-50 text-gray-700 text-sm hover:bg-gray-50 px-2 rounded-lg font-medium"
                    >
                      <Clock className="h-4 w-4 text-gray-300" />
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Now */}
            <div>
              <h3 className="font-extrabold text-gray-400 text-xs uppercase tracking-wider mb-4">
                Popular Now
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {popularNowDishes.map((dish) => (
                  <Link
                    key={dish.id}
                    to={`/restaurants/${dish.restaurant_id}`}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-50 flex flex-col"
                  >
                    {dish.image && (
                      <div className="h-28 w-full overflow-hidden">
                        <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-3.5 flex flex-col justify-between flex-1">
                      <h4 className="font-bold text-gray-800 text-xs truncate">{dish.name}</h4>
                      <span className="text-orange-600 font-black text-xs mt-1">
                        ETB {dish.price}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
