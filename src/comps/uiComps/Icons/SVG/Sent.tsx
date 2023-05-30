import { SVGProps } from '../SVGProps'

export default function SentIcon({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `16`}
        height={height || `16`}
        viewBox="0 0 16 16"
        className={className}
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.25 8.74637L3.97667 12.473L4.91667 11.5264L1.19667 7.80637M14.8033 3.52637L7.75 10.5864L4.97667 7.80637L4.02333 8.74637L7.75 12.473L15.75 4.47303M11.9767 4.47303L11.0367 3.52637L6.80333 7.7597L7.75 8.6997L11.9767 4.47303Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
