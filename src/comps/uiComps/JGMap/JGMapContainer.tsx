import { AzureMap, AzureMapsProvider, IAzureMapChildren, IAzureMapOptions } from 'react-azure-maps'

type JGMapContainerProps = {
  mapOption: IAzureMapOptions
  closePopup: () => void
  children?: IAzureMapChildren
}

function JGMapContainer(props: JGMapContainerProps) {
  const { mapOption, children, closePopup } = props
  return (
    <div className="h-full w-full">
      <AzureMap
        options={mapOption}
        cameraOptions={mapOption}
        events={{
          mousemove: () => closePopup(),
        }}
      >
        {children}
      </AzureMap>
    </div>
  )
}

export default JGMapContainer
