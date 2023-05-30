import { OptinGroupsInfo } from './OptinGroupsInfo'

export type OptinInfo = {
  Id: number
  OwnerType: string
  OwnerId: number
  TargetEntity: string
  Title: string
  Description: string
  Status: number
  Version: number
  CreatedDate: object
  LastModifiedDate: object
  LastModifiedTime: string
  LastModifiedUser: number
  IsDirty: boolean
  Groups: OptinGroupsInfo[]
  ChangeHistorys: any
  SyncGuid: string
}
