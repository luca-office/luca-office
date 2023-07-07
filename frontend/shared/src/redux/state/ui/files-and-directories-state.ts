import {Option} from "../../../utils/option"

export interface FilesAndDirectoriesState {
  readonly selectedDirectoryId: Option<UUID>
  readonly selectedFileId: Option<UUID>
  readonly expandedDirectoryIds: UUID[]
  readonly availableEmailDownloadFiles: UUID[]
  readonly newEmailFilesCounter: number
  readonly availableEmailUploadFiles: Record<UUID, UUID[]>
}

export const initialFilesAndDirectoriesState: FilesAndDirectoriesState = {
  selectedDirectoryId: Option.none(),
  selectedFileId: Option.none(),
  expandedDirectoryIds: [],
  availableEmailDownloadFiles: [],
  newEmailFilesCounter: 0,
  availableEmailUploadFiles: {}
}
