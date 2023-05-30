import useNavigateWithArgsMB from '../../hooks/useNavigateWithArgsMB'
import { useSessionUserContext } from '@jg/providers/SessionUserProvider'
import { MemberType } from '@jg/common/types'
import MyBookingFilterLabel from './MBFilterLabel'

const LabelForFamilyMember = () => {
  const { getArgsFromUrl } = useNavigateWithArgsMB()
  const { familyMembers } = getArgsFromUrl()
  const { familyInfo } = useSessionUserContext()
  const { Members } = familyInfo || {}

  const ActiveContent =
    (Members as MemberType[])
      .filter((m) => familyMembers.includes(m.DocId + ''))
      .slice(0, 3)
      .map((m) => `${m.FirstName} ${m.LastName}`)
      .join(', ') + `${familyMembers.length > 3 ? ` + ${familyMembers.length - 3} more` : ''}`

  return (
    <MyBookingFilterLabel
      ActiveContent={ActiveContent}
      name={'familyMembers'}
      determineActive={(p) => (p as string[])[0] !== 'all'}
    />
  )
}

export default LabelForFamilyMember
