import JGMap from '@comps/uiComps/JGMap/JGMap'
import useEventStore from '../../store/useEventStore'
import { data } from 'azure-maps-control'
import { addressInfo } from '@jg/common/types'
import { useFilterResultMapContext } from '../../providers/FilterResultMapProvider'
import { useRef } from 'react'
import { AzureMapsProvider } from 'react-azure-maps'
const withComma = (str?: string) => {
  if (str && str.length > 0) {
    return `${str}, `
  }
  return ''
}
const formatAddress = (address?: addressInfo) => {
  const defaults: addressInfo = {
    address1: '',
    address2: '',
    address3: '',
    town: '',
    postCode: '',
    county: '',
    country: '',
  }
  return Object.keys(address || defaults)
    .map((key) => withComma((address || defaults)[key as keyof addressInfo]))
    .join('')
    .slice(0, -2)
}

const EventMap = ({ className }: { className?: string }) => {
  const events = useEventStore((state) => state.searchResultsByPage)
  const {
    setEventInfoCardSelected,
    getCurrentSelectedEventId,
    setMapDataLayerRef,
    getMapDataLayerRef,
    changeMapMarker,
  } = useFilterResultMapContext()

  // to remember the previously hovered marker
  const prevSelectedId = useRef('')

  return (
    <div className={className}>
      <AzureMapsProvider>
        <JGMap
          {...{
            center: getMapDataLayerRef?.() ? getMapDataLayerRef().map?.getCamera().center : [-0.12624, 51.50015],
            zoom: getMapDataLayerRef?.() ? getMapDataLayerRef().map?.getCamera().zoom : 5,
            //filterMarkersInRadius: true,
            // boundingCircleRadius: 100000,
            //  boundingCircleCenter: [-0.12624, 51.50015],
            clusterDisable: true,
            popupOnHoverDisable: true,
            samePointCluster: true,
            onMarkerClicked: (e) => {
              const markerId = e?.getProperties()?.id
              if (markerId) {
                document.getElementById(`event-info-card-${markerId}`)?.scrollIntoView({ behavior: 'smooth' })
              }
            },
            onMarkerMouseEnter: (e) => {
              const currentMarkerId = e.data?.properties.id
              const previousMarkerId = prevSelectedId.current
              if (currentMarkerId === previousMarkerId) return

              // Remove hover from previous one
              if (previousMarkerId) {
                setEventInfoCardSelected(previousMarkerId, false)
                changeMapMarker?.(previousMarkerId, { icon: 'marker-red', hovered: 0 })
              }

              // Hover effect on current one
              setEventInfoCardSelected(currentMarkerId, true)
              e?.setProperties({ ...e.data?.properties, icon: 'marker-darkblue', hovered: 1 })

              prevSelectedId.current = currentMarkerId
            },
            onMarkerMouseLeave: () => {
              setEventInfoCardSelected(getCurrentSelectedEventId?.() || '', false)
              const id = prevSelectedId.current
              changeMapMarker?.(id, { icon: 'marker-red', hovered: 0 })
              prevSelectedId.current = ''
            },
            setDataSourceRef: setMapDataLayerRef,
            markers: events
              ? events
                  .filter((event) => event?.locationType === 'venue' && event.latlng?.lat && event.latlng?.lng)
                  .map((event) => {
                    return {
                      id: event.docId.toString(),
                      title: `${event.name}`,
                      description: formatAddress(event.address),
                      caption: '',
                      coordinate: new data.Position(+(event.latlng?.lng || 0), +(event.latlng?.lat || 0)),
                      icon: 'marker-red',
                      color: 'black',
                      extraMarkerOption: { customText: 3 },
                    }
                  })
              : [],
          }}
        />
      </AzureMapsProvider>
    </div>
  )
}

export default EventMap
