import * as React from "react"
import {Option} from "shared/utils"
import {ReportingLoginContainer} from "../../auth/reporting-login/reporting-login-container"
import {Route, RouteParameters} from "../../../routes"
import {VerifyTokenContainer} from "../../auth"
import {Login} from "../../auth/login/login"
import {ProjectResumptionContainer} from "../../auth/login/project-resumption/project-resumption-container"
import {OpenParticipationResumptionOrStartContainer} from "../../auth/open-participation/open-participation-resumption-or-start-container"
import {ModuleQuestionnaire} from "../../questionnaire/module-questionnaire/module-questionnaire"
import {ReportingContentContainer} from "../../reporting/reporting-content-container/reporting-content-container"
import {ReportingQuestionnaireOverlayContainer} from "../../reporting/reporting-questionnaire-overlay/reporting-questionnaire-overlay-container"
import {ReportingScenarioOverlayContainer} from "../../reporting/reporting-scenario-overlay/reporting-scenario-overlay-container"
import {DesktopContainer} from "../desktop/desktop-container"
import {ProjectEndContainer} from "../project-end/project-end-container"
import {WaitForNextModule} from "../wait-for-next-module/wait-for-next-module"
import {WelcomeModalContainer} from "../welcome-modal/welcome-modal-container"

interface ContentProps {
  readonly routingParameters?: RouteParameters
  readonly activeRoute: Route | undefined
  readonly closeScenarioFinalScoreOverlay: () => void
  readonly closeQuestionnaireFinalScoreOverlay: () => void
}

export const Content: React.FC<ContentProps> = ({
  routingParameters,
  activeRoute,
  closeScenarioFinalScoreOverlay,
  closeQuestionnaireFinalScoreOverlay
}) => {
  switch (activeRoute) {
    case Route.OpenParticipation:
      return <OpenParticipationResumptionOrStartContainer surveyId={Option.of(routingParameters?.surveyId)} />
    case Route.VerifyToken:
      return <VerifyTokenContainer />
    case Route.Login:
      return <Login originRoute={Route.Login} />
    case Route.StartProject:
      return <Login originRoute={Route.StartProject} />
    case Route.ResumeProject:
      return <ProjectResumptionContainer />
    case Route.Welcome:
      return <WelcomeModalContainer firstProjectModule={routingParameters?.firstProjectModule} />
    case Route.ScenarioDetail:
      return <DesktopContainer scenarioId={Option.of(routingParameters?.scenarioId)} />
    case Route.Questionnaire:
      return <ModuleQuestionnaire questionnaireIdOption={Option.of(routingParameters?.questionnaireId)} />
    case Route.EndOfProject:
      return <ProjectEndContainer />
    case Route.WaitForNextModule:
      return <WaitForNextModule isStartScreenOfManualSurvey={false} />
    case Route.WaitForManualSurveyStart:
      return <WaitForNextModule isStartScreenOfManualSurvey={true} />
    case Route.ReportLogin:
      return <ReportingLoginContainer surveyId={routingParameters?.surveyId} token={routingParameters?.token} />
    case Route.Report:
      return (
        <ReportingContentContainer
          surveyId={routingParameters?.surveyId}
          token={routingParameters?.token}
          scenarioId={null}
          questionnaireId={null}
        />
      )
    case Route.ReportScenario:
    case Route.ReportScenarioScoringOverlay:
      return (
        <React.Fragment>
          <ReportingContentContainer
            surveyId={routingParameters?.surveyId}
            token={routingParameters?.token}
            scenarioId={routingParameters?.scenarioId}
            questionnaireId={null}
          />
          {activeRoute === Route.ReportScenarioScoringOverlay && (
            <ReportingScenarioOverlayContainer
              onCloseOverlay={closeScenarioFinalScoreOverlay}
              surveyId={routingParameters?.surveyId}
              surveyInvitationId={routingParameters?.surveyInvitationId}
              scenarioId={routingParameters?.scenarioId}
              participantName={routingParameters?.participantName}
            />
          )}
        </React.Fragment>
      )
    case Route.ReportQuestionnaire:
    case Route.ReportQuestionnaireScoringOverlay:
      return (
        <React.Fragment>
          <ReportingContentContainer
            surveyId={routingParameters?.surveyId}
            token={routingParameters?.token}
            scenarioId={null}
            questionnaireId={routingParameters?.questionnaireId}
          />
          {activeRoute === Route.ReportQuestionnaireScoringOverlay && (
            <ReportingQuestionnaireOverlayContainer
              surveyId={routingParameters?.surveyId}
              onCloseOverlay={closeQuestionnaireFinalScoreOverlay}
              surveyInvitationId={routingParameters?.surveyInvitationId}
              questionnaireId={routingParameters?.questionnaireId}
              participantName={routingParameters?.participantName}
            />
          )}
        </React.Fragment>
      )
    default:
      return <VerifyTokenContainer />
  }
}
