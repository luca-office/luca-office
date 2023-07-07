import {useMutation} from "@apollo/client"
import {DeleteEntityHook} from "../../../../models"
import {deleteIdEntityFromCache} from "../../../cache/updates"
import {DeleteSurveyMutation, DeleteSurveyMutationVariables} from "../../../generated/DeleteSurveyMutation"
import {GetSurveysQuery, GetSurveysQueryVariables} from "../../../generated/GetSurveysQuery"
import {SurveyFragment} from "../../../generated/SurveyFragment"
import {deleteSurveyMutation} from "../../../mutations"
import {surveysQuery} from "../../../queries"

export const useDeleteSurvey = (projectId: UUID): DeleteEntityHook => {
  const [deleteSurvey, {loading}] = useMutation<DeleteSurveyMutation, DeleteSurveyMutationVariables>(
    deleteSurveyMutation
  )

  return {
    deleteEntity: (id: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteSurvey({
          variables: {id},
          update: deleteIdEntityFromCache<
            GetSurveysQuery,
            DeleteSurveyMutation,
            GetSurveysQueryVariables,
            SurveyFragment
          >(surveysQuery, "surveys", id, {projectId})
        })
          .then(() => resolve())
          .catch(reject)
      }),
    deleteEntityLoading: loading
  }
}
