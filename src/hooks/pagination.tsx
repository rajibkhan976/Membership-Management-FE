import { ChevronLeft, ChevronRight } from '@comps/uiComps/Icons'

export const usePagination = (setPageNumber: (value: number) => void, numberOfRows: number, count: number) => {
  const onLeftClick = (prev: number) => {
    prev > 1 ? setPageNumber(prev - 1) : setPageNumber(1)
  }

  const onRightClick = (prev: number) => {
    if (count && numberOfRows) {
      prev >= count / numberOfRows ? setPageNumber(prev) : setPageNumber(prev + 1)
    }
  }

  return {
    onLeftClick,
    onRightClick,
  }
}

export type paginationDesignProps = {
  from: number
  to: number
  count: number
  onLeftClick: (pageNumber: number) => void
  onRightClick: (pageNumber: number) => void
  pageNumber: number
  numberOfRows: number
}
export const PaginationDesign = ({
  count,
  pageNumber,
  onLeftClick,
  onRightClick,
  numberOfRows,
}: paginationDesignProps) => (
  <div className="flex flex-row justify-between items-center space-x-4">
    <span className="inline-block text-xs text-jg-metal-500">
      {pageNumber > 1 ? (pageNumber - 1) * numberOfRows + 1 : pageNumber}-
      {pageNumber * numberOfRows > count ? count : pageNumber * numberOfRows} of{' '}
      <span className="text-jg-metal-700">{count}</span>
    </span>
    <button
      className="text-gray-300 hover:text-green-400 disabled:text-gray-300 disabled:pointer-events-none"
      onClick={() => pageNumber && onLeftClick(pageNumber)}
      disabled={pageNumber === 1}
    >
      <ChevronLeft width={7.41} height={12} />
    </button>
    <button
      className="text-gray-300 hover:text-green-400 disabled:text-gray-300 disabled:pointer-events-none"
      onClick={() => pageNumber && onRightClick(pageNumber)}
      disabled={pageNumber * numberOfRows >= count}
    >
      <ChevronRight width={7.41} height={12} />
    </button>
  </div>
)
