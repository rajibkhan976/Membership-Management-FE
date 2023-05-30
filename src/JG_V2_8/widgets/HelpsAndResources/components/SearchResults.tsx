import SearchField from '@jg/common/comps/searchBar/SearchField'
import { useState } from 'react'
import PopoverSearchResult from '../pages/home/components/HeroSection/PopoverSearchResult'

const SearchResults = ({ onClear }: { onClear: () => void }) => {
  const [query, setQuery] = useState('')
  return (
    <div className="absolute inset-0 flex flex-col items-center text-center">
      <div className="bg-white rounded-sm w-full md:w-auto divide-y md:flex items-center md:divide-x divide-jg-metal-50 relative">
        <div className="relative md:min-w-[448px]">
          <SearchField
            placeholder="Search for topics..."
            className="h-10"
            onChange={(value) => setQuery(value)}
            onClear={onClear}
            text={' '}
          />
          <PopoverSearchResult open={Boolean(query)} query={query} />
        </div>
      </div>
    </div>
  )
}
export default SearchResults
