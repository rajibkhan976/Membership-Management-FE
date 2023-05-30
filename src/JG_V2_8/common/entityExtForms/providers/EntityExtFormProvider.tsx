import { CompBaseProps } from '@comps/uiComps'
import _ from 'lodash'
import { createContext, useContext } from 'react'
import { StoreApi, createStore, useStore } from 'zustand'
import shallow from 'zustand/shallow'
import resolveCondition from './resolveCondition'
import { EntityExtFormDataType, EntityExtFormDataValueType } from '../types'

export type ConditionalFieldRulesType = 'visible' | 'data' | 'value'

export type ConditionalRuleItem = {
  field: number
  id: string
  isMultiSelect: boolean
  label: string
  operator: string
  type: string
  value: any
}

export type ConditionalFieldRuleGroupValue = {
  id: string
  condition: 'and' | 'or'
  rules: (ConditionalRuleItem | ConditionalFieldRuleGroupValue)[]
}

export type EntityExtFormVaidationSammary = {
  key: string | number
  isValid: boolean
  message: string
  noNotify?: boolean
}

interface EntityExtFormStorage {
  readOnly?: boolean
  clear: () => void
  populate: (data: EntityExtFormDataType) => void
  onChangeHandler: (key: string | number, handler: (value: EntityExtFormDataValueType) => void) => void
  validationSummaryCollection: EntityExtFormVaidationSammary[]
  validate: (noNotify: boolean) => EntityExtFormVaidationSammary
  onValidate: (
    key: string | number,
    handler: (value: EntityExtFormDataValueType, noNotify?: boolean) => EntityExtFormVaidationSammary
  ) => void
  data: EntityExtFormDataType
  getValue: (key: string | number) => string | number | boolean | Date | null | undefined
  update: (key: string | number | undefined, value: EntityExtFormDataValueType) => EntityExtFormDataValueType
  ruledOutItems: (string | number)[]
  viewRules: Record<string | number, ConditionalFieldRuleGroupValue>
  addViewRules: (field: string | number, rules: ConditionalFieldRuleGroupValue) => void
}

/*const viewRules = JSON.parse(
  '{"2758":{"id":"621ab942-0b20-4580-9d61-7317dab57db9","condition":"or","rules":[]},"2768":{"id":"621ab942-0b20-4580-9d61-7317dab57db9","condition":"or","rules":[{"label":"Checkboxes sdsa dsad sadsad","field":2760,"type":"string","operator":"equal","value":"Tra lala","isMultiSelect":false,"id":"94154135-a701-476b-8fc2-b7c2e7b612fa"}]}}'
)*/
//type evaluateVisibleResult = 'skip' | 'out' | 'in'
//let matchcount = 0

const evaluateVisibleRule = (
  // store: StoreApi<EntityExtFormStorage>,
  field: string | number,
  ruleGroup: ConditionalFieldRuleGroupValue,
  value: EntityExtFormDataValueType,
  key: string | number,
  countOut: { mtachedCount: number }
) => {
  //console.log('ruleGroup.rules', ruleGroup.rules)

  const rules = ruleGroup.rules
  if (rules.length === 0) return true
  //let trueCount = 0
  let ruledOutByGroupCount = 0

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i]
    // console.log('rule', rule)
    if ((rule as ConditionalFieldRuleGroupValue).condition) {
      // console.log('rule as ConditionalFieldRuleGroupValue', rule)
      const result = evaluateVisibleRule(field, rule as ConditionalFieldRuleGroupValue, value, key, countOut)
      if (!result) ruledOutByGroupCount += 1
    } else {
      const ruleItem = rule as ConditionalRuleItem
      if (ruleItem.field.toString() === key.toString()) {
        // matchcount++
        countOut.mtachedCount++
        const result = resolveCondition(ruleItem.type, ruleItem.operator, ruleItem.value, value)
        //trueCount += resolveCondition(ruleItem.type, ruleItem.operator, ruleItem.value, value) ? 1 : 0
        if (!result) ruledOutByGroupCount += 1
      }
    }
  }
  return ruledOutByGroupCount === 0
}

const updateRuledOutItems = (
  store: StoreApi<EntityExtFormStorage>,
  key: string | number,
  value: EntityExtFormDataValueType
) => {
  //console.log('updateRuledOutItems', key, value)
  const ruledOutItemsOginal = store.getState().ruledOutItems
  // console.log('updateRuledOutItems', key, value, ruledOutItemsOginal)
  const viewRules = store.getState().viewRules
  const ruledOutItemsTobeUpdated = [...ruledOutItemsOginal]
  //const ruledOutItemsTobeUpdated: (string | number)[] = []
  for (const i in viewRules) {
    const countOut = { mtachedCount: 0 }
    const ruleGroup: ConditionalFieldRuleGroupValue = viewRules[i]
    const res = evaluateVisibleRule(i, ruleGroup, value, key, countOut)
    const index = ruledOutItemsTobeUpdated.indexOf(i)
    // console.log('updateRuledOutItems', i, res, ruledOutItemsTobeUpdated, matchcount)
    if (countOut.mtachedCount > 0) {
      if (res && index > -1) {
        ruledOutItemsTobeUpdated.splice(index, 1)
      } else if (!res && index === -1) {
        ruledOutItemsTobeUpdated.push(i)
      }
    }
  }
  //console.log('isEqual', ruledOutItemsOginal, ruledOutItemsTobeUpdated)
  if (!_.isEqual(ruledOutItemsOginal, ruledOutItemsTobeUpdated)) {
    return ruledOutItemsTobeUpdated
  } else return null
}

