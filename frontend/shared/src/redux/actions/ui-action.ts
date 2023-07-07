import {Action} from "redux"
import {AppNotification} from "../../models"
import {OfficeModule} from "../../models/office-module"
import {Option} from "../../utils"
import {ChatAction} from "./data/chat-action"
import {BinaryViewerAction} from "./ui/binary-viewer-action"
import {FilesAndDirectoriesAction} from "./ui/files-and-directories-action"
import {ScheduledQuestionnaireAction} from "./ui/scheduled-questionnaires-action"
import {SpreadsheetViewerAction} from "./ui/spreadsheet-viewer-action"
import {TextDocumentViewerAction} from "./ui/text-document-viewer-action"
import {WindowManagerAction} from "./ui/window-manager-action"

export type UiAction =
  | BinaryViewerAction
  | SpreadsheetViewerAction
  | TextDocumentViewerAction
  | FilesAndDirectoriesAction
  | WindowManagerAction
  | UpdateNotificationAction
  | UpdateActiveModuleAction
  | UpdateSelectedReferenceElementIdAction
  | ScheduledQuestionnaireAction
  | ResetUiStateAction
  | ChatAction

export enum UiActionType {
  UpdateNotification = "UpdateNotification",
  UpdateActiveModule = "UpdateActiveModule",
  UpdateSelectedReferenceElementId = "UpdateSelectedReferenceElementIdAction",
  ResetUiStateAction = "ResetUiStateAction"
}

export interface UpdateNotificationAction extends Action {
  readonly type: UiActionType.UpdateNotification
  readonly payload: {
    readonly notification: Option<AppNotification>
  }
}

export const updateNotification = (notification: Option<AppNotification>): UpdateNotificationAction => ({
  type: UiActionType.UpdateNotification,
  payload: {notification}
})

export interface UpdateActiveModuleAction extends Action {
  readonly type: UiActionType.UpdateActiveModule
  readonly payload: {
    readonly activeModule: Option<OfficeModule>
  }
}

export const updateActiveModuleAction = (officeModule: Option<OfficeModule>): UpdateActiveModuleAction => ({
  type: UiActionType.UpdateActiveModule,
  payload: {activeModule: officeModule}
})

export interface UpdateSelectedReferenceElementIdAction extends Action {
  readonly type: UiActionType.UpdateSelectedReferenceElementId
  readonly payload: {
    readonly selectedReferenceElementId: Option<UUID>
  }
}

export const updateSelectedReferenceElementId = (id: Option<UUID>): UpdateSelectedReferenceElementIdAction => ({
  type: UiActionType.UpdateSelectedReferenceElementId,
  payload: {selectedReferenceElementId: id}
})

export interface ResetUiStateAction extends Action {
  readonly type: UiActionType.ResetUiStateAction
}

export const resetUiStateAction = (): ResetUiStateAction => ({
  type: UiActionType.ResetUiStateAction
})
