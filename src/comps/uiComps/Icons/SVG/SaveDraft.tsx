import { SVGProps } from '../SVGProps'

export default function SaveDraft({ fill, height, width, className }: SVGProps) {
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
          d="M4.00033 1.33301C3.6467 1.33301 3.30756 1.47348 3.05752 1.72353C2.80747 1.97358 2.66699 2.31272 2.66699 2.66634V13.333C2.66699 13.6866 2.80747 14.0258 3.05752 14.2758C3.30756 14.5259 3.6467 14.6663 4.00033 14.6663H12.0003C12.3539 14.6663 12.6931 14.5259 12.9431 14.2758C13.1932 14.0258 13.3337 13.6866 13.3337 13.333V5.33301L9.33366 1.33301H4.00033ZM4.00033 2.66634H8.66699V5.99967H12.0003V13.333H4.00033V2.66634ZM5.33366 7.99967V9.33301H10.667V7.99967H5.33366ZM5.33366 10.6663V11.9997H8.66699V10.6663H5.33366Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
