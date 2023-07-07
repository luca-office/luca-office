import {useMutation} from "@apollo/client"
import {QuestionnaireQuestion} from "../../../../models"
import {Option} from "../../../../utils"
import {QuestionnaireQuestionUpdate} from "../../../generated/globalTypes"
import {
  UpdateQuestionnaireQuestionMutation,
  UpdateQuestionnaireQuestionMutationVariables
} from "../../../generated/UpdateQuestionnaireQuestionMutation"
import {updateQuestionnaireQuestionMutation} from "../../../mutations"

export interface UpdateQuestionnaireQuestionProps {
  readonly updateQuestionnaireQuestion: (update: QuestionnaireQuestionUpdate) => Promise<Option<QuestionnaireQuestion>>
  readonly updateQuestionnaireQuestionLoading: boolean
}

export const useUpdateQuestionnaireQuestion = (id: UUID): UpdateQuestionnaireQuestionProps => {
  const [updateQuestionnaireQuestion, {loading}] = useMutation<
    UpdateQuestionnaireQuestionMutation,
    UpdateQuestionnaireQuestionMutationVariables
  >(updateQuestionnaireQuestionMutation)

  return {
    updateQuestionnaireQuestion: (update: QuestionnaireQuestionUpdate) =>
      new Promise<Option<QuestionnaireQuestion>>((resolve, reject) => {
        updateQuestionnaireQuestion({
          variables: {id, update}
        })
          .then(result =>
            resolve(
              result.data && result.data.updateQuestionnaireQuestion
                ? Option.of(result.data.updateQuestionnaireQuestion)
                : Option.none()
            )
          )
          .catch(reject)
      }),
    updateQuestionnaireQuestionLoading: loading
  }
}
