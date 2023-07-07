import {useMutation} from "@apollo/client"
import {Questionnaire} from "../../../../models"
import {Option} from "../../../../utils"
import {updateIdEntityInCache} from "../../../cache"
import {QuestionnaireUpdate} from "../../../generated/globalTypes"
import {QuestionnairesQuery, QuestionnairesQueryVariables} from "../../../generated/QuestionnairesQuery"
import {
  UpdateQuestionnaireMutation,
  UpdateQuestionnaireMutationVariables
} from "../../../generated/UpdateQuestionnaireMutation"
import {updateQuestionnaireMutation} from "../../../mutations"
import {questionnairesQuery} from "../../../queries"

export interface UpdateQuestionnaireProps {
  readonly updateQuestionnaire: (update: QuestionnaireUpdate) => Promise<Option<Questionnaire>>
  readonly updateQuestionnaireLoading: boolean
}

export const useUpdateQuestionnaire = (id: UUID, isRuntimeSurvey: boolean): UpdateQuestionnaireProps => {
  const [updateQuestionnaire, {loading}] = useMutation<
    UpdateQuestionnaireMutation,
    UpdateQuestionnaireMutationVariables
  >(updateQuestionnaireMutation)

  return {
    updateQuestionnaire: (update: QuestionnaireUpdate) =>
      new Promise<Option<Questionnaire>>((resolve, reject) => {
        updateQuestionnaire({
          variables: {id: id, update},
          update: updateIdEntityInCache<
            QuestionnairesQuery,
            UpdateQuestionnaireMutation,
            Questionnaire,
            QuestionnairesQueryVariables
          >(questionnairesQuery, "questionnaires", id, "updateQuestionnaire", {
            isRuntimeSurvey
          })
        })
          .then(result =>
            resolve(
              result.data && result.data.updateQuestionnaire
                ? Option.of<Questionnaire>(result.data.updateQuestionnaire)
                : Option.none()
            )
          )
          .catch(reject)
      }),
    updateQuestionnaireLoading: loading
  }
}
