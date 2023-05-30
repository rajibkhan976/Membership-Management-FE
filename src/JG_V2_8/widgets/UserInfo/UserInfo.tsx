import { Button } from '@comps/uiComps'
import { useGlobalNotification } from '@jg/providers/GlobalNotificationProvider'
import { useEffect } from 'react'
import { useClubSwitcherContext } from '../ClubSwitcher/ClubSwitcherProvider'
import { useTestNotification } from './providers/TestNotificationProvider'

type UserInfoProps = {
  userName?: string
  post?: string
}

function UserInfo({ userName = 'Test', post = 'Junior Soft Eng' }: UserInfoProps) {
  const nsTest = useTestNotification()
  const nsGlobal = useGlobalNotification()
  const { loadingStatus, selectedClubMerchantId } = useClubSwitcherContext()

  useEffect(() => {
    console.log('status', loadingStatus)
    if (loadingStatus === 'ready' && selectedClubMerchantId !== '-1')
      console.log('selectedClubDocId', selectedClubMerchantId)
  }, [loadingStatus, selectedClubMerchantId])

  return (
    <div className="font-Roboto shadow-md rounded-md bg-white dark:bg-gray-800 p-4">
      <div className="flex-row gap-4 flex justify-center items-center">
        <div className=" flex flex-col">
          <span className="text-gray-600 dark:text-white text-lg font-medium">
            {userName} &nbsp;
            {post}
          </span>
          <span className="text-gray-400">
            <p className="text-base my-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum
            </p>
            <p className="mb-3">
              <Button
                text="Test Warning from home"
                onClick={() => {
                  nsTest.notifyWarning('this is a  warning from home')
                }}
              />
            </p>
            <p className="mb-3">
              <Button
                text="Test info from home"
                onClick={() => {
                  // navigate(`${basePath}${clubDocId}/Test`)
                  nsTest.notifyInfo('this is an in from home')
                }}
              />
            </p>
            <p className="mb-3">
              <Button
                text="Test loading from home"
                onClick={() => {
                  nsTest.notifyLoading('Loading....', { id: 'loading' })
                }}
              />
            </p>
            <p className="mb-3">
              <Button
                text="dismiss loading"
                onClick={() => {
                  nsTest.dismiss('loading')
                }}
              />
            </p>
            <p className="mb-3">
              <Button
                text="Test error from global"
                onClick={() => {
                  nsGlobal.notifyError('this is a  error from global')
                }}
              />
            </p>
          </span>
        </div>
      </div>
    </div>
  )
}
export default UserInfo
