import {useMutation} from "@apollo/client"
import {Questionnaire} from "../../../../models"
import {Option} from "../../../../utils"
import {createEntityInCache} from "../../../cache"
import {
  DuplicateQuestionnaireMutation,
  DuplicateQuestionnaireMutationVariables
} from "../../../generated/DuplicateQuestionnaireMutation"
import {QuestionnairesQuery, QuestionnairesQueryVariables} from "../../../generated/QuestionnairesQuery"
import {duplicateQuestionnaireMutation} from "../../../mutations"
import {questionnairesQuery} from "../../../queries"

export interface DuplicateQuestionnaireProps {
  readonly duplicateQuestionnaire: (isRuntimeSurvey: boolean) => Promise<Option<Questionnaire>>
  readonly duplicateQuestionnaireLoading: boolean
}

export const useDuplicateQuestionnaire = (id: UUID): DuplicateQuestionnaireProps => {
  const [duplicateQuestionnaire, {loading}] = useMutation<
    DuplicateQuestionnaireMutation,
    DuplicateQuestionnaireMutationVariables
  >(duplicateQuestionnaireMutation)

  return {
    duplicateQuestionnaire: (isRuntimeSurvey: boolean) =>
      new Promise<Option<Questionnaire>>((resolve, reject) => {
        duplicateQuestionnaire({
          variables: {id},
          update: createEntityInCache<
            QuestionnairesQuery,
            DuplicateQuestionnaireMutation,
            QuestionnairesQueryVariables
          >(questionnairesQuery, "questionnaires", query => query.questionnaires, "duplicateQuestionnaire", {
            isRuntimeSurvey
          })
        })
          .then(result =>
            resolve(
              result.data && result.data.duplicateQuestionnaire
                ? Option.of<Questionnaire>(result.data.duplicateQuestionnaire)
                : Option.none<Questionnaire>()
            )
          )
          .catch(reject)
      }),
    duplicateQuestionnaireLoading: loading
  }
}
