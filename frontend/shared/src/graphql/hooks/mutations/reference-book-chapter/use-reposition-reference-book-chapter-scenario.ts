import {useMutation} from "@apollo/client"
import {ReferenceBookChapterScenario} from "../../../../models"
import {Option} from "../../../../utils"
import {ReferenceBookChapterScenarioId} from "../../../generated/globalTypes"
import {
  RepositionReferenceBookChapterScenarioMutation,
  RepositionReferenceBookChapterScenarioMutationVariables
} from "../../../generated/RepositionReferenceBookChapterScenarioMutation"
import {repositionReferenceBookScenarioMutation} from "../../../mutations/reference-book-chapter"
import {referenceBookChaptersForScenarioQuery} from "../../../queries"

export interface UseRepositionReferenceBookScenarioProps {
  readonly repositionReferenceBookScenario: (
    id: ReferenceBookChapterScenarioId,
    predecessorId?: ReferenceBookChapterScenarioId
  ) => Promise<Option<ReferenceBookChapterScenario>>
  readonly repositionReferenceBookScenarioLoading: boolean
}

export const useRepositionReferenceBookChapterScenario = (
  scenarioId: UUID
): UseRepositionReferenceBookScenarioProps => {
  const [repositionReferenceBookScenario, {loading}] = useMutation<
    RepositionReferenceBookChapterScenarioMutation,
    RepositionReferenceBookChapterScenarioMutationVariables
  >(repositionReferenceBookScenarioMutation)

  return {
    repositionReferenceBookScenario: (
      id: ReferenceBookChapterScenarioId,
      predecessorId?: ReferenceBookChapterScenarioId
    ) =>
      new Promise<Option<ReferenceBookChapterScenario>>((resolve, reject) => {
        repositionReferenceBookScenario({
          variables: {id, predecessorId},
          refetchQueries: [{query: referenceBookChaptersForScenarioQuery, variables: {scenarioId}}]
        })
          .then(result => resolve(Option.of(result.data?.repositionReferenceBookChapterScenario)))
          .catch(reject)
      }),
    repositionReferenceBookScenarioLoading: loading
  }
}
