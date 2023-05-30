import { Avatar } from '@comps/uiComps'
import { MemberType } from '@jg/common/types'
import AppStore from '@jg/store/store'

const MemberAvatar = ({ member }: { member: MemberType }) => {
  const BaseAppPath = AppStore((state) => state.BaseAppPath)
  return (
    <div className="flex flex-row max-w-[216px] w-full">
      <div className="w-10 block">
        {member.Image || member.ProfilePicURL ? (
          <Avatar
            src={`${BaseAppPath}store/download?f=${
              member.Image ? member.Image : member.ProfilePicURL ? member.ProfilePicURL : <></> || ''
            }&t=user&p=${member.UserId || ''}`}
            size={'xl'}
          />
        ) : (
          <Avatar shape="circular" size="xl" />
        )}
      </div>
      <div className="ml-2 space-y-1">
        <div
          className="text-jg-metal-700 text-globalTextSizeSm font-medium break-words
"
        >
          {`${member.FirstName ? member.FirstName : <></>} ${
            member.Surname ? member.Surname : member.LastName ? member.LastName : <></>
          }`}
        </div>
        <div className="text-inputSizeSm text-jg-metal-300 break-all">{member.MID || 'ME00001'}</div>
      </div>
    </div>
  )
}
export default MemberAvatar
