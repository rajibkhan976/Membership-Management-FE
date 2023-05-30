import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  AzureMapDataSourceProvider,
  AzureMapFeature,
  AzureMapLayerProvider,
  AzureMapPopup,
  AzureMapsContext,
  IAzureDataSourceChildren,
  IAzureMapFeature,
  IAzureMapsContextProps,
} from 'react-azure-maps'
import {
  data,
  control,
  ControlPosition,
  Popup,
  SymbolLayerOptions,
  Expression,
  MapMouseEvent,
  PopupOptions,
  Shape,
} from 'azure-maps-control'
import JGMapContainer from './JGMapContainer'
import useMapOption from './useMapOption'
type SingleMarkerInfo = {
  id: string
  coordinate: data.Position
  title?: string
  caption?: string
  description?: string
  color?: string
  icon?: MarkerIconVariation
  extraMarkerOption?: Record<string, any>
}
const onClick = (e: any) => {
  console.log('You click on: ', e)
}

/*const points = Array.from({ length: 100 }).map(() => {
  const randomLongitude = Math.floor(Math.random() * (-80 - -120) + -120)
  const randomLatitude = Math.floor(Math.random() * (30 - 65) + 65)
  return {
    coordinate: new data.Position(randomLongitude, randomLatitude),
    color: Math.random() > 0.5 ? 'red' : 'blue',
    title: '',
    description: '',
  }
})*/

type MarkerIconVariation =
  | 'marker-black'
  | 'marker-blue'
  | 'marker-darkblue'
  | 'marker-red'
  | 'marker-yellow'
  | 'pin-blue'
  | 'pin-darkblue'
  | 'pin-red'
  | 'pin-round-blue'
  | 'pin-round-darkblue'
  | 'pin-round-red'

const renderPoint = (
  coordinates: data.Position,
  color = 'red',
  id: string,
  title?: string,
  description?: string,
  caption?: string,
  icon?: MarkerIconVariation,
  extraMarkerOption?: Record<string, any>
): IAzureMapFeature => {
  const rendId = Math.random()
  return (
    <AzureMapFeature
      key={rendId}
      id={id}
      type="Point"
      coordinate={coordinates}
      properties={{
        id: id,
        title: title || `Marker ${rendId.toString(16).slice(2, 5)}`,
        description: description,
        caption: caption,
        icon: icon ? icon : `pin-${color}`,
        color,
        hovered: 0,
        ...extraMarkerOption,
      }}
    />
  )
}

const renderBoundingCircle = (center: data.Position, radius: number) => (
  <AzureMapFeature
    id="JGMap bounding-circle"
    key="JGMap bounding-circle"
    variant="shape"
    type="Point"
    setCoords={center}
    setProperties={{
      subType: 'Circle',
      radius,
    }}
    coordinate={center}
    properties={{
      subType: 'Circle',
      radius,
    }}
  />
)

function clusterClicked(e: any) {
  if (e && e.shapes && e.shapes.length > 0 && e.shapes[0].properties.cluster) {
    // Get the clustered point from the event.
    const cluster = e.shapes[0]

    // Get the cluster expansion zoom level. This is the zoom level at which the cluster starts to break apart.
    e.map.sources
      .getById('JGMap AzureMapDataSourceProvider')
      .getClusterExpansionZoom(cluster.properties.cluster_id)
      .then((zoom: any) => {
        // Update the map camera to be centered over the cluster.
        e.map.setCamera({
          center: cluster.geometry.coordinates,
          zoom,
          type: 'ease',
          duration: 200,
        })
      })
  }
}

// 53.47899,-2.23268 British Open series

