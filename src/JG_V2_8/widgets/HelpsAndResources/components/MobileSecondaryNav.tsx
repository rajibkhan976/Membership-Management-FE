import { JGListbox, Modal } from '@comps/uiComps'
import Search from '@comps/uiComps/Icons/SVG/Search'
import JGListboxItem from '@comps/uiComps/JGListbox/JGListboxItem'
import ArrowSmLeftIcon from '@heroicons/react/outline/ArrowSmLeftIcon'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { catagoryData } from './RightSideBar/Catagories'
import SearchResults from './SearchResults'

export type MobileSecondaryNavProps = {
  className?: string
}

const MobileSecondaryNav = ({ className }: MobileSecondaryNavProps) => {
  const navigate = useNavigate()
  const [searchResults, setSearchResults] = useState(false)

  return (
    <div
      className={`inline-block srticky left-0 right-0 top-0 h-11 items-center bg-white w-full shadow-sm ${className}`}
    >
      <ArrowSmLeftIcon
        className="w-[52px] h-11 text-jg-metal-900 cursor-pointer py-3 border-r border-r-jg-metal-50"
        onClick={() => navigate(-1)}
      />
      {!searchResults && (
        <JGListbox size="lg" type="input" className="text-jg-metal-700 !border-none w-full cursor-pointer">
          {catagoryData.map((item, index) => (
            <JGListboxItem key={index} name={item} value={item} className="text-jg-metal-700  !border-0">
              {item}
            </JGListboxItem>
          ))}
        </JGListbox>
      )}
      <div
        className="px-2 inline-flex justify-center items-center  text-jg-metal-700 w-[52px] cursor-pointer rounded-r-sm border-l border-l-jg-metal-50 h-11"
        // onClick={() => {
        //   setSearchResults(true)
        // }}
      >
        {searchResults ? (
          <SearchResults onClear={() => setSearchResults(false)} />
        ) : (
          <span
            onClick={() => {
              setSearchResults(true)
            }}
          >
            <Search className="w-4 h-4" />
          </span>
        )}
      </div>
    </div>
  )
}
export default MobileSecondaryNav
