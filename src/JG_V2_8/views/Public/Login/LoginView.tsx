import createView from 'jg-view'
import LoginWidget from './LoginWidget'

export default createView(({ initWidget, routePath, config }) => {
  return initWidget(LoginWidget, routePath, config)
})
