import { HeadingProps } from './HeadingProps'

function H4(props: HeadingProps) {
  return <h4 className="text-lg font-semibold text-zinc-800 not-italic ">{props.children || props.text}</h4>
}

export default H4
