import * as React from "react"
import {QuestionnaireDetailMode} from "../../../../../enums"
import {Route} from "../../../../../routes"
import {QuestionnaireDetail} from "../../../../questionnaires/detail/questionnaire-detail"

export interface ProjectQuestionnaireSelectionDetailProps {
  readonly projectId: UUID
  readonly questionnaireId: UUID
  readonly questionId?: UUID
}

export const ProjectQuestionnaireSelectionDetail: React.FC<ProjectQuestionnaireSelectionDetailProps> = ({
  questionnaireId,
  questionId,
  projectId
}) => {
  return (
    <QuestionnaireDetail
      displayMode={QuestionnaireDetailMode.ProjectQuestionnaire}
      questionnaireId={questionnaireId}
      questionId={questionId}
      navigationOverviewConfig={{
        route: Route.QuestionnaireSelection,
        payload: {id: projectId},
        labelKey: "project_module_selection__selected_questionnaire"
      }}
      navigationDetailsConfig={{route: Route.QuestionnaireSelectionDetail, payload: {id: projectId, questionnaireId}}}
      navigationQuestionConfig={{
        route: Route.QuestionnaireSelectionDetailQuestion,
        payload: {id: projectId, questionnaireId, questionId}
      }}
    />
  )
}
