import { CompBaseProps, FadeIn } from '@comps/uiComps'
import { useEffect, useState } from 'react'

type TimeoutChildrenProps = CompBaseProps & {
  sec?: number
}
const TimeoutChildren = ({ children, sec = 300 }: TimeoutChildrenProps) => {
  const [mounted, setMounted] = useState<boolean>(false)
  useEffect(() => {
    const interval = setTimeout(() => {
      setMounted(true)
    }, sec)

    return () => {
      setMounted(false)
      clearTimeout(interval)
    }
  }, [])

  if (mounted) return <FadeIn>{children}</FadeIn>
  else return <></>
}
export default TimeoutChildren
