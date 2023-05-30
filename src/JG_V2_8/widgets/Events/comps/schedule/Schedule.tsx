import Banner from '../banner/Banner'
import MyBookingFilter from './my-booking-filterbar/BookingFilterbar'
import CourseBookingFilterResult from './CourseBookingFilterResult'
import BookingSearchResultSummary from './BookingSearchResultSummary'
import useCourseBookingStore from '../../store/useCourseBookingStore'
import { useEffect, useState } from 'react'
import useNavigateWithArgsMB from '../hooks/useNavigateWithArgsMB'
import { useSessionUserContext } from '@jg/providers/SessionUserProvider'
import { MemberType } from '@jg/common/types'
import { ModalOld as Modal } from '@jg/common/comps'
import { Button } from '@comps/uiComps'
import { useLocation } from 'react-router-dom'

const Schedule = () => {
  const { familyInfo, userInfo } = useSessionUserContext()
  const filterBarReadyStatus = useCourseBookingStore((state) => state.filterBarReadyStatus)
  const setFilterbarReadyStatus = useCourseBookingStore((state) => state.setFilterbarReadyStatus)
  const [isFilterBarDataLoaded, setIsFilterBarDataLoaded] = useState<boolean>(false)
  const { getArgsFromUrl } = useNavigateWithArgsMB()
  const setSerachRequestArg = useCourseBookingStore((state) => state.setSerachRequestArg)
  const args = getArgsFromUrl()
  const { allowPastBooking, category, familyMembers, clubMembers, isOnlyOnline } = args
  const [isOpenFilterBar, setIsOpenFilterBar] = useState<boolean>(false)
  const location = useLocation()

  useEffect(() => {
    localStorage.setItem('prevNavOfDetailsPage', location.pathname + location.search)
  }, [])

  useEffect(() => {
    if (isFilterBarDataLoaded && userInfo !== null) {
      const docIds = new Set<number>()
      if (familyMembers[0] === 'all') {
        ;(familyInfo?.Members as MemberType[]).forEach((e) => {
          docIds.add(e.DocId)
        })
      } else {
        familyMembers.forEach((e) => {
          docIds.add(Number(e))
        })
      }

      if (clubMembers?.length > 0) {
        clubMembers?.forEach((memberDocId) => docIds.add(+memberDocId))
      }

      if (userInfo && docIds?.size === 0) {
        docIds.add(userInfo.MemberDocId)
      }

      setSerachRequestArg({
        docIds: [...docIds],
        selection: allowPastBooking ? 'Past' : 'Upcoming',
        isOnline: isOnlyOnline,
        category: category,
      })
    }
  }, [args]) //userInfo

  return (
    <div className="flex flex-col shadow-none w-full">
      {/* <div className="flex flex-col shadow-none md:shadow w-full"> */}
      <Banner className="md:h-[216px] h-[50vh]">
        <BookingSearchResultSummary />
      </Banner>
      <div className="jg-container fixed top-[156px] bottom-0 inset-x-0  ">
        {/* <div className="mt-[-80px] border-0 md:border flex flex-col md:flex-row  w-full md:jg-container h-5/6 mx-0 md:mx-auto rounded"> */}

        <div className="flex md:border md:rounded w-full h-full">
          <MyBookingFilter
            className="flex-none hidden visible md:block md:w-[270px] overflow-auto bg-white"
            onReady={() => {
              setFilterbarReadyStatus('success')
              setTimeout(() => {
                setIsFilterBarDataLoaded(true)
              }, 500)
            }}
          />
          {filterBarReadyStatus === 'success' && (
            <>
              <CourseBookingFilterResult handleOpenFilterBar={(status) => setIsOpenFilterBar(status)} />
              <Modal
                open={isOpenFilterBar}
                setOpen={setIsOpenFilterBar}
                hideCloseAction
                bodySection={() => (
                  <MyBookingFilter
                    className="flex-none block w-full overflow-auto bg-white"
                    onReady={() => {
                      setFilterbarReadyStatus('success')
                      setTimeout(() => {
                        setIsFilterBarDataLoaded(true)
                      }, 500)
                    }}
                  />
                )}
                actionButtons={() => {
                  return (
                    <div className="flex justify-end items-center w-full">
                      <Button
                        btnColor="secondary"
                        fillType="outline"
                        text="Close"
                        onClick={() => setIsOpenFilterBar(false)}
                      ></Button>
                    </div>
                  )
                }}
                customSecionClassName={{ titleClass: 'flex items-center jg-hidden', bodyClass: '!top-0' }}
              ></Modal>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Schedule
