import { MapMarkerOutline } from '../Icons'

export type CardFooterProps = {
  children?: JSX.Element
  className?: string
}

const CardFooter = ({ children, className }: CardFooterProps) => {
  return <> {children}</>
}
export default CardFooter
