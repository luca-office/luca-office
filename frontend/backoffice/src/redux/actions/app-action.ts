import {ChatAction} from "shared/redux/actions/data/chat-action"
import {NavigationAction} from "./navigation-action"
import {PreviewAction} from "./player-preview-actions"
import {UiAction} from "./ui-action"

export type AppAction = NavigationAction | UiAction | PreviewAction | ChatAction
