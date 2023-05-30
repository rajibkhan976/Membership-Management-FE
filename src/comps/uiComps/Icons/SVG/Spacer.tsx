import { SVGProps } from '../SVGProps'

export default function Spacer({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `24`}
        height={height || `24`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <rect x="3" y="2" width="18" height="20" rx="1" stroke={fill || `currentColor`} strokeWidth="2" />
        <path
          d="M16 15.5318L12 19L8 15.5318L9.03486 14.6345L11.2661 16.5627V7.43727L9.03486 9.36545L8 8.46818L12 5L16 8.46818L14.9651 9.36545L12.7339 7.43727V16.5627L14.9651 14.6345L16 15.5318Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
