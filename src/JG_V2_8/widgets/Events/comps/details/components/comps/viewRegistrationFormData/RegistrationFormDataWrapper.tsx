import { CompBaseProps } from '@comps/uiComps'
import call from '@jg/_core/services/data/LegacyDataService'
import EventBookingDataCaptureForm from '@jg/common/entityExtForms/dataCaptureForms/eventBooking/EventBookingDataCaptureForm'
import EntityExtGenericDataCaptureProvider, {
  EntityExtGenericDataCaptureItemValueByEntityIdType,
} from '@jg/common/entityExtForms/providers/EntityExtGenericDataCaptureProvider'
import { useEntityExtSchemaStore } from '@jg/common/entityExtForms/providers/EntityExtensionSchemaProvider'
import { EntityExtFormDataType } from '@jg/common/entityExtForms/types'
import { AsyncStatus } from '@jg/common/types'
import { DataCaptureItem } from '@jg/common/types/eventsAnsSchedules/TicketInfo'
import _ from 'lodash'
import { useEffect, useState } from 'react'
type RegistrationFormDataWrapperProps = CompBaseProps & {
  ownerId: number
  ownerType: string
  noOfBooking: number
  entityId: number
  ticketDocId: number
  dataCaptureItems?: DataCaptureItem[]
}

export const retainZeroValueInObject = (
  objParam: Record<number, EntityExtFormDataType>
): Record<number, EntityExtFormDataType> => {
  const parentObj: Record<number, EntityExtFormDataType> = {}
  for (const i in objParam) {
    const childObj: any = {}
    for (const [key, value] of Object.entries(objParam[i])) {
      if (value === 0) {
        Object.assign(childObj, { [key]: `${value}` })
      } else {
        Object.assign(childObj, { [key]: value })
      }
    }
    //console.log(childObj)
    Object.assign(parentObj, { [i]: childObj })
  }
  // console.log(parentObj)
  return parentObj
}

const getFormatedData = (entityId: number, formData: any[]) => {
  //EntityExtFormDataType
  // console.log('data', formData)
  const rec: Record<number, any> = {}
  rec[entityId] = []
  const { SchemeId, $eventFieldSets } = formData[0]
  for (const i in $eventFieldSets) {
    const rec2: Record<number, EntityExtFormDataType> = {}
    rec2[SchemeId] = $eventFieldSets[i]
    rec[entityId].push(retainZeroValueInObject(rec2))
  }

  const data: Record<string, EntityExtGenericDataCaptureItemValueByEntityIdType<any>> = { form: rec }

  return data
}

/*const populateData = (dataBySchemeId: any, ticketDocId: number) => {
  const groupData: any = {}

  for (let j = 0; j < dataBySchemeId.length; j++) {
    if (_.isEmpty(dataBySchemeId[j].$eventFieldSets)) {
      groupData[j] = []
      continue
    }

    for (const p in dataBySchemeId[j].$eventFieldSets) {
      const edata = {
        exId: dataBySchemeId[j].SchemeId,
        docId: ticketDocId, // me.productId,
        data: {},
        $rowId: p,
      } as any
      const data = dataBySchemeId[j].$eventFieldSets[p]
      if (!Object.prototype.hasOwnProperty.call(groupData, data.Tag)) {
        groupData[data.Tag] = []
        edata.$tag = data.Tag
        groupData[data.Tag].push(edata)
        delete data.Tag
      } else {
        edata.$tag = data.Tag
        groupData[data.Tag].push(edata)
        delete data.Tag
      }
      _.merge(edata.data, data)
      // az.copy(edata.data, data)
    }
  }

  const _extData = []
  for (const t in groupData) {
    if (groupData[t].length) _extData.push(groupData[t])
  }
  console.log('_extData', _extData)
}*/

const RegistrationFormDataWrapper = ({
  ownerId,
  ownerType,
  children,
  noOfBooking,
  ticketDocId,
  entityId,
  dataCaptureItems,
}: RegistrationFormDataWrapperProps) => {
  const { schemas } = useEntityExtSchemaStore((state) => ({ schemas: state.schemas }))
  const [asyncStatus, setAsyncStatus] = useState<AsyncStatus>('idle')
  const [value, setValue] = useState<Record<string, EntityExtGenericDataCaptureItemValueByEntityIdType<any>>>({})
  //Record<string, EntityExtGenericDataCaptureItemValueByEntityIdType<any>>
  useEffect(() => {
    const svc: string[] = []
    const args: any[] = []

    schemas?.forEach((e) => {
      svc.push('EntityExtension/SelectData')
      args.push({ exId: e.ExId, docId: entityId })
    })
    //console.log('args', args)
    call(svc, args, function (...result: any) {
      const formData = []
      for (let i = 0; i < result.length; i++) {
        const data = result[i]
        data.SchemeId = args[i].exId
        formData.push(result[i])
      }
      //  console.log('formData', formData)
      const res = getFormatedData(entityId, formData)
      //  console.log('getFormatedData', res)
      setValue(res)
      // populateData(formData, ticketDocId)
      setAsyncStatus('success')
      // me.dataBySchemeId = formData
      // callback(formData)
    })
  }, [])
  if (asyncStatus === 'success') {
    const forms = []
    for (let i = 0; i < noOfBooking; i++) {
      forms.push(
        <div key={i}>
          <EventBookingDataCaptureForm
            index={i}
            entityId={entityId}
            formTitle={''}
            fieldItems={dataCaptureItems || []} //ticketInfo.dataCaptureItems ||
            allowedItems={['form']}
            readOnly={true}
          />
        </div>
      )
    }
    return (
      <EntityExtGenericDataCaptureProvider
        ownerId={ownerId}
        ownerType={ownerType}
        value={value}
        onChange={(key, value) => {}}
      >
        {forms.map((e) => e)}
      </EntityExtGenericDataCaptureProvider>
    )
  } else return <>Loading...</>
}

export default RegistrationFormDataWrapper
