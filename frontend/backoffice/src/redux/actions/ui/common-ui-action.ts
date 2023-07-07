import {Action} from "redux"
import {AppNotification} from "shared/models"
import {Option} from "shared/utils"
import {AppMode} from "../../../enums"
import {EntityFilterConfig, EntityFiltersType} from "../../../models"

export type CommonUiAction =
  | UpdateAppModeAction
  | UpdateEntitySortingAndFiltersAction
  | UpdateNotificationAction
  | UpdateChatVisibilityAction

export enum CommonUiActionType {
  UpdateAppMode = "UpdateAppMode",
  UpdateEntitySortingAndFilters = "UpdateEntitySortingAndFilters",
  UpdateNotification = "UpdateNotification",
  UpdateChatVisibility = "UpdateChatVisibility"
}

export interface UpdateAppModeAction extends Action {
  readonly type: CommonUiActionType.UpdateAppMode
  readonly payload: {
    readonly mode: AppMode
  }
}

export const updateAppMode = (mode: AppMode): UpdateAppModeAction => ({
  type: CommonUiActionType.UpdateAppMode,
  payload: {mode}
})

export interface UpdateEntitySortingAndFiltersAction extends Action {
  readonly type: CommonUiActionType.UpdateEntitySortingAndFilters
  readonly payload: {
    readonly configKey: EntityFiltersType
    readonly config: Partial<EntityFilterConfig>
  }
}

export const updateEntitySortingAndFilters = (
  configKey: EntityFiltersType,
  config: Partial<EntityFilterConfig>
): UpdateEntitySortingAndFiltersAction => ({
  type: CommonUiActionType.UpdateEntitySortingAndFilters,
  payload: {config, configKey}
})

export interface UpdateNotificationAction extends Action {
  readonly type: CommonUiActionType.UpdateNotification
  readonly payload: {
    readonly notification: Option<AppNotification>
  }
}

export const updateNotification = (notification: Option<AppNotification>): UpdateNotificationAction => ({
  type: CommonUiActionType.UpdateNotification,
  payload: {notification}
})

export interface UpdateChatVisibilityAction extends Action {
  readonly type: CommonUiActionType.UpdateChatVisibility
  readonly payload: {
    readonly isVisible: boolean
  }
}

export const updateChatVisibility = (isVisible: boolean): UpdateChatVisibilityAction => ({
  type: CommonUiActionType.UpdateChatVisibility,
  payload: {isVisible}
})
