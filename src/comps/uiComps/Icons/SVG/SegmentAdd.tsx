import { SVGProps } from '../SVGProps'

export default function SegmentAdd({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `20`}
        height={height || `20`}
        viewBox="0 0 20 20"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M12.6466 3.05371H4.15992V4.46038H12.6466V3.05371Z M12.6466 6.62704V5.88704H4.15992V7.29371H10.6733C11.2466 6.90704 11.9266 6.68704 12.6466 6.62704Z M4.15325 10.127H8.83325C8.91992 9.61371 9.09325 9.14704 9.35325 8.72038H4.15325V10.127Z M2.73992 11.5404V8.01371H1.33325V11.5404C1.33325 11.9137 1.47992 12.2737 1.74659 12.5337C2.01325 12.7937 2.37325 12.947 2.73992 12.947H9.34659C9.09325 12.507 8.90659 12.047 8.82659 11.5404H2.73992Z M13.1533 10.0004V8.48704H12.1399V10.0004H10.6266V11.0137H12.1399V12.527H13.1533V11.0137H14.6666V10.0004H13.1533Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
