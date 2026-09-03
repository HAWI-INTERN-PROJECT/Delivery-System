const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function formatDisplayDate(dateInput: string | Date): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput

  if (Number.isNaN(date.getTime())) {
    return '—'
  }

  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}
