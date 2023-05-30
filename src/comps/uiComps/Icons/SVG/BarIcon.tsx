import { SVGProps } from '../SVGProps'

export default function BarIcon({ fill, height, width, className }: SVGProps) {
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
          d="M4.66667 2H3.33333V6H4.66667V2ZM12.6667 2H11.3333V8.66667H12.6667V2ZM2 8.66667H3.33333V14H4.66667V8.66667H6V7.33333H2V8.66667ZM10 4.66667H8.66667V2H7.33333V4.66667H6V6H10V4.66667ZM7.33333 14H8.66667V7.33333H7.33333V14ZM10 10V11.3333H11.3333V14H12.6667V11.3333H14V10H10Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
