import { Skeleton } from '@/components/ui/skeleton'
import type { RestaurantApplication } from '@/types/applications'
import { ApplicationCard } from './ApplicationCard'

export interface ApplicationListProps {
  applications: RestaurantApplication[]
  isLoading?: boolean
  pendingId?: number | null
  onApprove?: (application: RestaurantApplication) => void
  onReject?: (application: RestaurantApplication) => void
  onReset?: (application: RestaurantApplication) => void
}

export function ApplicationList({
  applications,
  isLoading = false,
  pendingId = null,
  onApprove,
  onReject,
  onReset,
}: ApplicationListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-24 rounded-2xl" />
        ))}
      </div>
    )
  }

  if (applications.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center text-sm text-gray-500">
        No restaurant applications to review.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
          isBusy={pendingId === application.id}
          onApprove={onApprove}
          onReject={onReject}
          onReset={onReset}
        />
      ))}
    </div>
  )
}
