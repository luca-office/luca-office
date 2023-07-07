import {useMutation} from "@apollo/client"
import {ReferenceBookChapterScenario} from "../../../../models"
import {Option} from "../../../../utils"
import {
  CreateReferenceBookChapterScenarioMutation,
  CreateReferenceBookChapterScenarioMutationVariables
} from "../../../generated/CreateReferenceBookChapterScenarioMutation"
import {ReferenceBookChapterScenarioId} from "../../../generated/globalTypes"
import {createReferenceBookScenarioMutation} from "../../../mutations"
import {referenceBookChaptersForScenarioQuery} from "../../../queries"

export interface CreateReferenceBookScenarioProps {
  readonly createReferenceBookScenario: (
    creation: ReferenceBookChapterScenarioId
  ) => Promise<Option<ReferenceBookChapterScenario>>
  readonly createReferenceBookScenarioLoading: boolean
}

export const useCreateReferenceBookScenario = (): CreateReferenceBookScenarioProps => {
  const [createReferenceBookScenario, {loading: createReferenceBookScenarioLoading}] = useMutation<
    CreateReferenceBookChapterScenarioMutation,
    CreateReferenceBookChapterScenarioMutationVariables
  >(createReferenceBookScenarioMutation)

  return {
    createReferenceBookScenario: (creation: ReferenceBookChapterScenarioId) =>
      new Promise<Option<ReferenceBookChapterScenario>>((resolve, reject) => {
        createReferenceBookScenario({
          variables: {creation},
          // cache update is not available here since backend indirectly updates project
          refetchQueries: [{query: referenceBookChaptersForScenarioQuery, variables: {scenarioId: creation.scenarioId}}]
        })
          .then(result =>
            resolve(
              result.data && result.data.createReferenceBookChapterScenario
                ? Option.of(result.data.createReferenceBookChapterScenario)
                : Option.none()
            )
          )
          .catch(reject)
      }),
    createReferenceBookScenarioLoading
  }
}
