import { STATUS_LEGEND_STATUSES, getOrderStatusMeta } from './orderStatusConfig'

export function StatusLegend() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
        Status Legend
      </p>
      <div className="flex flex-wrap gap-3">
        {STATUS_LEGEND_STATUSES.map((status) => {
          const meta = getOrderStatusMeta(status)
          const Icon = meta.icon

          return (
            <div
              key={status}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${meta.legendClassName}`}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span>
                {meta.label} —{' '}
                {status === 'pending' && 'Waiting for restaurant'}
                {status === 'preparing' && 'Restaurant preparing order'}
                {status === 'ready_for_pickup' && 'Waiting for driver'}
                {status === 'in_transit' && 'Driver delivering'}
                {status === 'delivered' && 'Order completed'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
