import * as createSurvey from "./create-survey.graphql"
import * as createSurveyEvent from "./create-survey-event.graphql"
import * as createSurveyInvitations from "./create-survey-invitations.graphql"
import * as createSurveyUserAccount from "./create-survey-user-account.graphql"
import * as deleteSurvey from "./delete-survey.graphql"
import * as updateSurvey from "./update-survey.graphql"

export const createSurveyMutation = createSurvey
export const deleteSurveyMutation = deleteSurvey
export const updateSurveyMutation = updateSurvey
export const createSurveyInvitationsMutation = createSurveyInvitations
export const createSurveyUserAccountMutation = createSurveyUserAccount
export const createSurveyEventMutation = createSurveyEvent
