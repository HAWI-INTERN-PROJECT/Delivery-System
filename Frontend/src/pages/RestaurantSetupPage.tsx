import { useState } from 'react'
import {
  Store,
  Upload,
  Clock,
  ArrowRight,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function RestaurantSetupPage() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [category, setCategory] = useState('')

  const submitRestaurant = () => {
    if (!name || !phone || !address) {
      return
    }

    navigate('/restaurant/pending')
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-6">

        <h1 className="text-2xl font-bold text-slate-900">
          Set Up Your Restaurant
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Add your restaurant information to get started.
        </p>

      </header>

      <div className="p-8 max-w-4xl mx-auto">

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">

            <div className="w-28 h-28 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400">
              <Upload size={28} />

              <span className="text-xs mt-2">
                Upload Logo
              </span>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Name */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-slate-700">
                Restaurant Name *
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter restaurant name"
                className="mt-2 w-full h-11 px-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Category / Cuisine
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-2 w-full h-11 px-4 rounded-xl border border-slate-200 bg-white"
              >
                <option value="">
                  Select category
                </option>
                <option>Ethiopian</option>
                <option>International</option>
                <option>Fast Food</option>
                <option>Pizza</option>
                <option>Cafe</option>
              </select>
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Phone *
              </label>

              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0912345678"
                className="mt-2 w-full h-11 px-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="restaurant@example.com"
                className="mt-2 w-full h-11 px-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Address */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Address *
              </label>

              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Bole, Addis Ababa"
                className="mt-2 w-full h-11 px-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">

              <label className="text-sm font-medium text-slate-700">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Tell customers about your restaurant..."
                className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              />

            </div>

          </div>

          {/* Opening hours */}
          <div className="mt-8">

            <div className="flex items-center gap-3 mb-4">

              <Clock
                size={19}
                className="text-orange-500"
              />

              <h2 className="font-semibold text-slate-900">
                Opening Hours
              </h2>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

              {[
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
              ].map((day) => (

                <div
                  key={day}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50"
                >

                  <span className="text-sm font-medium">
                    {day}
                  </span>

                  <span className="text-sm text-slate-500">
                    08:00 - 22:00
                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* Submit */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">

            <button
              onClick={submitRestaurant}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600"
            >
              Submit for Approval
              <ArrowRight size={18} />
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}