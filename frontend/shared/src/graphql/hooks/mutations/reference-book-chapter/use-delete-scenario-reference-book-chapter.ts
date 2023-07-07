import {useMutation} from "@apollo/client"
import {DeleteEntityHook} from "../../../../models"
import {
  DeleteReferenceBookChapterScenarioMutation,
  DeleteReferenceBookChapterScenarioMutationVariables
} from "../../../generated/DeleteReferenceBookChapterScenarioMutation"
import {deleteScenarioReferenceBookMutation} from "../../../mutations"
import {referenceBookChaptersForScenarioQuery} from "../../../queries"

export const useDeleteScenarioReferenceBookChapter = (scenarioId: UUID): DeleteEntityHook => {
  const [deleteScenarioReferenceBook, {loading}] = useMutation<
    DeleteReferenceBookChapterScenarioMutation,
    DeleteReferenceBookChapterScenarioMutationVariables
  >(deleteScenarioReferenceBookMutation)

  return {
    deleteEntity: (referenceBookChapterId: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteScenarioReferenceBook({
          variables: {id: {referenceBookChapterId, scenarioId}},
          refetchQueries: [{query: referenceBookChaptersForScenarioQuery, variables: {scenarioId}}]
        })
          .then(() => resolve())
          .catch(reject)
      }),
    deleteEntityLoading: loading
  }
}
