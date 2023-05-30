import { SVGProps } from '../SVGProps'

export default function ActivityLog({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width ?? '16'}
        height={height ?? '16'}
        viewBox="0 0 16 16"
        fill={fill ?? `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M6.00033 -0.108154L10.0003 11.8918L11.5198 7.33336H15.3337V8.6667H12.4808L10.0003 16.1082L6.00033 4.10822L4.48083 8.6667H0.666992V7.33336H3.51982L6.00033 -0.108154Z"
          fill={fill ?? `currentColor`}
        />
      </svg>
    </>
  )
}
