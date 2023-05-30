import { ResolveClientURL } from '@jg/_core/utils/URL'
import { useWidgetContext } from 'jg-widget'
import { useNavigate } from 'react-router-dom'
import pdfIcon from '../../../../images/thumbnail/pdf-icon.png'
import videoIcon from '../../../../images/thumbnail/video-icon.png'

const SearchedItemCard = ({
  title,
  highlightedWord,
  SearchResultItem,
  index,
}: {
  SearchResultItem?: any
  title: string
  highlightedWord: string
  index: number
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

  const Description = (
    <>
      {SearchResultItem.description.split(new RegExp(`(${highlightedWord})`, 'gi')).flatMap((word: string, i: number) =>
        word.toLowerCase() === highlightedWord.toLowerCase() ? (
          <span key={i} className="text-jg-green-300 font-bold	">
            {word}
          </span>
        ) : (
          <span key={i}>{word}</span>
        )
      )}
    </>
  )
  const { basePath } = useWidgetContext()
  const navigate = useNavigate()

  return (
    <>
      {SearchResultItem && (
        <div className="flex flex-col gap-2">
          <div
            className="flex cursor-pointer"
            onClick={() => navigate(`${basePath}article/${SearchResultItem.contentId}`)}
          >
            <img
              src={
                SearchResultItem.type === 'Video'
                  ? 'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/GettingStarted/VideoThumbNail/video.png'
                  : 'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/GettingStarted/VideoThumbNail/pdf.png'
              }
              className="rounded-sm border min-w-0 w-16 h-16 p-1"
            />
          </div>
          <div className="space-y-1 w-full flex-1 min-w-0">
            <h4 className="text-sm font-medium leading-4 text-jg-metal-700">
              <span
                className="cursor-pointer"
                onClick={() => navigate(`${basePath}article/${SearchResultItem.contentId}`)}
              >
                {Title}
              </span>
            </h4>
            <p className="text-xs font-normal leading-5 text-jg-metal-500">
              <span
                className="cursor-pointer"
                onClick={() => navigate(`${basePath}article/${SearchResultItem.contentId}`)}
              >
                {Description}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default SearchedItemCard
