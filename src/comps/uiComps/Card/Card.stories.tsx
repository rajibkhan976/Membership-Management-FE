import { createSBItem, createSBTpl } from '../../../sb/JGStoryBook'
import Badge from '../Badges/Badge'
import { ChevronDoubleRight } from '../Icons'
import Card from './Card'
import CardImage from './CardImage'

export default createSBItem(Card, { section: 'Misc', title: 'Card' })

const tplBasic = createSBTpl<typeof Card>((args) => {
  return (
    <Card className="event-info-card">
      <div className="flex-1 flex flex-col px-4 py-2 gap-2">
        <div className=" font-semibold text-sm leading-4 text-jg-metal-700">Hello World!</div>
      </div>
    </Card>
  )
})
export const CardBasic = tplBasic.bind({})
const tpl = createSBTpl<typeof Card>((args) => {
  return (
    <Card className="event-info-card">
      <div className="relative w-full">
        <div className="aspect-w-2 aspect-h-1">
          <CardImage
            src="https://images.unsplash.com/photo-1667845018782-9f5acae511c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
            className=""
          ></CardImage>
        </div>
      </div>
    </Card>
  )
})
export const CardWithImage = tpl.bind({})

const tplEventCard = createSBTpl<typeof Card>((args) => {
  return (
    <Card className="event-info-card">
      <CardImage
        src="https://images.unsplash.com/photo-1667845018782-9f5acae511c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
        className=""
        isCovered={false}
      ></CardImage>
      <div className="flex items-center space-x-3 px-4 py-2">
        <img
          className="border border-jg-metal-100   inline-block overflow-hidden object-cover h-8 w-8 rounded-full ring-2 ring-white"
          src="http://localhost:60248/Store/Download?f=d0dfd6fd-bf22-4d60-ba2c-01953dbab05f.png&amp;t=OrganizationLogo"
          alt="GoMembership "
        />
        <div className="space-y-1">
          <h4 className="font-inter text-sm leading-4 text-jg-metal-800 font-medium truncate">GoMembership</h4>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2 px-4 py-2">
        <span className="font-medium text-[13px] leading-4 text-[#008345] uppercase">
          Mon · 17 Jul 202 · 10:00:00 Europe/London
        </span>
        <div className=" font-semibold text-sm leading-4 text-jg-metal-700">First Aid Training</div>
        <div className=" font-light text-globalTextSizeSm text-jg-metal-400">
          <div className="truncate">Natchwaathlaan 1, Amsterdam, 1015, Netherlands</div>
        </div>
      </div>
      <div className="flex justify-between py-2.5 px-[15px] bg-jg-green-50">
        <div className="flex items-center space-x-1 !leading-4">
          <svg
            width="14"
            height="20"
            viewBox="0 0 14 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-jg-metal-700"
          >
            <path
              d="M7 4.5C7.66304 4.5 8.29893 4.76339 8.76777 5.23223C9.23661 5.70107 9.5 6.33696 9.5 7C9.5 7.3283 9.43534 7.65339 9.3097 7.95671C9.18406 8.26002 8.99991 8.53562 8.76777 8.76777C8.53562 8.99991 8.26002 9.18406 7.95671 9.3097C7.6534 9.43534 7.32831 9.5 7 9.5C6.33696 9.5 5.70107 9.23661 5.23223 8.76777C4.76339 8.29893 4.5 7.66304 4.5 7C4.5 6.33696 4.76339 5.70107 5.23223 5.23223C5.70107 4.76339 6.33696 4.5 7 4.5ZM7 0C8.85652 0 10.637 0.737498 11.9497 2.05025C13.2625 3.36301 14 5.14348 14 7C14 12.25 7 20 7 20C7 20 0 12.25 0 7C0 5.14348 0.737498 3.36301 2.05025 2.05025C3.36301 0.737498 5.14349 0 7 0ZM7 2C5.67392 2 4.40215 2.52678 3.46447 3.46447C2.52678 4.40215 2 5.67392 2 7C2 8 2 10 7 16.71C12 10 12 8 12 7C12 5.67392 11.4732 4.40215 10.5355 3.46447C9.59785 2.52678 8.32608 2 7 2Z"
              fill="currentColor"
            ></path>
          </svg>
          <span className="text-globalTextSizeMd text-jg-metal-700 font-medium truncate">12 km away</span>
        </div>
        <div className="flex justify-end items-center">
          <div className="flex -space-x-2 overflow-hidden">
            <div>
              <span className="inline-flex items-center justify-center bg-white border shadow   inline-block overflow-hidden object-cover h-6 w-6 rounded-full">
                <span className="text-xs font-normal leading-none text-gray-700">SU</span>
              </span>
            </div>
            <div>
              <span className="inline-flex items-center justify-center bg-white border shadow   inline-block overflow-hidden object-cover h-6 w-6 rounded-full">
                <span className="text-xs font-normal leading-none text-gray-700">WC</span>
              </span>
            </div>
            <div>
              <span className="items-center justify-center bg-white border shadow   inline-block overflow-hidden object-cover h-6 w-6 rounded-full">
                <span className="text-xs font-normal leading-none text-gray-700">BC</span>
              </span>
            </div>
            <div>
              <span className="items-center justify-center bg-white border shadow   inline-block overflow-hidden object-cover h-6 w-6 rounded-full">
                <span className="text-xs font-normal leading-none text-gray-700">SC</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
})
export const EventCard = tplEventCard.bind({})

const tplHelpCard = createSBTpl<typeof Card>((args) => {
  return (
    <Card className="max-w-[270px] h-[330px] overflow-hidden rounded relative">
      <CardImage
        src="https://images.unsplash.com/photo-1667845018782-9f5acae511c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
        className="cover h-full w-full"
        isCovered={true}
        zoomIn={true}
      >
        <div className="gap-y-1">
          <div className="font-semibold leading-5 text-base text-white">Video Tutorials</div>
          <div className="leading-4 text-sm text-white">36 Articles</div>
        </div>
      </CardImage>
    </Card>
  )
})
export const HelpCard = tplHelpCard.bind({})

const tplArticleCard = createSBTpl<typeof Card>((args) => {
  return (
    <Card className="max-w-[370px] max-h-[395px] h-full overflow-hidden rounded relative event-info-card">
      <CardImage
        src="https://images.unsplash.com/photo-1667845018782-9f5acae511c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
        className="cover h-full w-full"
        zoomIn={true}
        haveGradient={true}
        isCovered={false}
      ></CardImage>
      <div className="p-4">
        <Badge fillType="faded" label="Get Started" rounded size="md" variant="primary" className="mb-4" />
        <div className="text-jg-metal-700 text-base leading-5 font-semibold mb-4">What happened to Club+?</div>
        <div className="text-jg-metal-500 text-sm font-normal truncate">
          Club+ has been rebranded into the awesome new brand you see before you today. It retains all of the same Club+
          has been rebranded into the awesome new brand you see before you today. It retains all of the same
        </div>
        <div className="mt-4 flex items-center text-jg-green-500 text-inputSizeXl font-medium">
          Learn More <ChevronDoubleRight className="ml-2" />
        </div>
      </div>
    </Card>
  )
})
export const ArticleCard = tplArticleCard.bind({})
const tplPArticalCard = createSBTpl<typeof Card>((args) => {
  return (
    <Card className="flex flex-col sm:flex-row max-w-[722px] items-start sm:items-center sm:justify-start mx-auto sm:mx-0 overflow-hidden">
      <CardImage
        src="https://images.unsplash.com/photo-1667845018782-9f5acae511c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
        className="cover h-full w-full max-w-[332px] max-h-[166px] flex-shrink-0 rounded-sm"
        isCovered={false}
        zoomIn={true}
        haveGradient={true}
      ></CardImage>
      <div className="px-4 py-2 max-w-[414px]">
        <Badge fillType="faded" label="Get Started" rounded size="md" variant="primary" className="mb-4" />
        <div className="text-jg-metal-700 text-base leading-5 font-semibold mb-4">What happened to Club+?</div>
        <div className="text-jg-metal-500 text-sm font-normal">
          Club+ has been rebranded into the awesome new brand you see before you today. It retains all
        </div>
        <div className="mt-4 flex items-center text-jg-green-500 text-inputSizeXl font-medium">
          Learn More <ChevronDoubleRight className="ml-2" />
        </div>
      </div>
    </Card>
  )
})
export const PArticleCard = tplPArticalCard.bind({})
CardWithImage.args = {}
