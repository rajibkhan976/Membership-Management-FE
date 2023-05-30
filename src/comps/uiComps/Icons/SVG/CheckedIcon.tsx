import { SVGProps } from '../SVGProps'

export default function CheckedIcon({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `24`}
        height={height || `24`}
        viewBox="0 0 24 24"
        className={className}
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.5501 18.0123L3.8501 12.3123L5.2751 10.8873L9.5501 15.1623L18.7251 5.9873L20.1501 7.4123L9.5501 18.0123Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
