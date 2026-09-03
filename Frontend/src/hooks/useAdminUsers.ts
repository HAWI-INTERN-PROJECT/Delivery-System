import { useCallback, useMemo, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createDriver,
  createRestaurantManager,
  fetchUsers,
} from '@/lib/usersApi'
import type {
  AdminUser,
  RegisterDriverInput,
  RegisterManagerInput,
  UserStatus,
} from '@/types/users'

const QUERY_KEY = ['users'] as const
const LOCAL_USERS_KEY = 'admin-local-users'
const STATUS_OVERRIDES_KEY = 'admin-user-status-overrides'

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = sessionStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeJson(key: string, value: unknown) {
  sessionStorage.setItem(key, JSON.stringify(value))
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

  if (error instanceof Error) {
    return error.message
  }

  return 'Something went wrong. Please try again.'
}

function mergeUsers(apiUsers: AdminUser[], localUsers: AdminUser[]): AdminUser[] {
  const byId = new Map<number, AdminUser>()
  const byEmail = new Map<string, AdminUser>()

  for (const user of [...apiUsers, ...localUsers]) {
    const emailKey = user.email.toLowerCase()
    if (!byId.has(user.id) && !byEmail.has(emailKey)) {
      byId.set(user.id, user)
      byEmail.set(emailKey, user)
    }
  }

  return Array.from(byId.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}

export function useAdminUsers() {
  const queryClient = useQueryClient()
  const query = useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchUsers,
    staleTime: 30_000,
  })
  const [localUsers, setLocalUsers] = useState<AdminUser[]>(() => readJson(LOCAL_USERS_KEY, []))
  const [statusOverrides, setStatusOverrides] = useState<Record<number, UserStatus>>(() =>
    readJson(STATUS_OVERRIDES_KEY, {}),
  )
  const [pendingId, setPendingId] = useState<number | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const users = useMemo(() => {
    return mergeUsers(query.data ?? [], localUsers).map((user) => ({
      ...user,
      status: statusOverrides[user.id] ?? user.status,
    }))
  }, [query.data, localUsers, statusOverrides])

  const persistLocalUser = useCallback((user: AdminUser) => {
    setLocalUsers((current) => {
      const next = mergeUsers([], [...current, user])
      writeJson(LOCAL_USERS_KEY, next)
      return next
    })
  }, [])

  const persistStatus = useCallback((id: number, status: UserStatus) => {
    setStatusOverrides((current) => {
      const next = { ...current, [id]: status }
      writeJson(STATUS_OVERRIDES_KEY, next)
      return next
    })
  }, [])

  const emailExists = useCallback(
    (email: string) => users.some((user) => user.email.toLowerCase() === email.toLowerCase()),
    [users],
  )

  const registerDriver = useCallback(
    async (input: RegisterDriverInput) => {
      if (emailExists(input.email)) {
        toast.error('A user with this email already exists.')
        throw new Error('duplicate-email')
      }

      setIsCreating(true)
      try {
        const created = await createDriver(input)
        const user: AdminUser = created ?? {
          id: Date.now(),
          name: input.name,
          email: input.email,
          phone: input.phone,
          role: 'driver',
          status: 'active',
          createdAt: new Date().toISOString(),
          vehicleType: input.vehicleType,
          vehicleModel: input.vehicleModel,
          plateNumber: input.plateNumber,
        }

        if (created) {
          queryClient.setQueryData<AdminUser[]>(QUERY_KEY, (current) => mergeUsers(current ?? [], [user]))
        } else {
          persistLocalUser(user)
        }

        toast.success(`${user.name} was registered as a driver.`)
      } catch (error) {
        if (error instanceof Error && error.message === 'duplicate-email') {
          throw error
        }
        toast.error(getErrorMessage(error))
        throw error
      } finally {
        setIsCreating(false)
      }
    },
    [emailExists, persistLocalUser, queryClient],
  )

  const registerManager = useCallback(
    async (input: RegisterManagerInput) => {
      if (emailExists(input.email)) {
        toast.error('A user with this email already exists.')
        throw new Error('duplicate-email')
      }

      setIsCreating(true)
      try {
        const created = await createRestaurantManager(input)
        const user: AdminUser = created ?? {
          id: Date.now(),
          name: input.name,
          email: input.email,
          phone: input.phone,
          role: 'restaurant_manager',
          status: 'active',
          createdAt: new Date().toISOString(),
        }

        if (created) {
          queryClient.setQueryData<AdminUser[]>(QUERY_KEY, (current) => mergeUsers(current ?? [], [user]))
        } else {
          persistLocalUser(user)
        }

        toast.success(`${user.name} was registered as a restaurant manager.`)
      } catch (error) {
        if (error instanceof Error && error.message === 'duplicate-email') {
          throw error
        }
        toast.error(getErrorMessage(error))
        throw error
      } finally {
        setIsCreating(false)
      }
    },
    [emailExists, persistLocalUser, queryClient],
  )

  const suspend = useCallback(
    (user: AdminUser) => {
      setPendingId(user.id)
      persistStatus(user.id, 'suspended')
      toast.success(`${user.name} was suspended.`)
      setPendingId(null)
    },
    [persistStatus],
  )

  const restore = useCallback(
    (user: AdminUser) => {
      setPendingId(user.id)
      persistStatus(user.id, 'active')
      toast.success(`${user.name} was restored.`)
      setPendingId(null)
    },
    [persistStatus],
  )

  return {
    users,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error ? getErrorMessage(query.error) : null,
    pendingId,
    isCreating,
    registerDriver,
    registerManager,
    suspend,
    restore,
  }
}
