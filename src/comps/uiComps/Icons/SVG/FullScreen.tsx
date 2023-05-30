import { SVGProps } from '../SVGProps'

export default function FullScreen({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `24`}
        height={height || `24`}
        viewBox="0 0 25 25"
        className={className}
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.24146 5.17175H10.2415V7.17175H7.24146V10.1718H5.24146V5.17175ZM14.2415 5.17175H19.2415V10.1718H17.2415V7.17175H14.2415V5.17175ZM17.2415 14.1718H19.2415V19.1718H14.2415V17.1718H17.2415V14.1718ZM10.2415 17.1718V19.1718H5.24146V14.1718H7.24146V17.1718H10.2415Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
