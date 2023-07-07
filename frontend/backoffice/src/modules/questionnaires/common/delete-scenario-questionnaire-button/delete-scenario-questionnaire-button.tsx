import * as React from "react"
import {deleteEntityButtonStyles, OrlyButtonContainer} from "shared/components"
import {useDeleteScenarioQuestionnaireButton} from "./hooks/use-delete-scenario-questionnaire-button"

interface Props {
  readonly questionnaireId: UUID
  readonly scenarioId: UUID
  readonly disabled?: boolean
}

export const DeleteScenarioQuestionnaireButton: React.FunctionComponent<Props> = ({
  questionnaireId,
  scenarioId,
  disabled
}) => {
  const {deleteScenarioQuestionnaire, deleteScenarioQuestionnaireLoading} = useDeleteScenarioQuestionnaireButton(
    questionnaireId,
    scenarioId
  )

  return (
    <OrlyButtonContainer
      onConfirm={deleteScenarioQuestionnaire}
      iconColor={"white"}
      disabled={deleteScenarioQuestionnaireLoading || disabled}
      modalTextKey={"scenario_events__header_orly_delete_text"}
      modalTitleKey={"scenario_events__header_orly_delete_title"}
      customButtonStyles={deleteEntityButtonStyles.trashButton}
    />
  )
}
