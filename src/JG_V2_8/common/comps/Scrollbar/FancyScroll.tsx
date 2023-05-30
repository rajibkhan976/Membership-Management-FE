import React from 'react'
import { MacScrollbar } from 'mac-scrollbar'
import 'mac-scrollbar/dist/mac-scrollbar.css'

const FancyScroll = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  return <MacScrollbar className={className}>{children}</MacScrollbar>
}

export default FancyScroll
