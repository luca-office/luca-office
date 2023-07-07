import {ProgressIndicatorStatus} from "shared/enums"
import {ProjectModuleProgressType} from "shared/graphql/generated/globalTypes"

export const getProgressIndicatorStatus = (status?: ProjectModuleProgressType) =>
  status === ProjectModuleProgressType.Completed
    ? ProgressIndicatorStatus.Completed
    : status === ProjectModuleProgressType.InProgress
    ? ProgressIndicatorStatus.InProgress
    : ProgressIndicatorStatus.Open
