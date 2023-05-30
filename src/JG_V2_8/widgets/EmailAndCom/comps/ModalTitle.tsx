import type { ModalTitleProps } from '../interfaces/interfaces'

const ModalTitle = (props: ModalTitleProps) => {
  const { title, subTitle } = props
  return (
    <div className="flex flex-col items-start p-2 text-md">
      <div className="text-jg-grey-700 font-semibold">{title}</div>
      <div className="text-jg-grey-500">{subTitle}</div>
    </div>
  )
}

export default ModalTitle
