import {useMutation} from "@apollo/client"
import {surveyQuery} from "shared/graphql/queries"
import {Option} from "shared/utils"
import {EndSurveyMutation, EndSurveyMutationVariables} from "../../../generated/EndSurveyMutation"
import {endSurveyMutation} from "../../../mutations"

export interface UseEndSurveyHook {
  readonly endSurvey: (id: UUID) => Promise<Option<string>>
  readonly endSurveyLoading: boolean
}

export const useEndSurvey = (): UseEndSurveyHook => {
  const [endSurvey, {loading}] = useMutation<EndSurveyMutation, EndSurveyMutationVariables>(endSurveyMutation)

  return {
    endSurvey: (id: UUID) =>
      new Promise<Option<string>>((resolve, reject) => {
        endSurvey({
          variables: {surveyId: id},
          awaitRefetchQueries: true,
          refetchQueries: [{query: surveyQuery, variables: {id}}]
        })
          .then(result => resolve(Option.of(result.data?.endSurvey)))
          .catch(reject)
      }),
    endSurveyLoading: loading
  }
}
