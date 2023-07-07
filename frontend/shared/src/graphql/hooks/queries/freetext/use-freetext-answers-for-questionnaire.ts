import {useQuery} from "@apollo/client"
import {FreetextAnswerFragment} from "../../../generated/FreetextAnswerFragment"
import {FreetextAnswersForQuestionnaireQuery} from "../../../generated/FreetextAnswersForQuestionnaireQuery"
import {freetextAnswersForQuestionnaireQuery} from "../../../queries"

export interface UseFreetextAnswersForQuestionnaire {
  readonly freetextAnswersForQuestionnaire: Array<FreetextAnswerFragment>
  readonly freetextAnswersForQuestionnaireLoading: boolean
}

export const useFreetextAnswersForQuestionnaire = (
  questionnaireId: UUID,
  surveyId: UUID
): UseFreetextAnswersForQuestionnaire => {
  const {data, loading} = useQuery<FreetextAnswersForQuestionnaireQuery>(freetextAnswersForQuestionnaireQuery, {
    variables: {questionnaireId, surveyId}
  })

  return {
    freetextAnswersForQuestionnaire: data?.freetextAnswersForQuestionnaire ?? [],
    freetextAnswersForQuestionnaireLoading: loading
  }
}
