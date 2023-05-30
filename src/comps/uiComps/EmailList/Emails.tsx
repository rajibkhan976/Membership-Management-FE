import EmailsListItem from '@comps/uiComps/EmailList/EmailsListItem'
import { ClickItemReport } from '@comps/uiComps/EmailList/components/report/ClickItemReport'
import { EmailStatus } from '@comps/uiComps/EmailList/status.enum'
import HelpIntro from '@comps/uiComps/HelpIntro/HelpIntro'
import {
  CheckAll,
  Close,
  EmailSending,
  FileOutline,
  InboxFull,
  Refresh,
  Search,
  SendLaterOutline,
} from '@comps/uiComps/Icons/index'
import { MailIcon } from '@heroicons/react/solid'
import { ReactComponent as EmailLogoIcon } from '@jg/assets/images/EmailLogoIcon.svg'
import Modal from '@jg/common/comps/Modal'
import SearchComponent from '@jg/common/comps/searchBar/SearchComponent'
import ModalTitle from '@jg/widgets/EmailAndCom/comps/ModalTitle'
import type { Items } from '@jg/widgets/EmailAndCom/interfaces/interfaces'
import { useEmailList } from '@jg/widgets/EmailAndCom/store/EmailStore'
import { useWidgetContext } from 'jg-widget'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Button from '../Button/Button'
import DateFilterDropdown from './DateFilterDropdown'
import EmailListPlaceholder from './EmailListPlaceholder'
import EmailNotFound from './EmailNotFound'
import EmailsLeftBar from './EmailsLeftBar'
import EmailsMblTopBar from './EmailsMblTopBar'
import TagFilterDropdown from './TagFilterDropdown'
import { useInfiniteScroll } from './hooks/useInfiniteScroll'
import useGetSelectedClub from '@jg/widgets/ClubSwitcher/store/selectedClube'
import { useJGPackageContext } from '@jg/providers/JGPackageProvider'
const menuItems: Items[] = [
  {
    icon: <InboxFull width={12} height={12} />,
    title: 'All',
    status: EmailStatus.ALL,
  },
  {
    icon: <FileOutline width={10.6} height={13.33} />,
    title: 'Drafts',
    status: EmailStatus.DRAFTS,
  },
  {
    icon: <SendLaterOutline width={14} height={13.33} />,
    title: 'Schedule',
    status: EmailStatus.SCHEDULE,
  },
  {
    icon: <CheckAll width={15.5} height={8.95} />,
    title: 'Sent',
    status: EmailStatus.SENT,
  },
  {
    icon: <EmailSending />,
    title: 'Sending',
    status: EmailStatus.SENDING,
  },
]

