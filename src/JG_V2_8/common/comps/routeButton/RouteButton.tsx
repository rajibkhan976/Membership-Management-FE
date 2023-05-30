import { Button, ButtonProps } from '@comps/uiComps'
import { NavLink } from 'react-router-dom'

export type RouteButtonProps = ButtonProps & {
  to?: string
}
function RouteButton(props: RouteButtonProps) {
  const { ...rest } = props
  return <Button as={NavLink} {...rest} />
}
export default RouteButton
