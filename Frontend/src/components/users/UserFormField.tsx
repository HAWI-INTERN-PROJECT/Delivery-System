import type { InputHTMLAttributes, SelectHTMLAttributes } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export interface UserFormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function UserFormField({ label, error, id, className, ...props }: UserFormFieldProps) {
  const fieldId = id ?? props.name

  return (
    <div className="space-y-2">
      <Label htmlFor={fieldId} className="font-semibold text-gray-900">
        {label}
      </Label>
      <Input
        id={fieldId}
        className={cn('h-11 rounded-full border-gray-200', className)}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

export interface UserFormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  options: readonly string[]
  placeholder?: string
}

export function UserFormSelect({
  label,
  error,
  id,
  className,
  options,
  placeholder,
  ...props
}: UserFormSelectProps) {
  const fieldId = id ?? props.name

  return (
    <div className="space-y-2">
      <Label htmlFor={fieldId} className="font-semibold text-gray-900">
        {label}
      </Label>
      <select
        id={fieldId}
        className={cn(
          'h-11 w-full rounded-full border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus-visible:ring-2 focus-visible:ring-ring',
          className,
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
