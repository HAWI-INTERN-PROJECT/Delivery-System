import { formatDisplayDate } from '@/lib/formatDisplayDate'
import type { RestaurantApplication } from '@/types/Applications'
import { ApplicationActions } from './ApplicationActions'
import { ApplicationStatusBadge } from './ApplicationStatusBadge'
import { getApplicationInitial } from './applicationConfig'

export interface ApplicationCardProps {
  application: RestaurantApplication
  isBusy?: boolean
  onApprove?: (application: RestaurantApplication) => void
  onReject?: (application: RestaurantApplication) => void
  onReset?: (application: RestaurantApplication) => void
}

export function ApplicationCard({
  application,
  isBusy = false,
  onApprove,
  onReject,
  onReset,
}: ApplicationCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
          {getApplicationInitial(application.name)}
        </div>
        <div className="min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-gray-900">{application.name}</h3>
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
              {application.category}
            </span>
            <ApplicationStatusBadge status={application.status} />
          </div>
          <p className="text-sm text-gray-500">
            Manager: {application.managerName} · {application.phone}
          </p>
          <p className="text-sm text-gray-500">
            {application.address} · Applied {formatDisplayDate(application.appliedDate)}
          </p>
        </div>
      </div>

      <div className="shrink-0 sm:pl-4">
        <ApplicationActions
          status={application.status}
          disabled={isBusy}
          onApprove={() => onApprove?.(application)}
          onReject={() => onReject?.(application)}
          onReset={() => onReset?.(application)}
        />
      </div>
    </article>
  )
}
