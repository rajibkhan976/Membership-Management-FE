import { SVGProps } from '../SVGProps'

export default function ChevronDoubleDown({ fill, height, width, className }: SVGProps) {
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
          d="M10.59 0.589844L12 1.99984L6 7.99984L0 1.99984L1.41 0.589844L6 5.16984L10.59 0.589844ZM10.59 6.58984L12 7.99984L6 13.9998L0 7.99984L1.41 6.58984L6 11.1698L10.59 6.58984Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
