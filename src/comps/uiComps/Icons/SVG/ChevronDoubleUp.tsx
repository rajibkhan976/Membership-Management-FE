import { SVGProps } from '../SVGProps'

export default function ChevronDoubleUp({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `12`}
        height={height || `14`}
        viewBox="0 0 12 14"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M1.41 13.4102L0 12.0002L6 6.00016L12 12.0002L10.59 13.4102L6 8.83016L1.41 13.4102ZM1.41 7.41016L0 6.00016L6 0.000154495L12 6.00016L10.59 7.41016L6 2.83016L1.41 7.41016Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
