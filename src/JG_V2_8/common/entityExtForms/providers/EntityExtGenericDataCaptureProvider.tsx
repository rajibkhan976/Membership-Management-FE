import { StoreApi, createStore, useStore } from 'zustand'

import { createContext, useContext } from 'react'
import { CompBaseProps } from '@comps/uiComps'
import _ from 'lodash'
import shallow from 'zustand/shallow'
import { string } from 'yup'
import { ValidationSummaryByEntity } from '../types'
//export type EntityExtGenericDataCaptureValueType = EntityExtFormAnswersCollectionBySchemaType | any
//type EntityExtGenericDataCaptureValue<T> = T[]

export type EntityExtGenericDataCaptureItemValueByEntityIdType<T> = Record<number, T[]>
type EntityExtGenericDataCaptureVaidationSammary = { isValid: boolean; message: string }
interface EntityExtGenericDataCaptureStorage {
  ownerId: number
  ownerType: string
  value: Record<string, EntityExtGenericDataCaptureItemValueByEntityIdType<any>>
  //  defaultSrc: { entityId: number; formIndex: number } | null
  invalidMsgSummary: ValidationSummaryByEntity[]
  getInvalidMsgSummary: () => ValidationSummaryByEntity[] // string[]
  validate: (noNotify?: boolean) => void
  onValidate: (
    itemType: string,
    entityId: number,
    formIndex: number,
    handler: (valueOnValidate: any, noNotify?: boolean) => EntityExtGenericDataCaptureVaidationSammary
  ) => void
  onClear: (itemType: string, entityId: number, formIndex: number, handler: () => void) => void
  clear: (entityId: number, formIndex: number) => void
  //clearAll: () => void
  onCopy: (itemType: string, entityId: number, formIndex: number, handler: (value: any) => void) => void
  copy: (src: { entityId: number; formIndex: number }, to: { entityId: number; formIndex: number }) => void
  onChange: (key: string, value: EntityExtGenericDataCaptureItemValueByEntityIdType<any>) => void
  getValue: () => Record<string, EntityExtGenericDataCaptureItemValueByEntityIdType<any>>
  setValue: (key: string, value: any, entityId: number, formIndex: number) => void
  removeValueByMember: (entityId: number) => void
  onRefresh: (itemType: string, entityId: number, formIndex: number, handler: (value: any) => void) => void
  refresh: () => void
}

