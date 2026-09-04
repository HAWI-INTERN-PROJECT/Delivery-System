import {
  Clock3,
  Store,
  ArrowRight,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function RestaurantPendingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">

      <div className="w-full max-w-xl bg-white rounded-3xl border border-slate-200 shadow-sm p-10 text-center">

        <div className="w-20 h-20 mx-auto rounded-full bg-yellow-50 text-yellow-500 flex items-center justify-center">
          <Clock3 size={38} />
        </div>

        <div className="inline-flex mt-6 px-4 py-1.5 rounded-full bg-yellow-50 text-yellow-700 text-sm font-semibold">
          PENDING APPROVAL
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mt-5">
          My New Restaurant
        </h1>

        <p className="text-slate-500 leading-7 mt-4">
          Your restaurant has been submitted successfully and is
          currently being reviewed by our administration team.
        </p>

        <p className="text-sm text-slate-500 mt-3">
          Admin approval usually takes 1–2 business days.
        </p>

        <div className="mt-8 rounded-2xl bg-slate-50 p-5 text-left">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
              <Store size={20} />
            </div>

            <div>
              <p className="font-medium text-slate-900">
                Restaurant under review
              </p>

              <p className="text-sm text-slate-500">
                You'll be notified once a decision is made.
              </p>
            </div>

          </div>

        </div>

        <button
          onClick={() => navigate('/restaurant/restaurants')}
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600"
        >
          Back to My Restaurants
          <ArrowRight size={18} />
        </button>

      </div>

    </div>
  )
}