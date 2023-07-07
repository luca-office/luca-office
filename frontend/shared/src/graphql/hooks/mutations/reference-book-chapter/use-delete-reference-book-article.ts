import {useMutation} from "@apollo/client"
import {DeleteEntityHook} from "../../../../models"
import {
  DeleteReferenceBookArticleMutation,
  DeleteReferenceBookArticleMutationVariables
} from "../../../generated/DeleteReferenceBookArticleMutation"
import {deleteReferenceBookArticleMutation} from "../../../mutations/reference-book-chapter"
import {referenceBookChapterQuery} from "../../../queries"

export const useDeleteReferenceBookArticle = (referenceBookChapterId: UUID): DeleteEntityHook => {
  const [deleteReferenceBookArticle, {loading}] = useMutation<
    DeleteReferenceBookArticleMutation,
    DeleteReferenceBookArticleMutationVariables
  >(deleteReferenceBookArticleMutation)

  return {
    deleteEntity: (id: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteReferenceBookArticle({
          variables: {id},
          refetchQueries: [{query: referenceBookChapterQuery, variables: {id: referenceBookChapterId}}]
        })
          .then(() => resolve())
          .catch(reject)
      }),
    deleteEntityLoading: loading
  }
}
