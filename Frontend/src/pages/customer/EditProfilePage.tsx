import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Camera } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth'
import { useProfileMutation } from '@/hooks/useProfile'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function EditProfilePage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const updateProfileMutation = useProfileMutation()

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const profileSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^09\d{8}$/, 'Phone number must start with 09 and have 10 digits'),
  })

  type ProfileForm = z.infer<typeof profileSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  })

  const onSubmit = async (data: ProfileForm) => {
    try {
      await updateProfileMutation.mutateAsync(data)
      toast.success('Profile changes saved successfully')
      navigate('/profile')
    } catch (e: any) {
      toast.error(e.message || 'Failed to update profile')
    }
  }

  const getInitials = () => {
    if (!user?.name) return 'U'
    return user.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] pb-6">
      {/* Top Header */}
      <header className="px-6 pt-6 pb-4 bg-white border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/profile')}
            className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">Edit Profile</h1>
        </div>
      </header>

      {/* Profile Form */}
      <div className="px-6 py-6 space-y-6 flex-1 overflow-y-auto">
        {/* Avatar Photo section */}
        <div className="flex flex-col items-center justify-center py-4 bg-white rounded-3xl border border-gray-50 shadow-sm">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            accept="image/*" 
            className="hidden" 
          />
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-black text-2xl border-4 border-orange-50 overflow-hidden">
              {previewUrl ? (
                <img src={previewUrl} alt="Profile Preview" className="w-full h-full object-cover" />
              ) : (
                getInitials()
              )}
            </div>
            <button 
              onClick={triggerFileInput} 
              type="button"
              className="absolute bottom-0 right-0 p-2 bg-orange-500 hover:bg-orange-600 rounded-full text-white shadow-md transition-colors border-2 border-white"
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <button 
            onClick={triggerFileInput} 
            type="button"
            className="text-[10px] font-bold text-orange-600 mt-3 cursor-pointer hover:underline"
          >
            Change Photo
          </button>
        </div>

        {/* Inputs list */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl p-6 border border-gray-50 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs font-bold text-gray-500">
              Full Name
            </Label>
            <Input id="name" {...register('name')} className="rounded-xl" />
            {errors.name && <p className="text-[10px] text-red-500 font-bold">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-bold text-gray-500">
              Email
            </Label>
            <Input id="email" type="email" {...register('email')} className="rounded-xl" />
            {errors.email && <p className="text-[10px] text-red-500 font-bold">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-xs font-bold text-gray-500">
              Phone Number
            </Label>
            <Input id="phone" placeholder="0912345678" {...register('phone')} className="rounded-xl" />
            {errors.phone && <p className="text-[10px] text-red-500 font-bold">{errors.phone.message}</p>}
          </div>

          <Button
            type="submit"
            className="w-full mt-6 py-6 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-colors text-sm"
            disabled={updateProfileMutation.isPending}
          >
            {updateProfileMutation.isPending ? 'Saving Changes...' : 'Save Changes'}
          </Button>
        </form>
      </div>
    </div>
  )
}
