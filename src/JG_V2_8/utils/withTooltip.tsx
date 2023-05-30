import Tooltip from '@jg/common/comps/Tooltip'
import React from 'react'

interface Props {
  content: string
}

export function withTooltip<P>(Component: React.FC<P>) {
  return function Modification(props: P & Props) {
    const { content, ...rest } = props

    if (!content) {
      /* @ts-ignore */
      return <Component {...rest} />
    }
    return (
      <Tooltip content={content}>
        {/* @ts-ignore */}
        {/* @ts-ignore */}
        <Component {...rest} />
      </Tooltip>
    )
  }
}
