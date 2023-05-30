import React, { FC } from 'react'
import { Field, UiComp, UiCompClassType } from '@jg/common/dataAPIs/entityExtensions/schemas/EntityExtSchema'
import formComponents from './formComponents'
import useVisibleRules from '../hooks/useVisibleRules'

const getComp = (type: UiCompClassType) => {
  return formComponents[type]
}
const craeteFormComponent = (type: UiCompClassType, config: any) => {
  if (Object.keys(formComponents).indexOf(type) > -1) return React.createElement(getComp(type) as FC, config)
  else {
    config['$fallbackFieldItemClass'] = type
    return React.createElement(formComponents['FallbackField'] as FC, config)
  }
}
const FormComponent = ({ Class, config }: { Class: UiCompClassType; config: any }) => {
  {
    return <>{craeteFormComponent(Class, config)}</>
  }
}
const FastFormComponent = React.memo(FormComponent)
const EntityExtFormComponent = ({
  compDefination,
  config,
  field,
}: {
  compDefination: UiComp
  config: object
  field?: Field
}) => {
  const { isRuledOut } = useVisibleRules({ field, config })
  return <div className="mt-4">{!isRuledOut && <FastFormComponent Class={compDefination.Class} config={config} />}</div>
}
export default EntityExtFormComponent
