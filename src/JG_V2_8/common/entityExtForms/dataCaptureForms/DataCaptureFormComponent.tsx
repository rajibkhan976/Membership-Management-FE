import React, { FC } from 'react'
import { EntityExtDataCaptureItemDefinationType, EntityExtDataCaptureItemType } from '../types'

import FormTab from './formComponents/FormTab'
import formComponents from './formComponents'
import MA_ProfileProduct from './formComponents/MA_ProfileProduct'
import MA_Declaration from './formComponents/MA_Declaration'

const getComp = (type: EntityExtDataCaptureItemType) => {
  switch (type) {
    case 'declaration':
      return MA_Declaration
    case 'sectionHeader':
      return formComponents.MA_Heading
    case 'product':
      return MA_ProfileProduct
    case 'form':
      return FormTab
  }
}

const DataCaptureFormComponent = ({
  compDefination,
  index,
  readOnly,
  entityId,
}: {
  index: number
  entityId: number
  readOnly?: boolean
  compDefination: EntityExtDataCaptureItemDefinationType
}) => {
  const config = JSON.parse(compDefination.Config)
  config.$index = index
  config.$entityId = entityId
  config.$readOnly = !!readOnly
  //config.$actions = item.actions.clear

  return (
    <div className="mt-4">
      <>{React.createElement(getComp(compDefination.Type) as FC, config)}</>
    </div>
  )
}
export default DataCaptureFormComponent
