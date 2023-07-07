import {useMutation} from "@apollo/client"
import {ArchiveEntityHook, Questionnaire} from "../../../../models"
import {Option} from "../../../../utils"
import {deleteEntityFromCache} from "../../../cache"
import {
  ArchiveQuestionnaireMutation,
  ArchiveQuestionnaireMutationVariables
} from "../../../generated/ArchiveQuestionnaireMutation"
import {QuestionnairesQuery, QuestionnairesQueryVariables} from "../../../generated/QuestionnairesQuery"
import {archiveQuestionnaireMutation} from "../../../mutations"
import {questionnairesQuery} from "../../../queries"

export const useArchiveQuestionnaire = (isRuntimeSurvey: boolean): ArchiveEntityHook => {
  const [archiveQuestionnaireHook, {loading}] = useMutation<
    ArchiveQuestionnaireMutation,
    ArchiveQuestionnaireMutationVariables
  >(archiveQuestionnaireMutation)

  return {
    archiveEntity: (id: UUID) =>
      new Promise<Option<Questionnaire>>((resolve, reject) => {
        archiveQuestionnaireHook({
          variables: {id},
          update: deleteEntityFromCache<
            QuestionnairesQuery,
            ArchiveQuestionnaireMutation,
            QuestionnairesQueryVariables,
            Questionnaire
          >(questionnairesQuery, "questionnaires", questionnaire => questionnaire.id !== id, {isRuntimeSurvey})
        })
          .then(result => resolve(Option.of<Questionnaire>(result.data?.archiveQuestionnaire)))
          .catch(reject)
      }),
    archiveEntityLoading: loading
  }
}
