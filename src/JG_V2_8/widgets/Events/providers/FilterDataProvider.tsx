import { CompBaseProps } from '@comps/uiComps'
import { createContext, useContext } from 'react'
type resultDisplayByType = 'browse' | 'calendar'
interface IFilterData {
  resultDisplayBy: resultDisplayByType
}
const FilterDataContext = createContext<IFilterData>({ resultDisplayBy: 'browse' })

export const useFilterDataContext = () => {
  return useContext(FilterDataContext)
}
type FilterDataProviderProps = CompBaseProps & {
  resultDisplayBy: resultDisplayByType
}
const FilterDataProvider = ({ children, resultDisplayBy }: FilterDataProviderProps) => {
  return <FilterDataContext.Provider value={{ resultDisplayBy }}>{children}</FilterDataContext.Provider>
}
export { FilterDataProvider as default }
