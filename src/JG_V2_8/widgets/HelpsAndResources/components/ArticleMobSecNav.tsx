import { JGListbox } from '@comps/uiComps'
import Search from '@comps/uiComps/Icons/SVG/Search'
import JGListboxItem from '@comps/uiComps/JGListbox/JGListboxItem'
import ArrowSmLeftIcon from '@heroicons/react/outline/ArrowSmLeftIcon'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { catagoryData } from './RightSideBar/Catagories'
import SearchResults from './SearchResults'

export type ArticleMobSecNavProps = {
  className?: string
}

const ArticleMobSecNav = ({ className }: ArticleMobSecNavProps) => {
  const navigate = useNavigate()
  const [searchResults, setSearchResults] = useState(false)

  return (
    <div
      className={`inline-block srticky left-0 right-0 top-0 h-11 items-center justify-between bg-white w-full shadow-sm ${className}`}
    >
      <ArrowSmLeftIcon
        className="w-[52px] h-11 text-jg-metal-900 cursor-pointer py-3 border-r border-r-jg-metal-50 "
        onClick={() => navigate(-1)}
      />
      <div className="px-2 inline-flex justify-center items-center  text-jg-metal-700 w-[52px] cursor-pointer rounded-r-sm border-l border-l-jg-metal-50 h-11">
        {searchResults ? (
          <SearchResults onClear={() => setSearchResults(false)} />
        ) : (
          <span
            onClick={() => {
              setSearchResults(true)
            }}
          >
            <Search className="w-4 h-4 cursor-pointer" />
          </span>
        )}
      </div>
    </div>
  )
}
export default ArticleMobSecNav
