import _ from 'lodash'
import { useState } from 'react'
import { CompBaseProps } from '../types/CompBaseProps'

function useComp(props?: CompBaseProps) {
  const [cid] = useState(_.uniqueId('comp-'))
  const withRootElId = (nestedItemName?: string) => `jg-${cid}${nestedItemName ? `-${nestedItemName}` : ''}`
  return { cid, withRootElId }
}
export default useComp
