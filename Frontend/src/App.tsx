import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import NotFoundPage from '@/pages/NotFoundPage'
import { useAuthStore } from '@/stores/auth'
import StatisticsPage from '@/pages/StatisticsPage'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { useAuthStore } from '@/stores/auth'
import ErrorBoundary from '@/components/ErrorBoundary'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import DashboardPage from '@/pages/DashboardPage'
import NotFoundPage from '@/pages/NotFoundPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import Layout from './components/Layout'
import RestaurantsPage from '@/pages/RestaurantsPage'
import CategoriesPage from '@/pages/CategoriesPage'
import OrdersPage from '@/pages/OrdersPage'
import UsersPage from '@/pages/UsersPage'
import SettingsPage from '@/pages/SettingsPage'

const queryClient = new QueryClient()

 function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
   if (!isAuthenticated) return <Navigate to="/login" replace />
   return <>{children}</>
 }

 function GuestRoute({ children }: { children: React.ReactNode }) {
   const { isAuthenticated } = useAuthStore()
   if (isAuthenticated) return <Navigate to="/dashboard" replace />
   return <>{children}</>
 }

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
            <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />
            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<AdminDashboardPage />} />
            <Route path="/restaurants" element={<RestaurantsPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/statistics" element={<StatisticsPage />} />
            </Route>
            
            <Route path="*" element={<NotFoundPage />} />
          
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" richColors />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
