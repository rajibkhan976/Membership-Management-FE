import { SVGProps } from '../SVGProps'

export default function Segment({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `20`}
        height={height || `14`}
        viewBox="0 0 20 14"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M16 0H4V2H16V0ZM4 4H16V6H4V4ZM0 7H2V12H18V7H20V12C20 12.5304 19.7893 13.0391 19.4142 13.4142C19.0391 13.7893 18.5304 14 18 14H2C1.46957 14 0.960859 13.7893 0.585786 13.4142C0.210714 13.0391 0 12.5304 0 12V7ZM16 8H4V10H16V8Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
