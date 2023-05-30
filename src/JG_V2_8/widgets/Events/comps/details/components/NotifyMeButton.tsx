import { Button } from '@comps/uiComps'
import { CheckCircleIcon, CheckIcon } from '@heroicons/react/outline'
import AnimatedSpin from '@jg/common/comps/loader/AnimatedSpin'
import { SaveWaitlist } from '@jg/common/dataAPIs/eventsAnsSchedules'
import { AsyncStatus } from '@jg/common/types'
import { useRouter } from '@jg/hooks'
import { useMessageBoxContext } from '@jg/providers/MessageBoxProvider'
import { useSessionUserContext } from '@jg/providers/SessionUserProvider'
import { useSgininContext } from '@jg/providers/Signin/SigninProvider'
import { useEventConfig } from '@jg/widgets/Events/EventWidget'
import { useEffect, useState } from 'react'

const NotifyMeButton = ({
  ticketDocId,
  eventDocIdHash,
  detailsPath,
}: {
  ticketDocId: number
  eventDocIdHash: string
  detailsPath: string
}) => {
  const [asyncStatus, setAsyncStatus] = useState<AsyncStatus>('idle')
  const { show } = useMessageBoxContext((state) => ({ show: state.show }))
  const { userInfo } = useSessionUserContext()
  const { isPublic } = useEventConfig()
  const { showSigninOrSginupModal } = useSgininContext()
  const { esc } = useRouter()
  useEffect(() => {
    if (asyncStatus === 'pending') {
      SaveWaitlist({
        ticketDocId: ticketDocId,
        entityIds: [userInfo ? userInfo.MemberDocId : -1],
        source: 'NotifyMe',
      }).then(() => {
        setAsyncStatus('success')
      })
    }
    if (asyncStatus === 'success') {
      show({ message: 'Thank you, we will notify you as soon as this becomes available' })
    }
  }, [asyncStatus])
  return isPublic ? (
    <Button
      text={asyncStatus == 'pending' ? 'Wait...' : asyncStatus === 'success' ? 'Done' : 'Notify Me'}
      icon={asyncStatus === 'pending' ? <AnimatedSpin /> : asyncStatus === 'success' ? <CheckCircleIcon /> : ''}
      fillType="outline"
      btnColor="info"
      className="!bg-jg-blue-50"
      onClick={() => {
        esc(`Workbench/i/r/EventsAndBookings/${detailsPath}/${eventDocIdHash}`)
      }}
    />
  ) : (
    <Button
      text={asyncStatus == 'pending' ? 'Wait...' : asyncStatus === 'success' ? 'Done' : 'Notify Me'}
      icon={asyncStatus === 'pending' ? <AnimatedSpin /> : asyncStatus === 'success' ? <CheckCircleIcon /> : ''}
      fillType="outline"
      btnColor="info"
      className="!bg-jg-blue-50"
      onClick={() => {
        if (asyncStatus === 'idle') setAsyncStatus('pending')
      }}
    />
  )
}

export default NotifyMeButton
