import {LocationState} from "redux-first-router"
import {ChatState, initialChatState} from "shared/redux/state/data/chat-state"
import {initialPlayerPreviewState, PlayerPreviewState} from "./player-preview-state"
import {initialUiState, UiState} from "./ui-state"

export type AppState = Readonly<{
  location: LocationState<string> | undefined
  ui: UiState
  playerPreview: PlayerPreviewState
  chat: ChatState
}>

export const initialAppState: AppState = {
  location: undefined,
  ui: initialUiState,
  playerPreview: initialPlayerPreviewState,
  chat: initialChatState
}
