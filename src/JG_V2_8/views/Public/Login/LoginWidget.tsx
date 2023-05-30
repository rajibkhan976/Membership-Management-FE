import { createWidget } from 'jg-widget'
import { Outlet } from 'react-router-dom'
import LoginPanel from './LoginPanel'
import login from '@jg/common/dataAPIs/authentications'
const LoginWidget = createWidget((context) => {
  const { routePath } = context

  return {
    path: routePath,
    element: <LoginPanel />,
  }
})
export default LoginWidget
