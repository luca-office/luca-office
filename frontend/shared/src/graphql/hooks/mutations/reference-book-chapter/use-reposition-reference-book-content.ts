import {useMutation} from "@apollo/client"
import {ReferenceBookArticleContent} from "../../../../models"
import {Option} from "../../../../utils"
import {
  RepositionReferenceBookContentMutation,
  RepositionReferenceBookContentMutationVariables
} from "../../../generated/RepositionReferenceBookContentMutation"
import {repositionReferenceBookContentMutation} from "../../../mutations/reference-book-chapter"

export interface UseRepositionReferenceBookContentProps {
  readonly repositionReferenceBookContent: (
    id: UUID,
    predecessorId?: UUID
  ) => Promise<Option<ReferenceBookArticleContent>>
  readonly repositionReferenceBookContentLoading: boolean
}

export const useRepositionReferenceBookContent = (): UseRepositionReferenceBookContentProps => {
  const [repositionReferenceBookContent, {loading}] = useMutation<
    RepositionReferenceBookContentMutation,
    RepositionReferenceBookContentMutationVariables
  >(repositionReferenceBookContentMutation)

  return {
    repositionReferenceBookContent: (id: UUID, predecessorId?: UUID) =>
      new Promise<Option<ReferenceBookArticleContent>>((resolve, reject) => {
        repositionReferenceBookContent({
          variables: {id, predecessorId}
        })
          .then(result => resolve(Option.of(result.data?.repositionReferenceBookContent)))
          .catch(reject)
      }),
    repositionReferenceBookContentLoading: loading
  }
}
