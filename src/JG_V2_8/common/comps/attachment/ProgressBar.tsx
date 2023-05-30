import classNames from 'classnames'

type ProgressBarProps = {
  baseClass?: string
  bgClass?: string
}

const ProgressBar = (props: ProgressBarProps) => {
  const { baseClass, bgClass } = props
  return (
    <div className={classNames('flex flex-col animate-pulse', baseClass)}>
      <div className={classNames('w-full h-4 rounded-2xl', bgClass ? bgClass : 'bg-jg-metal-300')}></div>
    </div>
  )
}

export default ProgressBar
