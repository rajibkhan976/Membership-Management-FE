import { createContext, useContext } from 'react'

export interface WidgetContextType {
  basePath: string
  config: object
}
const WidgetContextDefault: WidgetContextType = {
  basePath: '/',
  config: {},
}

const WidgetContext = createContext<WidgetContextType>(WidgetContextDefault)

export const useWidgetContext = () => useContext(WidgetContext)
export default WidgetContext
