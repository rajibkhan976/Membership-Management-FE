import JGRoutes from 'jg-routes'
import { Suspense, useEffect } from 'react'
import { BrowserRouter, useNavigate } from 'react-router-dom'

type WrapperProps = {
  children?: import('react').ReactNode
  defaultNevigate?: string
}
function RouteWrapper(props: WrapperProps) {
  const navigate = useNavigate()
  useEffect(() => {
    navigate(`/${props.defaultNevigate}`)
  }, [])
  return <>{props.children}</>
}

function AppDemo({ view = 'Events' }: { view?: string }) {
  console.log('view', view)
  const views = [{ path: `/${view}`, name: view, config: {} }]
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <RouteWrapper defaultNevigate={view}>
          <JGRoutes area="Demo" views={views} />
        </RouteWrapper>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppDemo
