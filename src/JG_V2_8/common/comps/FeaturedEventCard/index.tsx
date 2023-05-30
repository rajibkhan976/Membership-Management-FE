import Avatar from '@comps/uiComps/Avatars/Avatar'
import Badge from '@comps/uiComps/Badges/Badge'
import MapIcon from '@jg/../icons/map-marker'

export type EventFeaturedCardProps = {
  imageUrl: string
  logo: string
  name: string
  title: string
  date: string[]
  address: string
  distance: string
  fee?: string
  attendees?: number
}

const EventFeaturedCard: React.FC<EventFeaturedCardProps> = ({
  imageUrl,
  logo,
  address,
  date,
  distance,
  name,
  title,
  attendees,
  fee,
}) => {
  return (
    // <div className="col-span-1 flex flex-col bg-white rounded-sm shadow overflow-hidden max-w-sm min-w-fit mr">
    <div className="block bg-[#fafafa] rounded-sm shadow overflow-hidden max-w-sm min-w-[19rem] mx-4">
      <div className="divide-y divide-gray-100">
        <div className="relative">
          <div className="aspect-w-2 aspect-h-1">
            <img className="w-full flex-shrink-0 mx-auto object-cover" src={imageUrl} alt="Event" />
          </div>
          <Badge
            //label={fee || 'Free'}
            //color="text-[13px]"
            //background="bg-[#4caf4f]"
            fillType="faded"
            label={fee || 'Free'}
            rounded
            size="md"
            variant="primary"
            className="absolute left-4 bottom-4 px-2 py-1 text-white leading-4 font-medium rounded-[100px] text-[13px]"
          />
        </div>
        <div className="flex items-center space-x-3 px-4 py-2">
          <img className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" src={logo} alt="logo" />
          <h3 className="font-inter text-sm leading-4 text-[#37474F] font-medium truncate">{name}</h3>
        </div>
        <div className="flex-1 flex flex-col px-4 py-2 gap-2">
          <p className=" font-medium text-[13px] leading-4 text-[#008345] uppercase">
            {date[0]} &middot; {date[1]} &middot; {date[2]}
            {/* {'SUN'} &middot; {'10 Apr 2022'} &middot; {'09:00 AEST'} */}
          </p>
          <p className=" font-semibold text-sm leading-4 text-[#455A64]">{title}</p>
          <div className=" font-normal text-[13px] leading-4 opacity-70 text-[#455A64]">{address}</div>
        </div>
      </div>
      <div className="flex justify-between p-4 bg-[#E8F5E9]">
        <div className="flex items-center">
          <MapIcon />
          <span className="ml-1 text-sm leading-4 text-[#455A64] font-medium truncate">{distance} away</span>
        </div>
        <div className="flex justify-end items-center">
          <StackedAvatars />
          <span className="ml-1 text-[13px] leading-[14px] text-[#607d8b] truncate">{attendees} attendees</span>
        </div>
      </div>
    </div>
  )
}

function StackedAvatars() {
  return (
    <div className="flex -space-x-3 overflow-hidden">
      {avatarSrcs.map((src, i) => (
        <Avatar key={i} src={src} size="xs" />
      ))}
    </div>
  )
}

const avatarSrcs = [
  'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
]

export default EventFeaturedCard
