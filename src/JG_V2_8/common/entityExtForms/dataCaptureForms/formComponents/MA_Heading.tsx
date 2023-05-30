type DataCaptureComponentActionsType = {
  clear: () => void
}

export type DataCaptureComponentRefType = {
  actions: DataCaptureComponentActionsType
  itemType: string
  index: number
  entityId: number
}

export type DataCaptureComponentBase = {
  isFieldItem: boolean
  $index: number
  $entityId: number
  $readOnly?: boolean
  //$actions: DataCaptureComponentActionsType
  //itemType: string
}

type HeadingProps = DataCaptureComponentBase & {
  heading?: string
  subHeading?: string
  subHeadingHidden?: boolean
}

export default ({ heading = '', subHeading = '', subHeadingHidden }: HeadingProps) => {
  return (
    <div className="mt-4">
      {heading?.length > 0 && <h3 className="text-base font-semibold leading-6 text-gray-900">{heading}</h3>}
      {!subHeadingHidden && subHeading.length > 0 && <p className="mt-1 text-sm text-gray-500">{subHeading}</p>}
    </div>
  )
}