type JGMapProps = {
  center: data.Position
  zoom: number
  markers: SingleMarkerInfo[]
  filterMarkersInRadius?: boolean
  boundingCircleRadius?: number
  boundingCircleCenter?: data.Position
  clusterDisable?: boolean
  popupOnHoverDisable?: boolean
  samePointCluster?: boolean
  onMarkerClicked?: (e: any) => void
  onMarkerMouseEnter?: (e: any) => void
  onMarkerMouseLeave?: () => void
  setDataSourceRef?: React.Dispatch<any | undefined>
}
function JGMap(props: JGMapProps) {
  const {
    center = [-100, 50],
    zoom = 3,
    markers = [],
    filterMarkersInRadius = false,
    boundingCircleRadius = 999999,
    boundingCircleCenter = [-100, 50],
    clusterDisable = false,
    popupOnHoverDisable = false,
    samePointCluster = false,
    onMarkerClicked,
    onMarkerMouseEnter,
    onMarkerMouseLeave,
    setDataSourceRef,
  } = props
  const option = useMapOption(center, zoom)

  const [layerOptions, setLayerOptions] = useState<SymbolLayerOptions>(DEFAULT_LAYER_OPTION)

  const [bubbleOptions] = useState(bubbleLayerOptions)

  const [showPopup, setShowPopup] = useState(false)
  const [popupOptions, setPopupOptions] = useState<PopupOptions>({})
  type PopupPropType = Record<string, string>[]
  const [popupProperties, setPopupProperties] = useState<PopupPropType>([])
  // const [popupProperties, setPopupProperties] = useState<{
  //   [x: string]: string
  // }>({})

  const { mapRef, isMapReady } = useContext<IAzureMapsContextProps>(AzureMapsContext)

  // circle bounds marker
  const [circleBounds, setCircleBounds] = useState<data.Position[]>([])

  const memoizedMarkerRender: IAzureDataSourceChildren = useMemo(
    (): any =>
      [...markers].map(({ coordinate, color, id, title, description, caption, icon, extraMarkerOption }) =>
        renderPoint(coordinate, color, id, title, description, caption, icon, extraMarkerOption)
      ),
    [markers]
  )

  const memoizedBoundingCircleRender: IAzureDataSourceChildren = useMemo(
    () => (filterMarkersInRadius ? renderBoundingCircle(boundingCircleCenter, boundingCircleRadius) : <></>),
    [boundingCircleCenter, boundingCircleRadius, filterMarkersInRadius]
  )

  const samePointPopup = useRef(new Popup())

  useEffect(() => {
    if (mapRef) {
      // Clicking anywhere in map
      mapRef?.events.add('click', () => {
        samePointPopup.current.close()
      })

      mapRef.controls.add([new control.PitchControl(), new control.ZoomControl(), new control.CompassControl()], {
        position: ControlPosition.TopRight,
      })
    }
  }, [mapRef])

  useEffect(() => {
    samePointPopup.current.close()
    let timeout500: NodeJS.Timeout | undefined = undefined
    if (isMapReady && mapRef) {
      const dataSource = mapRef.sources.getSources()[1] as any
      console.log('Datasource added', dataSource)
      setDataSourceRef?.(dataSource)
      timeout500 = setTimeout(() => {
        const points = dataSource.shapes.map((shape: any) => shape.data.geometry.coordinates)
        dataSource.map.setCamera({
          bounds: data.BoundingBox.fromPositions(points || []),
          padding: 50,
          type: 'ease',
          maxZoom: 17,
        })
      }, 750)
    }
    return () => clearTimeout(timeout500)
  }, [isMapReady, mapRef, markers, setDataSourceRef])

  useEffect(() => {
    if (filterMarkersInRadius) {
      const circleShape = new Shape(new data.Polygon([circleBounds]))
      setLayerOptions((options) => ({
        ...options,
        // filter: ['within' as unknown as 'case', circleShape.toJson()],

        filter: ['all', ['within' as unknown as 'case', circleShape.toJson()], ['!', ['has', 'point_count']]],
      }))
    } else {
      setLayerOptions((options) => ({
        ...options,
        filter: ['!', ['has', 'point_count']],
      }))
    }
  }, [
    circleBounds,
    filterMarkersInRadius,
    // boundingCircleCenter,
    // boundingCircleRadius,
  ])

  const circleEvents = useRef<any>(null)

  useEffect(() => {
    if (circleEvents.current) {
      const circle_bound = circleEvents.current[0].circlePolygon.geometry.coordinates[0]
      setCircleBounds([...circle_bound])
    }
  }, [boundingCircleCenter, boundingCircleRadius])

  return (
    <JGMapContainer mapOption={option} closePopup={() => setShowPopup(false)}>
      <>
        <AzureMapDataSourceProvider
          events={
            {
              // dataadded: (e: any) => {
              // },
            }
          }
          id="JGMap AzureMapDataSourceProvider"
          options={{
            cluster: (!clusterDisable || samePointCluster) && !filterMarkersInRadius,
            clusterRadius: samePointCluster ? 12 : 45,
            clusterMaxZoom: 22,
            maxZoom: 22,
            clusterProperties: {
              hovered: ['+', ['get', 'hovered']],
            },
          }}
        >
          {!clusterDisable ? (
            <>
              <AzureMapLayerProvider
                id="BubbleLayer LayerProvider"
                options={bubbleOptions}
                type="BubbleLayer"
                events={{
                  click: clusterClicked,
                }}
              />
              <AzureMapLayerProvider
                id="BubbleLayer2 LayerProvider"
                options={{
                  iconOptions: {
                    image: 'none', // Hide the icon image.
                  },
                  textOptions: {
                    textField: ['get', 'point_count_abbreviated'],
                    offset: [0, 0.4],
                    // color: '#ffffff',
                  },
                  filter: filterMarkersInRadius
                    ? [
                        'all',
                        ['within' as unknown as 'case', new Shape(new data.Polygon([circleBounds])).toJson()],
                        ['has', 'point_count'],
                      ]
                    : ['has', 'point_count'],
                }}
                type="SymbolLayer"
              />
            </>
          ) : null}

          {samePointCluster ? (
            <AzureMapLayerProvider
              id="LayerProvider SamePointCluster"
              options={{
                textOptions: {
                  textField: ['get', 'point_count_abbreviated'],
                  offset: [0, -1.2],
                  color: '#ffffff',
                  size: 14,
                  allowOverlap: true,
                },
                iconOptions: {
                  allowOverlap: true,
                  image: ['step', ['get', 'hovered'], 'marker-red', 1, 'marker-darkblue'],
                },
                filter: ['has', 'point_count'],
              }}
              type="SymbolLayer"
              events={{
                click: async (e: any) => {
                  const cluster = e?.shapes?.[0]
                  if (!cluster) samePointPopup.current?.close()

                  if (mapRef && cluster) {
                    const dataSource = mapRef.sources.getSources()[1] as any
                    const points = await dataSource.getClusterLeaves(cluster.properties.cluster_id, Infinity, 0)
                    const popupElement = document.createElement('div')
                    popupElement.classList.add('p-4', 'text-white', 'space-y-1', 'max-w-[300px]')
                    points.forEach((point: any) => {
                      const element = document.createElement('h3')
                      element.innerHTML = '📌 ' + point.getProperties().title
                      element.classList.add('font-medium', 'cursor-pointer', 'truncate')
                      element.onclick = () => onMarkerClicked?.(point)
                      element.onmouseenter = () => onMarkerMouseEnter?.(point)
                      element.onmouseleave = () => onMarkerMouseLeave?.()
                      popupElement.appendChild(element)
                    })
                    samePointPopup.current.setOptions({
                      content: popupElement,
                      position: e.shapes[0].geometry.coordinates,
                      pixelOffset: [0, -18],
                      fillColor: 'rgba(0, 0, 0, 0.8',
                      closeButton: false,
                    })
                    samePointPopup.current.open(mapRef)
                  }
                },
                mouseleave: (e: any) => {
                  if (e?.shapes?.length === 0) {
                    samePointPopup.current.close()
                  }
                },
              }}
            />
          ) : null}
          <AzureMapLayerProvider
            id="JGMap AzureMapLayerProvider"
            options={layerOptions}
            events={{
              mouseenter: (e: MapMouseEvent) => {
                // change cursor
                if (mapRef) {
                  mapRef.getCanvasContainer().style.cursor = 'pointer'
                }

                if (e.shapes && e.shapes?.length > 0) {
                  const prop: any = e.shapes[0]
                  onMarkerMouseEnter?.(prop)
                }
              },
              mouseleave: (e: MapMouseEvent) => {
                if (mapRef) {
                  mapRef.getCanvasContainer().style.cursor = 'grab'
                }

                onMarkerMouseLeave?.()
              },
              click: (e: MapMouseEvent) => {
                if (e.shapes && e.shapes?.length > 0) {
                  const prop: any = e.shapes[0]

                  onMarkerClicked?.(prop)
                }
              },
              dbclick: onMarkerClicked || onClick,
              mousemove: (e: MapMouseEvent) => {
                // detect overlaping non-clustered marker
                if (e?.shapes?.[0]) {
                  onMarkerMouseEnter?.(e.shapes[0])
                }

                if (!popupOnHoverDisable && e.shapes && e.shapes?.length > 0) {
                  setShowPopup(true)
                  const prop: any = e.shapes[0]
                  // Set popup options
                  setPopupOptions({
                    ...popupOptions,
                    position: new data.Position(
                      prop.data?.geometry.coordinates[0] || 0,
                      prop.data?.geometry.coordinates[1] || 0
                    ),
                    pixelOffset: [0, -18],
                  })
                  if (prop.data?.properties) {
                    // Set popup properties from Feature Properties that are declared on create Feature
                    setPopupProperties([
                      {
                        ...prop.data?.properties,
                      },
                    ])
                  }
                }
              },
            }}
            lifecycleEvents={
              {
                // layeradded: (e: any) => {
                //   console.log('LAYER ADDED TO MAP: ', e)
                // },
              }
            }
            type="SymbolLayer"
          />
          {memoizedMarkerRender}
          {/* {memoizedHtmlMarkerRender} */}
        </AzureMapDataSourceProvider>
        <AzureMapPopup
          isVisible={showPopup}
          options={popupOptions}
          popupContent={
            <div className="p-3 ">
              {popupProperties.map((prop) => {
                return <div key={prop.title}>{prop.title}</div>
              })}
            </div>
          }
        />
        <AzureMapDataSourceProvider
          events={{
            dataadded: (e: any) => {
              //  console.log('2nd Data on source added', e)
              circleEvents.current = e
              const circle_bound = e[0].circlePolygon.geometry.coordinates[0]
              setCircleBounds([...circle_bound])
            },
          }}
          id="JGMap AzureMapDataSourceProvider2"
          options={{}}
        >
          <AzureMapLayerProvider
            id="JGMap AzureMapLayerProvider2"
            options={{
              fillColor: '#ff0000',
              fillOpacity: filterMarkersInRadius ? 0.2 : 0,
              visible: filterMarkersInRadius,
            }}
            events={{
              click: onClick,
            }}
            lifecycleEvents={{
              layeradded: (e: any) => {
                //  console.log('2nd LAYER ADDED TO MAP', e)
              },
            }}
            type="PolygonLayer"
          />
          {memoizedBoundingCircleRender}
        </AzureMapDataSourceProvider>
      </>
    </JGMapContainer>
  )
}

