import { Button } from '@comps/uiComps'
import { SearchField } from '@jg/common/comps'
import { useRouter } from '@jg/hooks'
import { useWidgetContext } from 'jg-widget'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useEventConfig } from '../../EventWidget'
import { SearchRequestArg } from '../../store/useEventStore'
import useNavigateWithArgs from '../hooks/useNavigateWithArgs'

const FinderSearchBar = () => {
  const [searchParams] = useSearchParams()
  const qsKey = searchParams.get('key')
  const [key, setKey] = useState(qsKey || '')
  const { currentArgs, setCurrentArgs } = useNavigateWithArgs()
  const { isEvent } = useEventConfig()

  return (
    <>
      <SearchField
        text={qsKey || ''}
        onClear={() => {
          setCurrentArgs({ ...currentArgs, key: '' })
        }}
        onChange={(value) => {
          setKey(value)
        }}
        onEnter={(value) => {
          setCurrentArgs({ ...currentArgs, key: key })
        }}
        className="flex-grow "
        type="button"
        placeholder={'Search...'}
      />
      <Button
        text={isEvent ? 'Find Event' : 'Search'}
        className=" md:inline-block hidden visible"
        onClick={() => {
          setCurrentArgs({ ...currentArgs, key: key })
        }}
      />
    </>
  )
}

export default FinderSearchBar
