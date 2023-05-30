import { HeadingProps } from './HeadingProps'

function H6(props: HeadingProps) {
  return <h5 className="text-sm font-semibold text-zinc-800 not-italic">{props.children || props.text}</h5>
}

export default H6

{
  /* <h1 className='w-48 text-base leading-6 font-normal not-italic text-zinc-800'>{props.children}</h1> */
}
