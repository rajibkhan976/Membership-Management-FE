import { Button } from '@comps/uiComps'
import { useSgininContext } from './SigninProvider'
import AppStore from '@jg/store/store'
import { EntityInfo } from '@jg/common/comps'
export type SigninOrSginupProps = {
  existingUser?: string
  subTextofExistingUser?: string
  existingUserBtn?: string
  newUser?: string
  subTextofNewUser?: string
  newUserBtn?: string
  Country?: string
}
const SigninOrSginup = ({
  existingUser = 'Existing User',
  subTextofExistingUser = "Welcome back to JustGo! Sign in to continue your journey hassle-free. Let's go!",
  existingUserBtn = 'Login',
  newUser = 'New User',
  subTextofNewUser = 'Welcome to JustGo! Are you ready to embark on your next adventure? Sign up now.',
  newUserBtn = 'Sign Up',
}: // Country = '',
SigninOrSginupProps) => {
  const { fire } = useSgininContext()
  const BaseAppPath = AppStore.getState().BaseAppPath
  const orgName = AppStore.getState().SystemSettings['ORGANISATION.NAME']
  const orgImgSrc = AppStore.getState().SystemSettings['ORGANISATION.LOGO']
  return (
    <>
      <div className="max-w-[344px] mx-auto my-12">
        <div className="flex justify-center mb-6">
          <EntityInfo
            entityInfo={{
              imgSrc: `${BaseAppPath}Store/DownloadPublic?f=${orgImgSrc}&t=OrganizationLogo`,
              name: orgName,
            }}
            size="lg"
            className=""
            nameClass="text-jg-metal-500 uppercase text-globalTextSizeLg font-bold"
          />
        </div>
        <div className="flex flex-col gap-y-24 py-32">
          <div className="flex justify-center flex-col text-center">
            <div className="text-globalTextSizeXl text-jg-metal-900 pb-2 font-semibold">{existingUser}</div>
            <div className="text-jg-metal-700 text-base">{subTextofExistingUser}</div>
            <Button
              fillType="solid"
              btnColor="primary"
              btnSize="lg"
              block
              text="Login"
              name={existingUserBtn}
              className="mt-4 border rounded-sm text-globalTextSizeMd font-medium"
              onClick={() => {
                fire('login')
              }}
              textAllign="center"
            />
          </div>
          <div className="flex justify-center flex-col text-center">
            <div className="text-globalTextSizeXl text-jg-metal-900 pb-2 font-semibold">{newUser}</div>
            <div className="text-jg-metal-700 text-base">{subTextofNewUser}</div>
            <Button
              fillType="outline"
              btnColor="primary"
              btnSize="lg"
              block
              name={newUserBtn}
              text="Sign Up"
              className="mt-4 bg-jg-green-50 ring-0 !border-jg-green-200 border rounded-sm text-globalTextSizeMd font-medium"
              onClick={() => {
                fire('signup')
              }}
              textAllign="center"
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default SigninOrSginup
