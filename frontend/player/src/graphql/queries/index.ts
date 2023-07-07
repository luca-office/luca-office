import * as filesForSampleCompany from "shared/graphql/queries/file/files-for-sample-company.graphql"
import * as filesForScenario from "shared/graphql/queries/file/files-for-scenario.graphql"
import * as project from "./project.graphql"
import * as scenarioQuestionnaires from "./questionnaire/scenario-questionnaires.graphql"
import * as scenario from "./scenario.graphql"
import * as surveyInvitation from "./survey-invitation.graphql"

export const filesForScenarioQuery = filesForScenario
export const filesForSampleCompanyQuery = filesForSampleCompany
export const scenarioQuery = scenario
export const surveyInvitationQuery = surveyInvitation
export const scenarioQuestionnairesQuery = scenarioQuestionnaires
export const projectQuery = project
