import {useMutation} from "@apollo/client"
import {Survey} from "../../../../models"
import {Option} from "../../../../utils"
import {SurveyUpdate} from "../../../generated/globalTypes"
import {UpdateSurveyMutation, UpdateSurveyMutationVariables} from "../../../generated/UpdateSurveyMutation"
import {updateSurveyMutation} from "../../../mutations"

export interface UpdateSurveyProps {
  readonly updateSurvey: (id: UUID, update: SurveyUpdate) => Promise<Option<Survey>>
  readonly updateSurveyLoading: boolean
}

export const useUpdateSurvey = (): UpdateSurveyProps => {
  const [updateSurvey, {loading}] = useMutation<UpdateSurveyMutation, UpdateSurveyMutationVariables>(
    updateSurveyMutation
  )

  return {
    updateSurvey: (id: UUID, update: SurveyUpdate) =>
      new Promise<Option<Survey>>((resolve, reject) => {
        updateSurvey({
          variables: {id, update}
        })
          .then(result => resolve(Option.of(result.data?.updateSurvey)))
          .catch(reject)
      }),
    updateSurveyLoading: loading
  }
}
