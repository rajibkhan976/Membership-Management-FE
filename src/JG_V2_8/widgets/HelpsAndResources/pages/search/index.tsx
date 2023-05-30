import { Badge } from '@comps/uiComps'
import { ChevronDoubleRight } from '@comps/uiComps/Icons'
import { useSearchParams } from 'react-router-dom'
import MobileSecondaryNav from '../../components/MobileSecondaryNav'
import RightSideBar from '../../components/RightSideBar'
import SecondaryNav from '../../components/SecondaryNav'

const Search = () => {
  const [params] = useSearchParams()
  const query = params.get('q') || ''
  const category = params.get('category') || ''
  const groupedBycategory = SearchResultForPopover.results.reduce(
    (groups, item) => ({
      ...groups,
      [item.categories[0]]: [...(groups[item.categories[0]] || []), item],
    }),
    {} as Record<string, any[]>
  )
  const howMany = 73

  const xResultFoundForY = `${howMany} results found for "${query}"`
  return (
    <div className="w-full bg-[#fafafa]">
      <div className=" max-w-[1170px] mx-auto">
        <SecondaryNav className="jg-hidden md:flex" title={xResultFoundForY} />
        <MobileSecondaryNav className="flex md:jg-hidden" />
        <h3 className="text-xl leading-6 font-semibold text-jg-metal-700 md:jg-hidden m-4">{xResultFoundForY}</h3>
        <div className="flex gap-x-[30px] relative md:mt-[72px] m-4">
          <div className="flex lg:max-w-[770px] w-full flex-col flex-wrap min-w-0">
            <div className="bg-white text-left w-full min-w-0 border border-jg-metal-50 divide-y divide-jg-metal-50 rounded-md">
              <h3 className="font-medium leading-5 text-jg-metal-300 p-4">
                {`Search result for "${query}" in ${category || 'all'} category`}
              </h3>
              <div className="p-4 px-6 pt-0">
                {Object.keys(groupedBycategory).map((category, i) => {
                  return (
                    <div key={category + i}>
                      <Badge
                        rounded
                        fillType="faded"
                        label={category}
                        size="md"
                        className={`${i === 0 ? 'mt-4' : 'mt-6'} !font-medium`}
                      />
                      <div className="space-y-3 mt-4">
                        {groupedBycategory[category].map((item, i) => {
                          // const { title, categories, slug, summary, thumbnail, url } = item
                          return <SearchedItemCard key={i} highlightedWord={query} {...item} />
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <RightSideBar />
        </div>
      </div>
    </div>
  )
}

export default Search

const SearchedItemCard = ({
  title,
  summary,
  thumbnail,
  slug,
  url,
  highlightedWord,
}: {
  title: string
  summary: string
  thumbnail: string
  slug: string
  url: string
  highlightedWord: string
}) => {
  const Title = (
    <>
      {title.split(new RegExp(`(${highlightedWord})`, 'gi')).flatMap((word, i) =>
        word.toLowerCase() === highlightedWord.toLowerCase() ? (
          <span key={i} className="text-jg-green-400">
            {word}
          </span>
        ) : (
          <span key={i}>{word}</span>
        )
      )}
    </>
  )

  return (
    <div className="flex items-center gap-3">
      <img src={thumbnail} className="rounded-sm border min-w-0" />
      <div className="space-y-1 w-full flex-1 min-w-0">
        <h4 className="text-sm font-medium leading-4 text-jg-metal-700 truncate">{Title}</h4>
        <p className="text-sm font-normal leading-4 text-jg-metal-500 truncate">{summary}</p>
      </div>
    </div>
  )
}

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
