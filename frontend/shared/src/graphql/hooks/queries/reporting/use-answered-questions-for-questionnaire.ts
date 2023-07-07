import {useQuery} from "@apollo/client"
import {Option} from "../../../../utils"
import {
  AnsweredQuestionsForQuestionnaireQuery,
  AnsweredQuestionsForQuestionnaireQueryVariables
} from "../../../generated/AnsweredQuestionsForQuestionnaireQuery"
import {answeredQuestionsForQuestionnaireQuery} from "../../../queries"

export interface UseAnsweredQuestionsForQuestionnaireHook {
  readonly answeredQuestionsForQuestionnaire: Option<string[]>
  readonly answeredQuestionsForQuestionnaireLoading: boolean
}

export const useAnsweredQuestionsForQuestionnaire = (
  questionnaireId: UUID,
  surveyInvitationId: UUID,
  pollingRateInMillis?: number
): UseAnsweredQuestionsForQuestionnaireHook => {
  const {data, loading} = useQuery<
    AnsweredQuestionsForQuestionnaireQuery,
    AnsweredQuestionsForQuestionnaireQueryVariables
  >(answeredQuestionsForQuestionnaireQuery, {
    variables: {
      questionnaireId,
      surveyInvitationId
    },
    pollInterval: pollingRateInMillis
  })
  return {
    answeredQuestionsForQuestionnaire: Option.of(data?.answeredQuestionsForQuestionnaire),
    answeredQuestionsForQuestionnaireLoading: loading
  }
}
