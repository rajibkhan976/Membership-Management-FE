import { SVGProps } from '../SVGProps'

export default function EmailReceived({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg 
        width={width || `16`}
        height={height || `16`}
        viewBox="0 0 16 16"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      ><path
          d="M8.50033 11.947C8.50033 9.74036 10.2937 7.94702 12.5003 7.94702C13.2337 7.94702 13.9137 8.14702 14.5003 8.48702V3.28035C14.5003 2.54035 13.9003 1.94702 13.167 1.94702H2.50033C1.76033 1.94702 1.16699 2.54035 1.16699 3.28035V11.2804C1.16699 12.0204 1.76699 12.6137 2.50033 12.6137H8.56033C8.52699 12.3937 8.50033 12.1737 8.50033 11.947ZM2.50033 4.61369V3.28035L7.83366 6.61369L13.167 3.28035V4.61369L7.83366 7.94702L2.50033 4.61369ZM11.667 14.0537L9.83366 12.0537L10.607 11.2804L11.667 12.3404L14.0603 9.94702L14.8337 10.887L11.667 14.0537Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
