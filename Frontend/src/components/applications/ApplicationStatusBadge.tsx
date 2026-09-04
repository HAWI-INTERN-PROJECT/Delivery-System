import type { ApplicationStatus } from '@/types/applications'
import { cn } from '@/lib/utils'
import { APPLICATION_STATUS_STYLES } from './applicationConfig'

export interface ApplicationStatusBadgeProps {
  status: ApplicationStatus
  className?: string
}

export function ApplicationStatusBadge({ status, className }: ApplicationStatusBadgeProps) {
  if (status === 'approved') {
    return (
      <span
        className={cn(
          'inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700',
          className,
        )}
      >
        Approved
      </span>
    )
  }

  const meta = APPLICATION_STATUS_STYLES[status]

  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold',
        meta.className,
        className,
      )}
    >
      {meta.label}
    </span>
  )
}
