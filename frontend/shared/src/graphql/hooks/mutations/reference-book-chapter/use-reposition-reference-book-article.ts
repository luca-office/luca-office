import {useMutation} from "@apollo/client"
import {ReferenceBookArticle} from "../../../../models"
import {Option} from "../../../../utils"
import {
  RepositionReferenceBookArticleMutation,
  RepositionReferenceBookArticleMutationVariables
} from "../../../generated/RepositionReferenceBookArticleMutation"
import {repositionReferenceBookArticleMutation} from "../../../mutations/reference-book-chapter"
import {referenceBookChapterQuery} from "../../../queries"

export interface UseRepositionReferenceBookArticleProps {
  readonly repositionReferenceBookArticle: (id: UUID, predecessorId?: UUID) => Promise<Option<ReferenceBookArticle>>
  readonly repositionReferenceBookArticleLoading: boolean
}

export const useRepositionReferenceBookArticle = (
  referenceBookChapterId: UUID
): UseRepositionReferenceBookArticleProps => {
  const [repositionReferenceBookArticle, {loading}] = useMutation<
    RepositionReferenceBookArticleMutation,
    RepositionReferenceBookArticleMutationVariables
  >(repositionReferenceBookArticleMutation)

  return {
    repositionReferenceBookArticle: (id: UUID, predecessorId?: UUID) =>
      new Promise<Option<ReferenceBookArticle>>((resolve, reject) => {
        repositionReferenceBookArticle({
          variables: {id, predecessorId},
          refetchQueries: [{query: referenceBookChapterQuery, variables: {id: referenceBookChapterId}}]
        })
          .then(result =>
            resolve(
              result.data && result.data.repositionReferenceBookArticle
                ? Option.of(result.data.repositionReferenceBookArticle)
                : Option.none()
            )
          )
          .catch(reject)
      }),
    repositionReferenceBookArticleLoading: loading
  }
}
