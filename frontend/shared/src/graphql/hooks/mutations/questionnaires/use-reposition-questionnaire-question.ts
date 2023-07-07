import {useMutation} from "@apollo/client"
import {QuestionnaireQuestion} from "../../../../models"
import {Option} from "../../../../utils"
import {
  RepositionQuestionnaireQuestionMutation,
  RepositionQuestionnaireQuestionMutationVariables
} from "../../../generated/RepositionQuestionnaireQuestionMutation"
import {repositionQuestionnaireQuestionMutation} from "../../../mutations"
import {questionnaireQuery} from "../../../queries"

export interface UseRepositionQuestionnaireQuestionProps {
  readonly repositionQuestionnaireQuestion: (id: UUID, predecessorId?: UUID) => Promise<Option<QuestionnaireQuestion>>
  readonly repositionQuestionnaireQuestionLoading: boolean
}

export const useRepositionQuestionnaireQuestion = (questionnaireId: UUID): UseRepositionQuestionnaireQuestionProps => {
  const [repositionQuestionnaireQuestion, {loading}] = useMutation<
    RepositionQuestionnaireQuestionMutation,
    RepositionQuestionnaireQuestionMutationVariables
  >(repositionQuestionnaireQuestionMutation)

  return {
    repositionQuestionnaireQuestion: (id: UUID, predecessorId?: UUID) =>
      new Promise<Option<QuestionnaireQuestion>>((resolve, reject) => {
        repositionQuestionnaireQuestion({
          variables: {id, predecessorId},
          refetchQueries: [{query: questionnaireQuery, variables: {id: questionnaireId}}]
        })
          .then(result =>
            resolve(
              result.data && result.data.repositionQuestionnaireQuestion
                ? Option.of(result.data.repositionQuestionnaireQuestion)
                : Option.none()
            )
          )
          .catch(reject)
      }),
    repositionQuestionnaireQuestionLoading: loading
  }
}
