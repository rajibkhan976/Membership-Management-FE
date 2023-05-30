import { SVGProps } from '../SVGProps'

export default function CreateEmail({ fill, height, width, className }: SVGProps) {
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
          d="M8.33333 11.6667C8.33333 9.46008 10.1267 7.66675 12.3333 7.66675C13.0667 7.66675 13.7467 7.86675 14.3333 8.20675V3.00008C14.3333 2.26008 13.7333 1.66675 13 1.66675H2.33333C1.59333 1.66675 1 2.26008 1 3.00008V11.0001C1 11.7401 1.6 12.3334 2.33333 12.3334H8.39333C8.36 12.1134 8.33333 11.8934 8.33333 11.6667ZM2.33333 4.33341V3.00008L7.66667 6.33341L13 3.00008V4.33341L7.66667 7.66675L2.33333 4.33341ZM13 9.00008V11.0001H15V12.3334H13V14.3334H11.6667V12.3334H9.66667V11.0001H11.6667V9.00008H13Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
