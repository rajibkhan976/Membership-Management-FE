import { Badge } from '@comps/uiComps'
import { ChevronDoubleRight } from '@comps/uiComps/Icons'
import { Popover } from '@headlessui/react'
import SearchedItemCard from './SearchedItemCard'

const PopoverSearchResult = ({ open, query }: { open: boolean; query: string }) => {
  const groupedBycategory = SearchResultForPopover.results.reduce(
    (groups, item) => ({
      ...groups,
      [item.categories[0]]: [...(groups[item.categories[0]] || []), item],
    }),
    {} as Record<string, any[]>
  )
  return (
    <Popover className="">
      {open && (
        <Popover.Panel
          static
          className="absolute top-11 z-10 w-full bg-white border rounded-md max-h-[508px] overflow-hidden"
        >
          <div className="p-4 bg-white text-left">
            <h3 className="text-sm font-medium leading-4 text-jg-metal-300">
              {`Search result for "${query}" in all category`}
            </h3>
            {Object.keys(groupedBycategory).map((category, i) => {
              return (
                <div key={category + i} className="">
                  <Badge rounded fillType="faded" label={category} size="md" className="mt-6 !font-medium" />
                  <div className="space-y-3 mt-4">
                    {groupedBycategory[category].map((item, i) => {
                      // const { title, categories, slug, summary, thumbnail, url } = item
                      return <SearchedItemCard key={i} highlightedWord={query} {...item} />
                    })}
                  </div>
                </div>
              )
            })}
            <div className="inline-flex gap-2 items-center text-sm leading-4 font-medium text-jg-green-500 mt-6 cursor-pointer">
              {' '}
              <span>20+ More Results found</span> <ChevronDoubleRight className="w-3 h-3" />{' '}
            </div>
          </div>
        </Popover.Panel>
      )}
    </Popover>
  )
}

export default PopoverSearchResult

const SearchResultForPopover = {
  searchQuery: 'Get',
  results: [
    {
      thumbnail: 'https://picsum.photos/48/48',
      title: 'Getting started with the Justgo web app',
      slug: 'getting-started-with-the-justgo-web-app',
      summary: 'Club+ has been rebranded into the awesome new branch of',
      categories: ['Get Started'],
      url: '#',
    },
    {
      thumbnail: 'https://picsum.photos/48/48',
      title: 'What happens to Club+ ?',
      slug: 'what-happens-to-club',
      summary: 'Club+ has been rebranded into the awesome new branch of',
      categories: ['Get Started'],
      url: '#',
    },
    {
      thumbnail: 'https://picsum.photos/48/48',
      title: 'How safe is JustGo from a data security aspect?',
      slug: 'how-safe-is-justgo-from-a-data-security-aspect',
      summary: 'Club+ has been rebranded into the awesome new branch of',
      categories: ['Integration & Automation'],
      url: '#',
    },
    {
      thumbnail: 'https://picsum.photos/48/48',
      title: 'Getting started with the Justgo web app',
      slug: 'getting-started-with-the-justgo-web-app',
      summary: 'Club+ has been rebranded into the awesome new branch of',
      categories: ['Integration & Automation'],
      url: '#',
    },
    {
      thumbnail: 'https://picsum.photos/48/48',
      title: 'Getting started with the Justgo web app',
      slug: 'getting-started-with-the-justgo-web-app',
      summary: 'Club+ has been rebranded into the awesome new branch of',
      categories: ['Integration & Automation'],
      url: '#',
    },
  ],
}
