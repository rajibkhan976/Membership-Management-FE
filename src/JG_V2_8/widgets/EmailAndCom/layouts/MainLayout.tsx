import { Outlet } from 'react-router-dom'
import Drawer from '@jg/common/comps/drawer/Drawer'
import { useState, useEffect } from 'react'
import { useAsync } from '@jg/hooks'
import { GenericErrorResponse } from '@jg/common/types'
import GetClubListRequest, { ClubListResponse } from '@jg/common/dataAPIs/clubs/GetClubListRequest'
import EmailAndComContext from '../EmailAndComContext'
import EmailAndComNotificationProvider from '../providers/EmailAndComNotificationProvider'
import Button from '@comps/uiComps/Button/Button'
import { ReactComponent as RightCaretIcon } from '@jg/assets/images/RightCaretIcon.svg'
import DrawerContent from '@jg/common/comps/drawer/IterableDrawerContent'

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [drawerItems, setDrawerItems] = useState<any[]>([])
  const [selectedItem, setSelectedItem] = useState<string>('Select')
  const [selectedClubDocId, setSelectedClubDocId] = useState<number>(87557)

  const { execute, status, value, error } = useAsync<ClubListResponse, GenericErrorResponse, {}>(
    GetClubListRequest,
    {},
    false
  )

  useEffect(() => {
    execute()
  }, [])

  useEffect(() => {
    if (status && status === 'success' && value?.success && value.clubList) {
      setDrawerItems(value.clubList)
    }
  }, [status, value])

  useEffect(() => {
    if (drawerItems && drawerItems.length > 0) {
      setSelectedItem(drawerItems[0].name)
      setSelectedClubDocId(drawerItems[0].docId)
    }
  }, [drawerItems])

  const handleSelect = (item: any) => {
    setSelectedItem(item?.name)
    setSelectedClubDocId(item?.docId)
  }

  const closeDrawer = () => {
    setIsOpen(false)
  }

  const openDrawer = () => {
    if (Array.isArray(drawerItems) && drawerItems.length > 0) {
      setIsOpen(true)
    }
  }

  return (
    <>
      <div className="jg-container flex justify-end mx-auto">
        <div className="my-3">
          <Button
            btnColor="secondary"
            btnSize="sm"
            fillType="outline"
            icon={<RightCaretIcon className="inline-block my-auto" />}
            iconPosition="right"
            onClick={openDrawer}
            text={selectedItem}
          />
        </div>
        <Drawer
          isOpen={isOpen}
          openDrawer={openDrawer}
          closeDrawer={closeDrawer}
          title="Select Club"
          shouldCloseOnBodyClick
          showCrossButton
          drawerContent={
            <DrawerContent drawerItems={drawerItems} handleClick={handleSelect} handleClose={closeDrawer} />
          }
          showFrom="Right"
        />
      </div>
      <EmailAndComNotificationProvider>
        <EmailAndComContext.Provider value={{ selectedClubId: selectedClubDocId }}>
          <Outlet />
        </EmailAndComContext.Provider>
      </EmailAndComNotificationProvider>
    </>
  )
}

export default MainLayout
