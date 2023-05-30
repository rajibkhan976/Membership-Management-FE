import Lorem from '@jg/utils/Lorem'
import { Outlet } from 'react-router-dom'

function PageComponent({ title }: { title: string }) {
  return (
    <>
      <h1 className="text-lg">{title}</h1>
      <Lorem />
      <Outlet />
    </>
  )
}
export default PageComponent
