import { useRef } from 'react'

function useCompEvent(obj) {
  // Create a ref that stores handler
  const savedHandler = useRef({})
  const fire = (eventName, args) => {
    const handlers = savedHandler.current[eventName]
    handlers.map((fn) => {
      if (fn) fn({ el: obj, evt: args })
    })
  }
  const removeAll = (params) => {
    savedHandler.current = {}
  }
  const remove = (handler) => {
    const events = savedHandler.current
    for (const event in events) {
      const handlers = events[event]
      let count = handlers.length - 1
      while (count > -1) {
        if (handlers[count] === handler) {
          handlers.splice(count, 1)
        }
        count--
      }
    }
  }
  const register = (eventName, handler) => {
    if (!savedHandler.current[eventName]) {
      savedHandler.current[eventName] = []
    }
    savedHandler.current[eventName].push(handler)
  }
  removeAll()
  return { fire, register, remove, removeAll }
}
export default useCompEvent
