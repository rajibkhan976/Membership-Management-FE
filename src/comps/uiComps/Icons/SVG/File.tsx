import { SVGProps } from '../SVGProps'

export default function File({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `19`}
        height={height || `21`}
        viewBox="0 0 19 21"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path d="M12.1466 0.0537109H3.65992V1.46038H12.1466V0.0537109Z" fill={fill || `currentColor`} />
        <path
          d="M12.1466 3.62704V2.88704H3.65992V4.29371H10.1733C10.7466 3.90704 11.4266 3.68704 12.1466 3.62704Z"
          fill={fill || `currentColor`}
        />
        <path
          d="M3.65325 7.12704H8.33325C8.41992 6.61371 8.59325 6.14704 8.85325 5.72038H3.65325V7.12704Z"
          fill={fill || `currentColor`}
        />
        <path
          d="M2.23992 8.54038V5.01371H0.833252V8.54038C0.833252 8.91371 0.979919 9.27371 1.24659 9.53371C1.51325 9.79371 1.87325 9.94704 2.23992 9.94704H8.84659C8.59325 9.50704 8.40659 9.04704 8.32659 8.54038H2.23992Z"
          fill={fill || `currentColor`}
        />
        <path
          d="M12.6533 7.00038V5.48704H11.6399V7.00038H10.1266V8.01371H11.6399V9.52704H12.6533V8.01371H14.1666V7.00038H12.6533Z"
          fill={fill || `currentColor`}
        />
        <path />
      </svg>
    </>
  )
}
