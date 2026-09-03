import { Skeleton } from '@/components/ui/skeleton'
import { formatDisplayDate } from '@/lib/formatDisplayDate'
import type { AdminUser } from '@/types/users'
import { UserAvatar } from './UserAvatar'
import { UserRoleBadge } from './UserRoleBadge'
import { UserStatusBadge } from './UserStatusBadge'

export interface UsersTableProps {
  users: AdminUser[]
  isLoading?: boolean
  pendingId?: number | null
  onSuspend?: (user: AdminUser) => void
  onRestore?: (user: AdminUser) => void
}

function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={index} className="border-b border-gray-100">
          {Array.from({ length: 5 }).map((__, cellIndex) => (
            <td key={cellIndex} className="px-4 py-4">
              <Skeleton className="h-4 w-full max-w-[140px]" />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}

export function UsersTable({
  users,
  isLoading = false,
  pendingId = null,
  onSuspend,
  onRestore,
}: UsersTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs font-semibold uppercase tracking-wide text-gray-400">
              <th className="px-4 py-4">User</th>
              <th className="px-4 py-4">Role</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Joined</th>
              <th className="px-4 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <TableSkeleton />}

            {!isLoading && users.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                  No users found for the selected filters.
                </td>
              </tr>
            )}

            {!isLoading &&
              users.map((user) => {
                const isBusy = pendingId === user.id
                const isSuspended = user.status === 'suspended'

                return (
                  <tr key={user.id} className="border-b border-gray-100 last:border-b-0">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <UserAvatar name={user.name} />
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <UserRoleBadge role={user.role} />
                    </td>
                    <td className="px-4 py-4">
                      <UserStatusBadge status={user.status} />
                    </td>
                    <td className="px-4 py-4 text-gray-600">{formatDisplayDate(user.createdAt)}</td>
                    <td className="px-4 py-4">
                      {isSuspended ? (
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => onRestore?.(user)}
                          className="text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-700 disabled:opacity-50"
                        >
                          Restore
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => onSuspend?.(user)}
                          className="text-sm font-medium text-red-500 transition-colors hover:text-red-600 disabled:opacity-50"
                        >
                          Suspend
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
