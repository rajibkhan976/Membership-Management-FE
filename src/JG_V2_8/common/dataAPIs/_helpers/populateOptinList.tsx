import { OptinListInfo } from '@jg/common/types/EmailAndCom/OptinListInfo'

const populateOptinList = (fetchedData: any): OptinListInfo => {
  return {
    id: fetchedData.Id,
    optinGroupId: fetchedData.OptInGroupId,
    caption: fetchedData.Caption,
    name: fetchedData.Name,
    description: fetchedData.Description,
    showInSignUp: fetchedData.ShowInSignup,
    preTicked: fetchedData.PreTicked,
    isDirty: fetchedData.IsDirty,
    status: fetchedData.Status,
    sequence: fetchedData.Sequence,
    version: fetchedData.Version,
    createdDate: fetchedData.CreatedDate,
    lastModifiedDate: fetchedData.LastModifiedDate,
    lastModifiedUser: fetchedData.LastModifiedUser,
    synchGuid: fetchedData.SyncGuid,
  }
}

export default populateOptinList