const Emails = () => {
  const club = useGetSelectedClub(({ club }) => club)
  const { jgPackage } = useJGPackageContext()
  const { clubDocId } = useParams()
  const [searchParams] = useSearchParams()
  const status = searchParams.get('status')
  const [open, setOpen] = useState<boolean>(false)
  const [isRefresh, setIsRefresh] = useState<boolean>(false)
  const [search, setSearch] = useState<boolean>(false)
  const [currentRows, setCurrentRows] = useState<number>(0)
  const [showTagFilterOptions, setShowTagFilterOptions] = useState<boolean>(false)
  const [showDateFilterOptions, setShowDateFilterOptions] = useState<boolean>(false)

  const {
    emailList: emailListFromStore,
    count: emailCountFromStore,
    fetch: getEmailList,
    key,
    setKey,
    sideFilterStatus,
    dateFilterActive,
    tagFilterActive,
    dateFilterData,
    tagFilterData,
    pageNumber,
    numberOfRows,
    setSideFilterStatus,
    setDateFilterData,
    setTagFilterData,
    setDateFilterActive,
    setTagFilterActive,
    setPageNumber,
    setValueNull,
  } = useEmailList((state) => state)
  const isLoading = useEmailList(({ isLoading }) => isLoading)
  const { onScroll } = useInfiniteScroll('infiniteScroll', pageNumber, setPageNumber)
  const navigate = useNavigate()
  const { basePath } = useWidgetContext()
  const mailStatus: number = status ? +status : 100
  const activityType = searchParams.get('activityType')
  const segmentTitle = searchParams.get('segmentTitle')
  const segmentId = searchParams.get('segmentId')
  const title = searchParams.get('title')
  const emailId = searchParams.get('emailId')

  const PageLimit = Math.ceil(emailCountFromStore / numberOfRows)

  useEffect(() => {
    setDateFilterActive(false)
    setTagFilterActive(false)
    setDateFilterData(null)
    setTagFilterData('')
  }, [])

  useEffect(() => {
    if (pageNumber * numberOfRows < emailCountFromStore) {
      setCurrentRows(pageNumber * numberOfRows)
    } else {
      setCurrentRows(emailCountFromStore)
    }
  }, [pageNumber, emailListFromStore])

  useEffect(() => {
    setSearch(false)
  }, [clubDocId])

  useEffect(() => {
    setSideFilterStatus(100)
  }, [clubDocId, setSideFilterStatus])

  useEffect(() => {
    setSideFilterStatus(status ? +status : 100)
  }, [status])

  useEffect(() => {
    setPageNumber(1)
  }, [clubDocId, sideFilterStatus, dateFilterData, tagFilterData])

  useEffect(() => {
    if (clubDocId) {
      getEmailList({
        Method: 'GetEmailList',
        OwningEntityId: clubDocId,
        Status: sideFilterStatus === 100 ? null : sideFilterStatus,
        PageNumber: pageNumber,
        NumberOfRows: numberOfRows,
        Key: key,
        Date: dateFilterData,
        Tags: tagFilterData,
      })
    }
  }, [
    clubDocId,
    pageNumber,
    getEmailList,
    numberOfRows,
    status,
    sideFilterStatus,
    tagFilterData,
    dateFilterData,
    search,
  ])

  const onchange = useCallback(
    async (data: string) => {
      setValueNull()
      setKey(data)
      setSearch(true)
      setPageNumber(1)
      if (clubDocId) {
        getEmailList({
          Method: 'GetEmailList',
          OwningEntityId: clubDocId,
          PageNumber: pageNumber,
          NumberOfRows: numberOfRows,
          Status: sideFilterStatus === 100 ? null : sideFilterStatus,
          Key: data,
          Date: dateFilterData,
          Tags: tagFilterData,
        })
      }
    },
    [clubDocId, getEmailList, numberOfRows, pageNumber, isRefresh, sideFilterStatus]
  )

  const sideMenuFilter = (data: EmailStatus) => {
    setSideFilterStatus(data)
    setPageNumber(1)
    setValueNull()
    if (clubDocId) {
      getEmailList({
        Method: 'GetEmailList',
        OwningEntityId: clubDocId,
        Status: data === 100 ? null : data,
        PageNumber: 1,
        NumberOfRows: numberOfRows,
        Key: key,
        Date: dateFilterData,
        Tags: tagFilterData,
      })
    }
  }

  const clearFilter = () => {
    setDateFilterActive(false)
    setTagFilterActive(false)
    setDateFilterData(null)
    setTagFilterData('')
  }

  useEffect(() => {
    if (pageNumber < PageLimit) {
      document?.getElementById('infiniteScroll')?.addEventListener('scroll', onScroll)
    }
    return () => document?.getElementById('infiniteScroll')?.removeEventListener('scroll', onScroll)
  }, [emailListFromStore])

  return (
    <>
      {activityType && segmentTitle && emailId && segmentId && (
        <ClickItemReport
          segmentTitle={segmentTitle}
          ModalTitle={<ModalTitle title={title || ''} />}
          pageNumber={1}
          setPageNumber={() => console.log(4)}
          numberOfRows={30}
        />
      )}
      {sideFilterStatus === 100 && emailListFromStore && emailListFromStore.length < 1 && !search ? (
        <HelpIntro
          title={`Let's Send Email`}
          description={`Now the time to automate, personalize and streamline your communication! It's easier to send emails to your members through`}
          routeLink={`${basePath}${clubDocId}/emails/compose`}
          iconSVG={<EmailLogoIcon />}
        />
      ) : (
        <div className="flex flex-row min-h-[calc(100vh-175px)] max-h-[calc(100vh-175px)]">
          {/* {TODO: Inactive in mobile screen} */}
          <EmailsLeftBar
            mainButton={
              <Button
                btnColor="primary"
                btnSize="md"
                fillType="solid"
                icon={<MailIcon />}
                iconPosition="left"
                text="New Email"
                onClick={() => navigate(`${basePath}${clubDocId}/emails/compose`)}
              />
            }
            selected={sideFilterStatus ? sideFilterStatus : 0}
            sideMenuFilter={sideMenuFilter}
            items={
              club?.entityType === null || jgPackage === 'pro'
                ? menuItems
                : menuItems.filter((item) => item.status !== EmailStatus.SCHEDULE)
            }
          />
          <div className="relative w-full border-0 md:border-l">
            <div className="mt-1.5 px-2 py-1.5 border-b visible hidden md:flex justify-between">
              {/* {Inactive in mobile screen} */}
              <div className="flex gap-3">
                <div className="border-[1px] border-[#CFD8DC]">
                  <SearchComponent placeholder="Search all email" onchange={onchange} value={key || ''} />
                </div>
                <div className="flex gap-3">
                  <DateFilterDropdown
                    setSearch={setSearch}
                    setShowDateFilterOptions={setShowDateFilterOptions}
                    showDateFilterOptions={showDateFilterOptions}
                  />
                  <TagFilterDropdown
                    setShowTagFilterOptions={setShowTagFilterOptions}
                    showTagFilterOptions={showTagFilterOptions}
                    setSearch={setSearch}
                  />
                  <div>
                    {(dateFilterActive || tagFilterActive) && (
                      <button
                        className="hidden visible lg:flex items-center gap-2 bg-[#FFEBEE] border border-[#EF9A9A] text-[#F44236] text-[13px] font-semibold rounded-sm p-2"
                        onClick={clearFilter}
                      >
                        <Close height={13} width={13} />
                        Clear Filter
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <div
                  className="flex items-center gap-2"
                  onClick={async () => {
                    setValueNull()
                    setPageNumber(1)
                    clubDocId &&
                      getEmailList({
                        Method: 'GetEmailList',
                        OwningEntityId: clubDocId,
                        Status: sideFilterStatus === 100 ? null : sideFilterStatus,
                        PageNumber: 1,
                        NumberOfRows: numberOfRows,
                        Key: key,
                        Date: dateFilterData,
                        Tags: tagFilterData,
                      })
                  }}
                >
                  <Refresh height={14} width={14} fill="#4CAF4F" />
                  <p className="text-[#4CAF4F] text-[13px]">Refresh</p>
                </div>
                <span className="text-jg-metal-700">
                  {currentRows} of {emailCountFromStore}
                </span>
              </div>
            </div>
            {/* {Todo: active in mobile screen} */}
            <EmailsMblTopBar
              items={
                club?.entityType === null || jgPackage === 'pro'
                  ? menuItems
                  : menuItems.filter((item) => item.status !== EmailStatus.SCHEDULE)
              }
              selected={mailStatus}
              sideMenuFilter={sideMenuFilter}
              onchange={onchange}
              refresh={setIsRefresh}
            />
            <div
              id="infiniteScroll"
              className="bg-jg-grey-50 overflow-y-scroll min-h-[calc(100vh-232px)] max-h-[calc(100vh-232px)] md:bg-white "
            >
              {emailListFromStore && emailListFromStore.length < 1 && search && (
                <div>
                  <EmailNotFound
                    icon={<Search height={150} width={150} fill="#fff" />}
                    title="No Email found for this search"
                  />
                </div>
              )}
              {emailListFromStore &&
                emailListFromStore.length > 0 &&
                emailListFromStore.map((item, i: number) =>
                  isLoading ? (
                    Array.from({ length: 10 }, (v, l) => <EmailListPlaceholder key={l} />)
                  ) : (
                    <div key={i}>
                      <EmailsListItem
                        mailList={item.Rows}
                        month={item.Month}
                        count={item.Count}
                        sideFilterStatus={sideFilterStatus}
                      />
                    </div>
                  )
                )}
              {sideFilterStatus < 0 && emailListFromStore && emailListFromStore.length < 1 && (
                <EmailNotFound
                  icon={<Search className="w-[70px] h-[50px] md:w-[100px] md:h-[70px]" fill="#9e9e9e" />}
                  title={'No results found'}
                  description={"Try adjusting your search or filter to find what you're looking for."}
                />
              )}

              {/* {row start} */}
            </div>
          </div>
          <Modal {...{ open, setOpen }} />
          <div className="block visible lg:hidden absolute bottom-2 right-2 w-[calc(100%-16px)]">
            <Button
              className="justify-center w-full"
              btnColor="primary"
              btnSize="md"
              fillType="solid"
              icon={<MailIcon />}
              iconPosition="left"
              text="New Email"
              onClick={() => navigate(`${basePath}${clubDocId}/emails/compose`)}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Emails
