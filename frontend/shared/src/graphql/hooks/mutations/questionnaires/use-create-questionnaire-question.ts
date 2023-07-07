import {useMutation} from "@apollo/client"
import {QuestionnaireQuestion} from "../../../../models"
import {Option} from "../../../../utils"
import {
  CreateQuestionnaireQuestionMutation,
  CreateQuestionnaireQuestionMutationVariables
} from "../../../generated/CreateQuestionnaireQuestionMutation"
import {QuestionnaireQuestionCreation} from "../../../generated/globalTypes"
import {createQuestionnaireQuestionMutation} from "../../../mutations"
import {questionnaireQuery} from "../../../queries"

export interface CreateQuestionnaireQuestionProps {
  readonly createQuestionnaireQuestion: (
    creation: QuestionnaireQuestionCreation
  ) => Promise<Option<QuestionnaireQuestion>>
  readonly createQuestionnaireQuestionLoading: boolean
}

export const useCreateQuestionnaireQuestion = (): CreateQuestionnaireQuestionProps => {
  const [createQuestionnaireQuestion, {loading}] = useMutation<
    CreateQuestionnaireQuestionMutation,
    CreateQuestionnaireQuestionMutationVariables
  >(createQuestionnaireQuestionMutation)

  return {
    createQuestionnaireQuestion: (creation: QuestionnaireQuestionCreation) =>
      new Promise<Option<QuestionnaireQuestion>>((resolve, reject) => {
        createQuestionnaireQuestion({
          variables: {creation},
          refetchQueries: [{query: questionnaireQuery, variables: {id: creation.questionnaireId}}]
        })
          .then(result =>
            result.data && result.data.createQuestionnaireQuestion
              ? resolve(Option.of(result.data.createQuestionnaireQuestion))
              : resolve(Option.none())
          )
          .catch(reject)
      }),
    createQuestionnaireQuestionLoading: loading
  }
}
