import {useMutation} from "@apollo/client"
import {QuestionnaireAnswer} from "../../../../models"
import {Option} from "../../../../utils"
import {
  RepositionQuestionnaireAnswerMutation,
  RepositionQuestionnaireAnswerMutationVariables
} from "../../../generated/RepositionQuestionnaireAnswerMutation"
import {repositionQuestionnaireAnswerMutation} from "../../../mutations"
import {questionnaireQuestionQuery} from "../../../queries"

export interface UseRepositionQuestionnaireAnswerProps {
  readonly repositionQuestionnaireAnswer: (id: UUID, predecessorId?: UUID) => Promise<Option<QuestionnaireAnswer>>
  readonly repositionQuestionnaireAnswerLoading: boolean
}

export const useRepositionQuestionnaireAnswer = (questionId: UUID): UseRepositionQuestionnaireAnswerProps => {
  const [repositionQuestionnaireAnswer, {loading}] = useMutation<
    RepositionQuestionnaireAnswerMutation,
    RepositionQuestionnaireAnswerMutationVariables
  >(repositionQuestionnaireAnswerMutation)

  return {
    repositionQuestionnaireAnswer: (id: UUID, predecessorId?: UUID) =>
      new Promise<Option<QuestionnaireAnswer>>((resolve, reject) => {
        repositionQuestionnaireAnswer({
          variables: {id, predecessorId},
          refetchQueries: [{query: questionnaireQuestionQuery, variables: {id: questionId}}]
        })
          .then(result =>
            resolve(
              result.data && result.data.repositionQuestionnaireAnswer
                ? Option.of(result.data.repositionQuestionnaireAnswer)
                : Option.none()
            )
          )
          .catch(reject)
      }),
    repositionQuestionnaireAnswerLoading: loading
  }
}
