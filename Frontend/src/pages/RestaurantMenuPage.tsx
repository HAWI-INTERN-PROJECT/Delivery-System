import { useState } from 'react'
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  UtensilsCrossed,
  X,
} from 'lucide-react'

interface MenuItem {
  id: number
  name: string
  category: string
  description: string
  price: number
  available: boolean
  image: string
}

const initialItems: MenuItem[] = [
  {
    id: 1,
    name: 'Chicken Burger',
    category: 'Burgers',
    description: 'Grilled chicken, lettuce, tomato and special sauce.',
    price: 450,
    available: true,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
  },
  {
    id: 2,
    name: 'Special Pizza',
    category: 'Pizza',
    description: 'Cheese, tomato, beef, onion and fresh vegetables.',
    price: 650,
    available: true,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500',
  },
  {
    id: 3,
    name: 'Beef Pasta',
    category: 'Pasta',
    description: 'Creamy pasta with tender beef and vegetables.',
    price: 520,
    available: false,
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=500',
  },
  {
    id: 4,
    name: 'French Fries',
    category: 'Sides',
    description: 'Crispy golden fries with our special seasoning.',
    price: 180,
    available: true,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500',
  },
]

export default function RestaurantMenuPage() {
  const [items, setItems] = useState<MenuItem[]>(initialItems)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  const toggleAvailability = (id: number) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, available: !item.available }
          : item
      )
    )
  }

  const deleteItem = (id: number) => {
    setItems((current) =>
      current.filter((item) => item.id !== id)
    )
  }

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Menu
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Manage your restaurant menu items.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
          >
            <Plus size={19} />
            Add Item
          </button>

        </div>
      </header>

      <div className="p-8">

        {/* Search + count */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-6">

          <div>
            <p className="text-sm text-slate-500">
              Menu Items
            </p>

            <p className="text-2xl font-bold text-slate-900">
              {items.length}
            </p>
          </div>

          <div className="relative w-full md:w-80">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search menu items..."
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-orange-500"
            />

          </div>

        </div>

        {/* Menu grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredItems.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
            >

              {/* Image */}
              <div className="h-48 relative">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />

                <span
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
                    item.available
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {item.available ? 'Available' : 'Unavailable'}
                </span>

              </div>

              {/* Content */}
              <div className="p-5">

                <div className="flex justify-between gap-3">

                  <div>
                    <p className="text-xs text-orange-500 font-medium">
                      {item.category}
                    </p>

                    <h2 className="font-bold text-lg text-slate-900 mt-1">
                      {item.name}
                    </h2>
                  </div>

                  <p className="font-bold text-orange-500">
                    ETB {item.price}
                  </p>

                </div>

                <p className="text-sm text-slate-500 mt-3 line-clamp-2">
                  {item.description}
                </p>

                {/* Actions */}
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">

                  <div className="flex items-center gap-2">

                    <button
                      onClick={() => toggleAvailability(item.id)}
                      className={`relative w-11 h-6 rounded-full transition ${
                        item.available
                          ? 'bg-green-500'
                          : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                          item.available
                            ? 'left-6'
                            : 'left-1'
                        }`}
                      />
                    </button>

                    <span className="text-xs text-slate-500">
                      Visible
                    </span>

                  </div>

                  <div className="flex gap-2">

                    <button
                      className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => deleteItem(item.id)}
                      className="p-2 rounded-lg border border-red-100 text-red-500 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Add Item Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl">

            <div className="flex items-center justify-between p-6 border-b border-slate-200">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Add Menu Item
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Add a new item to your menu.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>

            <div className="p-6 space-y-4">

              <div className="h-32 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400">
                <UtensilsCrossed size={28} />
                <p className="text-sm mt-2">
                  Upload item image
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Item Name
                </label>

                <input
                  placeholder="e.g. Chicken Burger"
                  className="mt-2 w-full h-11 px-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  placeholder="Describe your menu item..."
                  rows={3}
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Price
                  </label>

                  <input
                    type="number"
                    placeholder="450"
                    className="mt-2 w-full h-11 px-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Category
                  </label>

                  <select className="mt-2 w-full h-11 px-4 rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-orange-500">
                    <option>Burgers</option>
                    <option>Pizza</option>
                    <option>Pasta</option>
                    <option>Sides</option>
                    <option>Drinks</option>
                  </select>
                </div>

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
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-medium hover:bg-orange-600"
              >
                Add Item
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  )
}