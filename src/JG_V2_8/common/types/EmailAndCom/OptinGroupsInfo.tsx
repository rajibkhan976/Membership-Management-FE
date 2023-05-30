import { OptinListInfo } from './OptinListInfo'

export type OptinGroupsInfo = {
  Id: number
  OptInMasterId: number
  Name: string
  Description: string
  Sequence: number
  OptIns: OptinListInfo[]
  SyncGuid: string
}
