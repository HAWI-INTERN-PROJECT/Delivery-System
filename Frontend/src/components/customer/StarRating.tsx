import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  maxStars?: number
  className?: string
}

export default function StarRating({ rating, maxStars = 5, className = '' }: StarRatingProps) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {Array.from({ length: maxStars }).map((_, index) => {
        const starIndex = index + 1
        const filled = rating >= starIndex
        return (
          <Star
            key={index}
            className={`h-4 w-4 ${filled ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
          />
        )
      })}
    </div>
  )
}