export default JGMap

const DEFAULT_LAYER_OPTION: SymbolLayerOptions = {
  // textOptions: {
  //   textField: ['get', 'customText'], //Specify the property name that contains the text you want to appear with the symbol.
  //   offset: [0, -1],
  //   color: ['get', 'color'],
  //   allowOverlap: true,
  // },
  iconOptions: {
    image: ['get', 'icon'],
    allowOverlap: true,
  },
}

const bubbleLayerOptions = {
  // Scale the size of the clustered bubble based on the number of points inthe cluster.
  radius: [
    'step',
    ['get', 'id'],
    20, // Default of 20 pixel radius.
    100,
    30, // If point_count >= 100, radius is 30 pixels.
    750,
    40, // If point_count >= 750, radius is 40 pixels.
  ],

  // Change the color of the cluster based on the value on the point_cluster property of the cluster.
  color: [
    'step',
    ['get', 'point_count'],
    'rgba(0,255,0,0.8)', // Default to green.
    100,
    'rgba(255,255,0,0.8)', // If the point_count >= 100, color is yellow.
    750,
    'rgba(255,0,0,0.8)', // If the point_count >= 100, color is red.
  ],
  strokeWidth: 0,
  filter: ['has', 'point_count'] as Expression, // Only rendered data points which have a point_count property, which clusters do.
}
