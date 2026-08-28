import { useEffect, useMemo, useState } from 'react'
import {
  ClipboardList,
  UtensilsCrossed,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import { toast } from 'sonner'
import { useOrders } from '@/hooks/useOrders'
import type { Order, OrderFilterStatus, OrderStats } from '@/types/orders'
import {
  OrderStatCard,
  StatusLegend,
  OrderFilterTabs,
  OrderSearchInput,
  OrdersTable,
} from '@/components/orders'

const EMPTY_STATS: OrderStats = {
  totalToday: 0,
  pending: 0,
  preparing: 0,
  delivered: 0,
  rejected: 0,
}

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState<OrderFilterStatus>('all')
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(searchInput.trim())
    }, 300)

    return () => window.clearTimeout(timer)
  }, [searchInput])

  const queryParams = useMemo(
    () => ({
      status: statusFilter,
      search: debouncedSearch,
    }),
    [statusFilter, debouncedSearch],
  )

  const { data, isLoading, isError, error } = useOrders(queryParams)

  const stats = data?.stats ?? EMPTY_STATS
  const orders = data?.orders ?? []

  const handleViewDetails = (order: Order) => {
    toast.info(`Order ${order.orderNumber}`, {
      description: `${order.customer.name} • ${order.restaurant.name}`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <OrderStatCard
          icon={ClipboardList}
          value={stats.totalToday}
          label="Total Today"
          iconClassName="text-orange-600"
          iconBgClassName="bg-orange-50"
        />
        <OrderStatCard
          icon={ClipboardList}
          value={stats.pending}
          label="Pending"
          iconClassName="text-orange-500"
          iconBgClassName="bg-orange-50"
        />
        <OrderStatCard
          icon={UtensilsCrossed}
          value={stats.preparing}
          label="Preparing"
          iconClassName="text-amber-500"
          iconBgClassName="bg-amber-50"
        />
        <OrderStatCard
          icon={CheckCircle}
          value={stats.delivered}
          label="Delivered"
          iconClassName="text-emerald-600"
          iconBgClassName="bg-emerald-50"
        />
        <OrderStatCard
          icon={XCircle}
          value={stats.rejected}
          label="Rejected"
          iconClassName="text-red-500"
          iconBgClassName="bg-red-50"
        />
      </div>

      <StatusLegend />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <OrderFilterTabs value={statusFilter} onChange={setStatusFilter} />
        <OrderSearchInput value={searchInput} onChange={setSearchInput} />
      </div>

      {isError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error instanceof Error ? error.message : 'Failed to load orders. Please try again.'}
        </div>
      )}

      <OrdersTable
        orders={orders}
        isLoading={isLoading}
        onViewDetails={handleViewDetails}
      />
    </div>
  )
}