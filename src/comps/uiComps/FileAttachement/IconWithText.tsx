import classNames from 'classnames'

type IconWithTextProps = {
  filepath?: any
  text: string
  flexDirection: string
  txtColor?: string
  bgColor?: string
  icon: JSX.Element
  iconWidth?: string
  fileUrl?: any
  textWidth?: string
  removeItem?: (index: string) => void
}
const IconWithText = ({ text, flexDirection, txtColor, bgColor, icon, textWidth, removeItem, fileUrl }: IconWithTextProps) => {

  return (
    <div className={classNames(flexDirection, bgColor ? bgColor : '')}>
      <div
        className={`flex justify-end ${txtColor ? txtColor : 'text-[#455A64]'} ${removeItem && 'cursor-pointer'}`}
        onClick={() => removeItem && removeItem(text)}
      >
        {icon}
      </div>
      <div className={classNames(textWidth)}>
        {!fileUrl && (
          <p className={`text-center font-inter text-[14px]  font-semibold ${txtColor ? txtColor : 'text-[#455A64]'}`}>
            {text}
          </p>
        )}
        {fileUrl && (
          <a
            href={`${fileUrl}`}
            download
            className={`text-center font-inter text-[14px]  font-semibold ${txtColor ? txtColor : 'text-[#455A64]'}`}
          >
            {text}
          </a>
        )}
      </div>
    </div>
  )
}

export default IconWithText
