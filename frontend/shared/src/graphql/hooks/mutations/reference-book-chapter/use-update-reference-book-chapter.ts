import {useMutation} from "@apollo/client"
import {ReferenceBookChapter} from "../../../../models"
import {Option} from "../../../../utils"
import {ReferenceBookChapterUpdate} from "../../../generated/globalTypes"
import {
  UpdateReferenceBookChapterMutation,
  UpdateReferenceBookChapterMutationVariables
} from "../../../generated/UpdateReferenceBookChapterMutation"
import {updateReferenceBookMutation} from "../../../mutations"

export interface UpdateReferenceBookProps {
  readonly updateReferenceBook: (id: UUID, update: ReferenceBookChapterUpdate) => Promise<Option<ReferenceBookChapter>>
  readonly updateReferenceBookLoading: boolean
}

export const useUpdateReferenceBookChapter = (): UpdateReferenceBookProps => {
  const [updateReferenceBook, {loading}] = useMutation<
    UpdateReferenceBookChapterMutation,
    UpdateReferenceBookChapterMutationVariables
  >(updateReferenceBookMutation)

  return {
    updateReferenceBook: (id: UUID, update: ReferenceBookChapterUpdate) =>
      new Promise<Option<ReferenceBookChapter>>((resolve, reject) => {
        updateReferenceBook({
          variables: {id, update}
        })
          .then(result =>
            resolve(
              result.data && result.data.updateReferenceBookChapter
                ? Option.of(result.data.updateReferenceBookChapter)
                : Option.none()
            )
          )
          .catch(reject)
      }),
    updateReferenceBookLoading: loading
  }
}
