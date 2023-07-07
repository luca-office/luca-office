import {useMutation} from "@apollo/client"
import {ReferenceBookChapter} from "../../../../models"
import {Option} from "../../../../utils"
import {createEntityInCache} from "../../../cache/updates"
import {
  DuplicateReferenceBookChapterMutation,
  DuplicateReferenceBookChapterMutationVariables
} from "../../../generated/DuplicateReferenceBookChapterMutation"
import {ReferenceBookChaptersQuery} from "../../../generated/ReferenceBookChaptersQuery"
import {duplicateReferenceBookMutation} from "../../../mutations"
import {referenceBookChaptersQuery} from "../../../queries"

export interface DuplicateReferenceBookProps {
  readonly duplicateReferenceBook: (id: UUID) => Promise<Option<ReferenceBookChapter>>
  readonly duplicateReferenceBookLoading: boolean
}

export const useDuplicateReferenceBookChapter = (): DuplicateReferenceBookProps => {
  const [duplicateReferenceBook, {loading}] = useMutation<
    DuplicateReferenceBookChapterMutation,
    DuplicateReferenceBookChapterMutationVariables
  >(duplicateReferenceBookMutation)

  return {
    duplicateReferenceBook: (id: UUID) =>
      new Promise<Option<ReferenceBookChapter>>((resolve, reject) => {
        duplicateReferenceBook({
          variables: {id},
          update: createEntityInCache<ReferenceBookChaptersQuery, DuplicateReferenceBookChapterMutation>(
            referenceBookChaptersQuery,
            "referenceBookChapters",
            query => query.referenceBookChapters,
            "duplicateReferenceBookChapter"
          )
        })
          .then(result =>
            resolve(
              result.data && result.data.duplicateReferenceBookChapter
                ? Option.of(result.data.duplicateReferenceBookChapter)
                : Option.none()
            )
          )
          .catch(reject)
      }),
    duplicateReferenceBookLoading: loading
  }
}
