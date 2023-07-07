import {useMutation} from "@apollo/client"
import {QuestionnaireAnswer} from "../../../../models"
import {Option} from "../../../../utils"
import {QuestionnaireAnswerUpdate} from "../../../generated/globalTypes"
import {
  UpdateQuestionnaireAnswerMutation,
  UpdateQuestionnaireAnswerMutationVariables
} from "../../../generated/UpdateQuestionnaireAnswerMutation"
import {updateQuestionnaireAnswerMutation} from "../../../mutations"
import {questionnaireQuestionQuery} from "../../../queries"

export interface UpdateQuestionnaireAnswerProps {
  readonly updateQuestionnaireAnswer: (
    answerId: UUID,
    update: QuestionnaireAnswerUpdate
  ) => Promise<Option<QuestionnaireAnswer>>
  readonly updateQuestionnaireAnswerLoading: boolean
}

export const useUpdateQuestionnaireAnswer = (questionId: UUID): UpdateQuestionnaireAnswerProps => {
  const [updateQuestionnaireAnswer, {loading}] = useMutation<
    UpdateQuestionnaireAnswerMutation,
    UpdateQuestionnaireAnswerMutationVariables
  >(updateQuestionnaireAnswerMutation)

  return {
    updateQuestionnaireAnswer: (answerId: UUID, update: QuestionnaireAnswerUpdate) =>
      new Promise<Option<QuestionnaireAnswer>>((resolve, reject) => {
        updateQuestionnaireAnswer({
          variables: {id: answerId, update},
          refetchQueries: [{query: questionnaireQuestionQuery, variables: {id: questionId}}]
        })
          .then(result =>
            resolve(
              result.data && result.data.updateQuestionnaireAnswer
                ? Option.of(result.data.updateQuestionnaireAnswer)
                : Option.none()
            )
          )
          .catch(reject)
      }),
    updateQuestionnaireAnswerLoading: loading
  }
}
