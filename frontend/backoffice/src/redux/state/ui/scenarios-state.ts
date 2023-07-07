import {DirectoriesAndFilesState, initialDirectoriesAndFilesState} from "./scenarios/directories-and-files"

export interface ScenariosState {
  readonly directoriesAndFiles: DirectoriesAndFilesState
}

export const initialScenariosState: ScenariosState = {
  directoriesAndFiles: initialDirectoriesAndFilesState
}
