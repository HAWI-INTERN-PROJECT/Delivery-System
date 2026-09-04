import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Plus, Check } from 'lucide-react'
import { useCustomerStore } from '@/stores/customerStore'

// Mock saved addresses
const mockAddresses = [
  {
    id: 1,
    title: 'Home',
    address: 'Home — Bole Sub-City, Woreda 03, House 487, Addis Ababa',
  },
  {
    id: 2,
    title: 'Work',
    address: 'Work — Kazanchis, ECA Road, Building 2, Addis Ababa',
  },
]

export default function AddressesPage() {
  const navigate = useNavigate()
  const { selectedAddress, setAddress } = useCustomerStore()
  const [adding, setAdding] = useState(false)
  const [newAddress, setNewAddress] = useState('')

  const handleSelectAddress = (addr: string) => {
    setAddress(addr)
    // Could navigate back, but better to stay so user sees selection change
  }

  const handleAddAddress = () => {
    if (newAddress.trim()) {
      setAddress(newAddress)
      setAdding(false)
      setNewAddress('')
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] pb-6">
      <header className="px-6 pt-6 pb-4 bg-white border-b border-gray-100 shrink-0">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </button>
            <h1 className="text-lg font-bold text-gray-800">My Addresses</h1>
          </div>
          <button
            onClick={() => setAdding(!adding)}
            className="p-2 bg-orange-50 text-orange-600 rounded-full hover:bg-orange-100 transition-colors"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="px-6 py-6 space-y-4 flex-1 overflow-y-auto">
        {adding && (
          <div className="bg-white rounded-2xl p-4 border border-orange-200 space-y-3">
            <h3 className="text-sm font-bold text-gray-800">Add New Address</h3>
            <textarea
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Enter full address details..."
              className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500"
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setAdding(false)}
                className="px-4 py-2 text-xs font-bold text-gray-500 hover:bg-gray-50 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAddress}
                className="px-4 py-2 text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {mockAddresses.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelectAddress(item.address)}
              className={`w-full text-left bg-white rounded-2xl p-4 border flex items-start gap-4 transition-colors ${
                selectedAddress === item.address
                  ? 'border-orange-500 bg-orange-50/10'
                  : 'border-gray-50 hover:border-gray-200'
              }`}
            >
              <div className="p-2 bg-gray-50 text-gray-400 rounded-xl shrink-0 mt-0.5">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-800 text-sm">{item.title}</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.address}</p>
              </div>
              {selectedAddress === item.address && (
                <div className="shrink-0 text-orange-500 mt-1">
                  <Check className="h-5 w-5" />
                </div>
              )}
            </button>
          ))}
          
          {/* If selected address is custom added (not in mock) */}
          {!mockAddresses.some(m => m.address === selectedAddress) && (
            <button
              className="w-full text-left bg-white rounded-2xl p-4 border border-orange-500 bg-orange-50/10 flex items-start gap-4 transition-colors"
            >
              <div className="p-2 bg-gray-50 text-gray-400 rounded-xl shrink-0 mt-0.5">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-800 text-sm">Custom</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{selectedAddress}</p>
              </div>
              <div className="shrink-0 text-orange-500 mt-1">
                <Check className="h-5 w-5" />
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