const getStore = ({
  ownerId,
  ownerType,
  value,
  onChange,
}: {
  ownerId: number
  ownerType: string
  value?: Record<string, EntityExtGenericDataCaptureItemValueByEntityIdType<any>>
  onChange: (key: string, value: EntityExtGenericDataCaptureItemValueByEntityIdType<any>) => void
}) => {
  const refreshHandlers: { itemType: string; entityId: number; index: number; handler: (value: any) => void }[] = []
  const clearHandlers: { itemType: string; entityId: number; index: number; handler: () => void }[] = []
  const copyHandlers: { itemType: string; entityId: number; index: number; handler: (value: any) => void }[] = []
  const validateHandlers: {
    itemType: string
    entityId: number
    index: number
    handler: (valueOnValidate: any, noNotify?: boolean) => EntityExtGenericDataCaptureVaidationSammary
  }[] = []
  const EntityExtGenericDataCaptureStore = createStore<EntityExtGenericDataCaptureStorage>((set, get) => ({
    ownerId: ownerId,
    ownerType: ownerType,
    value: value || {},
    invalidMsgSummary: [],
    getInvalidMsgSummary: () => {
      /*const invalids: string[] = []
      ;[...get().invalidMsgSummary].forEach((e) => {
        const msg = e.summary.find((e) => e.length > 0)
        if (msg) {
          switch (msg) {
            case 'FIELD_REQUIRED':
              invalids.push('Required fields are not completed. Please update the highlighted fields.')
              break
            case 'DECLARAION_REQUIRED':
              invalids.push('Required fields are not completed. Please update the highlighted fields.')
          }
        }
      })

      return invalids as string[]*/
      return get().invalidMsgSummary
    },
    validate: (noNotify) => {
      const buffer: ValidationSummaryByEntity[] = []
      // console.log('validateHandlers', validateHandlers)
      validateHandlers.forEach((e) => {
        const value = get().value[e.itemType]
        const summary = e.handler(value?.[e.entityId]?.[e.index] ? value[e.entityId][e.index] : undefined, noNotify)
        // if (!summary.isValid) {

        // validation[e.entityId] = summary.message
        const extingIndex = buffer.findIndex((b) => b.entityId === e.entityId && b.index === e.index)
        if (extingIndex === -1) {
          const validation: ValidationSummaryByEntity = {
            index: e.index,
            entityId: e.entityId,
            summary: [!summary.isValid ? summary.message : ''],
          }
          buffer.push(validation)
        } else {
          if (!buffer[extingIndex].summary[e.index]) {
            buffer[extingIndex].summary = [!summary.isValid ? summary.message : ''] // .push(!summary.isValid ? summary.message : '')
          }
        }
      })
      set({ invalidMsgSummary: buffer })
    },
    onValidate: (itemType, entityId, formIndex, handler) => {
      const index = validateHandlers.findIndex(
        (e) => e.itemType === itemType && e.entityId === entityId && e.index === formIndex
      )
      if (index === -1) validateHandlers.push({ itemType, entityId, index: formIndex, handler })
    },
    // defaultSrc: null,
    onClear: (itemType, entityId, formIndex, handler) => {
      const index = clearHandlers.findIndex(
        (e) => e.itemType === itemType && e.entityId === entityId && e.index === formIndex
      )
      if (index === -1) clearHandlers.push({ itemType, entityId, index: formIndex, handler })
    },
    clear: (entityId, formIndex) => {
      clearHandlers.forEach((e) => {
        if (e.entityId === entityId && e.index === formIndex) {
          e.handler()
        }
      })
    },
    // clearAll: () => {},
    onCopy: (itemType, entityId, formIndex, handler) => {
      const index = copyHandlers.findIndex(
        (e) => e.itemType === itemType && e.entityId === entityId && e.index === formIndex
      )
      if (index === -1) copyHandlers.push({ itemType, entityId, index: formIndex, handler })
    },
    copy: ({ entityId: srcEntityId, formIndex: srcFormIndex }, { entityId: toEntityId, formIndex: toFormIndex }) => {
      /*console.log(
        'copy',
        { entityId: srcEntityId, formIndex: srcFormIndex },
        { entityId: toEntityId, formIndex: toFormIndex }
      )*/
      copyHandlers.forEach((e) => {
        if (e.entityId === toEntityId && e.index === toFormIndex) {
          if (get().value[e.itemType]) {
            const srcValue = get().value[e.itemType][srcEntityId][srcFormIndex]
            e.handler(srcValue)
          }
        }
      })
    },
    onChange: onChange,
    getValue: () => {
      return get().value
    },
    refresh: () => {
      refreshHandlers.forEach((e) => {
        if (get().value[e.itemType]) {
          //  console.log('refreshHandlers')
          const srcValue = get().value[e.itemType][e.entityId][e.index]
          e.handler(srcValue)
        }
      })
    },
    onRefresh: (itemType, entityId, formIndex, handler) => {
      const index = refreshHandlers.findIndex(
        (e) => e.itemType === itemType && e.entityId === entityId && e.index === formIndex
      )
      if (index === -1) refreshHandlers.push({ itemType, entityId, index: formIndex, handler })
    },
    setValue: (key, value, entityId, formIndex) => {
      const val = { ...get().value }
      if (!val[key]) {
        val[key] = {}
      }

      if (!val[key][entityId]) {
        val[key][entityId] = []
      }
      val[key][entityId][formIndex] = value

      /*if (!val[key]) {
        val[key] = {}
        val[key][entityId] = [value]
      } else {
        if (!val[key][entityId]) {
        }

        val[key][entityId][formIndex] = value
      }*/
      set({ value: val })
      //  console.log('setValue', key, get().value)
      get().onChange(key, value)
      get().validate(true)
    },
    removeValueByMember: (memberDocId) => {
      const val = { ...get().value }
      // console.log('removeValueByMember', val)
      let targetIndex = -1
      for (const key in val) {
        if (val[key][memberDocId]) {
          targetIndex = val[key][memberDocId].length - 1
          val[key][memberDocId].pop()
          if (val[key][memberDocId].length === 0) {
            delete val[key][memberDocId]
          }
        }
      }
      set({ value: val })
      const types: string[] = []
      validateHandlers.forEach((e) => {
        if (types.indexOf(e.itemType) === -1) types.push(e.itemType)
      })

      for (let i = validateHandlers.length - 1; i > -1; i--) {
        if (validateHandlers[i].entityId === memberDocId && validateHandlers[i].index === targetIndex) {
          validateHandlers.splice(i, 1)
        }
      }

      _.remove(copyHandlers, (e) => {
        return e.entityId === memberDocId && e.index === targetIndex
      })
      _.remove(clearHandlers, (e) => {
        return e.entityId === memberDocId && e.index === targetIndex
      })
      /*_.remove(refreshHandlers, (e) => {
        return e.entityId === memberDocId && e.index === targetIndex
      })*/
      //  get().refresh()
    },
  }))
  return EntityExtGenericDataCaptureStore
}
interface IEntityExtGenericDataCaptureContext {
  store: StoreApi<EntityExtGenericDataCaptureStorage>
}
const EntityExtGenericDataCaptureContext = createContext<IEntityExtGenericDataCaptureContext>({
  store: getStore({ ownerId: -1, ownerType: 'Ngb', onChange: () => {} }),
})
export const useEntityExtGenericDataCaptureContext = (
  selector: (state: EntityExtGenericDataCaptureStorage) => Partial<EntityExtGenericDataCaptureStorage>
): EntityExtGenericDataCaptureStorage => {
  const { store } = useContext(EntityExtGenericDataCaptureContext)
  const deafultStore: EntityExtGenericDataCaptureStorage = {
    value: {},
    onChange: function (key: string, value: any): void {
      throw new Error('Function not implemented.')
    },
    getValue: function (): Record<string, any> {
      throw new Error('Function not implemented.')
    },
    setValue: function (key: string, value: any): void {
      throw new Error('Function not implemented.')
    },

    clear: function (entityId: number, formIndex: number): void {
      throw new Error('Function not implemented.')
    },
    /*clearAll: function (): void {
      throw new Error('Function not implemented.')
    },*/
    copy: function (src: { entityId: number; formIndex: number }, to: { entityId: number; formIndex: number }): void {
      throw new Error('Function not implemented.')
    },

    onClear: function (itemType: string, entityId: number, formIndex: number): void {
      throw new Error('Function not implemented.')
    },
    onCopy: function (itemType: string, entityId: number, formIndex: number, handler: (value: any) => void): void {
      throw new Error('Function not implemented.')
    },
    validate: function (): boolean {
      throw new Error('Function not implemented.')
    },
    onValidate: function (): boolean {
      throw new Error('Function not implemented.')
    },
    invalidMsgSummary: [],

    removeValueByMember: function (formIndex: number): void {
      throw new Error('Function not implemented.')
    },

    refresh: function (): void {
      throw new Error('Function not implemented.')
    },
    onRefresh: function (itemType: string, entityId: number, formIndex: number, handler: (value: any) => void): void {
      throw new Error('Function not implemented.')
    },
    ownerId: 0,
    ownerType: '',
    getInvalidMsgSummary: function (): ValidationSummaryByEntity[] {
      throw new Error('Function not implemented.')
    },
  }
  return _.merge(
    deafultStore,
    useStore(
      store,
      (state) => {
        return selector(state)
      },
      shallow
    )
  )
}

type EntityExtGenericDataCaptureProviderProps = CompBaseProps & {
  ownerId: number
  ownerType: string
  value: Record<string, EntityExtGenericDataCaptureItemValueByEntityIdType<any>>
  onChange: (key: string, value: EntityExtGenericDataCaptureItemValueByEntityIdType<any>) => void
}
const EntityExtGenericDataCaptureProvider = ({
  children,
  onChange,
  value,
  ownerId,
  ownerType,
}: EntityExtGenericDataCaptureProviderProps) => {
  return (
    <EntityExtGenericDataCaptureContext.Provider
      value={{ store: getStore({ ownerId, ownerType, onChange: onChange, value }) }}
    >
      {children}
    </EntityExtGenericDataCaptureContext.Provider>
  )
}
export default EntityExtGenericDataCaptureProvider
