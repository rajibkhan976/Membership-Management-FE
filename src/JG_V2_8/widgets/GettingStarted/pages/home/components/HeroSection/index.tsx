import { Button } from '@comps/uiComps'
import { SearchField } from '@jg/common/comps'
import useGettingStartedStore from '@jg/widgets/GettingStarted/store/useGettingStarted'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PopoverSearchResult from './PopoverSearchResult'

const HeroSection = () => {
  const [query, setQuery] = useState('')
  const [queryData, setQueryData] = useState('')
  const [category, setCategory] = useState('all')
  const navigate = useNavigate()
  const contents = useGettingStartedStore((state) => state.contents)

  const filteredItems = contents.filter(
    (item: any) =>
      item.title.toLowerCase().includes(query && query.length > 2 && queryData) ||
      item.relatedword?.toLowerCase().includes(query && query.length > 2 && queryData) ||
      item.description.toLowerCase().includes(query && query.length > 2 && queryData)
  )

  const dataArray = () => {
    query
      .toLowerCase()
      .split(' ')
      .forEach((item) => {
        setQueryData(item)
      })
  }

  useEffect(() => {
    dataArray()
  }, [query])

  const fruits = filteredItems
  const citrus = fruits.slice(0, 9)
  const citrus2 = fruits.slice(0, 7)

  return (
    <div className="relative">
      <div
        className="h-[242px] lg:h-[216px] bg-no-repeat bg-cover brightness-[0.3]"
        style={{
          backgroundImage:
            "url('https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Help-Desk-Header-(lead)-image.jpg')",
        }}
      ></div>

      <div className="absolute inset-4 md:inset-9 flex flex-col items-center text-center md:pt-0 pt-8">
        <h1 className="text-white text-base leading-5 font-semibold md:text-xl md:leading-6">JustGo Help Centre</h1>
        <h5 className="text-globalTextSizeSm leading-[18px] font-normal text-jg-metal-50 mt-2 md:text-base md:leading-5">
          Use the search bar to quickly find answers from our videos and user guides
        </h5>

        <div className="bg-white rounded-sm w-full md:w-auto divide-y mt-4 md:mt-6 md:flex items-center md:divide-x divide-jg-metal-50 relative">
          <div className="relative md:min-w-[448px]">
            <SearchField
              placeholder="Search for topics..."
              className="h-10"
              onChange={(value) => setQuery(value.trim())}
              onEnter={() => {
                navigate(`search?q=${query}`)
              }}
            />
            <PopoverSearchResult
              open={Boolean(query)}
              query={queryData}
              SearchResult={citrus}
              path={`search?q=${query}&category=${category}`}
            />
            <span className="md:jg-hidden">
              <PopoverSearchResult
                open={Boolean(query)}
                query={queryData}
                SearchResult={citrus2}
                path={`search?q=${query}&category=${category}`}
              />
            </span>
          </div>
          <div className="md:p-1 md:!border-0 p-0">
            <Button
              className="jg-hidden md:block"
              disabled={query && query.length > 0 ? false : true}
              text="Search"
              block
              textAllign="center"
              onClick={() => {
                navigate(`search?q=${query}&category=${category}`)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
