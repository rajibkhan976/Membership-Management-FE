import { ChevronDoubleDownIcon, ChevronDoubleRightIcon, ChevronDoubleUpIcon } from '@heroicons/react/solid'

type SeeMoreProps = {
  dir?: 'up' | 'down' | 'right'
  text?: string
  onClick?: () => void
  className?: string
  iconClassName?: string
}

function SeeMore({ dir = 'down', text = 'Show More', onClick, className = '', iconClassName }: SeeMoreProps) {
  const Icon = {
    up: ChevronDoubleUpIcon,
    down: ChevronDoubleDownIcon,
    right: ChevronDoubleRightIcon,
  }[dir]
  return (
    <div onClick={onClick} className={`flex items-center gap-2 text-primary-hover cursor-pointer ${className}`}>
      <span className="font-medium">{text}</span>
      <Icon className={`w-4 ${iconClassName}`} />
    </div>
  )
}

export default SeeMore
