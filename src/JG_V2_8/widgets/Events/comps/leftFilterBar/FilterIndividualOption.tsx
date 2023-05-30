import { CheckCircleIcon } from '@heroicons/react/outline'

type IndividaulFilterOptionProps = {
  title: React.ReactNode
  onClick?: () => void
  active?: boolean
  children?: React.ReactNode
}
const IndividaulFilterOption = (props: IndividaulFilterOptionProps) => {
  const { title, onClick = () => {}, active = false, children = null } = props
  return (
    <div
      className={`px-4 py-3 space-y-1 cursor-pointer select-none ${
        active ? 'border-l-2 !border-l-[#4CAF4F] bg-white text-jg-green-500' : 'bg-jg-grey-50 text-jg-metal-500'
      } `}
      onClick={onClick}
    >
      <div className="flex items-center gap-1 ">
        {active && <CheckCircleIcon className="w-4 h-4" />}
        <div className="flex flex-grow justify-between items-center">
          {typeof title === 'string' ? <h3 className="text-sm leading-4 font-medium">{title}</h3> : title}
        </div>
      </div>
      {children}
    </div>
  )
}

export default IndividaulFilterOption
