import {useMutation} from "@apollo/client"
import {latestStartedProjectModuleQuery} from "shared/graphql/queries"
import {Option} from "shared/utils"
import {startQuestionnaireMutation} from "../../../../graphql/mutations"
import {
  StartQuestionnaireMutation,
  StartQuestionnaireMutationVariables
} from "../../../generated/StartQuestionnaireMutation"

export interface UseStartQuestionnaireHook {
  readonly startQuestionnaire: (questionnaireId: UUID, surveyId: UUID) => Promise<Option<string>>
  readonly startQuestionnaireLoading: boolean
}

export const useStartQuestionnaire = (): UseStartQuestionnaireHook => {
  const [startQuestionnaire, {loading}] = useMutation<StartQuestionnaireMutation, StartQuestionnaireMutationVariables>(
    startQuestionnaireMutation
  )

  return {
    startQuestionnaire: (questionnaireId: UUID, surveyId: UUID) =>
      new Promise<Option<string>>((resolve, reject) => {
        startQuestionnaire({
          variables: {questionnaireId, surveyId},
          refetchQueries: [{query: latestStartedProjectModuleQuery, variables: {surveyId}}]
        })
          .then(result => resolve(Option.of(result.data?.startQuestionnaire)))
          .catch(reject)
      }),
    startQuestionnaireLoading: loading
  }
}
