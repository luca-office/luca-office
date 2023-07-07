import {useMutation} from "@apollo/client"
import {latestStartedProjectModuleQuery, surveyQuery} from "shared/graphql/queries"
import {Option} from "shared/utils"
import {StartSurveyMutation, StartSurveyMutationVariables} from "../../../generated/StartSurveyMutation"
import {startSurveyMutation} from "../../../mutations"

export interface UseStartSurveyHook {
  readonly startSurvey: (id: UUID) => Promise<Option<string>>
  readonly startSurveyLoading: boolean
}

export const useStartSurvey = (): UseStartSurveyHook => {
  const [startSurvey, {loading}] = useMutation<StartSurveyMutation, StartSurveyMutationVariables>(startSurveyMutation)

  return {
    startSurvey: (id: UUID) =>
      new Promise<Option<string>>((resolve, reject) => {
        startSurvey({
          variables: {surveyId: id},
          refetchQueries: [
            {query: latestStartedProjectModuleQuery, variables: {surveyId: id}},
            {query: surveyQuery, variables: {id}}
          ]
        })
          .then(result => resolve(Option.of(result.data?.startSurvey)))
          .catch(reject)
      }),
    startSurveyLoading: loading
  }
}
