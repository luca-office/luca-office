import {useMutation} from "@apollo/client"
import {ArchiveEntityHook, ReferenceBookChapter} from "../../../../models"
import {Option} from "../../../../utils"
import {deleteEntityFromCache} from "../../../cache"
import {
  ArchiveReferenceBookChapterMutation,
  ArchiveReferenceBookChapterMutationVariables
} from "../../../generated/ArchiveReferenceBookChapterMutation"
import {ReferenceBookChaptersQuery} from "../../../generated/ReferenceBookChaptersQuery"
import {archiveReferenceBookChapterMutation} from "../../../mutations"
import {referenceBookChaptersQuery} from "../../../queries"

export const useArchiveReferenceBookChapter = (): ArchiveEntityHook => {
  const [archiveReferenceBookChapterHook, {loading}] = useMutation<
    ArchiveReferenceBookChapterMutation,
    ArchiveReferenceBookChapterMutationVariables
  >(archiveReferenceBookChapterMutation)

  return {
    archiveEntity: (id: UUID) =>
      new Promise<Option<ReferenceBookChapter>>((resolve, reject) => {
        archiveReferenceBookChapterHook({
          variables: {id},
          update: deleteEntityFromCache<
            ReferenceBookChaptersQuery,
            ArchiveReferenceBookChapterMutation,
            undefined,
            ReferenceBookChapter
          >(referenceBookChaptersQuery, "referenceBookChapters", referenceBookChapter => referenceBookChapter.id !== id)
        })
          .then(result => resolve(Option.of<ReferenceBookChapter>(result.data?.archiveReferenceBookChapter)))
          .catch(reject)
      }),
    archiveEntityLoading: loading
  }
}
