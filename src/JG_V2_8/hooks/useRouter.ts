import { useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export default () => {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  //const history = useHistory()
  // const match = useMatch()
  // Return our custom router object
  // Memoize so that a new object is only returned if something changes
  return useMemo(() => {
    return {
      replaceURL: (url?: string) => {
        history.replaceState(null, '', url)
      },
      esc: (url: string) => {
        //@ts-ignore
        if (parent.window.escUrl) {
          //@ts-ignore
          parent.window.escUrl(url)
        }
      },
      // For convenience add push(), replace(), pathname at top level
      // push: history.push,
      // replace: history.replace,
      pathname: location.pathname,
      hash: location.hash,
      key: location.key,
      // Merge params and parsed query string into single "query" object
      // so that they can be used interchangeably.
      // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
      /*query: {
        ...queryString.parse(location.search), // Convert string to object
        ...params,
      },*/
      // Include match, location, history objects so we have
      // access to extra React Router functionality if needed.
      // match,
      location,
      navigate,
    }
  }, [params, location])
}
