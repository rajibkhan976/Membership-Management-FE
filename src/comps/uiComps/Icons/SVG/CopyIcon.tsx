import { SVGProps } from '../SVGProps'

export default function CopyIcon({ fill, height, width, className }: SVGProps) {
  return (
    <svg
      width={width || `24`}
      viewBox="0 0 24 24"
      height={height || `24`}
      fill={fill || `currentColor`}
      strokeWidth={2}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M19.1066 20.5909H8.68215V7.22727H19.1066V20.5909ZM19.1066 5.31818H8.68215C8.17948 5.31818 7.69738 5.51932 7.34194 5.87734C6.98649 6.23537 6.7868 6.72095 6.7868 7.22727V20.5909C6.7868 21.0972 6.98649 21.5828 7.34194 21.9408C7.69738 22.2989 8.17948 22.5 8.68215 22.5H19.1066C19.6093 22.5 20.0914 22.2989 20.4468 21.9408C20.8023 21.5828 21.002 21.0972 21.002 20.5909V7.22727C21.002 6.72095 20.8023 6.23537 20.4468 5.87734C20.0914 5.51932 19.6093 5.31818 19.1066 5.31818ZM16.2636 1.5H4.89145C4.38877 1.5 3.90668 1.70114 3.55123 2.05916C3.19578 2.41718 2.99609 2.90277 2.99609 3.40909V16.7727H4.89145V3.40909H16.2636V1.5Z"
        fill={fill || `currentColor`}
      />
    </svg>
  )
}
