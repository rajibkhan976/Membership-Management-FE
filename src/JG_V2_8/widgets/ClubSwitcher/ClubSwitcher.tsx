import { useWidgetContext } from 'jg-widget'
import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useClubSwitcherContext } from './ClubSwitcherProvider'
import Drawer from '@jg/common/comps/drawer/Drawer'
import Button from '@comps/uiComps/Button/Button'
import { ReactComponent as RightCaretIcon } from '@jg/assets/images/RightCaretIcon.svg'
import { useAsync } from '@jg/hooks'
import { ClubSwitcherInfo, GenericErrorResponse } from '@jg/common/types'
import { ClubListResponse } from '@jg/common/dataAPIs/clubs/GetClubListRequest'
import useClubSwitcherStore, { ClubSwitcherStore } from './store/useClubSwitcherStore'
import DrawerContent from '@jg/common/comps/drawer/IterableDrawerContent'
import { LoaderOverlay } from '@jg/common/comps'
import GetClubListForSwitcher from '@jg/common/dataAPIs/clubs/GetClubListForSwitcher'
import useGetSelectedClub from './store/selectedClube'
import { useJGPackageContext } from '@jg/providers/JGPackageProvider'

const ClubSwitcher = ({
  defaultTab = '',
  paramName = 'clubMerchantId'
}: {
  defaultTab: string
  paramName?: string
}) => {
  const {
    loadingStatus,
    setLoadingStatus,
    selectedClubName,
    setSelectedClubName,
    selectedClubDocId,
    setSelectedClubDocId,
    setSelectedClubDocIdInt
  } = useClubSwitcherContext()
  const { jgPackage } = useJGPackageContext()
  const setClub = useGetSelectedClub(({ setClub }) => setClub)
  const { basePath } = useWidgetContext()
  const navigate = useNavigate()
  const params = useParams()

  const { tab } = useParams()
  const { clubs, setClubs } = useClubSwitcherStore((state: ClubSwitcherStore) => state)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const clubDocId = params[paramName]

  const { execute, status, value } = useAsync<ClubListResponse, GenericErrorResponse, {}>(
    GetClubListForSwitcher,
    {},
    false
  )

  const selectClub = () => {
    if (clubDocId) {
      if (clubDocId !== '-1') {
        const club =
          paramName === 'clubMerchantId'
            ? clubs.find((club: ClubSwitcherInfo) => club.merchantGuid === clubDocId)
            : clubs.find((club: ClubSwitcherInfo) => club.syncGuid === clubDocId)
        if (club) {
          setSelectedClubName(club.name)
          setSelectedClubDocId(clubDocId)
          setSelectedClubDocIdInt(club.docId)
          setClub(club, jgPackage)
        }
      }
    } else {
      setSelectedClubName(clubs[0].name)
      setSelectedClubDocId(paramName === 'clubMerchantId' ? clubs[0].merchantGuid : clubs[0].syncGuid) //clubs[0].docId
      setSelectedClubDocIdInt(clubs[0].docId)
      setClub(clubs[0], jgPackage)

    }
  }

  useEffect(() => {
    if (clubs.length === 0) {
      setLoadingStatus('pending')
      execute()
    } else {
      selectClub()
    }
  }, [clubDocId, basePath])

  useEffect(() => {
    if (status && status === 'success' && value?.success && value.clubList) {
      setClubs(value.clubList)
      setLoadingStatus('ready')
    }
  }, [status, value])

  useEffect(() => {
    if (loadingStatus && loadingStatus === 'ready' && Array.isArray(clubs) && clubs.length > 0) {
      selectClub()
    }
  }, [loadingStatus])

  useEffect(() => {
    if (selectedClubDocId !== -1) {
      if (defaultTab) {
        if (tab) navigate(`${basePath}${selectedClubDocId}/${tab}/`)
        else navigate(`${basePath}${selectedClubDocId}/${defaultTab}/`)
      } else {
        navigate(`${basePath}${selectedClubDocId}/`)
      }
    }
  }, [selectedClubDocId])

  const closeDrawer = () => {
    setIsOpen(false)
  }

  const openDrawer = () => {
    if (Array.isArray(clubs) && clubs.length > 0) {
      setIsOpen(true)
    }
  }

  return (
    <>
      <div className="jg-container">
        <div className="my-3 inline-block float-right ml-4 mr-2 md:mr-2 lg:mr-2 xl:mr-0">
          <Button
            className="px-1.5"
            btnColor="secondary"
            btnSize="sm"
            fillType="outline"
            icon={<RightCaretIcon className="inline-block my-auto mr-0 w-3.5" />}
            iconPosition="right"
            onClick={openDrawer}
            text={<span className="block text-center truncate w-[180px]">{selectedClubName}</span>}
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
            <DrawerContent
              drawerItems={clubs}
              handleClick={(value) => {
                setSelectedClubDocId(paramName === 'clubMerchantId' ? value.merchantGuid : value.syncGuid)
                setSelectedClubName(value.name)
              }}
              handleClose={closeDrawer}
            />
          }
          showFrom="Right"
        />
      </div>
      {clubDocId && clubDocId !== '-1' && Array.isArray(clubs) && clubs.length > 0 ? <Outlet /> : <LoaderOverlay />}
    </>
  )
}

export default ClubSwitcher
