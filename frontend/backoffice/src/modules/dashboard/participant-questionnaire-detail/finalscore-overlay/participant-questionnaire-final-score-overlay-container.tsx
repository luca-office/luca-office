import React, {useState} from "react"
import {LoadingIndicator, Overlay, ReportingQuestionnaireOverlay} from "shared/components"
import {useQuestionnaire, useQuestionnaireSurveyResultsForParticipant} from "shared/graphql/hooks"
import {useFreetextQuestionCodingCriteriaForQuestionnaire} from "shared/graphql/hooks/queries/ratings/use-freetext-question-coding-criteria"
import {useSurveyLight} from "shared/graphql/hooks/queries/survey/use-survey-light"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"

interface Props {
  readonly surveyId: UUID
  readonly surveyInvitationId: UUID
  readonly questionnaireId: UUID
  readonly participantName: string
  readonly onCloseOverlay: () => void
}

export const ParticipantQuestionnaireFinalScoreOverlayContainer: React.FC<Props> = props => {
  const {t} = useLucaTranslation()
  const {surveyId, surveyInvitationId, questionnaireId, participantName, onCloseOverlay} = props
  const [selectedNodeId, updateSelectedNodeId] = useState(Option.none<string>())

  const {survey: surveyOption} = useSurveyLight(surveyId)
  const {questionnaire: questionnaireOption} = useQuestionnaire(questionnaireId)
  const {questionnaireSurveyResultsForParticipant} = useQuestionnaireSurveyResultsForParticipant(
    questionnaireId,
    surveyId,
    surveyInvitationId
  )
  const {freetextQuestionCodingCriteria} = useFreetextQuestionCodingCriteriaForQuestionnaire(questionnaireId)

  return (
    <Overlay>
      {surveyOption
        .flatMap(survey =>
          questionnaireOption.flatMap(questionnaire =>
            questionnaireSurveyResultsForParticipant.map(results => (
              <ReportingQuestionnaireOverlay
                t={t}
                participantName={participantName}
                project={survey.project}
                survey={survey}
                questionnaire={questionnaire}
                questionnaireSurveyResultsForParticipant={results}
                freetextQuestionCodingCriteriaForQuestionnaire={freetextQuestionCodingCriteria}
                onCloseOverlay={onCloseOverlay}
                selectedNodeId={selectedNodeId.getOrElse(questionnaire.id)}
                updateSelectedNodeId={id => updateSelectedNodeId(Option.of(id))}
              />
            ))
          )
        )
        .getOrElse(<LoadingIndicator />)}
    </Overlay>
  )
}
