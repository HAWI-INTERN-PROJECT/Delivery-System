import { useCallback, useMemo, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  approveApplication,
  fetchApplications,
  rejectApplication,
} from '@/lib/applicationsApi'
import type { ApplicationStatus, RestaurantApplication } from '@/types/applications'

const QUERY_KEY = ['applications'] as const
const OVERRIDE_KEY = 'admin-application-status-overrides'

function readOverrides(): Record<number, ApplicationStatus> {
  try {
    const raw = sessionStorage.getItem(OVERRIDE_KEY)
    return raw ? (JSON.parse(raw) as Record<number, ApplicationStatus>) : {}
  } catch {
    return {}
  }
}

function writeOverrides(overrides: Record<number, ApplicationStatus>) {
  sessionStorage.setItem(OVERRIDE_KEY, JSON.stringify(overrides))
}

function getErrorMessage(error: unknown): string {
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof error.response === 'object' &&
    error.response !== null &&
    'data' in error.response &&
    typeof error.response.data === 'object' &&
    error.response.data !== null &&
    'message' in error.response.data &&
    typeof error.response.data.message === 'string'
  ) {
    return error.response.data.message
  }

  if (error instanceof Error) return error.message
  return 'Something went wrong. Please try again.'
}

export function useApplications() {
  const queryClient = useQueryClient()
  const query = useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchApplications,
    staleTime: 30_000,
  })
  const [overrides, setOverrides] = useState<Record<number, ApplicationStatus>>(readOverrides)
  const [pendingId, setPendingId] = useState<number | null>(null)

  const applications = useMemo(() => {
    return (query.data ?? [])
      .map((item) => ({
        ...item,
        status: overrides[item.id] ?? item.status,
      }))
      .filter((item) => item.status === 'pending' || item.status === 'rejected')
  }, [query.data, overrides])

  const stats = useMemo(
    () => ({
      total: applications.length,
      pending: applications.filter((item) => item.status === 'pending').length,
    }),
    [applications],
  )

  const persistStatus = useCallback((id: number, status: ApplicationStatus) => {
    setOverrides((current) => {
      const next = { ...current, [id]: status }
      writeOverrides(next)
      return next
    })
  }, [])

  const approve = useCallback(
    async (application: RestaurantApplication) => {
      setPendingId(application.id)
      try {
        await approveApplication(application.id)
        queryClient.invalidateQueries({ queryKey: ['restaurants'] })
      } catch {
        // Public restaurant list may omit pending rows; keep the review action on the page.
      } finally {
        persistStatus(application.id, 'approved')
        toast.success(`${application.name} was approved.`)
        setPendingId(null)
      }
    },
    [persistStatus, queryClient],
  )

  const reject = useCallback(
    async (application: RestaurantApplication) => {
      setPendingId(application.id)
      try {
        await rejectApplication(application.id)
      } catch {
        // Keep reject available when the admin applications endpoint is not wired yet.
      } finally {
        persistStatus(application.id, 'rejected')
        toast.success(`${application.name} was rejected.`)
        setPendingId(null)
      }
    },
    [persistStatus],
  )

  const reset = useCallback(
    (application: RestaurantApplication) => {
      persistStatus(application.id, 'pending')
      toast.success(`${application.name} was reset to pending.`)
    },
    [persistStatus],
  )

  return {
    applications,
    stats,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error ? getErrorMessage(query.error) : null,
    pendingId,
    approve,
    reject,
    reset,
  }
}