const getStore = (
  index: number,
  readOnly: boolean,
  onChange: (key: string | number | undefined, value: EntityExtFormDataValueType, data: EntityExtFormDataType) => void
) => {
  // console.log('getStore', index)
  const changeHandlers: { key: string | number; handler: (value?: EntityExtFormDataValueType) => void }[] = []
  const validateHandlers: {
    key: string | number
    handler: (value: EntityExtFormDataValueType, noNotify?: boolean) => EntityExtFormVaidationSammary
  }[] = []
  const store = createStore<EntityExtFormStorage>((set, get) => ({
    readOnly: readOnly,
    clear: () => {
      changeHandlers.forEach((e) => e.handler(''))
    },
    populate: (data) => {
      set({ data: data })
      // get().applyViewRules()
      changeHandlers.forEach((e) => e.handler(data[e.key]))
    },
    onChangeHandler: (key, handler) => {
      const index = changeHandlers.findIndex((e) => e.key === key)
      if (index === -1) changeHandlers.push({ key, handler })
    },
    onValidate: (key, handler) => {
      const index = validateHandlers.findIndex((e) => e.key === key)
      if (index === -1) validateHandlers.push({ key, handler })
    },
    validationSummaryCollection: [],
    validate: (noNotify) => {
      const invalidBuffer: string[] = []
      const _summaryCollection: EntityExtFormVaidationSammary[] = []
      validateHandlers.forEach((e) => {
        if (get().ruledOutItems.indexOf(e.key.toString()) === -1) {
          const summary = e.handler(get().data[e.key], noNotify)
          _summaryCollection.push(summary)
          if (!summary.isValid) invalidBuffer.push(summary.message)
        }
      })
      set({ validationSummaryCollection: _summaryCollection })
      return { isValid: invalidBuffer.length === 0, message: invalidBuffer[0] || '', key: '' }
    },
    data: {},
    getValue: (key) => {
      return get().data[key]
    },
    update: (key, value) => {
      if (!key) return value
      const tobeUpdated: EntityExtFormDataType = {}
      tobeUpdated[key] = value
      set({ data: { ...get().data, ...tobeUpdated } })
      //console.log('vm data', get().data)
      const res = updateRuledOutItems(store, key, value)
      //console.log(get().ruledOutItems, res)
      if (res !== null) {
        set({ ruledOutItems: res })
        // console.log('ruledOutItems', index, res)
      }
      onChange(key, value, get().data)
      return value
    },
    ruledOutItems: [],
    viewRules: {},
    addViewRules: (field, rules) => {
      const rule: Record<string | number, ConditionalFieldRuleGroupValue> = {}
      rule[field] = rules
      set({ viewRules: { ...get().viewRules, ...rule } })
    },
  }))

  return store
}
//const storeSingletonRef: StoreApi<EntityExtFormStorage>[] = []
export const createEntityExtFormStore = (
  index: number,
  readOnly: boolean,
  onChange: (key: string | number | undefined, value: EntityExtFormDataValueType, data: EntityExtFormDataType) => void
) => {
  return getStore(index, readOnly, onChange)
}

interface IEntityExtFormContext {
  store: StoreApi<EntityExtFormStorage>
}

const EntityExtFormContext = createContext<IEntityExtFormContext>({
  store: getStore(0, false, () => {}),
})

export const useEntityExtFormStoreContext = (
  selector: (state: EntityExtFormStorage) => Partial<EntityExtFormStorage>
): EntityExtFormStorage => {
  const { store } = useContext(EntityExtFormContext)
  const deafultStore: EntityExtFormStorage = {
    data: {},

    getValue: function (key: string | number): string | number | Date | null | undefined {
      throw new Error('Function not implemented.')
    },
    update: function (key: number | string | undefined, value: EntityExtFormDataValueType): EntityExtFormDataValueType {
      throw new Error('Function not implemented.')
    },
    ruledOutItems: [],
    viewRules: {},
    addViewRules: function (field: string | number, rules: ConditionalFieldRuleGroupValue): void {
      throw new Error('Function not implemented.')
    },
    /*applyViewRules: function (): void {
      throw new Error('Function not implemented.')
    },*/
    clear: function (): void {
      throw new Error('Function not implemented.')
    },
    onChangeHandler: function (key: string | number, handler: (value: EntityExtFormDataValueType) => void): void {
      throw new Error('Function not implemented.')
    },
    populate: function (data: EntityExtFormDataType): void {
      throw new Error('Function not implemented.')
    },

    validate: function (): EntityExtFormVaidationSammary {
      throw new Error('Function not implemented.')
    },
    onValidate: function (
      key: string | number,
      handler: (value: EntityExtFormDataValueType, isRuledOut: boolean) => EntityExtFormVaidationSammary
    ): void {
      throw new Error('Function not implemented.')
    },
    validationSummaryCollection: [],
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

type EntityExtFormProviderProps = CompBaseProps & {
  store: StoreApi<EntityExtFormStorage>
}

const EntityExtFormProvider = ({ children, store }: EntityExtFormProviderProps) => {
  return <EntityExtFormContext.Provider value={{ store: store }}>{children}</EntityExtFormContext.Provider>
}

export default EntityExtFormProvider
