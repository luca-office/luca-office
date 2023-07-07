import {useMutation} from "@apollo/client"
import {ReferenceBookArticle} from "../../../../models"
import {Option} from "../../../../utils"
import {
  CreateReferenceBookArticleMutation,
  CreateReferenceBookArticleMutationVariables
} from "../../../generated/CreateReferenceBookArticleMutation"
import {ReferenceBookArticleCreation} from "../../../generated/globalTypes"
import {createReferenceBookArticleMutation} from "../../../mutations/reference-book-chapter"
import {referenceBookChapterQuery} from "../../../queries"

export interface CreateReferenceBookArticleProps {
  readonly createReferenceBookArticle: (
    creation: ReferenceBookArticleCreation,
    awaitRefetchQueries?: boolean
  ) => Promise<Option<ReferenceBookArticle>>
  readonly createReferenceBookArticleLoading: boolean
}

export const useCreateReferenceBookArticle = (): CreateReferenceBookArticleProps => {
  const [createReferenceBookArticle, {loading}] = useMutation<
    CreateReferenceBookArticleMutation,
    CreateReferenceBookArticleMutationVariables
  >(createReferenceBookArticleMutation)

  return {
    createReferenceBookArticle: (creation: ReferenceBookArticleCreation, awaitRefetchQueries = false) =>
      new Promise<Option<ReferenceBookArticle>>((resolve, reject) => {
        createReferenceBookArticle({
          variables: {creation},
          refetchQueries: [{query: referenceBookChapterQuery, variables: {id: creation.referenceBookChapterId}}],
          awaitRefetchQueries
        })
          .then(result => resolve(Option.of<ReferenceBookArticle>(result?.data?.createReferenceBookArticle)))
          .catch(reject)
      }),
    createReferenceBookArticleLoading: loading
  }
}
