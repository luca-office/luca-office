import {useMutation} from "@apollo/client"
import {Questionnaire} from "../../../../models"
import {Option} from "../../../../utils"
import {
  CreateQuestionnaireMutation,
  CreateQuestionnaireMutationVariables
} from "../../../generated/CreateQuestionnaireMutation"
import {QuestionnaireCreation} from "../../../generated/globalTypes"
import {createQuestionnaireMutation} from "../../../mutations"
import {questionnairesQuery} from "../../../queries"

export interface CreateQuestionnaireProps {
  readonly createQuestionnaire: (creation: QuestionnaireCreation) => Promise<Option<Questionnaire>>
  readonly createQuestionnaireLoading: boolean
}

export const useCreateQuestionnaire = (isRuntimeSurvey: boolean): CreateQuestionnaireProps => {
  const [createQuestionnaire, {loading}] = useMutation<
    CreateQuestionnaireMutation,
    CreateQuestionnaireMutationVariables
  >(createQuestionnaireMutation)

  return {
    createQuestionnaire: (creation: QuestionnaireCreation) =>
      new Promise<Option<Questionnaire>>((resolve, reject) => {
        createQuestionnaire({
          variables: {creation},
          refetchQueries: [{query: questionnairesQuery, variables: {isRuntimeSurvey}}]
        })
          .then(result =>
            resolve(
              result.data && result.data.createQuestionnaire
                ? Option.of<Questionnaire>(result.data.createQuestionnaire)
                : Option.none()
            )
          )
          .catch(reject)
      }),
    createQuestionnaireLoading: loading
  }
}
