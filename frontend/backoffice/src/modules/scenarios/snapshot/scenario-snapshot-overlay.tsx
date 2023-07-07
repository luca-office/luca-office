import {css} from "@emotion/react"
import {noop} from "lodash-es"
import * as React from "react"
import {ContentLoadingIndicator, Modal} from "shared/components"
import {
  borderRadiusLarge,
  cardBottomColor,
  headerBoxShadow,
  radius,
  spacing,
  spacingHuger,
  spacingLarge,
  spacingMedium,
  zIndex1
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {useScenarioSnapshotOverlay} from "./hooks/use-scenario-snapshot-overlay"
import {ScenarioSnapshot} from "./scenario-snapshot"

export interface ScenarioSnapshotOverlayProps {
  readonly surveyId: UUID
  readonly scenarioId: UUID
  readonly surveyInvitationId: UUID
  readonly isDisabled?: boolean
  readonly onDismiss: () => void
  readonly pollSurveyEvents?: boolean
}

export const ScenarioSnapshotOverlay: React.FC<ScenarioSnapshotOverlayProps> = ({
  surveyId,
  scenarioId,
  surveyInvitationId,
  isDisabled,
  onDismiss,
  pollSurveyEvents = false
}) => {
  const {t} = useLucaTranslation()

  const {dataLoading, participantName} = useScenarioSnapshotOverlay(surveyId, surveyInvitationId)

  return (
    <Modal
      customStyles={styles.modal}
      customHeaderStyles={styles.modalHeader}
      customFooterStyles={styles.modalFooter}
      onConfirm={noop}
      onDismiss={onDismiss}
      title={t("scenario_snapshot_overlay__header_label", {name: participantName})}
      showEmptyFooter={true}
      hideFooter={true}>
      {dataLoading ? (
        <ContentLoadingIndicator customStyles={styles.loadingIndicator} />
      ) : (
        <ScenarioSnapshot
          customStyles={styles.snapshot}
          customTaskbarStyles={styles.snapshotTaskbar}
          surveyId={surveyId}
          surveyInvitationId={surveyInvitationId}
          scenarioId={scenarioId}
          isDisabled={isDisabled}
          usePortalForTaskbarTooltips={true}
          pollSurveyEvents={pollSurveyEvents}
        />
      )}
    </Modal>
  )
}

const styles = {
  modal: css({
    width: "90vw",
    height: "90vh",
    padding: 0
  }),
  modalHeader: css({
    backgroundColor: cardBottomColor,
    boxShadow: headerBoxShadow,
    height: spacingHuger,
    boxSizing: "border-box",
    borderRadius: radius(borderRadiusLarge, borderRadiusLarge, 0, 0),
    padding: spacing(spacingMedium, spacingLarge),
    margin: 0,
    zIndex: zIndex1
  }),
  modalFooter: css({
    borderRadius: radius(0, 0, borderRadiusLarge, borderRadiusLarge)
  }),
  loadingIndicator: css({
    height: "100%",
    boxSizing: "border-box"
  }),
  snapshot: css({
    height: "100%"
  }),
  snapshotTaskbar: css({
    position: "absolute"
  })
}
