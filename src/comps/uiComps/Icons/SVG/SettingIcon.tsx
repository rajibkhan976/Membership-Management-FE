import { SVGProps } from '../SVGProps'

export default function SettingIcon({ fill, height, width, className }: SVGProps) {
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
          d="M6.17546 14.6663L5.91012 12.533C5.7664 12.4775 5.63107 12.4108 5.50415 12.333C5.37679 12.2552 5.2523 12.1719 5.13069 12.083L3.15722 12.9163L1.33301 9.74967L3.04113 8.44967C3.03008 8.3719 3.02455 8.29679 3.02455 8.22434V7.77434C3.02455 7.70234 3.03008 7.62745 3.04113 7.54967L1.33301 6.24967L3.15722 3.08301L5.13069 3.91634C5.2523 3.82745 5.37944 3.74412 5.51211 3.66634C5.64478 3.58856 5.77745 3.5219 5.91012 3.46634L6.17546 1.33301H9.82389L10.0892 3.46634C10.233 3.5219 10.3685 3.58856 10.4959 3.66634C10.6228 3.74412 10.747 3.82745 10.8687 3.91634L12.8421 3.08301L14.6663 6.24967L12.9582 7.54967C12.9693 7.62745 12.9748 7.70234 12.9748 7.77434V8.22434C12.9748 8.29679 12.9637 8.3719 12.9416 8.44967L14.6498 9.74967L12.8255 12.9163L10.8687 12.083C10.747 12.1719 10.6199 12.2552 10.4872 12.333C10.3546 12.4108 10.2219 12.4775 10.0892 12.533L9.82389 14.6663H6.17546ZM8.03284 10.333C8.67408 10.333 9.22134 10.1052 9.67463 9.64968C10.1279 9.19412 10.3546 8.64412 10.3546 7.99967C10.3546 7.35523 10.1279 6.80523 9.67463 6.34967C9.22134 5.89412 8.67408 5.66634 8.03284 5.66634C7.38055 5.66634 6.83041 5.89412 6.38243 6.34967C5.93489 6.80523 5.71112 7.35523 5.71112 7.99967C5.71112 8.64412 5.93489 9.19412 6.38243 9.64968C6.83041 10.1052 7.38055 10.333 8.03284 10.333ZM8.03284 8.99967C7.75645 8.99967 7.52162 8.90234 7.32836 8.70767C7.13467 8.51345 7.03782 8.27745 7.03782 7.99967C7.03782 7.7219 7.13467 7.4859 7.32836 7.29167C7.52162 7.09701 7.75645 6.99967 8.03284 6.99967C8.30924 6.99967 8.54428 7.09701 8.73798 7.29167C8.93124 7.4859 9.02787 7.7219 9.02787 7.99967C9.02787 8.27745 8.93124 8.51345 8.73798 8.70767C8.54428 8.90234 8.30924 8.99967 8.03284 8.99967ZM7.33632 13.333H8.64644L8.87861 11.5663C9.22134 11.4775 9.53931 11.3468 9.83251 11.1743C10.1253 11.0023 10.3933 10.7941 10.6365 10.5497L12.2783 11.233L12.925 10.0997L11.4988 9.01634C11.5541 8.86079 11.5928 8.69679 11.6149 8.52434C11.637 8.35234 11.6481 8.17745 11.6481 7.99967C11.6481 7.8219 11.637 7.64679 11.6149 7.47434C11.5928 7.30234 11.5541 7.13856 11.4988 6.98301L12.925 5.89967L12.2783 4.76634L10.6365 5.46634C10.3933 5.21079 10.1253 4.99679 9.83251 4.82434C9.53931 4.65234 9.22134 4.5219 8.87861 4.43301L8.66302 2.66634H7.35291L7.12074 4.43301C6.77801 4.5219 6.46026 4.65234 6.1675 4.82434C5.8743 4.99679 5.60609 5.20523 5.36286 5.44967L3.72107 4.76634L3.0743 5.89967L4.5005 6.96634C4.44522 7.13301 4.40653 7.29967 4.38442 7.46634C4.36231 7.63301 4.35125 7.81079 4.35125 7.99967C4.35125 8.17745 4.36231 8.34967 4.38442 8.51634C4.40653 8.68301 4.44522 8.84967 4.5005 9.01634L3.0743 10.0997L3.72107 11.233L5.36286 10.533C5.60609 10.7886 5.8743 11.0023 6.1675 11.1743C6.46026 11.3468 6.77801 11.4775 7.12074 11.5663L7.33632 13.333Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
