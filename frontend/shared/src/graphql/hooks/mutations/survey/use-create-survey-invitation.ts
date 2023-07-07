import {useMutation} from "@apollo/client"
import {SurveyInvitation} from "../../../../models"
import {Option} from "../../../../utils"
import {createEntitiesInCache} from "../../../cache"
import {
  CreateSurveyInvitationsMutation,
  CreateSurveyInvitationsMutationVariables
} from "../../../generated/CreateSurveyInvitationsMutation"
import {SurveyInvitationCreation} from "../../../generated/globalTypes"
import {SurveyInvitationsQuery, SurveyInvitationsQueryVariables} from "../../../generated/SurveyInvitationsQuery"
import {createSurveyInvitationsMutation} from "../../../mutations"
import {
  projectModulesQuery,
  surveyInvitationsProgressQuery,
  surveyInvitationsQuery,
  surveyQuery
} from "../../../queries"

export interface CreateSurveyInvitationsProps {
  readonly createSurveyInvitations: (creations: SurveyInvitationCreation[]) => Promise<Option<SurveyInvitation[]>>
  readonly isCreateSurveyInvitationsLoading: boolean
}

export const useCreateSurveyInvitations = (surveyId: UUID, projectId: UUID): CreateSurveyInvitationsProps => {
  const [createSurveyInvitations, {loading}] = useMutation<
    CreateSurveyInvitationsMutation,
    CreateSurveyInvitationsMutationVariables
  >(createSurveyInvitationsMutation, {
    update: createEntitiesInCache<
      SurveyInvitationsQuery,
      CreateSurveyInvitationsMutation,
      SurveyInvitationsQueryVariables
    >(surveyInvitationsQuery, "surveyInvitations", query => query.surveyInvitations, "createSurveyInvitations", {
      surveyId
    }),
    refetchQueries: [
      {query: surveyQuery, variables: {id: surveyId}},
      {query: surveyInvitationsProgressQuery, variables: {surveyId}},
      {query: projectModulesQuery, variables: {projectId}}
    ]
  })

  return {
    createSurveyInvitations: (creations: SurveyInvitationCreation[]) =>
      new Promise((resolve, reject) => {
        createSurveyInvitations({variables: {creations}})
          .then(result => resolve(Option.of<SurveyInvitation[]>(result?.data?.createSurveyInvitations)))
          .catch(reject)
      }),
    isCreateSurveyInvitationsLoading: loading
  }
}
