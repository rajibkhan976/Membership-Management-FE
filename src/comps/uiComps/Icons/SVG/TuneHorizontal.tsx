import { SVGProps } from '../SVGProps'

export default function  TuneHorizontal({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || '20'}
        height={height || '20'}
        viewBox="0 0 20 20"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M2.5 14.1667V15.8333H7.5V14.1667H2.5ZM2.5 4.16667V5.83333H10.8333V4.16667H2.5ZM10.8333 17.5V15.8333H17.5V14.1667H10.8333V12.5H9.16667V17.5H10.8333ZM5.83333 7.5V9.16667H2.5V10.8333H5.83333V12.5H7.5V7.5H5.83333ZM17.5 10.8333V9.16667H9.16667V10.8333H17.5ZM12.5 7.5H14.1667V5.83333H17.5V4.16667H14.1667V2.5H12.5V7.5Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
