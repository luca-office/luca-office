import {combineReducers, Reducer} from "redux"
import {LocationState} from "redux-first-router"
import {chatReducer} from "shared/redux/reducers/data/chat-reducer"
import {playerPreviewReducer} from "./player-preview-reducer"
import {uiReducer} from "./ui-reducer"

export const appReducer = (locationReducer: Reducer<LocationState<string>>) =>
  combineReducers({
    location: locationReducer,
    ui: uiReducer,
    playerPreview: playerPreviewReducer,
    chat: chatReducer
  })
