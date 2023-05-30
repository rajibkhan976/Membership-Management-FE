import { Button } from '@comps/uiComps'
import { Search } from '@comps/uiComps/Icons'
import { SearchField } from '@jg/common/comps'
import { useWidgetContext } from 'jg-widget'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PopoverSearchResult from '../../pages/home/components/HeroSection/PopoverSearchResult'
import useGettingStartedStore from '../../store/useGettingStarted'

const SearchBox = () => {
  const [query, setQuery] = useState('')
  const [queryData, setQueryData] = useState('')

  const [category111, setCategory] = useState('all')
  const categories = useGettingStartedStore((state) => state.categories)
  const contents = useGettingStartedStore((state) => state.contents)
  const { basePath } = useWidgetContext()
  const { category } = useParams()

  const Navigate = useNavigate()

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
  const citrus = fruits.slice(0, 10)

  return (
    <>
      <div className="flex relative border">
        <SearchField
          placeholder="Search for topics..."
          className="w-[90%]"
          onChange={(value) => setQuery(value.trim())}
          onEnter={() => {
            Navigate(`../search?q=${query}`)
          }}
        />

        <span
          className="px-2 absolute right-0 top-0 bg-jg-green-500 inline-flex justify-center items-center  text-white w-10 cursor-pointer rounded-r-sm"
          onClick={() => {
            query.trim() === '' || null
              ? alert('Please fill out this field')
              : Navigate(`../search?q=${query}&category=${category111}`)
          }}
        >
          <Button
            icon={<Search className="w-4 h-4" />}
            text=""
            disabled={query && query.trim() && query.length > 0 ? false : true}
          ></Button>
        </span>

        <div className="absolute left-0 bottom-10 w-full">
          <PopoverSearchResult
            open={Boolean(query)}
            query={queryData}
            SearchResult={citrus}
            path={`../search?q=${query}`}
          />
        </div>
      </div>
    </>
  )
}
export default SearchBox

// className="text-jg-metal-700 mb-6 border rounded-sm border-jg-metal-100"
