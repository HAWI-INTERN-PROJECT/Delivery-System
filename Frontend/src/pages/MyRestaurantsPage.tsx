import { useState } from 'react'
import {
  Plus,
  Store,
  MapPin,
  CheckCircle2,
  Clock,
  X,
} from 'lucide-react'

interface Restaurant {
  id: number
  name: string
  address: string
  status: 'Active' | 'Pending Approval'
  type: string
}

const initialRestaurants: Restaurant[] = [
  {
    id: 1,
    name: 'My Restaurant',
    address: 'Bole, Addis Ababa',
    status: 'Active',
    type: 'Ethiopian & International',
  },
  {
    id: 2,
    name: 'Downtown Branch',
    address: 'Kazanchis, Addis Ababa',
    status: 'Pending Approval',
    type: 'Ethiopian Cuisine',
  },
]

export default function MyRestaurantsPage() {
  const [restaurants, setRestaurants] =
    useState<Restaurant[]>(initialRestaurants)

  const [showModal, setShowModal] = useState(false)

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')

  const addRestaurant = () => {
    if (!name.trim() || !address.trim()) {
      return
    }

    const newRestaurant: Restaurant = {
      id: Date.now(),
      name,
      address,
      status: 'Pending Approval',
      type: 'Restaurant',
    }

    setRestaurants((current) => [
      ...current,
      newRestaurant,
    ])

    setName('')
    setAddress('')
    setShowModal(false)
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              My Restaurants
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Manage and switch between your restaurants.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600"
          >
            <Plus size={19} />
            Add Restaurant
          </button>

        </div>

      </header>

      <div className="p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {restaurants.map((restaurant) => (

            <div
              key={restaurant.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >

              <div className="h-32 bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">

                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                  <Store size={30} />
                </div>

              </div>

              <div className="p-6">

                <div className="flex items-start justify-between gap-3">

                  <div>
                    <h2 className="font-bold text-lg text-slate-900">
                      {restaurant.name}
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      {restaurant.type}
                    </p>
                  </div>

                  <span
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                      restaurant.status === 'Active'
                        ? 'bg-green-50 text-green-600'
                        : 'bg-yellow-50 text-yellow-600'
                    }`}
                  >
                    {restaurant.status === 'Active' ? (
                      <CheckCircle2 size={13} />
                    ) : (
                      <Clock size={13} />
                    )}

                    {restaurant.status}
                  </span>

                </div>

                <div className="flex items-center gap-2 mt-5 text-sm text-slate-500">
                  <MapPin size={16} />
                  {restaurant.address}
                </div>

                <button
                  disabled={restaurant.status !== 'Active'}
                  className="w-full mt-6 py-2.5 rounded-xl border border-slate-200 text-sm font-medium disabled:opacity-40 hover:bg-slate-50"
                >
                  {restaurant.status === 'Active'
                    ? 'Currently Managing'
                    : 'Pending Approval'}
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Add Restaurant Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl">

            <div className="flex items-center justify-between p-6 border-b border-slate-200">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Add Another Restaurant
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Your existing restaurant will continue operating normally.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>

            <div className="p-6 space-y-5">

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Restaurant Name
                </label>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter restaurant name"
                  className="mt-2 w-full h-11 px-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Address
                </label>

                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Bole, Addis Ababa"
                  className="mt-2 w-full h-11 px-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="rounded-xl bg-orange-50 border border-orange-100 p-4 text-sm text-orange-700">
                Your new restaurant will remain pending until it is approved by an administrator. Your existing restaurant will remain active.
              </div>

            </div>

            <div className="p-6 border-t border-slate-200 flex justify-end gap-3">

              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium"
              >
                Cancel
              </button>

              <button
                onClick={addRestaurant}
                className="px-5 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-medium hover:bg-orange-600"
              >
                Submit for Approval
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  )
}