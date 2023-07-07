import {PureQueryOptions, useMutation} from "@apollo/client"
import {DocumentViewScenarioCodingAutomatedCriterion} from "../../../../../models"
import {Option} from "../../../../../utils"
import {
  CreateDocumentViewScenarioCodingAutomatedCriterionMutation,
  CreateDocumentViewScenarioCodingAutomatedCriterionMutationVariables
} from "../../../../generated/CreateDocumentViewScenarioCodingAutomatedCriterionMutation"
import {DocumentViewScenarioCodingAutomatedCriterionCreation} from "../../../../generated/globalTypes"
import {createDocumentViewScenarioCodingAutomatedCriterionMutation} from "../../../../mutations"

export interface UseCreateDocumentViewScenarioCodingAutomatedCriterionHook {
  readonly createDocumentViewScenarioCodingAutomatedCriterion: (
    creation: DocumentViewScenarioCodingAutomatedCriterionCreation
  ) => Promise<Option<DocumentViewScenarioCodingAutomatedCriterion>>
  readonly createDocumentViewScenarioCodingAutomatedCriterionLoading: boolean
}

export const useCreateDocumentViewScenarioCodingAutomatedCriterion = (
  refetchQueries?: PureQueryOptions[]
): UseCreateDocumentViewScenarioCodingAutomatedCriterionHook => {
  const [createDocumentViewScenarioCodingAutomatedCriterion, {loading}] = useMutation<
    CreateDocumentViewScenarioCodingAutomatedCriterionMutation,
    CreateDocumentViewScenarioCodingAutomatedCriterionMutationVariables
  >(createDocumentViewScenarioCodingAutomatedCriterionMutation, {refetchQueries})

  return {
    createDocumentViewScenarioCodingAutomatedCriterion: (
      creation: DocumentViewScenarioCodingAutomatedCriterionCreation
    ) =>
      new Promise<Option<DocumentViewScenarioCodingAutomatedCriterion>>((resolve, reject) => {
        createDocumentViewScenarioCodingAutomatedCriterion({
          variables: {creation}
        })
          .then(result =>
            resolve(
              Option.of(
                result?.data
                  ?.createDocumentViewScenarioCodingAutomatedCriterion as DocumentViewScenarioCodingAutomatedCriterion
              )
            )
          )
          .catch(reject)
      }),
    createDocumentViewScenarioCodingAutomatedCriterionLoading: loading
  }
}
