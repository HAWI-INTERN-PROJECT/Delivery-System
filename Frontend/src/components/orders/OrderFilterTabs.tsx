import { cn } from '@/lib/utils'
import type { OrderFilterStatus } from '@/types/Orders'
import { ORDER_FILTER_OPTIONS } from './orderStatusConfig'

export interface OrderFilterTabsProps {
  value: OrderFilterStatus
  onChange: (value: OrderFilterStatus) => void
}

export function OrderFilterTabs({ value, onChange }: OrderFilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {ORDER_FILTER_OPTIONS.map((option) => {
        const isActive = value === option.value

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-slate-900 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
