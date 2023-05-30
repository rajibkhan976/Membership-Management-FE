import { ChangeEvent, FC } from 'react'
import { SearchIcon } from '@heroicons/react/solid'
import { ReactComponent as Close } from '../../../../icons/close.svg'

type SearchComponentProps = {
  placeholder: string
  onchange: (value: string) => void
  value: string
  icon?: React.ReactNode
}

const SearchComponent: FC<SearchComponentProps> = ({ placeholder, onchange, value, icon }) => {
  return (
    <div className="align-middle flex items-center flex-row relative h-[36px]">
      {icon && icon}
      <input
        type="text"
        id="header-search"
        placeholder={placeholder}
        name="header-search"
        className="w-full mr-4 outline-none bg-white text-sm font-medium text-[#90A4AE] p-2"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onchange(e.target.value)}
      />
      {value && (
        <Close onClick={() => onchange('')} className="ml-4 my-3 mr-3 h-5 w-5 absolute right-0 cursor-pointer" />
      )}
    </div>
  )
}

export default SearchComponent
