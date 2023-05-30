import { divide } from 'lodash'

export const GridContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 jgxl:grid-cols-3 jgxl2:grid-cols-4 jgxl3:grid-cols-5 gap-4">

    <div className="flex flex-wrap justify-center -mx-1 md:-mx-2 jgxl2:-mx-3 jgxl3:-mx-4">{children}</div>
  )
}
