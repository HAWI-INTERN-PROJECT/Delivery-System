interface CategoryChipProps {
  name: string
  active?: boolean
  onClick?: () => void
  icon?: string // emoji string
}

export default function CategoryChip({ name, active = false, onClick, icon }: CategoryChipProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 border duration-200 ${
        active
          ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
          : 'bg-white text-gray-600 border-gray-100 hover:bg-gray-50'
      }`}
    >
      {icon && <span className="text-sm">{icon}</span>}
      <span>{name}</span>
    </button>
  )
}
