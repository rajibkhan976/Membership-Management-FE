import { JGListbox } from '@comps/uiComps'
import Search from '@comps/uiComps/Icons/SVG/Search'
import JGListboxItem from '@comps/uiComps/JGListbox/JGListboxItem'
import ArrowSmLeftIcon from '@heroicons/react/outline/ArrowSmLeftIcon'
import useGettingStartedStore from '@jg/widgets/GettingStarted/store/useGettingStarted'
import { useWidgetContext } from 'jg-widget'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CategoryType } from '../store/Interface'
import SearchResults from './SearchResults'

export type MobileSecondaryNavProps = {
  className?: string
}

const MobileSecondaryNav = ({ className }: MobileSecondaryNavProps) => {
  const [searchResults, setSearchResults] = useState(false)
  const { categories } = useGettingStartedStore((state) => state)
  const navigate = useNavigate()
  const { basePath } = useWidgetContext()
  const {category}  = useParams()

  return (
    <div
      className={`inline-block srticky left-0 right-0 top-0 h-11 items-center bg-white w-full shadow-sm ${className}`}
    >
      <ArrowSmLeftIcon
        className="w-[52px] h-11 text-jg-metal-900 cursor-pointer py-3 border-r border-r-jg-metal-50"
        onClick={() => navigate(`../`)}
      />
      {!searchResults && (
        <JGListbox
          size="lg"
          type="input"
          className="text-jg-metal-700 !border-none w-full"
          onChange={(e:any) => {
            navigate(`${basePath}${e.value}`)
          }}
          defaultIndex={categories.findIndex((i) => i.name === category)}
        >
          {categories.map((item, index) => (

            <JGListboxItem
              key={index}
              name={item.displayName}
              value={item.name}
              className="text-jg-metal-700  !border-0"
            >
              {item.displayName}
            </JGListboxItem>

          ))}
        </JGListbox>
      )}
      <div
        className="px-2 inline-flex justify-center items-center  text-jg-metal-700 w-[52px] cursor-pointer rounded-r-sm border-l border-l-jg-metal-50 h-11"
      >
        {searchResults ? (
          <SearchResults onClear={() => setSearchResults(false)} />
        ) : (
          <span
            onClick={() => {
              setSearchResults(true)
            }}
          >
            <Search className="w-4 h-4 jg-hidden" />
          </span>
        )}
      </div>
    </div>
  )
}
export default MobileSecondaryNav
