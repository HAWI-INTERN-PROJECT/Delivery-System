import { Check, CircleX } from 'lucide-react'
import type { RestaurantDisplayStatus } from '@/types/Restaurants'

export interface RestaurantActionButtonsProps {
  status: RestaurantDisplayStatus
  disabled?: boolean
  onApprove?: () => void
  onSuspend?: () => void
  onRestore?: () => void
}

export function RestaurantActionButtons({
  status,
  disabled = false,
  onApprove,
  onSuspend,
  onRestore,
}: RestaurantActionButtonsProps) {
  if (status === 'pending') {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={onApprove}
        className="inline-flex items-center gap-1.5 rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Check className="h-4 w-4" />
        Approve
      </button>
    )
  }

  if (status === 'suspended') {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={onRestore}
        className="rounded-lg bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-600 transition-colors hover:bg-orange-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Restore
      </button>
    )
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSuspend}
      className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <CircleX className="h-4 w-4" />
      Suspend
    </button>
  )
}
