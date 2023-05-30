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
    <div className="flex items-center gap-2">
      <img src={thumbnail} className="rounded-sm border min-w-0" />
      <div className="space-y-1 w-full flex-1 min-w-0">
        <h4 className="text-sm font-medium leading-4 text-jg-metal-700 truncate">{Title}</h4>
        <p className="text-sm font-normal leading-4 text-jg-metal-500 truncate">{summary}</p>
      </div>
    </div>
  )
}

export default SearchedItemCard
