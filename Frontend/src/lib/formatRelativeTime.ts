const MINUTE = 60
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

export function formatRelativeTime(dateInput: string | Date): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)

  if (seconds < MINUTE) return 'just now'
  if (seconds < HOUR) {
    const minutes = Math.floor(seconds / MINUTE)
    return `${minutes} min ago`
  }
  if (seconds < DAY) {
    const hours = Math.floor(seconds / HOUR)
    return hours === 1 ? '1 hr ago' : `${hours} hr ago`
  }

  const days = Math.floor(seconds / DAY)
  return days === 1 ? '1 day ago' : `${days} days ago`
}
