import {useMutation} from "@apollo/client"
import {QuestionnaireAnswer} from "../../../../models"
import {Option} from "../../../../utils"
import {
  CreateQuestionnaireAnswerMutation,
  CreateQuestionnaireAnswerMutationVariables
} from "../../../generated/CreateQuestionnaireAnswerMutation"
import {QuestionnaireAnswerCreation} from "../../../generated/globalTypes"
import {createQuestionnaireAnswerMutation} from "../../../mutations"
import {questionnaireQuestionQuery} from "../../../queries"

export interface CreateQuestionnaireAnswerProps {
  readonly createQuestionnaireAnswer: (creation: QuestionnaireAnswerCreation) => Promise<Option<QuestionnaireAnswer>>
  readonly createQuestionnaireAnswerLoading: boolean
}

export const useCreateQuestionnaireAnswer = (): CreateQuestionnaireAnswerProps => {
  const [createQuestionnaireAnswer, {loading}] = useMutation<
    CreateQuestionnaireAnswerMutation,
    CreateQuestionnaireAnswerMutationVariables
  >(createQuestionnaireAnswerMutation)

  return {
    createQuestionnaireAnswer: (creation: QuestionnaireAnswerCreation) =>
      new Promise<Option<QuestionnaireAnswer>>((resolve, reject) => {
        createQuestionnaireAnswer({
          variables: {creation},
          refetchQueries: [{query: questionnaireQuestionQuery, variables: {id: creation.questionId}}]
        })
          .then(result =>
            resolve(
              result.data && result.data.createQuestionnaireAnswer
                ? Option.of(result.data.createQuestionnaireAnswer)
                : Option.none()
            )
          )
          .catch(reject)
      }),
    createQuestionnaireAnswerLoading: loading
  }
}
