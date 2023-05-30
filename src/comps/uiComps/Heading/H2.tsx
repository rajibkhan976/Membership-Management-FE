import { HeadingProps } from './HeadingProps'

function H2(props: HeadingProps) {
  return <h2 className="text-2xl font-semibold not-italic text-zinc-800">{props.children || props.text}</h2>
}
export default H2
