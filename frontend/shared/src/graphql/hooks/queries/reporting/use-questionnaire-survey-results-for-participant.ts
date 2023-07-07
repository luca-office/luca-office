import {useQuery} from "@apollo/client"
import {QuestionnaireSurveyResultsForParticipant} from "../../../../models"
import {Option} from "../../../../utils"
import {
  QuestionnaireSurveyResultsForParticipantQuery,
  QuestionnaireSurveyResultsForParticipantQueryVariables
} from "../../../generated/QuestionnaireSurveyResultsForParticipantQuery"
import {questionnaireSurveyResultsForParticipantQuery} from "../../../queries"

export interface UseQuestionnaireSurveyResultsForParticipantHook {
  readonly questionnaireSurveyResultsForParticipant: Option<QuestionnaireSurveyResultsForParticipant>
  readonly questionnaireSurveyResultsForParticipantLoading: boolean
}

export const useQuestionnaireSurveyResultsForParticipant = (
  questionnaireId: UUID,
  surveyId: UUID,
  surveyInvitationId: UUID
): UseQuestionnaireSurveyResultsForParticipantHook => {
  const {data, loading} = useQuery<
    QuestionnaireSurveyResultsForParticipantQuery,
    QuestionnaireSurveyResultsForParticipantQueryVariables
  >(questionnaireSurveyResultsForParticipantQuery, {
    variables: {questionnaireId, surveyId, surveyInvitationId}
  })

  return {
    questionnaireSurveyResultsForParticipant: Option.of(data?.questionnaireSurveyResultsForParticipant),
    questionnaireSurveyResultsForParticipantLoading: loading
  }
}
