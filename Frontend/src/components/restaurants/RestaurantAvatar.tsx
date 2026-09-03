import { cn } from '@/lib/utils'
import { getRestaurantInitial } from './restaurantStatusConfig'

export interface RestaurantAvatarProps {
  name: string
  logo?: string | null
  className?: string
}

export function RestaurantAvatar({ name, logo, className }: RestaurantAvatarProps) {
  const initial = getRestaurantInitial(name)

  if (logo) {
    return (
      <img
        src={logo}
        alt=""
        className={cn(
          'h-9 w-9 shrink-0 rounded-full object-cover',
          className,
        )}
      />
    )
  }

  return (
    <div
      className={cn(
        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-600',
        className,
      )}
      aria-hidden="true"
    >
      {initial}
    </div>
  )
}
