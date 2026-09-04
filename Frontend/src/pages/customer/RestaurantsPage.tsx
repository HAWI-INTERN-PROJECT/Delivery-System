import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useRestaurantsQuery } from '@/hooks/useRestaurants'
import RestaurantCard from '@/components/customer/RestaurantCard'

export default function RestaurantsPage() {
  const navigate = useNavigate()
  const { data: restaurants = [], isLoading } = useRestaurantsQuery()

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] pb-6">
      <header className="px-6 pt-6 pb-4 bg-white border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-800">All Restaurants</h1>
          </div>
        </div>
      </header>

      <div className="px-6 py-6 space-y-4 flex-1 overflow-y-auto">
        {isLoading ? (
          <p className="text-sm text-gray-400 py-4 text-center font-medium">Loading restaurants...</p>
        ) : restaurants.length > 0 ? (
          restaurants.map((res) => <RestaurantCard key={res.id} restaurant={res} />)
        ) : (
          <p className="text-sm text-gray-400 py-4 text-center font-medium">No restaurants found.</p>
        )}
      </div>
    </div>
  )
}
