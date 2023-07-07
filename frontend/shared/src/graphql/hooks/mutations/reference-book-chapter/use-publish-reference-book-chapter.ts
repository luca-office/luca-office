import {useMutation} from "@apollo/client"
import {ReferenceBookChapter} from "../../../../models"
import {handleApolloCacheUpdate, Option} from "../../../../utils"
import {
  PublishReferenceBookChapterMutation,
  PublishReferenceBookChapterMutationVariables
} from "../../../generated/PublishReferenceBookChapterMutation"
import {
  ReferenceBookChapterQuery,
  ReferenceBookChapterQueryVariables
} from "../../../generated/ReferenceBookChapterQuery"
import {publishReferenceBookChapterMutation} from "../../../mutations"
import {referenceBookChapterQuery} from "../../../queries"

interface UsePublishReferenceBookHook {
  readonly publishReferenceBook: (id: UUID) => Promise<Option<ReferenceBookChapter>>
  readonly publishReferenceBookLoading: boolean
}

export const usePublishReferenceBookChapter = (): UsePublishReferenceBookHook => {
  const [publishReferenceBook, {loading}] = useMutation<
    PublishReferenceBookChapterMutation,
    PublishReferenceBookChapterMutationVariables
  >(publishReferenceBookChapterMutation)

  return {
    publishReferenceBook: (id: UUID) =>
      new Promise<Option<ReferenceBookChapter>>((resolve, reject) => {
        publishReferenceBook({
          variables: {id},
          update: handleApolloCacheUpdate<
            ReferenceBookChapterQuery,
            PublishReferenceBookChapterMutation,
            ReferenceBookChapterQueryVariables
          >(
            referenceBookChapterQuery,
            existingData => {
              if (existingData.referenceBookChapter) {
                return {
                  referenceBookChapter: {...existingData.referenceBookChapter, publishedAt: new Date().toISOString()}
                }
              }

              return existingData
            },
            "referenceBookChapter",
            {
              id
            }
          )
        })
          .then(result =>
            resolve(
              result.data && result.data.publishReferenceBookChapter
                ? Option.of<ReferenceBookChapter>(result?.data?.publishReferenceBookChapter)
                : Option.none()
            )
          )
          .catch(reject)
      }),
    publishReferenceBookLoading: loading
  }
}
