import { useEffect, useState } from 'react'

type WindowSizeObjectType = {
  width: number | undefined
  height: number | undefined
}
export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSizeObjectType>({
    width: undefined,
    height: undefined,
  })
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    // Add event listener
    window.addEventListener('resize', handleResize)
    // Call handler right away so state gets updated with initial window size
    handleResize()
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return windowSize
}
