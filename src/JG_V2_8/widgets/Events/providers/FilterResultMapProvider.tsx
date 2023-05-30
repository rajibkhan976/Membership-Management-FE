import { CompBaseProps } from '@comps/uiComps'
import { createContext, useContext, useRef } from 'react'
//type resultDisplayByType = 'browse' | 'calendar'
interface IFilterResultMap {
  getCurrentSelectedEventId?: () => string
  setEventInfoCardSelected: (eventId: string, selected: boolean) => void
  getMapDataLayerRef?: () => any
  setMapDataLayerRef?: (e: any) => void
  changeMapMarker?: (id: string, properties: Record<string, any>) => void
}
const FilterResultMapContext = createContext<IFilterResultMap>({
  getCurrentSelectedEventId: () => '',
  setEventInfoCardSelected: () => {},
})

export const useFilterResultMapContext = () => {
  return useContext(FilterResultMapContext)
}
const setEventInfoCardSelected = (eventId: string, selected: boolean) => {
  document.getElementById(`event-info-card-${eventId}`)?.classList[selected ? 'add' : 'remove']('bg-jg-grey-50')
}

const FilterResultMapProvider = ({ children }: CompBaseProps) => {
  const currentSelection = useRef('')
  const mapDataLayerRef = useRef()

  const setMapDataLayerRef = (e: any) => {
    mapDataLayerRef.current = e
  }
  const getMapDataLayerRef = () => {
    return mapDataLayerRef.current as any
  }

  function changeMapMarker(id: string, properties: Record<string, any>) {
    const dataSource = getMapDataLayerRef()
    if (id && dataSource) {
      const currentMarkerProperties = dataSource?.getShapeById(id.toString())?.getProperties()
      if (!currentMarkerProperties) return

      dataSource?.getShapeById(id.toString()).setProperties({ ...currentMarkerProperties, ...properties })
    }
  }

  return (
    <FilterResultMapContext.Provider
      value={{
        getCurrentSelectedEventId: () => {
          return currentSelection.current
        },
        setEventInfoCardSelected: (eventId, selected) => {
          currentSelection.current = selected ? eventId : ''
          setEventInfoCardSelected(eventId, selected)
        },
        getMapDataLayerRef,
        setMapDataLayerRef,
        changeMapMarker,
      }}
    >
      {children}
    </FilterResultMapContext.Provider>
  )
}
export { FilterResultMapProvider as default }
