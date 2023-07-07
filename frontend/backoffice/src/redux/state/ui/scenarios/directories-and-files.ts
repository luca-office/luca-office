export interface DirectoriesAndFilesState {
  readonly expandedDirectoryIds: UUID[]
}

export const initialDirectoriesAndFilesState: DirectoriesAndFilesState = {
  expandedDirectoryIds: []
}
