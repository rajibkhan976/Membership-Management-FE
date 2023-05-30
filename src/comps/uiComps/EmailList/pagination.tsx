import { useState, useEffect, useContext } from 'react'
import { Refresh, ChevronLeft, ChevronRight } from '@comps/uiComps/Icons/index'
import EmailAndComContext from '@jg/widgets/EmailAndCom/EmailAndComContext'
import type { EmailPaginationProps } from './Interfaces'

const EmailPagination = ({ count, setPageNumber, refresh, numberOfRows, pageNumber }: EmailPaginationProps) => {
  const [from, setFrom] = useState<number>(0)
  const [to, setTo] = useState<number>(0)
  const emailAndComContext = useContext(EmailAndComContext)

  useEffect(() => {
    if (pageNumber && numberOfRows && count) {
      setFrom(pageNumber * numberOfRows - (numberOfRows - 1))
      pageNumber * numberOfRows > count ? setTo(count) : setTo(pageNumber * numberOfRows)
    }
  }, [pageNumber, count, numberOfRows])

  useEffect(() => {
    setPageNumber(1)
  }, [emailAndComContext.selectedClubId, setPageNumber])

  const onLeftClick = (prev: number) => {
    prev > 1 ? setPageNumber(prev - 1) : setPageNumber(1)
  }

  const onRightClick = (prev: number) => {
    if (count && numberOfRows) {
      prev >= count / numberOfRows ? setPageNumber(prev) : setPageNumber(prev + 1)
    }
  }

  return (
    <>
      <div className="ml-auto flex">
        <div className="flex flex-row justify-between items-center">
          <button className={`active:text-jg-green-500 text-[16px]`} onClick={() => refresh((pre: boolean) => !pre)}>
            <Refresh width={16} height={16} fill="#455a64" />
          </button>
          <span className="mx-4 inline-block text-xs text-jg-metal-500">
            {from}-{to} of <span className="text-jg-metal-700">{count}</span>
          </span>
          <button
            className="text-jg-grey-700 active:text-jg-green-500"
            onClick={() => pageNumber && onLeftClick(pageNumber)}
            disabled={from === 1}
          >
            <ChevronLeft width={7.41} height={12} fill="#CFD8DC" />
          </button>
          <button
            className="text-jg-grey-700 active:text-jg-green-500 ml-4"
            onClick={() => pageNumber && onRightClick(pageNumber)}
            disabled={to === count}
          >
            <ChevronRight width={7.41} height={12} fill="#CFD8DC" />
          </button>
        </div>
      </div>
    </>
  )
}
export default EmailPagination
