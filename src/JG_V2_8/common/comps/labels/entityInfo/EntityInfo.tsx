import { useEffect, useRef, useState } from 'react'
import { Avatar } from '@comps/uiComps'
import { entityInfo } from '@jg/common/types'
import { EntityInfoProps } from './EntityInfoProps'
import useIntersectionObserver from '@jg/hooks/useIntersectionObserver'

function EntityInfo(props: EntityInfoProps) {
  const defaults: entityInfo = {
    imgSrc: undefined,
    name: '---',
    id: -1,
    type: '',
  }
  const { entityInfo = defaults, className, subTitle, size, nameClass, subTitleClass } = props
  const { imgSrc, name } = entityInfo
  const [isEntityAppeared, setIsEntityAppeared] = useState<boolean>(false)
  const entityRef = useRef<HTMLDivElement | null>(null)
  const entityEntry = useIntersectionObserver(entityRef, {})

  const isEntityVisible = !!entityEntry?.isIntersecting

  useEffect(() => {
    if (isEntityVisible) {
      setIsEntityAppeared(true)
    }
  }, [isEntityVisible])

  return (
    <div ref={entityRef} className={`flex items-center space-x-3 ${className}`}>
      {isEntityAppeared && <Avatar src={imgSrc} name={name} size={size} bordered={true} />}
      <div className="space-y-1">
        <h4 className={`font-inter text-sm leading-4 text-jg-metal-800 font-medium truncate ${nameClass}`}>{name}</h4>
        {subTitle && <p className={`font-normal text-sm leading-4 opacity-60 ${subTitleClass}`}>{subTitle}</p>}
      </div>
    </div>
  )
}
export default EntityInfo
