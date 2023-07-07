import {useMutation} from "@apollo/client"
import {DeleteEntityHook} from "../../../../models"
import {deleteIdEntityFromCache} from "../../../cache/updates"
import {
  DeleteReferenceBookChapterMutation,
  DeleteReferenceBookChapterMutationVariables
} from "../../../generated/DeleteReferenceBookChapterMutation"
import {ReferenceBookChapterFragment} from "../../../generated/ReferenceBookChapterFragment"
import {ReferenceBookChaptersQuery} from "../../../generated/ReferenceBookChaptersQuery"
import {deleteReferenceBookMutation} from "../../../mutations/reference-book-chapter"
import {referenceBookChaptersQuery} from "../../../queries"

export const useDeleteReferenceBookChapter = (): DeleteEntityHook => {
  const [deleteReferenceBook, {loading}] = useMutation<
    DeleteReferenceBookChapterMutation,
    DeleteReferenceBookChapterMutationVariables
  >(deleteReferenceBookMutation)

  return {
    deleteEntity: (id: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteReferenceBook({
          variables: {id},
          update: deleteIdEntityFromCache<
            ReferenceBookChaptersQuery,
            DeleteReferenceBookChapterMutation,
            unknown,
            ReferenceBookChapterFragment
          >(referenceBookChaptersQuery, "referenceBookChapters", id)
        })
          .then(() => resolve())
          .catch(reject)
      }),
    deleteEntityLoading: loading
  }
}
