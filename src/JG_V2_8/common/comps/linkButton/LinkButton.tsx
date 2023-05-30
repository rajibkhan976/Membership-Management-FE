import { Button, ButtonProps } from '@comps/uiComps'

export type LinkButtonProps = ButtonProps & {
  href?: string
  target?: string
}
function LinkButton(props: LinkButtonProps) {
  const { ...rest } = props
  return <Button as={'a'} {...rest} />
}
export default LinkButton
