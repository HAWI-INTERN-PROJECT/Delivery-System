import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function ChangePasswordPage() {
  const navigate = useNavigate()

  // Toggle flags for password visibility
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const passwordSchema = z
    .object({
      current_password: z.string().min(1, 'Current password is required'),
      password: z.string().min(8, 'New password must be at least 8 characters'),
      password_confirmation: z.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: 'New passwords do not match',
      path: ['password_confirmation'],
    })

  type PasswordForm = z.infer<typeof passwordSchema>

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  })

  // Auth Store lacks a standalone password change method, so we use store API Client directly
  const onSubmit = async (data: PasswordForm) => {
    try {
      const api = (await import('@/lib/api')).default
      await api.put('/change-password', {
        current_password: data.current_password,
        password: data.password,
        password_confirmation: data.password_confirmation,
      })
      toast.success('Password changed successfully')
      navigate('/profile/account-settings')
    } catch (e: any) {
      const message = e.response?.data?.message || e.message || 'Failed to change password'
      toast.error(message)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] pb-6">
      {/* Top Header */}
      <header className="px-6 pt-6 pb-4 bg-white border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/profile/account-settings')}
            className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">Change Password</h1>
        </div>
      </header>

      {/* Form Fields */}
      <div className="px-6 py-6 space-y-6 flex-1 overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl p-6 border border-gray-50 space-y-4">
          {/* Current password */}
          <div className="space-y-1.5">
            <Label htmlFor="current_password" className="text-xs font-bold text-gray-500">
              Current Password
            </Label>
            <div className="relative">
              <Input
                id="current_password"
                type={showCurrent ? 'text' : 'password'}
                placeholder="Enter current password"
                className="rounded-xl pr-10"
                {...register('current_password')}
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.current_password && (
              <p className="text-[10px] text-red-500 font-bold">{errors.current_password.message}</p>
            )}
          </div>

          {/* New password */}
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-xs font-bold text-gray-500">
              New Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showNew ? 'text' : 'password'}
                placeholder="Min. 8 characters"
                className="rounded-xl pr-10"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-[10px] text-red-500 font-bold">{errors.password.message}</p>}
          </div>

          {/* Confirm password */}
          <div className="space-y-1.5">
            <Label htmlFor="password_confirmation" className="text-xs font-bold text-gray-500">
              Confirm New Password
            </Label>
            <div className="relative">
              <Input
                id="password_confirmation"
                type={showConfirm ? 'text' : 'password'}
                placeholder="Repeat new password"
                className="rounded-xl pr-10"
                {...register('password_confirmation')}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password_confirmation && (
              <p className="text-[10px] text-red-500 font-bold">{errors.password_confirmation.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full mt-6 py-6 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-colors text-sm"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving Password...' : 'Save Password'}
          </Button>
        </form>
      </div>
    </div>
  )
}
