import uniq from "lodash-es/uniq"
import {Reducer} from "redux"
import {AppAction} from "../../../actions/app-action"
import {DirectoriesAndFilesActionType} from "../../../actions/ui/scenarios/directories-and-files-action"
import {
  DirectoriesAndFilesState,
  initialDirectoriesAndFilesState
} from "../../../state/ui/scenarios/directories-and-files"

export const directoriesAndFilesReducer: Reducer<DirectoriesAndFilesState, AppAction> = (
  state = initialDirectoriesAndFilesState,
  action
) => {
  switch (action.type) {
    case DirectoriesAndFilesActionType.ToggleExpandDirectory:
      return {
        ...state,
        expandedDirectoryIds: state.expandedDirectoryIds.includes(action.payload.id)
          ? state.expandedDirectoryIds.filter(id => id !== action.payload.id)
          : state.expandedDirectoryIds.concat(action.payload.id)
      }

    case DirectoriesAndFilesActionType.ExpandDirectories:
      return {
        ...state,
        expandedDirectoryIds: uniq(state.expandedDirectoryIds.concat(action.payload.ids))
      }

    default:
      return state
  }
}
