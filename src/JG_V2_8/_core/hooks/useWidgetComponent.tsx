import React, { JSXElementConstructor, useEffect } from 'react'

function getDisplayName(WrappedComponent: any) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}
type handlerType = () => void
const registeredComps: string[] = []
const registeredHandlers: { [key: string]: handlerType[] } = {}
const useWidgetComponent = (componentName: string) => {
  useEffect(() => {
    if (registeredComps.indexOf(componentName) == -1) {
      registeredComps.push(componentName)
      registeredHandlers[componentName]?.map((handler) => {
        handler()
      })
    }
  }, [])
  const onRenderFirst = (handler: handlerType) => {
    if (!registeredHandlers[componentName]) registeredHandlers[componentName] = []
    registeredHandlers[componentName] = [handler]
  }
  return { onRenderFirst }
}

export default useWidgetComponent
//<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>>
