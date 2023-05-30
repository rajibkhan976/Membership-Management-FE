import { SVGProps } from '../SVGProps'

export default function Facebook({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `20`}
        height={height || `20`}
        viewBox="0 0 20 20"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M10 0.039978C4.5 0.039978 0 4.52998 0 10.06C0 15.06 3.66 19.21 8.44 19.96V12.96H5.9V10.06H8.44V7.84998C8.44 5.33998 9.93 3.95998 12.22 3.95998C13.31 3.95998 14.45 4.14998 14.45 4.14998V6.61998H13.19C11.95 6.61998 11.56 7.38998 11.56 8.17998V10.06H14.34L13.89 12.96H11.56V19.96C13.9164 19.5878 16.0622 18.3855 17.6099 16.57C19.1576 14.7546 20.0054 12.4456 20 10.06C20 4.52998 15.5 0.039978 10 0.039978Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
