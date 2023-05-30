import { Close } from '@comps/uiComps/Icons'
import { SearchIcon } from '@heroicons/react/solid'
import AdvarchSearch from '@jg/widgets/EmailAndCom/components/core/advernchSearch'
import { useCallback, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useEmailHistory } from '../store/emailHistory'
import DateFilter from './DateFilter'
import SearchPageComponent from './SearchPage'
import EmailHistoryDetails from './emailHistoryDetails'

const IntroPage = () => {
  const [searchParams] = useSearchParams()
  const { clubDocId } = useParams()
  const [isValid, setIsValid] = useState<boolean>(true)
  const [isDateValid, setIsDateValid] = useState<boolean>(false)
  const [openSearch, setOpenSearch] = useState<boolean>(false)
  const isLoading = useEmailHistory(({ isLoading }) => isLoading)
  const getHistory = useEmailHistory(({ getHistory }) => getHistory)
  const dateRange = useEmailHistory(({ dateRange }) => dateRange)
  const setDateRange = useEmailHistory(({ setDateRange }) => setDateRange)
  const searchKey = useEmailHistory(({ searchKey }) => searchKey)
  const setSearchKey = useEmailHistory(({ setSearchKey }) => setSearchKey)
  const setAdvancedSearchData = useEmailHistory(({ setAdvancedSearchData }) => setAdvancedSearchData)
  const setPageNumber = useEmailHistory(({ setPageNumber }) => setPageNumber)

  const setEmailHistoryNull = useEmailHistory(({ setEmailHistoryNull }) => setEmailHistoryNull)
  const historyId = searchParams.get('historyId')
  const subject = searchParams.get('subject')

  useEffect(() => {
    setEmailHistoryNull && setEmailHistoryNull()
  }, [clubDocId])

  useEffect(() => {
    setSearchKey('')
    setDateRange('')
  }, [])

  const onSearchClick = useCallback(async () => {
    if (
      searchKey === '' ||
      searchKey
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      const segmentExpression =
        dateRange === ''
          ? [
              {
                RuleType: 'Marketing,Operation',
                FieldId: 0,
                Field: 'OwningEntityId,Ownerid',
                Operator: 'equal',
                Value: clubDocId,
                Condition: 'and',
              },
              {
                RuleType: 'Marketing,Operation',
                FieldId: 0,
                Field: 'EmailAddress,To',
                Operator: 'having',
                Value: searchKey,
                Condition: '',
              },
            ]
          : [
              {
                RuleType: 'Marketing,Operation',
                FieldId: 0,
                Field: 'OwningEntityId,Ownerid',
                Operator: 'equal',
                Value: clubDocId,
                Condition: 'and',
              },
              {
                RuleType: 'Marketing,Operation',
                FieldId: 0,
                Field: 'EmailAddress,To',
                Operator: 'having',
                Value: searchKey,
                Condition: 'and',
              }, //basic search
              {
                RuleType: 'Marketing,Operation',
                FieldId: 0,
                Field: 'SentTime,SentDate',
                Operator: 'date between',
                Value: dateRange,
                Condition: '',
              }, //date range
            ]

      clubDocId && getHistory(segmentExpression, 1, true)
      setPageNumber(1)
      setAdvancedSearchData && setAdvancedSearchData(segmentExpression)
    }
  }, [searchKey, dateRange, clubDocId])

  return (
    <>
      {historyId && subject && <EmailHistoryDetails />}
      <div className="rounded-sm overflow-hidden border-jg-metal-100 divide-y-[1px] min-h-[calc(100vh-175px)] max-h-[calc(100vh-175px)] relative">
        {openSearch ? (
          <AdvarchSearch setOpenSearch={setOpenSearch} />
        ) : (
          <div className="md:flex justify-between items-center">
            <div className="w-full md:flex grid gap-2 p-2">
              <div>
                <div className="border rounded-2 flex flex-row relative">
                  <span className="p-1">
                    <SearchIcon className="text-jg-grey-500 w-4 m-1" />
                  </span>
                  <input
                    value={searchKey}
                    className="test h-9 focus:outline-none pr-8"
                    onChange={(event: any) => {
                      setSearchKey(event.target.value)
                      if (
                        event.target.value === '' ||
                        event.target.value
                          .toLowerCase()
                          .match(
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                          )
                      ) {
                        setIsValid(true)
                        setIsDateValid(true)
                      } else {
                        setIsValid(false)
                      }
                    }}
                    placeholder="Search by Reciever"
                    onKeyDown={(event: any) => {
                      if (event.key === 'Enter') {
                        onSearchClick()
                      }
                    }}
                  />
                  {searchKey && (
                    <div
                      onClick={() => {
                        setSearchKey('')
                        setIsValid(true)
                      }}
                    >
                      <Close className="ml-4 my-3 mr-3 h-3 w-3 absolute right-0 cursor-pointer" />
                    </div>
                  )}
                </div>

                {!isValid && searchKey !== '' && (
                  <p className="text-[12px] text-jg-red-500 font-normal">Please enter valid email address</p>
                )}
              </div>
              <DateFilter btnClass={'w-full'} isDateValid={isDateValid} setIsDateValid={setIsDateValid} />
              <div className="">
                <button
                  disabled={!isValid || isLoading || !isDateValid}
                  onClick={() => onSearchClick()}
                  className={`${
                    isValid && !isLoading && isDateValid
                      ? 'text-white bg-jg-green-500'
                      : 'bg-jg-metal-50 text-jg-metal-200 cursor-not-allowed'
                  } py-2 px-4 text-sm font-medium w-full`}
                >
                  {isLoading ? 'Searching' : 'Search'}
                </button>
              </div>
              {(searchKey || dateRange) && (
                <button
                  className={`h-9 px-3 leading-9 ${
                    isLoading
                      ? 'bg-jg-grey-50 border border-jg-grey-500 text-jg-grey-500 cursor-not-allowed'
                      : 'bg-jg-red-50 border border-jg-red-500 text-jg-red-500 cursor-pointer'
                  }`}
                  disabled={isLoading}
                  onClick={() => {
                    setSearchKey('')
                    setIsValid(true)
                    setDateRange('')
                    setIsDateValid(false)
                    setEmailHistoryNull && setEmailHistoryNull()
                  }}
                >
                  Clear Filter
                </button>
              )}
            </div>
            <div className="pr-2">
              <div
                className="flex gap-2 text-jg-green-600 items-center cursor-pointer min-w-[140px] rounded w-full justify-center pb-2"
                onClick={() => setOpenSearch(true)}
              >
                <span>Try Advance Search</span>
              </div>
            </div>
          </div>
        )}
        <SearchPageComponent openSearch={openSearch} />
      </div>
    </>
  )
}

export default IntroPage
