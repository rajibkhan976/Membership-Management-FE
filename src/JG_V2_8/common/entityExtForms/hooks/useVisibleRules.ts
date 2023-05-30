import { ConditionalFieldRuleGroupValue, useEntityExtFormStoreContext } from '../providers/EntityExtFormProvider'
import { Field } from '@jg/common/dataAPIs/entityExtensions/schemas/EntityExtSchema'
import { useCallback, useEffect, useState } from 'react'

const useVisibleRules = ({ field }: { field?: Field; config: any }) => {
  const { ruledOutItems } = useEntityExtFormStoreContext((state) => ({
    ruledOutItems: state.ruledOutItems,
  }))
  //console.log('ruledOutItems', ruledOutItems, 'field?.Id', field?.Id, 'viewRules', viewRules)

  const [isRuledOut, setIsRulledOut] = useState<boolean>(false)

  useEffect(() => {
    setIsRulledOut(ruledOutItems.indexOf((field?.Id || -1).toString()) > -1)
  }, [ruledOutItems])

  return { isRuledOut }
}
export default useVisibleRules
