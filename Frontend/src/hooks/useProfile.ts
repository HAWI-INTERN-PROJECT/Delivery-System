import { useMutation } from '@tanstack/react-query'
import type { ProfileUpdateData } from '@/lib/customer/profileService'
import { updateProfile } from '@/lib/customer/profileService'
import { useAuthStore } from '@/stores/auth'

export function useProfileMutation() {
  const { getProfile } = useAuthStore()

  return useMutation({
    mutationFn: (data: ProfileUpdateData) => updateProfile(data),
    onSuccess: () => {
      // Re-fetch user profile to sync stores
      getProfile().catch(() => {})
    },
  })
}
