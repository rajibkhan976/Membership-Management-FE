import { Button } from '@comps/uiComps'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { RouteButton } from '@jg/common/comps'
import AnimatedSpin from '@jg/common/comps/loader/AnimatedSpin'
import { SaveWaitlist } from '@jg/common/dataAPIs/eventsAnsSchedules'
import { AsyncStatus, MemberType } from '@jg/common/types'
import { useRouter } from '@jg/hooks'
import { useMessageBoxContext } from '@jg/providers/MessageBoxProvider'
import { useSessionUserContext } from '@jg/providers/SessionUserProvider'
import { useSgininContext } from '@jg/providers/Signin/SigninProvider'
import { useEventConfig } from '@jg/widgets/Events/EventWidget'
import BookATicketStoreProvider, { useBookATicketStoreContext } from '@jg/widgets/Events/providers/BookATicketProvider'
import { useEventTicketListStoreContext } from '@jg/widgets/Events/providers/EventTicketListStoreProvider'
import { useWidgetContext } from 'jg-widget'
import { createContext, useContext, useEffect, useState } from 'react'

const SaveWaitlistButton = ({
  detailsPath,
  docId,
  index,
  eventDocIdHash,
}: {
  detailsPath: string
  docId: number
  index: number
  eventDocIdHash: string
}) => {
  const { basePath } = useWidgetContext()
  const { familyInfo, loadAdministrativeClubs, administrativeClubs, loadFamilyInfo, userInfo } = useSessionUserContext()
  const { navigate } = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [asyncStatus, setAsyncStatus] = useState<AsyncStatus>('idle')
  const { show } = useMessageBoxContext((state) => ({ show: state.show }))
  const { bookingProgressStatus, setBookingProgressStatus } = useEventTicketListStoreContext((state) => ({
    bookingProgressStatus: state.bookingProgressStatus,
    setBookingProgressStatus: state.setBookingProgressStatus,
  }))
  const { isPublic } = useEventConfig()
  const { showSigninOrSginupModal } = useSgininContext()
  const { esc } = useRouter()
  useEffect(() => {
    if (bookingProgressStatus === 'init') {
      setIsLoaded(false)
      setAsyncStatus('idle')
    }
    if (bookingProgressStatus === 'saveWaitlistCompleted') {
      setAsyncStatus('success')
    }
  }, [bookingProgressStatus])
  //const

  useEffect(() => {
    if (isLoaded) {
      const isGroupBooking = (administrativeClubs || []).length > 0 || (familyInfo?.Members as MemberType[]).length > 0
      if (isGroupBooking) navigate(`${basePath}${detailsPath}/${eventDocIdHash}/save-waitlist/${index}`)
      else {
        SaveWaitlist({
          ticketDocId: docId,
          entityIds: [userInfo ? userInfo.MemberDocId : -1],
          source: 'Waitlist',
        }).then(() => {
          setAsyncStatus('success')
        })
      }
    }
  }, [isLoaded])

  useEffect(() => {
    if (asyncStatus === 'success') {
      show({ message: 'Thank you, we will notify you as soon as this becomes available' })
    }
  }, [asyncStatus])

  return (
    <>
      {isPublic ? (
        <Button
          text={asyncStatus == 'pending' ? 'Wait...' : asyncStatus === 'success' ? 'Done' : 'Add to Wait List'}
          icon={asyncStatus === 'pending' ? <AnimatedSpin /> : asyncStatus === 'success' ? <CheckCircleIcon /> : ''}
          // text={'Add to Wait List'}
          fillType="outline"
          btnColor="warning"
          className="!bg-jg-yellow-50 "
          onClick={() => {
            showSigninOrSginupModal(() => {
              esc(`Workbench/i/r/EventsAndBookings/${detailsPath}/${eventDocIdHash}/save-waitlist/${index}`)
            })
          }}
        />
      ) : (
        <Button
          text={asyncStatus == 'pending' ? 'Wait...' : asyncStatus === 'success' ? 'Done' : 'Add to Wait List'}
          icon={asyncStatus === 'pending' ? <AnimatedSpin /> : asyncStatus === 'success' ? <CheckCircleIcon /> : ''}
          // text={'Add to Wait List'}
          fillType="outline"
          btnColor="warning"
          className="!bg-jg-yellow-50 "
          onClick={() => {
            setAsyncStatus('pending')
            if (familyInfo === null && administrativeClubs === null)
              loadFamilyInfo(() => {
                loadAdministrativeClubs(() => {
                  setIsLoaded(true)
                })
              })
            else setIsLoaded(true)
          }}
        />
      )}
    </>
  )
}
export default SaveWaitlistButton
