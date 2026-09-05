import type { ApplicationStatus } from '@/types/Applications'

export const APPLICATION_STATUS_STYLES: Record<
  Exclude<ApplicationStatus, 'approved'>,
  { label: string; className: string }
> = {
  pending: {
    label: 'Pending',
    className: 'bg-amber-100 text-amber-800',
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-red-100 text-red-700',
  },
}

export function getApplicationInitial(name: string): string {
  const trimmed = name.trim()
  return trimmed ? trimmed.charAt(0).toUpperCase() : '?'
}
