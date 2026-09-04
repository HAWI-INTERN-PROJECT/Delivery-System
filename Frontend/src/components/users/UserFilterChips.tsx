import { cn } from '@/lib/utils'
import type { UserRoleFilter } from '@/types/Users'
import { USER_FILTER_OPTIONS } from './userConfig'

export interface UserFilterChipsProps {
  value: UserRoleFilter
  onChange: (value: UserRoleFilter) => void
}

export function UserFilterChips({ value, onChange }: UserFilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {USER_FILTER_OPTIONS.map((option) => {
        const isActive = value === option.value

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'border-slate-900 bg-slate-900 text-white'
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
