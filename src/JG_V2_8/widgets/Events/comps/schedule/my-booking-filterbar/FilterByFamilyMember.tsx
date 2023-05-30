import { Avatar } from '@comps/uiComps'
import { MemberType } from '@jg/common/types'
import { useSessionUserContext } from '@jg/providers/SessionUserProvider'
import { useLayoutEffect, useRef, useState } from 'react'
import useNavigateWithArgsMB from '../../hooks/useNavigateWithArgsMB'
import IndividaulFilterOption from '../../leftFilterBar/FilterIndividualOption'

const FilterByFamilyMember = () => {
  const { familyInfo } = useSessionUserContext()
  const { Members } = familyInfo || {}
  const { currentArgs, setCurrentArgs, getArgsFromUrl } = useNavigateWithArgsMB()
  const checkbox = useRef<HTMLInputElement>(null)
  const [checked, setChecked] = useState(true)
  const [indeterminate, setIndeterminate] = useState(false)
  const [selectedPeople, setSelectedPeople] = useState<MemberType[] | []>(
    getArgsFromUrl().familyMembers[0] === 'all'
      ? (Members as MemberType[]) || []
      : (Members as MemberType[]).filter((m) => getArgsFromUrl().familyMembers.includes(m.DocId + ''))
  )
  useLayoutEffect(() => {
    if (!Array.isArray(Members)) return
    const isIndeterminate = selectedPeople.length > 0 && selectedPeople.length < Members.length
    setChecked(selectedPeople.length === Members.length)
    setIndeterminate(isIndeterminate)
    const familyMembers = isIndeterminate
      ? [...selectedPeople.map((m) => m.DocId + '')]
      : selectedPeople.length > 0
      ? ['all']
      : []
    setCurrentArgs({ ...currentArgs, familyMembers })
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPeople])

  function toggleAll() {
    setSelectedPeople(checked || indeterminate ? [] : (Members as MemberType[]))
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
  }

  if (!Array.isArray(Members)) return null
  return (
    <div className="divide-y divide-jg-metal-50 ">
      <IndividaulFilterOption
        title={
          <div className="inline-flex gap-1.5 items-center">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
              ref={checkbox}
              checked={checked}
              onChange={toggleAll}
              id={'family-member-all'}
            />
            <label htmlFor="family-member-all">All</label>
          </div>
        }
        onClick={() => {}}
      />
      <div className="bg-jg-grey-50 text-jg-metal-500">
        {Members.map((person, i) => {
          const fullName = `${person.FirstName} ${person.LastName}`
          return (
            <div className="flex gap-1.5 items-center px-4 py-3 " key={person.DocId}>
              <input
                type="checkbox"
                id={person.DocId + ''}
                className="h-4 w-4"
                value={person.DocId}
                checked={selectedPeople.filter((p) => p.DocId === person.DocId).length > 0}
                disabled={selectedPeople.length === 1 && selectedPeople[0].DocId === person.DocId}
                onChange={(e) =>
                  setSelectedPeople(
                    e.target.checked
                      ? [...selectedPeople, person]
                      : selectedPeople.filter((p) => p.DocId !== person.DocId)
                  )
                }
              />
              <label htmlFor={person.DocId + ''} className={'inline-flex gap-1.5 items-center'}>
                <Avatar withNameInitials={true} name={fullName} size={'xs'} />
                <span>{fullName}</span>
              </label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FilterByFamilyMember
