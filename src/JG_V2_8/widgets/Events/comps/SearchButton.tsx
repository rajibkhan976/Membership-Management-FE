import { RouteButton } from '@jg/common/comps'
import { RouteButtonProps } from '@jg/common/comps/routeButton/RouteButton'
import { useWidgetContext } from 'jg-widget'

import { SearchRequestArg } from '../store/useEventStore'
import useNavigateWithArgs from './hooks/useNavigateWithArgs'

type SearchButtonProps = RouteButtonProps & {
  searchRequestArg: SearchRequestArg
}

const SearchButton = ({ searchRequestArg, ...rest }: SearchButtonProps) => {
  const { basePath } = useWidgetContext()
  const { getSearchPath } = useNavigateWithArgs()
  return <RouteButton to={`${basePath}browse/${getSearchPath(searchRequestArg)}`} {...rest} />
}
export default SearchButton
