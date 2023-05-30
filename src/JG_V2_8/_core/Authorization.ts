import { getCookie, setCookie } from './services/cookies'

const HasSessionMember = () => {
  //@ts-ignore
  const hasSession = Object.prototype.hasOwnProperty.call(window.parent.px, 'sessionMember')
  return hasSession
}
const IsBlended = () => {
  return Object.prototype.hasOwnProperty.call(window.parent, 'az')
}
const IsAthenticated = (): boolean => {
  if (IsBlended() && HasSessionMember()) {
    return true
  } else {
    const user = getCookie('username')
    return user != ''
  }
}
const IsAthenticatedByParent = () => {
  return IsBlended() && HasSessionMember()
}
const SignIn = (username: string) => {
  setCookie('username', username, 10)
}
const SignOut = () => {
  const user = getCookie('username')
  if (user) setCookie('username', user, -1)
}

export { SignIn, SignOut, IsAthenticated, IsAthenticatedByParent, IsBlended }
