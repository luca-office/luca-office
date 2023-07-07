import {useMutation} from "@apollo/client"
import {ReferenceBookChapter} from "../../../../models"
import {Option} from "../../../../utils"
import {createEntityInCache} from "../../../cache/updates"
import {
  CreateReferenceBookChapterMutation,
  CreateReferenceBookChapterMutationVariables
} from "../../../generated/CreateReferenceBookChapterMutation"
import {ReferenceBookChapterCreation} from "../../../generated/globalTypes"
import {ReferenceBookChaptersQuery} from "../../../generated/ReferenceBookChaptersQuery"
import {createReferenceBookChapterMutation} from "../../../mutations/reference-book-chapter"
import {referenceBookChaptersQuery} from "../../../queries"

export interface CreateReferenceBookProps {
  readonly createReferenceBook: (creation: ReferenceBookChapterCreation) => Promise<Option<ReferenceBookChapter>>
  readonly createReferenceBookLoading: boolean
}

export const useCreateReferenceBookChapter = (): CreateReferenceBookProps => {
  const [createReferenceBook, {loading}] = useMutation<
    CreateReferenceBookChapterMutation,
    CreateReferenceBookChapterMutationVariables
  >(createReferenceBookChapterMutation)

  return {
    createReferenceBook: (creation: ReferenceBookChapterCreation) =>
      new Promise<Option<ReferenceBookChapter>>((resolve, reject) => {
        createReferenceBook({
          variables: {creation},
          update: createEntityInCache<ReferenceBookChaptersQuery, CreateReferenceBookChapterMutation>(
            referenceBookChaptersQuery,
            "referenceBookChapters",
            query => query.referenceBookChapters,
            "createReferenceBookChapter"
          )
        })
          .then(result => resolve(Option.of<ReferenceBookChapter>(result?.data?.createReferenceBookChapter)))
          .catch(reject)
      }),
    createReferenceBookLoading: loading
  }
}
