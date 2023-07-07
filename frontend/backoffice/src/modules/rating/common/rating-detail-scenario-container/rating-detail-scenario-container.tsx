import {css} from "@emotion/react"
import * as React from "react"
import {RatingDetailScenario, RatingDetailScenarioProps} from "shared/components"
import {Scenario} from "shared/models"
import {flex1, minScreenWidth, spacingLarge} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {ScenarioSnapshot} from "../../../scenarios"

export const RatingDetailScenarioContainer = <TRoute,>({
  surveyId,
  surveyInvitationId,
  ...props
}: Omit<RatingDetailScenarioProps<TRoute>, "renderScenarioSnapshot">) => {
  const {t} = useLucaTranslation()

  const renderScenarioSnapshot = (scenario: Scenario, participantFinishedModule: boolean) => (
    <ScenarioSnapshot
      surveyInvitationId={surveyInvitationId ?? ""}
      scenarioId={scenario.id}
      surveyId={surveyId}
      customStyles={styles.snapshot}
      usePortalForTaskbarTooltips={true}
      placeholderConfig={{
        title: t("common__no_data"),
        description: t("rating_scenario__snapshot_placeholder_description")
      }}
      showPlaceholder={!participantFinishedModule}
      isDisabled={!participantFinishedModule}
      customTaskbarStyles={styles.taskbar}
    />
  )

  return (
    <RatingDetailScenario
      {...props}
      surveyId={surveyId}
      surveyInvitationId={surveyInvitationId}
      renderScenarioSnapshot={renderScenarioSnapshot}
      customContentStyles={styles.rating}
    />
  )
}

const styles = {
  snapshot: css({
    flex: flex1,
    height: "auto",
    minWidth: minScreenWidth,
    marginLeft: -spacingLarge
  }),
  rating: css({overflow: "hidden", overflowX: "scroll"}),
  taskbar: css({position: "relative"})
}
