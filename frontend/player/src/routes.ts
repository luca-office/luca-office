import {OfficeModule} from "shared/models"

export enum Route {
  VerifyToken = "verify-token",
  OpenParticipation = "open-participation",
  Login = "login",
  WaitForNextModule = "wait",
  WaitForManualSurveyStart = "wait-for-survey-start",
  StartProject = "start-project",
  ReportLogin = "report-login",
  ResumeProject = "resume-project",
  Welcome = "welcome",
  ScenarioDetail = "scenario-detail",
  Questionnaire = "questionnaire",
  EndOfProject = "end-of-project",
  Report = "report",
  ReportScenario = "report-scenario",
  ReportQuestionnaire = "report-questionnaire",
  ReportScenarioScoringOverlay = "report-scenario-scoring-overlay",
  ReportQuestionnaireScoringOverlay = "report-questionnaire-scoring-overlay"
}

export const allowedExitRoutes = [
  Route.VerifyToken,
  Route.OpenParticipation,
  Route.Login,
  Route.EndOfProject,
  Route.ResumeProject
]

export type RouteParameters = Record<string, any>

export type RouteItem =
  | VerifyTokenRouteItem
  | OpenParticipationRouteItem
  | LoginRouteItem
  | WaitForNextModuleRouteItem
  | WaitForManualSurveyStartRouteItem
  | StartProjectRouteItem
  | ResumeProjectRouteItem
  | WelcomeRouteItem
  | ScenarioDetailRouteItem
  | QuestionnaireRouteItem
  | EndOfProjectRouteItem
  | ReportRouteItem
  | ReportScenarioRouteItem
  | ReportQuestionnaireRouteItem
  | ReportScenarioScoringOverlayRouteItem
  | ReportQuestionnaireScoringOverlayRouteItem
  | ReportLoginRouteItem

export interface RouteItemBase {
  readonly routeType: Route
  readonly parameters?: RouteParameters
}

export interface VerifyTokenRouteItem extends RouteItemBase {
  readonly routeType: Route.VerifyToken
}

export interface OpenParticipationRouteItem extends RouteItemBase {
  readonly routeType: Route.VerifyToken
  readonly parameters: {
    readonly surveyId: UUID
  }
}

export interface LoginRouteItem extends RouteItemBase {
  readonly routeType: Route.Login
}

export interface WaitForNextModuleRouteItem extends RouteItemBase {
  readonly routeType: Route.WaitForNextModule
}

export interface WaitForManualSurveyStartRouteItem extends RouteItemBase {
  readonly routeType: Route.WaitForManualSurveyStart
}

export interface StartProjectRouteItem extends RouteItemBase {
  readonly routeType: Route.StartProject
}

export interface ResumeProjectRouteItem extends RouteItemBase {
  readonly routeType: Route.ResumeProject
}

export interface WelcomeRouteItem extends RouteItemBase {
  readonly routeType: Route.Welcome
  readonly parameters: {
    readonly firstProjectModule: OfficeModule
  }
}

export interface ScenarioDetailRouteItem extends RouteItemBase {
  readonly routeType: Route.ScenarioDetail
  readonly parameters: {
    readonly scenarioId: UUID
  }
}

export interface QuestionnaireRouteItem extends RouteItemBase {
  readonly routeType: Route.Questionnaire
  readonly parameters: {
    readonly questionnaireId: UUID
  }
}

export interface EndOfProjectRouteItem extends RouteItemBase {
  readonly routeType: Route.EndOfProject
}

export interface ReportRouteItem extends RouteItemBase {
  readonly routeType: Route.Report
  readonly parameters: {
    readonly token: string
    readonly surveyId: UUID
  }
}

export interface ReportScenarioRouteItem extends RouteItemBase {
  readonly routeType: Route.ReportScenario
  readonly parameters: {
    readonly token: string
    readonly surveyId: UUID
    readonly scenarioId: UUID
  }
}

export interface ReportQuestionnaireRouteItem extends RouteItemBase {
  readonly routeType: Route.ReportQuestionnaire
  readonly parameters: {
    readonly token: string
    readonly surveyId: UUID
    readonly questionnaireId: UUID
  }
}

export interface ReportScenarioScoringOverlayRouteItem extends RouteItemBase {
  readonly routeType: Route.ReportScenarioScoringOverlay
  readonly parameters: {
    readonly token: string
    readonly surveyId: UUID
    readonly scenarioId: UUID
    readonly surveyInvitationId: UUID
    readonly participantName: string
  }
}

export interface ReportQuestionnaireScoringOverlayRouteItem extends RouteItemBase {
  readonly routeType: Route.ReportQuestionnaireScoringOverlay
  readonly parameters: {
    readonly surveyId: UUID
    readonly questionnaireId: UUID
    readonly surveyInvitationId: UUID
    readonly token: string
    readonly participantName: string
  }
}

export interface ReportLoginRouteItem extends RouteItemBase {
  readonly routeType: Route.ReportLogin
  readonly parameters: {
    readonly surveyId: UUID
    readonly token?: string
  }
}
