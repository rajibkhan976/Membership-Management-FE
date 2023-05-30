import { HeadingProps } from './HeadingProps'

function H5(props: HeadingProps) {
  return <h5 className="text-base font-semibold  not-italic text-zinc-800">{props.children || props.text}</h5>
}

export default H5
