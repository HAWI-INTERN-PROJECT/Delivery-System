import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface OrderStatCardProps {
  icon: LucideIcon
  value: number | string
  label: string
  iconClassName?: string
  iconBgClassName?: string
}

export function OrderStatCard({
  icon: Icon,
  value,
  label,
  iconClassName = 'text-orange-500',
  iconBgClassName = 'bg-orange-50',
}: OrderStatCardProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full">
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full',
            iconBgClassName,
          )}
        >
          <Icon className={cn('h-5 w-5', iconClassName)} />
        </div>
      </div>
      <p className="text-2xl font-bold tracking-tight text-gray-900">{value}</p>
      <p className="mt-1 text-sm text-gray-500">{label}</p>
    </div>
  )
}
