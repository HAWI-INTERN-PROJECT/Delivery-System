export type ApplicationStatus = 'pending' | 'rejected' | 'approved'

export interface RestaurantApplication {
  id: number
  name: string
  category: string
  status: ApplicationStatus
  managerName: string
  phone: string
  address: string
  appliedDate: string
}

export interface ApplicationStats {
  total: number
  pending: number
}
