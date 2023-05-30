/* eslint-disable no-console */
import { useState, useEffect } from 'react'

export const logEvent = (name: any) => (event: any) => {
  console.log(`[${name}]`, event)
}

export const Result = ({ children }: any) => {
  return <div className="text-jg-green-500 py-4">{children}</div>
}

export const ErrorResult = ({ children }: any) => <div className="text-jg-red-500 py-4">{children}</div>

// Demo hook to dynamically change font size based on window size.
export const useDynamicFontSize = () => {
  const [fontSize, setFontSize] = useState(window.innerWidth < 450 ? '14px' : '18px')

  useEffect(() => {
    const onResize = () => {
      setFontSize(window.innerWidth < 450 ? '14px' : '18px')
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return fontSize
}
