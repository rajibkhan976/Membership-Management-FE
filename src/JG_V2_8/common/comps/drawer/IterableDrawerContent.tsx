import React, { useState, useRef } from 'react'
import { TextField } from '@comps/uiComps'
import classNames from 'classnames'
import { EntityInfo } from '@jg/common/comps'
import { Search } from '@comps/uiComps/Icons'
import EventInfoCard from '@jg/widgets/Events/comps/eventInfoCard/EventInfoCard'

type DrawerContentProps = {
  drawerItems: any[]
  showEventInfoCard?: boolean
  handleClick?: (item: any) => void
  handleClose: () => void
}

const DrawerContent = (props: DrawerContentProps): React.ReactElement => {
  const { drawerItems, showEventInfoCard, handleClick, handleClose } = props
  const [searchKey, setSearchKey] = useState<string>('')
  const drawerContentContainerRef = useRef<HTMLDivElement>(null)
  const searchBoxRef = useRef<HTMLDivElement>(null)

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex-none p-3" ref={searchBoxRef}>
        <TextField
          leftIcon={<Search className="w-4" />}
          placeholder="Type to search"
          fieldsize="md"
          onValueChange={(value: any) => setSearchKey(value)}
          type="text"
        />
      </div>
      <div className={classNames(`overflow-y-auto h-full border-t border-jg-grey-200`)} ref={drawerContentContainerRef}>
        {Array.isArray(drawerItems) &&
          drawerItems.length > 0 &&
          drawerItems.map((item, index) => (
            <div
              key={index}
              className={classNames(
                'flex p-4 border-b border-gray-200 cursor-pointer hover:bg-jg-grey-200',
                searchKey && item?.name?.toLowerCase()?.search(searchKey?.trim()?.toLowerCase()) === -1 && 'hidden'
              )}
              onClick={() => {
                handleClick && handleClick(item), handleClose()
              }}
            >
              {showEventInfoCard ? (
                <EventInfoCard eventInfo={item} imageAlign={'left'} />
              ) : (
                <EntityInfo entityInfo={{ imgSrc: item?.image, name: item?.name }} size="md" />
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export default DrawerContent
