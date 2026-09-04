import { Plus, Minus } from 'lucide-react'
import type { MenuItem } from '@/types/Customer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface MenuItemCardProps {
  item: MenuItem
  quantityInCart?: number
  onAdd?: () => void
  onUpdateQuantity?: (newQty: number) => void
}

export default function MenuItemCard({
  item,
  quantityInCart = 0,
  onAdd,
  onUpdateQuantity,
}: MenuItemCardProps) {
  return (
    <Card className="overflow-hidden border-none bg-white rounded-2xl shadow-sm mb-4">
      <CardContent className="p-4 flex gap-4">
        {item.image && (
          <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex-1 flex flex-col min-w-0">
          <h4 className="font-bold text-gray-800 text-sm truncate">{item.name}</h4>
          <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
          <div className="flex items-center justify-between mt-3">
            <span className="font-extrabold text-orange-600 text-sm">ETB {item.price}</span>
            <div>
              {quantityInCart > 0 ? (
                <div className="flex items-center bg-orange-50 rounded-full p-1 border border-orange-100">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full text-orange-600 hover:bg-orange-100 shrink-0"
                    onClick={() => onUpdateQuantity?.(quantityInCart - 1)}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </Button>
                  <span className="w-8 text-center text-xs font-bold text-gray-800 shrink-0">
                    {quantityInCart}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full text-orange-600 hover:bg-orange-100 shrink-0"
                    onClick={() => onUpdateQuantity?.(quantityInCart + 1)}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  className="rounded-full bg-orange-500 text-white font-bold hover:bg-orange-600 text-xs px-4 h-8"
                  onClick={onAdd}
                >
                  Add
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
