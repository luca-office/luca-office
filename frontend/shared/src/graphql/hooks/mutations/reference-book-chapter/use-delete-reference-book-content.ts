import {useMutation} from "@apollo/client"
import {DeleteEntityHook} from "../../../../models"
import {
  DeleteReferenceBookContentMutation,
  DeleteReferenceBookContentMutationVariables
} from "../../../generated/DeleteReferenceBookContentMutation"
import {deleteReferenceBookContentMutation} from "../../../mutations/reference-book-chapter"
import {referenceBookChapterQuery} from "../../../queries"

export const useDeleteReferenceBookContent = (referenceBookChapterId: UUID): DeleteEntityHook => {
  const [deleteReferenceBookContent, {loading}] = useMutation<
    DeleteReferenceBookContentMutation,
    DeleteReferenceBookContentMutationVariables
  >(deleteReferenceBookContentMutation)

  return {
    deleteEntity: (id: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteReferenceBookContent({
          variables: {id},
          refetchQueries: [{query: referenceBookChapterQuery, variables: {id: referenceBookChapterId}}]
        })
          .then(() => resolve())
          .catch(reject)
      }),
    deleteEntityLoading: loading
  }
}
