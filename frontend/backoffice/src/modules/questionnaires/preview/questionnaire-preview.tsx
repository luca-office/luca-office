import * as React from "react"
import {Overlay} from "shared/components"
import {Questionnaire} from "shared/models"
import {Option} from "shared/utils"
import {QuestionnaireDetailMode} from "../../../enums"
import {EventQuestionnairePreview} from "./event-questionnaire-preview"
import {ProjectQuestionnairePreview} from "./project-questionnaire-preview"

export interface QuestionnairePreviewProps {
  readonly displayMode: QuestionnaireDetailMode
  readonly hidePreview: () => void
  readonly questionnaire: Option<Questionnaire>
}

export const QuestionnairePreview: React.FunctionComponent<QuestionnairePreviewProps> = ({
  questionnaire: questionnaireOption,
  displayMode,
  hidePreview
}) => {
  return questionnaireOption
    .map(questionnaire => {
      switch (displayMode) {
        case QuestionnaireDetailMode.RuntimeSurvey:
        case QuestionnaireDetailMode.ScenarioRuntimeSurvey:
          return (
            <Overlay>
              <EventQuestionnairePreview questionnaire={questionnaire} onClose={hidePreview} />
            </Overlay>
          )
        case QuestionnaireDetailMode.Default:
        default:
          return (
            <Overlay>
              <ProjectQuestionnairePreview questionnaire={questionnaire} onClose={hidePreview} />
            </Overlay>
          )
      }
    })
    .orNull()
}
