import { SVGProps } from '../SVGProps'

export default function TemplateLibrary({ fill, height, width, className }: SVGProps) {
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
          d="M2 4.66683V3.3335H3.33333V2.66683C3.33333 1.92683 3.93333 1.3335 4.66667 1.3335H8.66667V6.00016L10.3333 5.00016L12 6.00016V1.3335H12.6667C13.3667 1.3335 14 1.96683 14 2.66683V13.3335C14 14.0335 13.3667 14.6668 12.6667 14.6668H4.66667C3.96667 14.6668 3.33333 14.0335 3.33333 13.3335V12.6668H2V11.3335H3.33333V8.66683H2V7.3335H3.33333V4.66683H2ZM4.66667 7.3335H3.33333V8.66683H4.66667V7.3335ZM4.66667 4.66683V3.3335H3.33333V4.66683H4.66667ZM4.66667 12.6668V11.3335H3.33333V12.6668H4.66667Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
