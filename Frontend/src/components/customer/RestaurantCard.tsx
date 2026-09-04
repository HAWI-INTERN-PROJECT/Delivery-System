import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import type { Restaurant } from '@/types/Customer'
import { Card, CardContent } from '@/components/ui/card'

interface RestaurantCardProps {
  restaurant: Restaurant
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link to={`/restaurants/${restaurant.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200 border-none bg-white rounded-2xl shadow-sm mb-4">
        <CardContent className="p-0 flex">
          <div className="relative w-28 h-28 shrink-0">
            <img
              src={restaurant.logo}
              alt={restaurant.name}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-4 flex flex-col justify-center flex-1 min-w-0">
            <h3 className="font-bold text-gray-800 truncate text-base">{restaurant.name}</h3>
            <p className="text-xs text-gray-400 mt-0.5 truncate">{restaurant.cuisine}</p>
            <div className="flex items-center text-xs text-gray-500 mt-2 gap-1.5 flex-wrap">
              <div className="flex items-center text-amber-500 font-bold gap-0.5">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span>{restaurant.rating}</span>
              </div>
              <span className="text-gray-300">•</span>
              <span>{restaurant.delivery_time}</span>
              <span className="text-gray-300">•</span>
              <span className="font-semibold text-gray-700">ETB {restaurant.delivery_fee}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
