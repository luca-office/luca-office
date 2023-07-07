import {PureQueryOptions, useMutation} from "@apollo/client"
import {DocumentViewScenarioCodingAutomatedCriterion} from "../../../../../models"
import {Option} from "../../../../../utils"
import {DocumentViewScenarioCodingAutomatedCriterionUpdate} from "../../../../generated/globalTypes"
import {
  UpdateDocumentViewScenarioCodingAutomatedCriterionMutation,
  UpdateDocumentViewScenarioCodingAutomatedCriterionMutationVariables
} from "../../../../generated/UpdateDocumentViewScenarioCodingAutomatedCriterionMutation"
import {updateDocumentViewScenarioCodingAutomatedCriterionMutation} from "../../../../mutations"

export interface UseUpdateDocumentViewScenarioCodingAutomatedCriterionHook {
  readonly updateDocumentViewScenarioCodingAutomatedCriterion: (
    id: UUID,
    update: DocumentViewScenarioCodingAutomatedCriterionUpdate
  ) => Promise<Option<DocumentViewScenarioCodingAutomatedCriterion>>
  readonly updateDocumentViewScenarioCodingAutomatedCriterionLoading: boolean
}

export const useUpdateDocumentViewScenarioCodingAutomatedCriterion = (
  refetchQueries?: PureQueryOptions[]
): UseUpdateDocumentViewScenarioCodingAutomatedCriterionHook => {
  const [updateDocumentViewScenarioCodingAutomatedCriterion, {loading}] = useMutation<
    UpdateDocumentViewScenarioCodingAutomatedCriterionMutation,
    UpdateDocumentViewScenarioCodingAutomatedCriterionMutationVariables
  >(updateDocumentViewScenarioCodingAutomatedCriterionMutation, {refetchQueries})

  return {
    updateDocumentViewScenarioCodingAutomatedCriterion: (
      id: UUID,
      update: DocumentViewScenarioCodingAutomatedCriterionUpdate
    ) =>
      new Promise<Option<DocumentViewScenarioCodingAutomatedCriterion>>((resolve, reject) => {
        updateDocumentViewScenarioCodingAutomatedCriterion({
          variables: {id, update}
        })
          .then(result =>
            resolve(
              Option.of<DocumentViewScenarioCodingAutomatedCriterion>(
                result?.data
                  ?.updateDocumentViewScenarioCodingAutomatedCriterion as DocumentViewScenarioCodingAutomatedCriterion
              )
            )
          )
          .catch(reject)
      }),
    updateDocumentViewScenarioCodingAutomatedCriterionLoading: loading
  }
}
