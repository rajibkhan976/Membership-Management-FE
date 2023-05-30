import { Badge } from '@comps/uiComps'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import MobileSecondaryNav from '../../components/MobileSecondaryNav'
import RightSideBar from '../../components/RightSideBar'
import SecondaryNav from '../../components/SecondaryNav'
import useGettingStartedStore from '../../store/useGettingStarted'
import SearchedItemCard from '../home/components/HeroSection/SearchedItemCard'

const Search = () => {
  const [params] = useSearchParams()
  const [queryData, setQueryData] = useState('')

  const query = params.get('q') || ''
  // const category = params.get('category') || ''
  // const groupedBycategory = SearchResultForPopover.results.reduce(
  //   (groups, item) => ({
  //     ...groups,
  //     [item.categories[0]]: [...(groups[item.categories[0]] || []), item],
  //   }),
  //   {} as Record<string, any[]>
  // )

  // const [query, setQuery] = useState('')
  const [fiteredContent, setfiteredContent] = useState<any[]>([])
  const [category, setCategory] = useState('all')
  const contents = useGettingStartedStore((state) => state.contents)

  useEffect(() => {
    const filteredItems = contents.filter(
      (item: any) =>
        item.title.toLowerCase().includes(query && query.length > 2 && queryData) ||
        item.relatedword?.toLowerCase().includes(query && query.length > 2 && queryData) ||
        item.description.toLowerCase().includes(query && query.length > 2 && queryData)
    )
    setfiteredContent(filteredItems)
  }, [queryData])

  console.log(fiteredContent, 'fiteredContent', 123)

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

  const xResultFoundForY = `${fiteredContent.length} results found for "${query}"`
  return (
    <div className="w-full bg-[#fafafa] min-h-screen">
      <div className=" max-w-[1170px] mx-auto">
        <SecondaryNav className="jg-hidden md:flex" title={xResultFoundForY} navigateValue={-1} />
        <MobileSecondaryNav className="flex md:jg-hidden" />

        <h3 className="text-xl leading-6 font-semibold text-jg-metal-700 md:jg-hidden m-4">{xResultFoundForY}</h3>
        <div className="flex gap-x-[30px] relative md:mt-[72px] m-4">
          <div className="flex lg:max-w-[770px] w-full flex-col flex-wrap min-w-0">
            <div className="bg-white text-left w-full min-w-0 border border-jg-metal-50 divide-y divide-jg-metal-50 rounded-md">
              <h3 className="font-medium leading-5 text-jg-metal-300 p-4">
                {`Search result for "${query}" in ${category || 'all'} category`}
              </h3>
              <div className="p-4 px-6 pt-0">
                {fiteredContent.map((category, i: number) => {
                  return (
                    <div className="">
                      <Badge
                        rounded
                        fillType="faded"
                        label={category.category}
                        size="md"
                        className="mt-6 !font-medium"
                      />
                      <div className="space-y-3 mt-4">
                        <SearchedItemCard
                          highlightedWord={queryData}
                          index={i}
                          SearchResultItem={category}
                          title={category.title}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <RightSideBar hideData={true} />
        </div>
      </div>
    </div>
  )
}

export default Search
