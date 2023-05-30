import Drawer from '@jg/common/comps/drawer/Drawer'
import DrawerContent from '@jg/common/comps/drawer/IterableDrawerContent'
import { EventInfo } from '@jg/common/types'
import { useWidgetContext } from 'jg-widget'
import { useNavigate } from 'react-router-dom'

type ShowMoreEventsDrawerProps = {
  addToBasePath: string
  iterableDrawerItems: EventInfo[]
  isOpen: boolean
  showEventInfoCard: boolean
  setIsOpen: (status: boolean) => void
}

const ShowMoreEventsDrawer = (props: ShowMoreEventsDrawerProps) => {
  const { addToBasePath, iterableDrawerItems, isOpen, showEventInfoCard, setIsOpen } = props
  const { basePath } = useWidgetContext()
  const navigate = useNavigate()

  return (
    <Drawer
      isOpen={isOpen}
      openDrawer={() => setIsOpen(true)}
      closeDrawer={() => setIsOpen(false)}
      title="Select Event"
      shouldCloseOnBodyClick
      showCrossButton
      drawerContent={
        <DrawerContent
          drawerItems={iterableDrawerItems}
          handleClick={(item) => {
            navigate(`${basePath}${addToBasePath}/${item?.eventDocIdHash}/`)
          }}
          handleClose={() => setIsOpen(false)}
          showEventInfoCard={showEventInfoCard}
        />
      }
      showFrom="Right"
    />
  )
}

export default ShowMoreEventsDrawer
