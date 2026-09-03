import { cn } from '@/lib/utils'
import type { RestaurantFilterStatus } from '@/types/Restaurants'
import { RESTAURANT_FILTER_OPTIONS } from './restaurantStatusConfig'

export interface RestaurantFilterChipsProps {
  value: RestaurantFilterStatus
  onChange: (value: RestaurantFilterStatus) => void
}

export function RestaurantFilterChips({ value, onChange }: RestaurantFilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {RESTAURANT_FILTER_OPTIONS.map((option) => {
        const isActive = value === option.value

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
              isActive
                ? 'border-gray-300 bg-gray-200 text-gray-900'
                : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
