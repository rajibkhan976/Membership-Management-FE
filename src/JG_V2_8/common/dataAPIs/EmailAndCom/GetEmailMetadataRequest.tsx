import call from '@jg/_core/services/data/LegacyDataService'
import { ResponseBase } from '@jg/common/types/common/ResponseBase'
import { OptinInfo, GenericErrorResponse } from '@jg/common/types'

export type EmailMetadataResponse = ResponseBase & {
  optinList: OptinInfo
}

const GetEmailMetadataRequest = () => {
  return new Promise<EmailMetadataResponse>((resolve, reject) => {
    const response: EmailMetadataResponse = {
      optinList: {
        Id: 0,
        OwnerType: '',
        OwnerId: 0,
        TargetEntity: '',
        Title: '',
        Description: '',
        Status: 0,
        Version: 0,
        CreatedDate: {},
        LastModifiedDate: {},
        LastModifiedTime: '',
        LastModifiedUser: 0,
        IsDirty: false,
        Groups: [],
        ChangeHistorys: null,
        SyncGuid: '',
      },
    }

    const getOptinListArg = { ownerType: 'NGB', ownerId: 0 }

    call(
      ['OptIn/SelectOptInMasterByOwner'],
      [getOptinListArg],
      (optinListRes: any) => {
        // console.log('EmailMetadata', optinListRes)
        response.success = true

        if (optinListRes) {
          response.optinList = optinListRes
        }
        resolve(response)
      },
      () => {
        const error: GenericErrorResponse = {
          message: 'Failed to fetch email metadata due to unknown error!',
        }
        reject(error)
      }
    )
  })
}

export default GetEmailMetadataRequest
