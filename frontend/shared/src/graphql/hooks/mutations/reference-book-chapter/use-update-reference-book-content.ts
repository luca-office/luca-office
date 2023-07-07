import {useMutation} from "@apollo/client"
import {ReferenceBookArticleContent} from "../../../../models"
import {Option} from "../../../../utils"
import {ReferenceBookContentUpdate} from "../../../generated/globalTypes"
import {
  UpdateReferenceBookContentMutation,
  UpdateReferenceBookContentMutationVariables
} from "../../../generated/UpdateReferenceBookContentMutation"
import {updateReferenceBookContentMutation} from "../../../mutations"
import {referenceBookChapterQuery} from "../../../queries"

export interface UpdateReferenceBookContentProps {
  readonly updateReferenceBookContent: (
    id: UUID,
    update: ReferenceBookContentUpdate
  ) => Promise<Option<ReferenceBookArticleContent>>
  readonly updateReferenceBookContentLoading: boolean
}

export const useUpdateReferenceBookContent = (referenceBookChapterId: UUID): UpdateReferenceBookContentProps => {
  const [updateReferenceBookContent, {loading}] = useMutation<
    UpdateReferenceBookContentMutation,
    UpdateReferenceBookContentMutationVariables
  >(updateReferenceBookContentMutation)

  return {
    updateReferenceBookContent: (id: UUID, update: ReferenceBookContentUpdate) =>
      new Promise<Option<ReferenceBookArticleContent>>((resolve, reject) => {
        updateReferenceBookContent({
          variables: {id, update},
          refetchQueries: [{query: referenceBookChapterQuery, variables: {id: referenceBookChapterId}}]
        })
          .then(result =>
            resolve(
              result.data && result.data.updateReferenceBookContent
                ? Option.of(result.data.updateReferenceBookContent)
                : Option.none()
            )
          )
          .catch(reject)
      }),
    updateReferenceBookContentLoading: loading
  }
}
