import { UiComp } from '@jg/common/dataAPIs/entityExtensions/schemas/EntityExtSchema'
import EntityExtFormComponent from '../EntityExtFormComponent'
import { useEntityExtSchemaStore } from '../../providers/EntityExtensionSchemaProvider'
import { useEntityExtFormStoreContext } from '../../providers/EntityExtFormProvider'
import { useEffect } from 'react'
import { EntityExtFormDataType } from '../../types'

const FormTabComponents = ({ items, defalutValue }: { items: UiComp[]; defalutValue: EntityExtFormDataType }) => {
  const { getFieldByFieldId } = useEntityExtSchemaStore((state) => ({
    getFieldByFieldId: state.getFieldByFieldId,
  }))
  const { populate, addViewRules } = useEntityExtFormStoreContext((state) => ({
    addViewRules: state.addViewRules,
    populate: state.populate,
  }))

  useEffect(() => {
    populate(defalutValue)
  }, [])
  return (
    <>
      {items.length > 0
        ? items.map((e, i) => {
            const config = JSON.parse(e.Config)
            if (e.FieldId > -1) {
              const field = getFieldByFieldId?.(e.FieldId, false)
              if (field) {
                config['field'] = field
              }
              if (config.rules) {
                addViewRules(field?.Id || -1, config.rules.visible)
              }
              return <EntityExtFormComponent key={i} compDefination={e} config={config} field={field} />
            } else return <EntityExtFormComponent key={i} compDefination={e} config={config} />
          })
        : 'No item found'}
    </>
  )
}
export default FormTabComponents
