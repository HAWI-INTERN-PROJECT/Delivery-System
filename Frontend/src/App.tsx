import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

import ErrorBoundary from '@/components/ErrorBoundary'

import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import DashboardPage from '@/pages/DashboardPage'
import NotFoundPage from '@/pages/NotFoundPage'

import RestaurantLayout from '@/components/restaurant/RestaurantLayout'
import RestaurantDashboardPage from '@/pages/RestaurantDashboardPage'
import RestaurantOrdersPage from '@/pages/RestaurantOrdersPage'
import RestaurantMenuPage from '@/pages/RestaurantMenuPage'
import RestaurantRevenuePage from '@/pages/RestaurantRevenuePage'
import RestaurantProfilePage from '@/pages/RestaurantProfilePage'
import RestaurantSettingsPage from '@/pages/RestaurantSettingsPage'
import MyRestaurantsPage from '@/pages/MyRestaurantsPage'
import RestaurantPendingPage from '@/pages/RestaurantPendingPage'
import RestaurantSetupPage from '@/pages/RestaurantSetupPage'

const queryClient = new QueryClient()

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>

          <Routes>

            {/* Home */}
            <Route
              path="/"
              element={<Navigate to="/restaurant/dashboard" replace />}
            />

            {/* Authentication pages */}
            <Route
              path="/login"
              element={<LoginPage />}
            />

            <Route
              path="/register"
              element={<RegisterPage />}
            />

            {/* Existing dashboard */}
            <Route
              path="/dashboard"
              element={<DashboardPage />}
            />

            {/* Restaurant Manager */}
            <Route
              path="/restaurant"
              element={<RestaurantLayout />}
            >
              <Route
                index
                element={
                  <Navigate
                    to="/restaurant/dashboard"
                    replace
                  />
                }
              />

              <Route
                path="dashboard"
                element={<RestaurantDashboardPage />}
              />

              <Route
  path="orders"
  element={<RestaurantOrdersPage />}
/>

<Route
  path="menu"
  element={<RestaurantMenuPage />}
/>

<Route
  path="revenue"
  element={<RestaurantRevenuePage />}
/>

<Route
  path="profile"
  element={<RestaurantProfilePage />}
/>
<Route
    path="settings"
    element={<RestaurantSettingsPage />}
  />

  <Route
    path="restaurants"
    element={<MyRestaurantsPage />}
  />

  <Route
    path="setup"
    element={<RestaurantSetupPage />}
  />

  <Route
    path="pending"
    element={<RestaurantPendingPage />}
  />

            </Route>

            {/* 404 */}
            <Route
              path="*"
              element={<NotFoundPage />}
            />

          </Routes>

        </BrowserRouter>

        <Toaster
          position="top-right"
          richColors
        />

      </QueryClientProvider>
    </ErrorBoundary>
  )
}