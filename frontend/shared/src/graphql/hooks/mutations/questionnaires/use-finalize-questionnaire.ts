import {useMutation} from "@apollo/client"
import {Questionnaire} from "../../../../models"
import {Option} from "../../../../utils"
import {updateIdEntityInCache} from "../../../cache"
import {
  FinalizeQuestionnaireMutation,
  FinalizeQuestionnaireMutationVariables
} from "../../../generated/FinalizeQuestionnaireMutation"
import {QuestionnairesQuery, QuestionnairesQueryVariables} from "../../../generated/QuestionnairesQuery"
import {finalizeQuestionnaireMutation} from "../../../mutations"
import {questionnairesQuery} from "../../../queries"

export interface FinalizeQuestionnaireProps {
  readonly finalizeQuestionnaire: () => Promise<Option<Questionnaire>>
  readonly finalizeQuestionnaireLoading: boolean
}

export const useFinalizeQuestionnaire = (id: UUID, isRuntimeSurvey: boolean): FinalizeQuestionnaireProps => {
  const [finalizeQuestionnaire, {loading}] = useMutation<
    FinalizeQuestionnaireMutation,
    FinalizeQuestionnaireMutationVariables
  >(finalizeQuestionnaireMutation)

  return {
    finalizeQuestionnaire: () =>
      new Promise<Option<Questionnaire>>((resolve, reject) => {
        finalizeQuestionnaire({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          variables: {id: id!},
          update: updateIdEntityInCache<
            QuestionnairesQuery,
            FinalizeQuestionnaireMutation,
            Questionnaire,
            QuestionnairesQueryVariables
          >(questionnairesQuery, "questionnaires", id, "finalizeQuestionnaire", {isRuntimeSurvey})
        })
          .then(result =>
            resolve(
              result.data && result.data.finalizeQuestionnaire
                ? Option.of<Questionnaire>(result.data.finalizeQuestionnaire)
                : Option.none()
            )
          )
          .catch(reject)
      }),
    finalizeQuestionnaireLoading: loading
  }
}
