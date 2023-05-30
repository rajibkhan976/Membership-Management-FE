import AppStore from '@jg/store/store'
import { IsBlended } from '../Authorization'

const ResolveClientURL = (path: string) => {
  if (path && path.indexOf('http') > -1) {
    return path
  }
  if (IsBlended()) {
    const BaseAppPath = AppStore.getState().BaseAppPath
    return `${BaseAppPath}ReactBuild${path}`
  } else return path
}

export { ResolveClientURL }
