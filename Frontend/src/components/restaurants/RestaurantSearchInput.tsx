import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export interface RestaurantSearchInputProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function RestaurantSearchInput({
  value,
  onChange,
  className,
}: RestaurantSearchInputProps) {
  return (
    <div className={cn('relative w-full max-w-xl', className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search restaurants..."
        className="rounded-full border-gray-200 bg-white pl-9"
      />
    </div>
  )
}
