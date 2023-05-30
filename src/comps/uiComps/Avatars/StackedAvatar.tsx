import React from 'react'

type StackedAvatarsProps = {
  numOfAvatar?: number
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  negativeSpace?: 2 | 3 | 4 | 5 | 6
  children?: React.ReactNode
}
function StackedAvatars({ numOfAvatar = 4, size = 'md', negativeSpace = 2, children }: StackedAvatarsProps) {
  numOfAvatar = numOfAvatar < 1 ? 1 : numOfAvatar

  const childrenWithProps = React.Children.toArray(children)
    .slice(0, numOfAvatar || 4)
    .map((child, index) => {
      if (React.isValidElement(child)) {
        return <div key={index}>{React.cloneElement<any>(child, { size })}</div>
      }
      return child
    })
  return <div className={`flex ${SPACE[negativeSpace]} overflow-hidden`}>{childrenWithProps}</div>
}

const SPACE = {
  2: '-space-x-2',
  3: '-space-x-3',
  4: '-space-x-4',
  5: '-space-x-5',
  6: '-space-x-6',
}
export default StackedAvatars
