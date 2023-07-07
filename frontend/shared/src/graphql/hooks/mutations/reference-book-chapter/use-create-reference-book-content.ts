import {useMutation} from "@apollo/client"
import {ReferenceBookArticleContent} from "../../../../models"
import {Option} from "../../../../utils"
import {
  CreateReferenceBookContentMutation,
  CreateReferenceBookContentMutationVariables
} from "../../../generated/CreateReferenceBookContentMutation"
import {ReferenceBookContentCreation} from "../../../generated/globalTypes"
import {createReferenceBookContentMutation} from "../../../mutations/reference-book-chapter"
import {referenceBookChapterQuery} from "../../../queries"

export interface CreateReferenceBookContentProps {
  readonly createReferenceBookContent: (
    creation: ReferenceBookContentCreation
  ) => Promise<Option<ReferenceBookArticleContent>>
  readonly createReferenceBookContentLoading: boolean
}

export const useCreateReferenceBookContent = (referenceBookChapterId: UUID): CreateReferenceBookContentProps => {
  const [createReferenceBookContent, {loading}] = useMutation<
    CreateReferenceBookContentMutation,
    CreateReferenceBookContentMutationVariables
  >(createReferenceBookContentMutation)

  return {
    createReferenceBookContent: (creation: ReferenceBookContentCreation) =>
      new Promise<Option<ReferenceBookArticleContent>>((resolve, reject) => {
        createReferenceBookContent({
          variables: {creation},
          refetchQueries: [{query: referenceBookChapterQuery, variables: {id: referenceBookChapterId}}]
        })
          .then(result => resolve(Option.of<ReferenceBookArticleContent>(result?.data?.createReferenceBookContent)))
          .catch(reject)
      }),
    createReferenceBookContentLoading: loading
  }
}
