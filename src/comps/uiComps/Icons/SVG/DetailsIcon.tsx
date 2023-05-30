import { SVGProps } from '../SVGProps'

export default function DetailsIcon({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width ?? '12'}
        height={height ?? '13'}
        viewBox="0 0 12 13"
        fill={fill ?? `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M0 0.903931H5.33333V2.23726H0V0.903931ZM6.66667 0.903931H12V2.23726H6.66667V0.903931ZM0 3.5706H5.33333V4.90393H0V3.5706ZM6.66667 3.5706H12V4.90393H6.66667V3.5706ZM0 6.23726H5.33333V7.5706H0V6.23726ZM6.66667 6.23726H12V7.5706H6.66667V6.23726ZM0 8.90393H5.33333V10.2373H0V8.90393ZM6.66667 8.90393H12V10.2373H6.66667V8.90393ZM0 11.5706H5.33333V12.9039H0V11.5706ZM6.66667 11.5706H12V12.9039H6.66667V11.5706Z"
          fill={fill ?? `currentColor`}
        />
      </svg>
    </>
  )
}
