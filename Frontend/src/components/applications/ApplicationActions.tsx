import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react'
import type { ApplicationStatus } from '@/types/applications'

export interface ApplicationActionsProps {
  status: ApplicationStatus
  disabled?: boolean
  onApprove?: () => void
  onReject?: () => void
  onReset?: () => void
}

export function ApplicationActions({
  status,
  disabled = false,
  onApprove,
  onReject,
  onReset,
}: ApplicationActionsProps) {
  if (status === 'rejected') {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={onReset}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 disabled:opacity-50"
      >
        <RotateCcw className="h-4 w-4" />
        Reset
      </button>
    )
  }

  if (status !== 'pending') return null

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={disabled}
        onClick={onApprove}
        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-emerald-600 transition-colors hover:bg-emerald-50 disabled:opacity-50"
      >
        <CheckCircle2 className="h-4 w-4" />
        Approve
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={onReject}
        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50"
      >
        <XCircle className="h-4 w-4" />
        Reject
      </button>
    </div>
  )
}
