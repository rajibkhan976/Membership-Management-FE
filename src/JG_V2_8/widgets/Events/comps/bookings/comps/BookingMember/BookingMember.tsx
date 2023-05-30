import { Avatar, Badge } from '@comps/uiComps'
import Checkbox from '@comps/uiComps/formControls/checkbox'
export type BookingMemberProps = {
  img?: string
  name?: string
  typeOfMember?: string
  currentMember?: string
  memberEmail?: string
  memberShipStatus?: string
}
const BookingMember = ({
  img,
  name,
  typeOfMember,
  currentMember,
  memberEmail,
  memberShipStatus,
}: BookingMemberProps) => {
  return (
    <div className="flex flex-row items-center">
      <div className="mr-4">
        <Checkbox label={''} id={''} />
      </div>

      <Avatar src={img} size={'xl'} />
      <div className="ml-2 space-y-1  max-w-[148px] w-full">
        <div
          className="text-jg-metal-700 text-globalTextSizeSm font-medium
"
        >
          {name}
        </div>
        <div className="text-inputSizeSm text-jg-metal-300">{typeOfMember}</div>
      </div>
      <div className="ml-4 max-w-[174px] w-full  space-y-1">
        <div
          className="text-jg-metal-500 text-globalTextSizeSm
"
        >
          {currentMember}
        </div>
        <div className="text-inputSizeSm text-jg-green-300">{memberEmail}</div>
      </div>
      <div>
        {memberShipStatus === 'Registered' ? (
          <Badge
            fillType="faded"
            variant="primary"
            label={memberShipStatus}
            rounded
            className="text-globalTextSizeSm font-medium border border-jg-green-200"
          />
        ) : (
          <Badge
            fillType="faded"
            variant="secondary"
            label={memberShipStatus}
            rounded
            className="text-globalTextSizeSm font-medium border border-jg-metal-100 text-jg-metal-500"
          />
        )}
      </div>
    </div>
  )
}
export default BookingMember
