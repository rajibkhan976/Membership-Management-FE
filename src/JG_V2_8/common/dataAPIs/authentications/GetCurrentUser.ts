import AppStore from '@jg/store/store'

const GetCurrentUser = () => {
  return AppStore.getState().CurrentUser
}
export default GetCurrentUser
