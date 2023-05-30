import { SVGProps } from '../SVGProps'

export default function ArrowLeft({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `16`}
        height={height || `16`}
        viewBox="0 0 16 16"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M16.0002 6.99999V8.99999H4.00016L9.50016 14.5L8.08016 15.92L0.160156 7.99999L8.08016 0.0799866L9.50016 1.49999L4.00016 6.99999H16.0002Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
