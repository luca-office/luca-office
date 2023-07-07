import {DataState, initialDataState} from "./data-state"
import {initialUiState, UiState} from "./ui-state"

export type SharedAppState = Readonly<{
  data: DataState
  ui: UiState
}>

export const initialSharedAppState: SharedAppState = {
  data: initialDataState,
  ui: initialUiState
}
