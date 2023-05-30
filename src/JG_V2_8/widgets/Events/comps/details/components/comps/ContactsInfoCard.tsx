import { EntityInfo } from '@jg/common/comps'
import { EventContact } from '@jg/common/types'
import { PhoneIcon, MailIcon } from '@heroicons/react/solid'
import Tooltip from '@comps/uiComps/Tooltip/Tooltip'
import ContentCard from '@jg/common/comps/contents/contentCard/ContentCard'
import { AsyncStatus } from '@jg/common/types/responses/AsyncStatus'
import CommonPlaceholder from '@jg/common/comps/loader/placeholders/CommonPlaceholder'
import AppStore from '@jg/store/store'
export type ContactsInfoCardProps = {
  contacts?: EventContact[]
  status?: AsyncStatus
  docId?: number
}
const ContactsInfoCard = ({ contacts, status, docId }: ContactsInfoCardProps) => {
  return (
    <ContentCard
      heading="Contact"
      className="hidden visible md:block"
      underlineClass="mb-4 mt-2"
      headingClass="!text-jg-metal-700  !text-globalTextSizeLg"
    >
      <div className="space-y-7 ">
        {status === 'success' ? (
          <>
            {contacts?.map((item, i) => (
              <ContactCard key={i} item={item} />
            ))}
          </>
        ) : (
          <CommonPlaceholder />
        )}
      </div>
    </ContentCard>
  )
}
export default ContactsInfoCard

export const ContactCard = ({ item }: { item: EventContact }) => {
  const BaseAppPath = AppStore((state) => state.BaseAppPath)
  return (
    <div className="space-y-2 flex flex-row justify-between">
      <EntityInfo
        entityInfo={{
          imgSrc: `${item?.Image ? `${BaseAppPath}store/download?f=${item.Image}&t=user&p=${item.UserId}` : ''}`,
          name: `${item?.Firstname} ${item?.Lastname}`,
        }}
        subTitle={item?.Role}
        size="xxl"
        nameClass="text-jg-metal-500 text-globalTextSizeLg font-semibold"
        subTitleClass="text-globalTextSizeMd text-jg-metal-400"
      />
      <div className="flex">
        <Tooltip title={item?.Phonenumber} position="left">
          <PhoneIcon className="w-[18px] text-jg-metal-500 mr-6" />
        </Tooltip>
        <Tooltip title={item?.Emailaddress} position="left">
          <MailIcon className="w-5 text-jg-metal-500 text-" />
        </Tooltip>
      </div>
    </div>
  )
}
