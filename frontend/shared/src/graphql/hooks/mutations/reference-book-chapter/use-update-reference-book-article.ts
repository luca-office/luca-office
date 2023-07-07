import {useMutation} from "@apollo/client"
import {ReferenceBookArticle} from "../../../../models"
import {Option} from "../../../../utils"
import {ReferenceBookArticleUpdate} from "../../../generated/globalTypes"
import {
  UpdateReferenceBookArticleMutation,
  UpdateReferenceBookArticleMutationVariables
} from "../../../generated/UpdateReferenceBookArticleMutation"
import {updateReferenceBookArticleMutation} from "../../../mutations"
import {referenceBookChapterQuery} from "../../../queries"

export interface UpdateReferenceBookArticleProps {
  readonly updateReferenceBookArticle: (
    id: UUID,
    update: ReferenceBookArticleUpdate
  ) => Promise<Option<ReferenceBookArticle>>
  readonly updateReferenceBookArticleLoading: boolean
}

export const useUpdateReferenceBookArticle = (referenceBookChapterId: UUID): UpdateReferenceBookArticleProps => {
  const [updateReferenceBookArticle, {loading}] = useMutation<
    UpdateReferenceBookArticleMutation,
    UpdateReferenceBookArticleMutationVariables
  >(updateReferenceBookArticleMutation)

  return {
    updateReferenceBookArticle: (id: UUID, update: ReferenceBookArticleUpdate) =>
      new Promise<Option<ReferenceBookArticle>>((resolve, reject) => {
        updateReferenceBookArticle({
          variables: {id, update},
          refetchQueries: [{query: referenceBookChapterQuery, variables: {id: referenceBookChapterId}}]
        })
          .then(result =>
            resolve(
              result.data && result.data.updateReferenceBookArticle
                ? Option.of(result.data.updateReferenceBookArticle)
                : Option.none()
            )
          )
          .catch(reject)
      }),
    updateReferenceBookArticleLoading: loading
  }
}
