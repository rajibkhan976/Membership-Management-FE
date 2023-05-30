import Loadable from 'react-loadable'

function Loading() {
  return <div>Loading....</div>
}
const ViewLoader = (viewName: string) =>
  Loadable({
    loader: () => import(`../views/Protected/${viewName}/${viewName}`),
    loading: Loading,
  })
export default ViewLoader
