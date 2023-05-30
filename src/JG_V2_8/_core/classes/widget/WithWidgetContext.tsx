import { CompBaseProps } from '@comps/uiComps'

import WidgetContext, { WidgetContextType } from './WidgetContext'

type WidgetContextProviderProps = CompBaseProps & {
  basePath: string
  config: object
}
const getWidgetContectType = (basePath: string, config: {}) => {
  if (basePath?.slice(-1) != '/') {
    basePath += '/'
  }
  const WidgetContextBaseOptions: WidgetContextType = {
    basePath,
    config,
  }
  return WidgetContextBaseOptions
}

type WidgetWrapperProps = CompBaseProps & {
  basePath: string
}
function WidgetWrapper({ basePath, children }: WidgetWrapperProps) {
  const widgetRootCompHtmlElId = basePath.replaceAll('/', '')
  return <div id={widgetRootCompHtmlElId || 'index'}>{children}</div>
}
function WithWidgetContext({ children, basePath, config }: WidgetContextProviderProps) {
  const contextType = getWidgetContectType(basePath, config)
  return (
    <WidgetContext.Provider value={contextType}>
      <WidgetWrapper basePath={basePath}>{children}</WidgetWrapper>
    </WidgetContext.Provider>
  )
}
export default WithWidgetContext
