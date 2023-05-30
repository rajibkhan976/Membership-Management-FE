import { CompBaseProps } from '@comps/uiComps'

export type RoutableTabProps = CompBaseProps & {
  path: string
  title: string
  icon?: import('react').ReactNode
}
const RoutableTab = ({ children }: RoutableTabProps) => {
  return <>{children}</>
}
export default RoutableTab
