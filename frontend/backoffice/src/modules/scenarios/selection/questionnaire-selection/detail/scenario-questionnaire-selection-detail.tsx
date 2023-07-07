import * as React from "react"
import {QuestionnaireDetailMode} from "../../../../../enums"
import {Route} from "../../../../../routes"
import {QuestionnaireDetail} from "../../../../questionnaires"

export interface ScenarioQuestionnaireSelectionDetailProps {
  readonly scenarioId: UUID
  readonly questionnaireId: UUID
  readonly questionId?: UUID
}

export const ScenarioQuestionnaireSelectionDetail: React.FC<ScenarioQuestionnaireSelectionDetailProps> = ({
  questionnaireId,
  questionId,
  scenarioId
}) => {
  return (
    <QuestionnaireDetail
      displayMode={QuestionnaireDetailMode.ScenarioRuntimeSurvey}
      questionnaireId={questionnaireId}
      questionId={questionId}
      scenarioId={scenarioId}
      navigationOverviewConfig={{
        route: Route.ScenarioDetail,
        payload: {scenarioId},
        labelKey: "questionnaires__selection_header_navigate_back_label"
      }}
      navigationDetailsConfig={{route: Route.ScenarioQuestionnaireDetail, payload: {scenarioId, questionnaireId}}}
      navigationQuestionConfig={{
        route: Route.ScenarioQuestionnaireDetailQuestion,
        payload: {scenarioId, questionnaireId, questionId}
      }}
    />
  )
}
