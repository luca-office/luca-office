import {getClassNameByProgressIndicatorStatus} from "shared/components"
import {ProgressIndicatorStatus} from "shared/enums"
import {ProjectModuleProgressType} from "shared/graphql/generated/globalTypes"
import {getProgressIndicatorStatus} from "../progress-indicator-status"

describe("progress-indicator-status", () => {
  describe("getProgressIndicatorStatus", () => {
    it("correctly returns status", () => {
      expect(getProgressIndicatorStatus(ProjectModuleProgressType.Completed)).toEqual(ProgressIndicatorStatus.Completed)
      expect(getProgressIndicatorStatus(ProjectModuleProgressType.InProgress)).toEqual(
        ProgressIndicatorStatus.InProgress
      )
      expect(getProgressIndicatorStatus()).toEqual(ProgressIndicatorStatus.Open)
    })
  })
  describe("getClassNameByProgressIndicatorStatus", () => {
    it("correctly returns className", () => {
      expect(getClassNameByProgressIndicatorStatus(ProgressIndicatorStatus.Completed)).toEqual("completed-indicator")
      expect(getClassNameByProgressIndicatorStatus(ProgressIndicatorStatus.InProgress)).toEqual("in-progress-indicator")
      expect(getClassNameByProgressIndicatorStatus(ProgressIndicatorStatus.Open)).toEqual("open-indicator")
    })
  })
})
