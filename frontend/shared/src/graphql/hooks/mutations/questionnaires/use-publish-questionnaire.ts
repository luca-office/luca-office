import {useMutation} from "@apollo/client"
import {Questionnaire} from "../../../../models"
import {Option} from "../../../../utils"
import {
  PublishQuestionnaireMutation,
  PublishQuestionnaireMutationVariables
} from "../../../generated/PublishQuestionnaireMutation"
import {publishQuestionnaireMutation} from "../../../mutations"

export interface UsePublishQuestionnaireHook {
  readonly publishQuestionnaire: (id: UUID) => Promise<Option<Questionnaire>>
  readonly isPublishQuestionnaireLoading: boolean
}

export const usePublishQuestionnaire = (): UsePublishQuestionnaireHook => {
  const [publishQuestionnaire, {loading}] = useMutation<
    PublishQuestionnaireMutation,
    PublishQuestionnaireMutationVariables
  >(publishQuestionnaireMutation)

  return {
    publishQuestionnaire: (id: UUID) =>
      new Promise<Option<Questionnaire>>((resolve, reject) => {
        publishQuestionnaire({
          variables: {id}
        })
          .then(result => resolve(Option.of<Questionnaire>(result.data?.publishQuestionnaire)))
          .catch(reject)
      }),
    isPublishQuestionnaireLoading: loading
  }
}
