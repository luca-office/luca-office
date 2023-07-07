import {useQuery} from "@apollo/client"
import {QuestionnaireSurveyResultsForParticipant} from "../../../../models"
import {
  QuestionnaireSurveyResultsForParticipantsQuery,
  QuestionnaireSurveyResultsForParticipantsQueryVariables
} from "../../../generated/QuestionnaireSurveyResultsForParticipantsQuery"
import {questionnaireSurveyResultsForParticipantsQuery} from "../../../queries"

export interface UseQuestionnaireSurveyResultsForParticipantsHook {
  readonly questionnaireSurveyResultsForParticipants: QuestionnaireSurveyResultsForParticipant[]
  readonly questionnaireSurveyResultsForParticipantsLoading: boolean
}

export const useQuestionnaireSurveyResultsForParticipants = (
  questionnaireId: UUID,
  surveyId: UUID
): UseQuestionnaireSurveyResultsForParticipantsHook => {
  const {data, loading} = useQuery<
    QuestionnaireSurveyResultsForParticipantsQuery,
    QuestionnaireSurveyResultsForParticipantsQueryVariables
  >(questionnaireSurveyResultsForParticipantsQuery, {
    variables: {questionnaireId, surveyId}
  })

  return {
    questionnaireSurveyResultsForParticipants: data?.questionnaireSurveyResultsForParticipants ?? [],
    questionnaireSurveyResultsForParticipantsLoading: loading
  }
}
