import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth'
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from './ui/sidebar'
import Navbar from './Navbar'
import {
  LayoutDashboard,
  Store,
  Tags,
  Package,
  Users,
  Settings,
  BarChart3,
} from 'lucide-react'

const ADMIN_PAGE_TITLES: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/restaurants': 'Restaurants',
  '/admin/categories': 'Categories',
  '/admin/orders': 'Orders',
  '/admin/users': 'Users',
  '/admin/settings': 'Settings',
  '/admin/statistics': 'Statistics',
}

const activeMenuClass =
  'data-active:bg-slate-900 data-active:text-white data-active:hover:bg-slate-900 data-active:hover:text-white rounded-lg'

export default function Layout() {
  const location = useLocation()
  const { user } = useAuthStore()
  const currentTitle = ADMIN_PAGE_TITLES[location.pathname] || 'Dashboard'

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar collapsible="icon">
          <SidebarHeader className="px-4 py-3 font-bold text-lg">
            <span className="group-data-[collapsible=icon]:hidden">Delivery App</span>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link to="/admin" />}
                  isActive={location.pathname === '/admin'}
                  className={activeMenuClass}
                >
                  <LayoutDashboard />
                  <span className="group-data-[collapsible=icon]:hidden">Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link to="/admin/restaurants" />}
                  isActive={location.pathname === '/admin/restaurants'}
                  className={activeMenuClass}
                >
                  <Store />
                  <span className="group-data-[collapsible=icon]:hidden">Restaurants</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link to="/admin/categories" />}
                  isActive={location.pathname === '/admin/categories'}
                  className={activeMenuClass}
                >
                  <Tags />
                  <span className="group-data-[collapsible=icon]:hidden">Categories</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link to="/admin/orders" />}
                  isActive={location.pathname === '/admin/orders'}
                  className={activeMenuClass}
                >
                  <Package />
                  <span className="group-data-[collapsible=icon]:hidden flex-1">Orders</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link to="/admin/users" />}
                  isActive={location.pathname === '/admin/users'}
                  className={activeMenuClass}
                >
                  <Users />
                  <span className="group-data-[collapsible=icon]:hidden">Users</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link to="/admin/settings" />}
                  isActive={location.pathname === '/admin/settings'}
                  className={activeMenuClass}
                >
                  <Settings />
                  <span className="group-data-[collapsible=icon]:hidden">Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link to="/admin/statistics" />}
                  isActive={location.pathname === '/admin/statistics'}
                  className={activeMenuClass}
                >
                  <BarChart3 />
                  <span className="group-data-[collapsible=icon]:hidden">Statistics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="p-3 group-data-[collapsible=icon]:p-2">
            <div className="flex items-center gap-3 rounded-lg border p-2 bg-sidebar-accent/50 group-data-[collapsible=icon]:border-0 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:justify-center">
              <div className="w-9 h-9 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm font-medium shrink-0">
                {user?.name?.charAt(0).toUpperCase() ?? 'G'}
              </div>
              <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-medium truncate">{user?.name ?? 'Guest'}</span>
                <span className="text-xs text-muted-foreground truncate">{user?.email ?? ''}</span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-col flex-1">
          <div className="flex items-center border-b bg-background">
            <SidebarTrigger className="ml-2" />
            <Navbar title={currentTitle} />
          </div>
          <main className="flex-1 overflow-y-auto p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}