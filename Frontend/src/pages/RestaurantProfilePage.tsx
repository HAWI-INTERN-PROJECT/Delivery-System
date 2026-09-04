import {
  Pencil,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
} from 'lucide-react'

export default function RestaurantProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-6">

        <h1 className="text-2xl font-bold text-slate-900">
          Restaurant Profile
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Manage your restaurant information and details.
        </p>

      </header>

      <div className="p-8 max-w-5xl">

        {/* Restaurant hero */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          {/* Cover */}
          <div className="h-48 bg-gradient-to-r from-orange-400 to-orange-600 relative">

            <button className="absolute right-5 top-5 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/90 text-slate-700 text-sm font-medium hover:bg-white">
              <Pencil size={16} />
              Edit
            </button>

          </div>

          {/* Restaurant info */}
          <div className="px-8 pb-8">

            <div className="flex flex-col md:flex-row md:items-end gap-5 -mt-14">

              {/* Logo */}
              <div className="w-28 h-28 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center text-orange-500">

                <div className="w-full h-full rounded-xl bg-orange-50 flex items-center justify-center">
                  <span className="text-3xl font-bold">
                    MR
                  </span>
                </div>

              </div>

              <div className="pb-2">

                <h2 className="text-2xl font-bold text-slate-900">
                  My Restaurant
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Restaurant • Ethiopian & International Cuisine
                </p>

              </div>

              <div className="md:ml-auto pb-3">

                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-600 text-sm font-medium">
                  <CheckCircle2 size={16} />
                  Active
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

          {/* About */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

            <div className="flex justify-between items-center mb-5">

              <h2 className="font-semibold text-slate-900">
                Restaurant Information
              </h2>

              <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
                <Pencil size={17} />
              </button>

            </div>

            <p className="text-sm text-slate-600 leading-6">
              Welcome to our restaurant. We serve delicious
              Ethiopian and international dishes prepared with
              fresh ingredients and great care.
            </p>

          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

            <h2 className="font-semibold text-slate-900 mb-5">
              Contact Information
            </h2>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
                  <Phone size={17} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Phone
                  </p>

                  <p className="text-sm text-slate-700">
                    0912345678
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
                  <Mail size={17} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Email
                  </p>

                  <p className="text-sm text-slate-700">
                    restaurant@example.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
                  <MapPin size={17} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Address
                  </p>

                  <p className="text-sm text-slate-700">
                    Bole, Addis Ababa
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Business hours */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mt-6">

          <h2 className="font-semibold text-slate-900 mb-5">
            Business Hours
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            {[
              ['Monday', '08:00 AM - 10:00 PM'],
              ['Tuesday', '08:00 AM - 10:00 PM'],
              ['Wednesday', '08:00 AM - 10:00 PM'],
              ['Thursday', '08:00 AM - 10:00 PM'],
              ['Friday', '08:00 AM - 11:00 PM'],
              ['Saturday', '09:00 AM - 11:00 PM'],
              ['Sunday', '09:00 AM - 10:00 PM'],
            ].map(([day, hours]) => (

              <div
                key={day}
                className="flex items-center justify-between py-3 px-4 rounded-xl bg-slate-50"
              >

                <div className="flex items-center gap-3">
                  <Clock
                    size={16}
                    className="text-slate-400"
                  />

                  <span className="text-sm font-medium text-slate-700">
                    {day}
                  </span>
                </div>

                <span className="text-sm text-slate-500">
                  {hours}
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  )
}