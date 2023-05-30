import { useEffect, useState } from 'react'
/* This example requires Tailwind CSS v2.0+ */
// import { Switch } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { ReactComponent as Close } from '../../../../icons/close.svg'

export type SearchProps = {
  className?: string
  text?: string
  onClear?: () => void
  onEnter?: (value: string) => void
  placeholder?: string
  onChange?: (value: string) => void
  type?: string
}

export default function SearchField({
  text = '',
  onChange,
  onEnter,
  onClear,
  className = '',
  placeholder = 'Search for anything like venues, events, etc...',
}: SearchProps) {
  const [searchInput, setSearchInput] = useState(text)
  useEffect(() => {
    onChange?.(searchInput)
  }, [searchInput])

  return (
    <div className={`align-middle flex items-center flex-row relative ${className}`}>
      <label htmlFor="header-search" className="flex justify-center mb-0 ">
        <span className="p-1">
          <SearchIcon className="text-jg-grey-500 w-4 m-1" />
        </span>
      </label>
      <input
        type="text"
        id="header-search"
        placeholder={placeholder}
        name="header-search"
        className=" w-full mr-4 outline-none bg-white text-sm  text-gray-700"
        value={searchInput}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            onEnter?.(searchInput)
          }
        }}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {searchInput && (
        <Close
          onClick={(e) => {
            setSearchInput('')
            onClear?.()
          }}
          className="ml-4 my-3 mr-3 h-5 w-5 absolute right-0 cursor-pointer"
        />
      )}
    </div>
  )
}
