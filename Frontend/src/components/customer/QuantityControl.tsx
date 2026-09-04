import { Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface QuantityControlProps {
  quantity: number
  onIncrement: () => void
  onDecrement: () => void
  className?: string
}

export default function QuantityControl({
  quantity,
  onIncrement,
  onDecrement,
  className = '',
}: QuantityControlProps) {
  return (
    <div className={`flex items-center bg-gray-50 border border-gray-100 rounded-full p-1 ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full text-gray-500 hover:bg-gray-200"
        onClick={onDecrement}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-8 text-center text-sm font-bold text-gray-800">{quantity}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full text-gray-500 hover:bg-gray-200"
        onClick={onIncrement}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}
