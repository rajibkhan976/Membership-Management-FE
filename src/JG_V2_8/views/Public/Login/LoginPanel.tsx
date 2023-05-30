import { Button, TextField } from '@comps/uiComps'
import login from '@jg/common/dataAPIs/authentications'
import { useGlobalNotification } from '@jg/providers/GlobalNotificationProvider'
import { useEffect, useState } from 'react'

type FieldStatusType = 'error' | 'normal' | 'success'
const LoginPanel = () => {
  const { notifyWarning } = useGlobalNotification()
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isDirty, setIsDirty] = useState(false)
  const [isIncorrCred, setIsIncorrCred] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [unFieldStatus, setUNFieldStatus] = useState<FieldStatusType>('normal')
  const [passFieldStatus, setPassFieldStatus] = useState<FieldStatusType>('normal')

  const handleSignInClick = () => {
    if (isDirty && passFieldStatus === 'success' && unFieldStatus === 'success') {
      login(username, password, ({ success, type, user }: any) => {
        setIsFetching(false)

        if (success) {
          setIsIncorrCred(false)
          //setCurrentUser(user)
          localStorage.setItem('user', JSON.stringify(user))
          location.reload()
        } else {
          setIsIncorrCred(true)
          notifyWarning('Incorrect Username and password.', { id: 'incorrCred' })
          setUNFieldStatus('error')
          setPassFieldStatus('error')
        }
      })
      setIsFetching(true)
    } else {
      setUNFieldStatus(!username || isIncorrCred ? 'error' : 'normal')
      setPassFieldStatus(!password || isIncorrCred ? 'error' : 'normal')
    }
  }
  useEffect(() => {
    setUNFieldStatus(isDirty && !username ? 'error' : 'success')
    setPassFieldStatus(isDirty && !password ? 'error' : 'success')
  }, [username, password])

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in</h2>
          </div>

          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <TextField
                disabled={isFetching}
                status={unFieldStatus}
                onValueChange={(value) => {
                  if (!isDirty) setIsDirty(true)
                  setUserName(value.toString())
                }}
                label="Username"
              />
            </div>
            <div>
              <TextField
                disabled={isFetching}
                status={passFieldStatus}
                onValueChange={(value) => {
                  if (!isDirty) setIsDirty(true)
                  setPassword(value.toString())
                }}
                type="password"
                label="Password"
              />
            </div>
          </div>

          <div>
            <Button
              disabled={isFetching}
              btnSize="lg"
              block
              className="text-center"
              text="Sign in"
              onClick={handleSignInClick}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPanel
