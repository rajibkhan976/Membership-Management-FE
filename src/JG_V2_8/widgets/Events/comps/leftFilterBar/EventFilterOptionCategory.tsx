import { FadeIn } from '@comps/uiComps'

import Expand from '@comps/uiComps/Transitions/Expand'
import { MinusIcon, PlusIcon } from '@heroicons/react/outline'
import _ from 'lodash'
import { useState } from 'react'
import useEventStore, { SearchRequestArg } from '../../store/useEventStore'
import useNavigateWithArgs from '../hooks/useNavigateWithArgs'
import IndeterminateCheckbox from './IndeterminateCheckbox'
import classNames from 'classnames'
import FancyScroll from '@jg/common/comps/Scrollbar/FancyScroll'
import { useEventConfig } from '../../EventWidget'

const EventFilterOptionCategoryItem = ({
  checked = false,
  isSubCategory = false,
  label,
  eventCount,
  hasNoSub,
  showSubs,
  isSubsShown,
  indeterminate = false,
  onChange,
  className,
  ...rest
}: {
  isSubCategory?: boolean
  checked: boolean
  label: string
  eventCount?: number
  indeterminate?: boolean
  hasNoSub?: boolean
  isSubsShown?: boolean
  onChange: (val: boolean) => void
  showSubs?: (show: boolean) => void
  className?: string
}) => {
  const { isEvent } = useEventConfig()
  return (
    <div
      {...rest}
      className={classNames(className, 'flex justify-between py-2.5 px-3.5 bg-jg-grey-50 hover:bg-jg-grey-100')}
    >
      <IndeterminateCheckbox
        indeterminate={indeterminate}
        checked={checked}
        className={'w-full'}
        labelClassName={classNames(
          (isSubsShown ? '!text-jg-green-500' : '!text-jg-grey-800') + ' cursor-pointer ',
          isSubCategory && 'relative'
        )}
        caption={
          <>
            {label}
            {!isSubCategory && (
              <span className="block text-jg-grey-500 ">{`${eventCount} ${isEvent ? 'events' : 'items'}`}</span>
            )}
            {isSubCategory && <span className=" font-sm absolute right-0 ">{`(${eventCount})`}</span>}
          </>
        }
        onChange={onChange}
      />

      {!hasNoSub && (
        <div
          onClick={() => showSubs?.(!isSubsShown)}
          className="text-jg-grey-700  flex flex-row justify-center hover:bg-jg-grey-100 cursor-pointer"
        >
          {!isSubsShown ? (
            <PlusIcon className="h-3.5 w-3.5 rounded  transform ring-8 ring-transparent hover:ring-jg-grey-300 hover:bg-jg-grey-300  " />
          ) : (
            <MinusIcon className="h-3.5 w-3.5  rounded transform  ring-8 ring-transparent hover:ring-jg-grey-300 hover:bg-jg-grey-300  " />
          )}
        </div>
      )}
    </div>
  )
}
export const WithCategoryFilterOptions = ({
  getArgsFromUrl,
  setCurrentArgs,
  currentArgs,
}: {
  currentArgs: SearchRequestArg
  getArgsFromUrl: () => SearchRequestArg
  setCurrentArgs: React.Dispatch<React.SetStateAction<SearchRequestArg>>
}) => {
  const filterBarData = useEventStore((state) => state.filterBarData)
  const [subsShownWithId, setSubsShownWithId] = useState<number[]>([0])
  return (
    <FancyScroll>
      <FadeIn className="divide-y divide-jg-metal-50 ">
        {filterBarData?.Categories.map((ctg, index) => {
          let checkedParent = false
          let isIndeterminate = false
          let subFromQS: string[] = []
          const ctgs = getArgsFromUrl().category || []
          if (ctgs.length === 1 && ctgs[0] === 'all') {
            //do nothing
          } else {
            for (let i = 0; i < ctgs.length; i++) {
              const qsCtg = ctgs[i]
              const parts = qsCtg.split('$sub$')
              if (parts[0] === ctg.Name) {
                checkedParent = true

                if (parts.length > 1) {
                  const qsSubs = parts[1].split('$$')
                  subFromQS = subFromQS.concat(qsSubs) // = subFromQS.push(...qsSubs)
                }
                break
              }
            }
          }
          if (checkedParent && ctg.SubCategories.length > 0 && subFromQS.length < ctg.SubCategories.length) {
            isIndeterminate = true
            checkedParent = false
          }
          // const isIndeterminate = ctg.SubCategories.length> 0 &&  subFromQS.length !== ctg.SubCategories.length
          /* const checkedParent = (getArgsFromUrl().category?.filter((e) => e === ctg.Name).length || 0) > 0
        let checkedIfindeterminate = false

        for (let i = 0; i <FadeIn ctg.SubCategories.length; i++) {
          const sub = ctg.SubCategories[i]
          if ((getArgsFromUrl().category?.filter((e) => e === sub.Name).length || 0) == 0) {
            checkedIfindeterminate = true
            break
          }
        }*/
          return (
            <div key={index}>
              <EventFilterOptionCategoryItem
                eventCount={ctg.EventCount || 0}
                checked={checkedParent}
                indeterminate={isIndeterminate}
                onChange={(checked) => {
                  const ctArgs = [...(getArgsFromUrl().category || []), ...[]]
                  if (ctArgs[0] === 'all') {
                    ctArgs.length = 0
                  }
                  let ctgStr = ctg.Name

                  if (subFromQS.length > 0) {
                    ctgStr = `${ctgStr}$sub$${subFromQS
                      .map((qsSub) => {
                        return qsSub
                      })
                      .join('$$')}`
                  }
                  _.remove(ctArgs, function (item) {
                    return item === ctgStr
                  })
                  ctgStr = ctg.Name
                  if (ctg.SubCategories.length > 0) {
                    ctgStr = `${ctgStr}$sub$${ctg.SubCategories.map((sub) => {
                      return sub.Name
                    }).join('$$')}`
                  }
                  if (checked) {
                    ctArgs.push(ctgStr)
                  } else {
                    _.remove(ctArgs, function (item) {
                      return item === ctgStr
                    })
                  }
                  if (ctArgs.length === 0) ctArgs.push('all')

                  setCurrentArgs({ ...currentArgs, ...{ category: ctArgs.map((arg) => arg.replaceAll('&', '_and')) } })
                }}
                isSubsShown={subsShownWithId.indexOf(ctg.DocId) > -1}
                hasNoSub={ctg.SubCategories.length == 0}
                showSubs={(subsShown) => {
                  if (subsShown) {
                    setSubsShownWithId((oldArray) => [...oldArray, ctg.DocId])
                  } else {
                    setSubsShownWithId((current) => current.filter((docId) => docId !== ctg.DocId))
                  }
                }}
                label={ctg.DisplayName}
              />
              {subsShownWithId.indexOf(ctg.DocId) > -1 && (
                <Expand className=" bg-white p-[2px] divide-y divide-white divide-y-[2px]" show={true}>
                  {subsShownWithId.indexOf(ctg.DocId) > -1 &&
                    ctg.SubCategories.map((sub, indexSub) => {
                      const checkedSub = (subFromQS.filter((e) => e === sub.Name).length || 0) > 0
                      return (
                        <EventFilterOptionCategoryItem
                          eventCount={sub.EventCount || 0}
                          isSubCategory={true}
                          className={classNames('pl-6 ', '!bg-jg-green-50 ')}
                          checked={checkedSub}
                          onChange={(checked) => {
                            const ctArgs = [...(getArgsFromUrl().category || []), ...[]]
                            if (ctArgs[0] === 'all') {
                              ctArgs.length = 0
                            }

                            let ctgStr = ctg.Name
                            if (subFromQS.length > 0) {
                              ctgStr = `${ctgStr}$sub$${subFromQS
                                .map((qsSub) => {
                                  return qsSub
                                })
                                .join('$$')}`
                            }
                            _.remove(ctArgs, function (item) {
                              return item === ctgStr
                            })

                            if (!checked) {
                              _.remove(subFromQS, function (item) {
                                return item === sub.Name
                              })
                            } else {
                              subFromQS.push(sub.Name)
                            }

                            ctgStr = ctg.Name
                            if (subFromQS.length > 0) {
                              ctgStr = `${ctgStr}$sub$${ctg.SubCategories.map((sub) => {
                                if (subFromQS.indexOf(sub.Name) > -1) return sub.Name
                                else return ''
                              })
                                .filter((e) => e.length > 0)
                                .join('$$')}`
                            }
                            if (ctgStr !== ctg.Name) ctArgs.push(ctgStr)

                            if (ctArgs.length === 0) ctArgs.push('all')
                            setCurrentArgs({ ...currentArgs, ...{ category: ctArgs } })
                          }}
                          key={indexSub}
                          hasNoSub={true}
                          label={sub.Name}
                        />
                      )
                    })}
                </Expand>
              )}
            </div>
          )
        })}
      </FadeIn>
    </FancyScroll>
  )
}
const EventFilterOptionCategory = () => {
  // const filterBarData = useEventStore((state) => state.filterBarData)
  //const [subsShownWithId, setSubsShownWithId] = useState<number[]>([0])
  const { currentArgs, setCurrentArgs, getArgsFromUrl } = useNavigateWithArgs()
  return <WithCategoryFilterOptions {...{ currentArgs, setCurrentArgs, getArgsFromUrl }} />
}
export default EventFilterOptionCategory
