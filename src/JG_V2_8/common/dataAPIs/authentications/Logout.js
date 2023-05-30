import { SignOut } from '@jg/_core/Authorization'

const logout = (callback) => {
  SignOut()
  callback()
}
export default logout
