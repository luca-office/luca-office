import {ErpNavigationEntryId, ErpNavigationEntryType, ErpType} from "../../enums"

export type ErpEntry = ErpFolderEntry | ErpTableEntry

export interface ErpFolderEntry {
  readonly id: ErpNavigationEntryId
  readonly type: ErpNavigationEntryType.Folder
  readonly label: string
  readonly isLocked: boolean
  readonly children: Array<ErpEntry>
}

export interface ErpTableEntry {
  readonly id: ErpNavigationEntryId
  readonly type: ErpNavigationEntryType.Table
  readonly erpType?: ErpType
  readonly label: string
  readonly isLocked: boolean
}
