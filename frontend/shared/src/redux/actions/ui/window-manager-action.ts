import {Action} from "redux"
import {OfficeWindowType} from "../../../enums"

export type WindowManagerAction =
  | OpenWindowAction
  | CloseWindowAction
  | MinimizeWindowAction
  | CloseAllWindowsAction
  | UpdateAvailableWindowsAction
  | SetChatWindowVisibilityAction

export enum WindowManagerActionType {
  OpenWindow = "OpenWindow",
  CloseWindow = "CloseWindow",
  MinimizeWindow = "MinimizeWindow",
  CloseAllWindows = "CloseAllWindows",
  UpdateAvailableWindows = "UpdateAvailableWindows",
  SetChatWindowVisibility = "SetChatWindowVisibility"
}

interface WindowActionPayload {
  readonly targetWindow: OfficeWindowType
}

export interface OpenWindowAction extends Action {
  readonly type: WindowManagerActionType.OpenWindow
  readonly payload: WindowActionPayload
}

export const openWindow = (targetWindow: OfficeWindowType): OpenWindowAction => ({
  type: WindowManagerActionType.OpenWindow,
  payload: {targetWindow}
})

export interface CloseWindowAction extends Action {
  readonly type: WindowManagerActionType.CloseWindow
  readonly payload: WindowActionPayload
}

export const closeWindow = (targetWindow: OfficeWindowType): CloseWindowAction => ({
  type: WindowManagerActionType.CloseWindow,
  payload: {targetWindow}
})

export interface MinimizeWindowAction extends Action {
  readonly type: WindowManagerActionType.MinimizeWindow
  readonly payload: WindowActionPayload
}

export const minimizeWindow = (targetWindow: OfficeWindowType): MinimizeWindowAction => ({
  type: WindowManagerActionType.MinimizeWindow,
  payload: {targetWindow}
})

export interface CloseAllWindowsAction extends Action {
  readonly type: WindowManagerActionType.CloseAllWindows
}

export const closeAllWindows = (): CloseAllWindowsAction => ({
  type: WindowManagerActionType.CloseAllWindows
})

export interface UpdateAvailableWindowsAction extends Action {
  readonly type: WindowManagerActionType.UpdateAvailableWindows
  readonly payload: {
    availableWindows: OfficeWindowType[]
  }
}

export const updateAvailableWindows = (availableWindows: OfficeWindowType[]): UpdateAvailableWindowsAction => ({
  type: WindowManagerActionType.UpdateAvailableWindows,
  payload: {availableWindows}
})

export interface SetChatWindowVisibilityAction extends Action {
  readonly type: WindowManagerActionType.SetChatWindowVisibility
  readonly payload: {
    visible: boolean
  }
}

export const setChatWindowVisibility = (visible: boolean): SetChatWindowVisibilityAction => ({
  type: WindowManagerActionType.SetChatWindowVisibility,
  payload: {visible}
})
