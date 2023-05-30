import { SVGProps } from '../SVGProps'

export type GraphSVGProps = {
  fill1?: string
  fill2?: string
  height?: number
  width?: number
  className?: string
}

export default function GraphSVG(props: GraphSVGProps) {
  const { fill1, fill2, className, height, width } = props
  return (
    <>
      <svg
        width={width || `1420`}
        height={height || `711`}
        viewBox="0 0 1420 711"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 125.505L157.122 620.855C157.122 620.855 616.403 806.108 1265.04 620.855L1410.07 125.505C1410.07 125.505 842.014 326.867 0 125.505Z"
          fill={fill1 || `#AB47BC`}
        />
        <path
          d="M705.036 0.661133C315.655 0.661133 0 56.5591 0 125.505C0 194.452 315.655 250.35 705.036 250.35C1094.42 250.35 1410.07 194.452 1410.07 125.505C1410.07 56.5591 1094.42 0.661133 705.036 0.661133Z"
          fill={fill2 || `#9C27B0`}
        />
      </svg>
    </>
  )
}
