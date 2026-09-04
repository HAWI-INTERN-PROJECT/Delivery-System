import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingBag, MapPin, Phone, Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { useRestaurantsQuery } from '@/hooks/useRestaurants'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCustomerStore } from '@/stores/customerStore'

export default function CartPage() {
  const navigate = useNavigate()
  const {
    items,
    isLoading,
    totalItemsCount,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    updateQuantity,
    removeItem,
  } = useCart()

  const { selectedAddress, contactPhone, setPhone } = useCustomerStore()
  const { data: restaurants = [] } = useRestaurantsQuery()

  const [isEditingPhone, setIsEditingPhone] = useState(false)
  const [tempPhone, setTempPhone] = useState(contactPhone)

  const handleSavePhone = () => {
    if (tempPhone && tempPhone.trim()) {
      setPhone(tempPhone.trim())
      setIsEditingPhone(false)
    }
  }

  const handleCancelPhone = () => {
    setTempPhone(contactPhone)
    setIsEditingPhone(false)
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-white">
        <span className="text-sm text-gray-500 font-medium">Loading cart...</span>
      </div>
    )
  }

  // Handle empty state layout
  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white px-6 min-h-screen text-center">
        <div className="w-36 h-36 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="h-16 w-16 text-gray-300" />
        </div>
        <h2 className="text-xl font-black text-gray-800">Your cart is empty</h2>
        <p className="text-sm text-gray-400 mt-2 max-w-xs leading-relaxed">
          Add some delicious items from your favorite restaurants.
        </p>
        <button
          onClick={() => navigate('/home')}
          className="mt-8 w-full py-3.5 bg-orange-500 text-white rounded-2xl font-bold hover:bg-orange-600 shadow-sm transition-colors text-sm"
        >
          Browse Restaurants
        </button>
        <button
          onClick={() => navigate('/home')}
          className="mt-3 w-full py-3.5 bg-white text-gray-700 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-colors text-sm"
        >
          Go Home
        </button>
      </div>
    )
  }

  // Group items by restaurant name
  const firstRestaurantId = items[0]?.menu_item?.restaurant_id
  const restaurantInfo = restaurants.find((r) => r.id === firstRestaurantId)

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] pb-28">
      {/* Top Header */}
      <header className="px-6 pt-6 pb-4 bg-white border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-800">Your Cart</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {totalItemsCount} item{totalItemsCount > 1 ? 's' : ''} • {restaurantInfo?.name || 'Restaurant'}
            </p>
          </div>
        </div>
      </header>

      {/* Cart Scrollable Items */}
      <div className="px-6 py-6 space-y-6 flex-1 overflow-y-auto">
        {/* Restaurant summary card */}
        {restaurantInfo && (
          <div className="bg-white rounded-2xl p-4 border border-gray-50 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
              <img
                src={restaurantInfo.logo}
                alt={restaurantInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-extrabold text-gray-800 text-sm">{restaurantInfo.name}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{restaurantInfo.cuisine}</p>
            </div>
            <span className="ml-auto bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
              Open
            </span>
          </div>
        )}

        {/* Item List */}
        <div>
          <h3 className="font-extrabold text-gray-400 text-xs uppercase tracking-wider mb-3">
            Your Items
          </h3>
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 border border-gray-50 flex gap-4 items-center"
              >
                {item.menu_item?.image && (
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={item.menu_item.image}
                      alt={item.menu_item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-gray-800 text-sm truncate">{item.menu_item?.name}</h4>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 hover:text-red-500 text-gray-400 transition-colors shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">ETB {item.menu_item?.price} each</p>
                  <div className="flex items-center justify-between mt-2.5">
                    <span className="font-extrabold text-gray-700 text-xs">
                      Item subtotal: ETB {(item.menu_item?.price || 0) * item.quantity}
                    </span>
                    <div className="flex items-center bg-gray-50 border border-gray-100 rounded-full p-0.5">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full text-gray-500 hover:bg-gray-200"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </Button>
                      <span className="w-6 text-center text-xs font-bold text-gray-800">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full text-gray-500 hover:bg-gray-200"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Details mockup */}
        <div className="bg-white rounded-2xl p-5 border border-gray-50 space-y-4">
          <h3 className="font-extrabold text-gray-800 text-sm border-b border-gray-50 pb-2">
            Delivery Information
          </h3>
          <div className="flex gap-3">
            <MapPin className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-800 font-bold leading-normal">
                {selectedAddress}
              </p>
            </div>
            <button onClick={() => navigate('/profile/addresses')} className="text-xs text-orange-600 font-bold cursor-pointer hover:underline">
              Change
            </button>
          </div>

          <div className="flex gap-3">
            <Phone className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              {isEditingPhone ? (
                <div className="flex flex-col gap-2 mt-0.5">
                  <Input 
                    value={tempPhone} 
                    onChange={(e) => setTempPhone(e.target.value)} 
                    placeholder="Enter phone number" 
                    className="h-8 text-xs"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleSavePhone} size="sm" className="h-7 text-[10px] px-2 bg-orange-500 hover:bg-orange-600 text-white">Save</Button>
                    <Button onClick={handleCancelPhone} variant="outline" size="sm" className="h-7 text-[10px] px-2">Cancel</Button>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-800 font-bold leading-normal">{contactPhone}</p>
              )}
            </div>
            {!isEditingPhone && (
              <button onClick={() => setIsEditingPhone(true)} className="text-xs text-orange-600 font-bold cursor-pointer hover:underline h-fit">
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-white rounded-2xl p-5 border border-gray-50 space-y-3">
          <h3 className="font-extrabold text-gray-800 text-sm border-b border-gray-50 pb-2">
            Price Summary
          </h3>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Subtotal</span>
            <span className="font-semibold text-gray-800">ETB {cartSubtotal}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Delivery fee</span>
            <span className="font-semibold text-gray-800">ETB {deliveryFee}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Discount</span>
            <span className="font-semibold text-green-600">ETB 0</span>
          </div>
          <div className="flex justify-between text-sm font-black text-gray-800 border-t border-gray-50 pt-3">
            <span>Total</span>
            <span className="text-orange-600 text-base">ETB {cartTotal}</span>
          </div>
        </div>
      </div>

      {/* Sticky Proceed to Checkout Action */}
      <div className="fixed bottom-16 left-0 right-0 p-6 bg-white border-t border-gray-100 z-40 max-w-md mx-auto shadow-md">
        <button
          onClick={() => navigate('/checkout')}
          className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-sm text-sm"
        >
          <span>Proceed to Checkout</span>
        </button>
      </div>
    </div>
  )
}
