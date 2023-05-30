import { Badge } from '@comps/uiComps'
import { ChevronDoubleRight } from '@comps/uiComps/Icons'
import { Popover } from '@headlessui/react'
import FancyScroll from '@jg/common/comps/Scrollbar/FancyScroll'
import { useNavigate } from 'react-router-dom'
import SearchedItemCard from './SearchedItemCard'

const PopoverSearchResult = ({
  open,
  query,
  SearchResult,
  path,
}: {
  SearchResult?: any
  open: boolean
  query: string
  path?: string
}) => {
  const navigate = useNavigate()

  return (
    <Popover className="">
      {open && (
        <Popover.Panel
          static
          className="absolute top-11 z-10 w-full shadow-2xl bg-white border rounded-md overflow-hidden py-2"
        >
          <FancyScroll className="max-h-[400px]">
            <div className="p-4 bg-white text-left">
              <h3 className="text-sm font-medium leading-4 text-jg-metal-300">
                {`Search result for "${query}" in all category`}
              </h3>
              {SearchResult && SearchResult.length > 0 && (
                <div>
                  {SearchResult &&
                    SearchResult.length >= 0 &&
                    SearchResult.map((SearchResultItem: any, i: number) => {
                      return (
                        <div className="" key={i}>
                          <Badge
                            rounded
                            fillType="faded"
                            label={SearchResultItem.category}
                            size="md"
                            className="mt-6 !font-medium"
                          />
                          <div className="space-y-3 mt-4">
                            <SearchedItemCard
                              highlightedWord={query}
                              index={i}
                              SearchResultItem={SearchResultItem}
                              title={SearchResultItem.title}
                            />
                          </div>
                        </div>
                      )
                    })}

                  <div className="jg-hidden md:block">
                    {SearchResult && SearchResult.length >= 5 && (
                      <div className="inline-flex gap-2 items-center text-sm leading-4 font-medium text-jg-green-500 mt-6">
                        <span className="flex gap-2">
                          <span>
                            {SearchResult && SearchResult.length > 0
                              ? `${SearchResult.length}+ Result${SearchResult.length > 1 ? 's' : ''} found`
                              : ' No Result Found'}{' '}
                          </span>
                          <span
                            className="flex items-center gap-1 cursor-pointer"
                            onClick={() => {
                              navigate(`${path}`)
                            }}
                          >
                            <span>See More</span>
                            <span>
                              <ChevronDoubleRight className="w-3 h-3" />
                            </span>
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="md:jg-hidden">
                    {SearchResult && SearchResult.length >= 3 && (
                      <div className="inline-flex gap-2 items-center text-sm leading-4 font-medium text-jg-green-500 mt-6">
                        <span className="flex gap-2">
                          <span>
                            {SearchResult && SearchResult.length > 0
                              ? `${SearchResult.length}+ Result${SearchResult.length > 1 ? 's' : ''} found`
                              : ' No Result Found'}{' '}
                          </span>
                          <span
                            className="flex items-center gap-1 cursor-pointer"
                            onClick={() => {
                              navigate(`${path}`)
                            }}
                          >
                            <span>See More</span>
                            <span>
                              <ChevronDoubleRight className="w-3 h-3" />
                            </span>
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </FancyScroll>
        </Popover.Panel>
      )}
    </Popover>
  )
}

export default PopoverSearchResult
