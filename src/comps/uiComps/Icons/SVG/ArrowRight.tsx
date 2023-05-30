import { SVGProps } from '../SVGProps'

export default function ArrowRight({ fill, height, width, className }: SVGProps) {
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
          d="M0 6.99999V8.99999H12L6.5 14.5L7.92 15.92L15.84 7.99999L7.92 0.0799866L6.5 1.49999L12 6.99999H0Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
