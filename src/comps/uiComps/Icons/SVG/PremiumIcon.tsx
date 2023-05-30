import { SVGProps } from '../SVGProps'

export default function PremiumIcon({ fill, height, width, className }: SVGProps) {
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
        <g clipPath="url(#clip0_1882_20296)">
          <path
            d="M8 0C3.58187 0 0 3.58187 0 8C0 12.4181 3.58187 16 8 16C12.4181 16 16 12.4181 16 8C16 3.58187 12.4181 0 8 0ZM11.5253 6.75H11.5153L10.8656 10.5484C10.8273 10.7583 10.7166 10.9482 10.5527 11.0848C10.3888 11.2214 10.1821 11.2961 9.96875 11.2959H6.03125C5.81806 11.2959 5.61164 11.2211 5.44796 11.0845C5.28429 10.9479 5.17375 10.7582 5.13562 10.5484L4.48469 6.75H4.47469C4.34657 6.75 4.2222 6.70674 4.12173 6.62723C4.02127 6.54772 3.95059 6.43662 3.92115 6.31192C3.89172 6.18723 3.90524 6.05625 3.95955 5.9402C4.01385 5.82415 4.10574 5.72984 4.22033 5.67254C4.33493 5.61525 4.46552 5.59832 4.59093 5.62451C4.71635 5.65069 4.82925 5.71846 4.91135 5.81682C4.99344 5.91519 5.03992 6.03839 5.04325 6.16647C5.04657 6.29455 5.00656 6.42 4.92969 6.5225L6.19625 7.53594C6.24922 7.57821 6.31097 7.60811 6.37698 7.62347C6.44298 7.63882 6.51159 7.63923 6.57778 7.62468C6.64397 7.61012 6.70607 7.58096 6.75954 7.53934C6.81302 7.49771 6.85652 7.44466 6.88688 7.38406L7.70156 5.755C7.59627 5.69005 7.51504 5.59252 7.4702 5.47721C7.42537 5.36191 7.41938 5.23512 7.45313 5.1161C7.48689 4.99708 7.55855 4.89232 7.65725 4.81773C7.75595 4.74313 7.87628 4.70277 8 4.70277C8.12372 4.70277 8.24405 4.74313 8.34275 4.81773C8.44145 4.89232 8.51311 4.99708 8.54687 5.1161C8.58062 5.23512 8.57463 5.36191 8.52979 5.47721C8.48496 5.59252 8.40373 5.69005 8.29844 5.755L9.11312 7.38406C9.14348 7.44466 9.18698 7.49771 9.24046 7.53934C9.29393 7.58096 9.35603 7.61012 9.42222 7.62468C9.48841 7.63923 9.55702 7.63882 9.62302 7.62347C9.68903 7.60811 9.75078 7.57821 9.80375 7.53594L11.0703 6.5225C10.9935 6.42005 10.9536 6.29467 10.9569 6.16668C10.9603 6.03868 11.0067 5.91557 11.0888 5.81728C11.1708 5.71899 11.2837 5.65128 11.409 5.62512C11.5343 5.59896 11.6648 5.61588 11.7794 5.67314C11.8939 5.7304 11.9857 5.82464 12.04 5.94061C12.0943 6.05658 12.1078 6.18747 12.0784 6.31209C12.049 6.4367 11.9784 6.54775 11.878 6.62722C11.7776 6.7067 11.6534 6.74996 11.5253 6.75Z"
            fill={fill || `currentColor`}
          />
        </g>
        <defs>
          <clipPath id="clip0_1882_20296">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </>
  )
}
