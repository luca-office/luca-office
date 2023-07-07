import * as React from "react"

export interface UseParticipantScenarioDetailHook {
  readonly isScenarioSnapshotOverlayVisible: boolean
  readonly showScenarioSnapshotOverlay: () => void
  readonly hideScenarioSnapshotOverlay: () => void
}

export const useParticipantScenarioDetail = (): UseParticipantScenarioDetailHook => {
  const [isScenarioSnapshotOverlayVisible, setIsScenarioSnapshotOverlayVisible] = React.useState(false)

  const showScenarioSnapshotOverlay = () => setIsScenarioSnapshotOverlayVisible(true)
  const hideScenarioSnapshotOverlay = () => setIsScenarioSnapshotOverlayVisible(false)

  return {isScenarioSnapshotOverlayVisible, showScenarioSnapshotOverlay, hideScenarioSnapshotOverlay}
}
