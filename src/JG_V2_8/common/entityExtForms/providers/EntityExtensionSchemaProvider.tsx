import { StoreApi, useStore } from 'zustand'
import { EntityExtAreaType } from '../../types/entityExt/EntityExtAreaType'
import { EntityExtSchemaStorage as EntityExtSchemaStorage, getEntityExtSchemaStorage } from '../EntityExtFormStore'
import { createContext, useContext, useEffect } from 'react'
import { CompBaseProps } from '@comps/uiComps'
import _ from 'lodash'
import shallow from 'zustand/shallow'
import AnimatedSpin from '../../comps/loader/AnimatedSpin'

interface IEntityExtSchemaContext {
  store: StoreApi<EntityExtSchemaStorage>
}
const defaultStore = getEntityExtSchemaStorage(null, 'Profile')
const EntityExtFormContext = createContext<IEntityExtSchemaContext>({ store: defaultStore })

type EntityExtSchemaProviderProps = CompBaseProps & {
  extensionArea: EntityExtAreaType
  clubEntityExtOwnerId: number | null
}
export const useEntityExtSchemaStore = (
  selector: (state: EntityExtSchemaStorage) => Partial<EntityExtSchemaStorage>
) => {
  const { store } = useContext(EntityExtFormContext)
  return _.merge(
    defaultStore,
    useStore(
      store,
      (state) => {
        return selector(state)
      },
      shallow
    )
  )
}
const InnerWrapper = ({ children }: CompBaseProps) => {
  const { loadSchemas, asyncStatus } = useEntityExtSchemaStore((state) => ({
    // schemas: state.schemas,
    asyncStatus: state.asyncStatus,
    loadSchemas: state.loadSchemas,
  }))

  useEffect(() => {
    loadSchemas?.()
  }, [])

  return (
    <>
      {asyncStatus === 'success' ? (
        <>{children}</>
      ) : (
        <div>
          <AnimatedSpin />
        </div>
      )}
    </>
  )
}
const EntityExtSchemaProvider = ({ extensionArea, clubEntityExtOwnerId, children }: EntityExtSchemaProviderProps) => {
  return (
    <EntityExtFormContext.Provider value={{ store: getEntityExtSchemaStorage(clubEntityExtOwnerId, extensionArea) }}>
      <InnerWrapper>{children}</InnerWrapper>
    </EntityExtFormContext.Provider>
  )
}
export default EntityExtSchemaProvider
