import { Checkbox } from '@comps/uiComps/forms'
import QtyPicker from '@comps/uiComps/forms/QtyPicker/QtyPicker'

import { useEffect, useState, useCallback } from 'react'
import call from '@jg/_core/services/data/LegacyDataService'
import useDataCaptureItem from '../../hooks/useDataCaptureItem'
import { DataCaptureComponentBase } from './MA_Heading'
import { useEntityExtGenericDataCaptureContext } from '../../providers/EntityExtGenericDataCaptureProvider'
import { AsyncStatus, ProductType } from '@jg/common/types'
import AppStore from '@jg/store/store'
import { Currency } from '@jg/utils'
import NumberField from '@comps/uiComps/forms/NumberField/NumberField'
import _ from 'lodash'
import TextField from '@comps/uiComps/forms/TextField'
import { ValidationStatus } from '../../types'
import { CubeIcon } from '@heroicons/react/outline'

export type MA_ProfileProductValueType = {
  product: ProductType[]
  isRequired?: boolean
  subscriptionSelected: boolean
  qty: number
  groupWithParentEntity: boolean
  validationStatus: ValidationStatus
  selected: boolean
}
type MA_ProfileProductProps = DataCaptureComponentBase & {
  groupWithParentEntity?: boolean

  isPreticked?: boolean
  isRequired?: boolean
  products: ProductType[]
  isSubscriptionMandatory?: boolean
  subscriptionEnabled?: boolean
}
export default (props: MA_ProfileProductProps) => {
  const BaseAppPath = AppStore((state) => state.BaseAppPath)
  const {
    $entityId,
    $index,
    products,
    groupWithParentEntity,
    isRequired,
    isSubscriptionMandatory,
    subscriptionEnabled,
    isPreticked,
  } = props
  const { ownerId, ownerType } = useEntityExtGenericDataCaptureContext((state) => ({
    ownerId: state.ownerId,
    ownerType: state.ownerType,
  }))

  const { value, setValue, onValidate, entityId, index } = useDataCaptureItem<MA_ProfileProductValueType>(
    'product',
    $entityId,
    $index,
    {
      product: [],
      groupWithParentEntity: !!groupWithParentEntity,
      isRequired: true,
      qty: 1,
      subscriptionSelected: false,
      selected: false,
      validationStatus: 'initial',
    }
  )
  const getValidationStatus = useCallback((cheked: boolean, isSubscriptionMandatory?: boolean): ValidationStatus => {
    let validStatus: ValidationStatus = 'initial'
    //const cheked = val as boolean
    if (!isSubscriptionMandatory) {
      if (isRequired) {
        validStatus = cheked ? 'valid' : 'inValid'
      } else validStatus = 'valid'
    } else {
      validStatus = cheked ? 'valid' : 'inValid'
    }
    return validStatus
  }, [])
  useEffect(() => {
    if (value.product.length === 0) {
      call(
        ['GoMembership/SelectUpSaleProducts'],
        [{ ownerType: ownerType, ownerId: ownerId, products: [products[0].Id] }],
        function (result: any) {
          const cheked = isRequired || isSubscriptionMandatory || isPreticked || false
          setValue({
            product: result as ProductType[],
            isRequired: isRequired || isSubscriptionMandatory, //isSubscriptionMandatory || isRequired || isPreticked
            groupWithParentEntity: _.isEmpty(groupWithParentEntity) ? true : !!groupWithParentEntity,
            qty: 1,
            subscriptionSelected: cheked,
            selected: cheked,
            validationStatus: getValidationStatus(cheked, isSubscriptionMandatory),
          })
        }
      )
    }

    onValidate('product', entityId, index, (valueOnValidate, noNotify) => {
      const v = valueOnValidate as MA_ProfileProductValueType
      return { isValid: v.validationStatus === 'valid', message: 'FIELD_REQUIRED', noNotify }
    })
  }, [])

  if (value.product.length > 0)
    return (
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <div className="flex items-center">
            {value.product[0].ProductImageUrl != 'Virtual' && (
              <img
                src={`${BaseAppPath}store/download?t=repo&p1=&p2=11&p=${value.product[0].Id}&f=${value.product[0].ProductImageUrl}`}
                className="w-[160px]   sm:max-w-[200px] md:max-w-md "
              />
            )}
            {value.product[0].ProductImageUrl === 'Virtual' && (
              <div className="w-[160px] h-[120px] sm:max-w-[200px] md:max-w-md bg-jg-grey-200 flex items-center justify-center ">
                <CubeIcon className="w-8" />
              </div>
            )}
          </div>
          <div className="flex flex-grow flex-col gap-2 sm:gap-4 px-2 sm:p-4 ">
            <div className="text-jg-metal-900 text-globalTextSizeXl font-semibold">{value.product[0].Name}</div>
            <p className="text-jg-metal-900 text-globalTextSizeXs font-normal">{value.product[0].Description}</p>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
              <div className="text-jg-green-500 text-globalTextSizeMd sm:text-globalTextSizeMd font-semibold text-right px-2 sm:px-0 pb-2 sm:pb-0">
                {value.product[0].PricingType === 1 && (
                  <>
                    {Currency.getSymbol(value.product[0].Currency)}
                    {value.product[0].UnitPrice.toFixed(2)}
                  </>
                )}
              </div>

              <div>
                {value.product[0].PricingType === 1 && (
                  <QtyPicker
                    label="Quantity: "
                    labelPosition="left"
                    value={value.qty}
                    onChange={(val) => {
                      if (value.product[0].MaxPurchasableQuantity >= val && val > 0)
                        setValue({ ...value, ...{ qty: val } })
                    }}
                    className="!mb-0 sm:px-2 !text-globalTextSizeXs max-w-[210px] sm:max-w-[230px]  "
                    fieldsize="sm"
                  />
                )}
                {value.product[0].PricingType === 2 && (
                  <TextField
                    label={'Amount ' + Currency.getSymbol(value.product[0].Currency)}
                    labelPosition="left"
                    onValueChange={(val) => {
                      //const v = Number(val || '0')
                      setValue({ ...value, ...{ qty: val as number } })
                    }}
                    required
                    type="number"
                    onKeyDown={(evt: any) => ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()}
                    min={1}
                    onBlur={(evt) => {
                      const v = Number(evt.target ? evt.target.value : '0')
                      // console.log('v', v.toFixed(2))
                      setValue({ ...value, ...{ qty: Number(v.toFixed(2)) } })
                      return evt.target
                    }}
                    value={value.qty}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <Checkbox
          fieldsize="sm"
          status={value.validationStatus === 'inValid' ? 'error' : 'normal'}
          asterisk={value.isRequired}
          disabled={isSubscriptionMandatory}
          label={subscriptionEnabled && !isSubscriptionMandatory ? 'Add to Cart and Subscribe' : 'Add to Cart'}
          name="option1"
          onValueChange={(val) => {
            const cheked = val as boolean

            setValue({
              ...value,
              ...{
                selected: cheked,
                subscriptionSelected: cheked,
                validationStatus: getValidationStatus(cheked, isSubscriptionMandatory),
              },
            })
          }}
          className="flex justify-end pt-2 sm:pt-0 sm:px-6 text-jg-metal-900"
          value={value.selected}
        />
      </div>
    )
  else return <>Loading....</>
}
