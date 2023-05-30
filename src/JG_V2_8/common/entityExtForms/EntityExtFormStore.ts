import { createStore } from 'zustand'
import { EntityExtSchema, Field, UiComp } from '../dataAPIs/entityExtensions/schemas/EntityExtSchema'
import { AsyncStatus } from '../types'
import { EntityExtAreaType } from '../types/entityExt/EntityExtAreaType'
import SelectEntityExtSchemasRequest, { EntityExtOwnerInfos } from '../dataAPIs/entityExtensions/SelectEntityExtSchemas'
import { SelectEntityExtDataRequest } from '../dataAPIs/entityExtensions'

export interface EntityExtSchemaStorage {
  extensionArea: EntityExtAreaType
  ownerId: number | null
  schemas: EntityExtSchema[]
  getFieldByFieldId: (fieldId: number, isHeaderFieldForm: boolean) => Field | undefined
  getUiCompByItemId: (itemId: number) => UiComp | undefined
  getUiCompsByParentId: (parentItemId: number) => UiComp[]
  setSchemas: (schemas: EntityExtSchema[]) => void
  asyncStatus: AsyncStatus
  setAsyncStatus: (asyncStatus: AsyncStatus) => void
  loadSchemas: () => void
  selectData: (docId: number) => void
  saveForm: () => void
}

export const getEntityExtSchemaStorage = (ownerId: number | null, extensionArea: EntityExtAreaType) => {
  const store = createStore<EntityExtSchemaStorage>((set, get) => ({
    extensionArea: extensionArea,
    ownerId: ownerId,
    schemas: [],
    getFieldByFieldId: (fieldId, isHeaderFieldForm) => {
      const fields: Field[] = []
      if (isHeaderFieldForm) {
        get().schemas.forEach((e) => {
          fields.push(...e.Fields)
        })
      } else
        get().schemas.forEach((e) => {
          fields.push(...e.FieldSets[0].Fields)
        })

      return fields.find((e) => e.Id === fieldId)
    },
    getUiCompByItemId: (itemId) => {
      const uis: UiComp[] = []
      get().schemas.forEach((e) => {
        uis.push(...e.UiComps)
      })
      return uis.find((e) => e.ItemId === itemId)
    },
    getUiCompsByParentId: (parentItemId) => {
      const uis: UiComp[] = []
      get().schemas.forEach((e) => {
        uis.push(...e.UiComps)
      })
      return uis.filter((e) => e.ParentId === parentItemId)
    },
    setSchemas: (schemas) => {
      set({ schemas: schemas })
    },
    asyncStatus: 'idle',
    setAsyncStatus: (asyncStatus) => {
      set({ asyncStatus: asyncStatus })
    },
    loadSchemas: () => {
      // console.log('loadSchemas')
      set({ asyncStatus: 'pending' })
      const entityExtOwnerInfos: EntityExtOwnerInfos[] = [
        { extensionArea: extensionArea, ownerId: 0, ownerType: 'Ngb', extensionEntityId: 0 },
      ]
      if (ownerId)
        entityExtOwnerInfos.push({
          extensionArea: extensionArea,
          ownerId: ownerId,
          ownerType: 'Club',
          extensionEntityId: 0,
        })
      SelectEntityExtSchemasRequest({
        entityExtOwnerInfos: entityExtOwnerInfos,
      }).then((e) => {
        //  console.log(e.result)
        set({ schemas: e.result })
        set({ asyncStatus: 'success' })
      })
    },
    selectData: (docId: number) => {
      const ids = get().schemas.map((e) => ({ exId: e.ExId, docId: docId }))
      SelectEntityExtDataRequest({ schemaIds: ids })
    },
    saveForm: () => {},
  }))
  return store
}
