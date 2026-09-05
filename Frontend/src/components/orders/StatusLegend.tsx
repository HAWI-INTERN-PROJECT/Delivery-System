import { STATUS_LEGEND_STATUSES, getOrderStatusMeta } from './orderStatusConfig'

export function StatusLegend() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
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
                {meta.label} — {meta.description}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}