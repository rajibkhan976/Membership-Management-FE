import AppStore from '@jg/store/store'

export default <T = null>() => {
  return AppStore((state) => state)
}
