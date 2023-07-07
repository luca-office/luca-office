/* eslint-disable max-lines, import/max-dependencies */
import * as React from "react"
import {useDispatch} from "react-redux"
import {Payload} from "redux-first-router"
import {RatingDetailQuestionnaire} from "shared/components"
import {ButtonVariant, InterventionHeaderGroupType, RaterMode} from "shared/enums"
import {Route as SharedRoute} from "shared/routes"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {QuestionnaireDetailMode} from "../../../enums"
import {navigateToRouteAction} from "../../../redux/actions/navigation-action"
import {Route} from "../../../routes"
import {Monitoring, MonitoringDashboard, ParticipantOverview} from "../.."
import {ParticipantQuestionnaireDetailContainer} from "../../dashboard/participant-questionnaire-detail/participant-questionnaire-detail-container"
import {ParticipantScenarioDetailContainer} from "../../dashboard/participant-scenario-detail/participant-scenario-detail-container"
import {FilesAndDirectories} from "../../files-and-directories/files-and-directories"
import {ProjectQuestionnaireSelection, ProjectQuestionnaireSelectionDetail, Projects} from "../../projects"
import {CreateProjectModal} from "../../projects/create/create-project-modal"
import {ProjectDetail} from "../../projects/detail/project-detail"
import {CreateQuestionnaireModal, QuestionnaireDetail, Questionnaires} from "../../questionnaires"
import {RScriptsContainer} from "../../r-scripts/r-scripts-container"
import {RaterRatingDetailView, RaterRatingOverview} from "../../rater-rating"
import {RatingDetailScenarioContainer, ScoringDashboard} from "../../rating"
import {Scoring} from "../../rating/scoring/scoring"
import {
  CreateReferenceBookArticleModal,
  CreateReferenceBookModal,
  ReferenceBookChapters,
  ReferenceBookChaptersSelection,
  ReferenceBookDetail
} from "../../reference-book-chapters"
import {ScenarioReferenceBookOverview} from "../../reference-book-chapters/scenario/scenario-reference-book-chapter-overview/scenario-reference-book-overview"
import {ReportingDashboardContainer} from "../../reporting"
import {Reporting} from "../../reporting/reporting"
import {
  CreateSampleCompaniesModal,
  ErpContainer,
  SampleCompanies,
  SampleCompanyDetailView,
  SampleCompanyDomainSignature
} from "../../sample-companies"
import {SampleCompanyDocuments} from "../../sample-companies/documents/sample-company-documents"
import {EmailCreateModal, ScenarioEmailsContainer} from "../../scenario-emails"
import {InterventionsGroupTypeOverviewContainer} from "../../scenario-interventions"
import {InterventionsErpTableOverviewContainer} from "../../scenario-interventions/overview/interventions-erp-table-overview-container"
import {toGroupTypeForRouting} from "../../scenario-interventions/utils"
import {
  CreateScenarioModal,
  QuestionnaireSelection,
  SampleCompanySelectionPlaceholderContainer,
  ScenarioDetail,
  ScenarioOverview,
  ScenarioQuestionnaireSelectionDetail,
  ScenarioSelection,
  ScenarioSelectionDetail
} from "../../scenarios"
import {ScenarioPreview} from "../../scenarios/preview/scenario-preview"
import {SampleCompanySelection} from "../../scenarios/selection/sample-company-selection/sample-company-selection"
import {SelectedSampleCompanyContainer} from "../../scenarios/selection/sample-company-selection/selected-sample-company-container/selected-sample-company-container"
import {CreateCodingModelModal} from "../../scenarios-coding-models/create"
import {CodingModelDetailViewContainer} from "../../scenarios-coding-models/detail/coding-model-detail-view-container"
import {CodingModelsOverview} from "../../scenarios-coding-models/overview/coding-models-overview"
import {SurveyDetail, SurveyFormModal} from "../../surveys"
import {UserManagementDetailContainer} from "../../user-management/detail/user-management-detail-container"
import {EditUser} from "../../users"
import {NotFoundPage} from "../not-found-page/not-found-page"

interface ContentProps {
  readonly activeRoute: Route | SharedRoute | undefined
  readonly urlParams: Payload | undefined
}

export const AppContent: React.FC<ContentProps> = ({activeRoute, urlParams}) => {
  const {t} = useLucaTranslation()

  const dispatch = useDispatch()

  const navigateTo = (route: Route | SharedRoute, payload?: Payload) => dispatch(navigateToRouteAction(route, payload))

  switch (activeRoute) {
    case Route.Questionnaires:
      return <Questionnaires />
    case Route.QuestionnaireCreation:
      return (
        <React.Fragment>
          <Questionnaires />
          <CreateQuestionnaireModal />
        </React.Fragment>
      )
    case Route.QuestionnaireDetail:
      return urlParams?.questionnaireId ? (
        <QuestionnaireDetail questionnaireId={urlParams?.questionnaireId} />
      ) : (
        <React.Fragment>
          <Questionnaires />
          <CreateQuestionnaireModal />
        </React.Fragment>
      )
    case Route.QuestionnaireDetailQuestion:
      return urlParams?.questionnaireId ? (
        <QuestionnaireDetail questionnaireId={urlParams?.questionnaireId} questionId={urlParams?.questionId} />
      ) : (
        <Questionnaires />
      )

    case Route.ReferenceBookChaptersDetail:
    case Route.ReferenceBookChaptersDetailArticle:
      return urlParams?.id ? (
        <ReferenceBookDetail referenceBookChapterId={urlParams?.id} articleId={urlParams?.articleId} />
      ) : (
        <ReferenceBookChapters />
      )
    case Route.ReferenceBookChaptersCreation:
      return (
        <React.Fragment>
          <ReferenceBookChapters />
          <CreateReferenceBookModal />
        </React.Fragment>
      )
    case Route.ReferenceBookChaptersDetailArticleCreation:
    case Route.ReferenceBookChaptersDetailArticleDetailsCreation:
      return urlParams?.id ? (
        <React.Fragment>
          <ReferenceBookDetail referenceBookChapterId={urlParams.id} articleId={urlParams?.articleId} />
          <CreateReferenceBookArticleModal referenceBookChapterId={urlParams.id} articleId={urlParams?.articleId} />
        </React.Fragment>
      ) : (
        <ReferenceBookChapters />
      )
    case Route.ReferenceBookChapters:
      return <ReferenceBookChapters />

    case Route.SampleCompanies:
      return <SampleCompanies />
    case Route.MyAccount:
      return <EditUser />
    case Route.SampleCompanyDetail:
      return <SampleCompanyDetailView sampleCompanyId={urlParams?.sampleCompanyId} />
    case Route.SampleCompanyDocuments:
    case Route.SampleCompanyDocumentDetails:
      return (
        <SampleCompanyDocuments sampleCompanyId={urlParams?.sampleCompanyId} directoryId={urlParams?.directoryId} />
      )
    case Route.SampleCompanyDocumentDetailsFile:
      return (
        <SampleCompanyDocuments
          sampleCompanyId={urlParams?.sampleCompanyId}
          directoryId={urlParams?.directoryId}
          fileId={urlParams?.fileId}
        />
      )
    case Route.SampleCompanyCreation:
      return (
        <React.Fragment>
          <SampleCompanies />
          <CreateSampleCompaniesModal />
        </React.Fragment>
      )
    case Route.SampleCompanyDomainSignature:
      return <SampleCompanyDomainSignature sampleCompanyId={urlParams?.sampleCompanyId} />

    case Route.ScenarioAssignedSampleCompanyDetailErp:
    case Route.SampleCompanyErp:
      return (
        <ErpContainer
          selectedEntityId={Option.none()}
          selectedErpNode={Option.none()}
          scenarioId={urlParams?.scenarioId}
          sampleCompanyId={urlParams?.sampleCompanyId}
        />
      )
    case Route.ScenarioAssignedSampleCompanyDetailErpTable:
      return (
        <ErpContainer
          selectedEntityId={Option.of(urlParams?.entityId)}
          selectedErpNode={Option.of(urlParams?.erpType)}
          scenarioId={urlParams?.scenarioId}
          sampleCompanyId={urlParams?.sampleCompanyId}
        />
      )
    case Route.ScenarioAssignedSampleCompanyDetailErpTableSelectedDataset:
      return (
        <ErpContainer
          selectedEntityId={Option.of(urlParams?.entityId)}
          selectedErpNode={Option.of(urlParams?.erpType)}
          scenarioId={urlParams?.scenarioId}
          sampleCompanyId={urlParams?.sampleCompanyId}
        />
      )

    case Route.Events:
      return <Questionnaires isRuntimeSurvey />
    case Route.EventCreation:
      return (
        <React.Fragment>
          <Questionnaires isRuntimeSurvey />
          <CreateQuestionnaireModal isRuntimeSurvey />
        </React.Fragment>
      )
    case Route.EventDetail:
      return urlParams?.eventId ? (
        <QuestionnaireDetail displayMode={QuestionnaireDetailMode.RuntimeSurvey} questionnaireId={urlParams?.eventId} />
      ) : (
        <React.Fragment>
          <Questionnaires isRuntimeSurvey />
          <CreateQuestionnaireModal isRuntimeSurvey />
        </React.Fragment>
      )
    case Route.EventDetailQuestion:
      return urlParams?.eventId ? (
        <QuestionnaireDetail
          displayMode={QuestionnaireDetailMode.RuntimeSurvey}
          questionnaireId={urlParams?.eventId}
          questionId={urlParams?.questionId}
        />
      ) : (
        <Questionnaires />
      )

    case Route.Scenarios:
      return <ScenarioOverview />
    case Route.ScenarioCodingModelSelection:
      return <CodingModelsOverview scenarioId={urlParams?.scenarioId} />
    case Route.ScenarioCodingModelDetail:
      return (
        <CodingModelDetailViewContainer
          codingDimensionId={Option.none()}
          codingItemId={Option.none()}
          scenarioId={urlParams?.scenarioId}
          codingModelId={urlParams?.codingModelId}
        />
      )
    case Route.ScenarioCodingModelCreate:
      return <CreateCodingModelModal scenarioId={urlParams?.scenarioId} />
    case Route.ScenarioCodingDimensionDetail:
      return (
        <CodingModelDetailViewContainer
          codingDimensionId={Option.of(urlParams?.dimensionId)}
          codingItemId={Option.none()}
          scenarioId={urlParams?.scenarioId}
          codingModelId={urlParams?.codingModelId}
        />
      )
    case Route.ScenarioCodingItemDetail:
      return (
        <CodingModelDetailViewContainer
          codingDimensionId={Option.of(urlParams?.dimensionId)}
          codingItemId={Option.of(urlParams?.itemId)}
          scenarioId={urlParams?.scenarioId}
          codingModelId={urlParams?.codingModelId}
        />
      )
    case Route.ScenarioDetail:
      return urlParams?.scenarioId ? <ScenarioDetail scenarioId={urlParams?.scenarioId} /> : <CreateScenarioModal />
    case Route.ScenarioPreview:
      return urlParams?.scenarioId ? (
        <ScenarioPreview scenarioId={urlParams.scenarioId} />
      ) : (
        <NotFoundPage
          {...{
            ...(urlParams?.scenarioId
              ? {homeRoute: Route.ScenarioDetail, urlParams: {scenarioId: urlParams.scenarioId}}
              : {homeRoute: Route.Scenarios})
          }}
        />
      )
    case Route.ScenarioInterventions:
      return urlParams?.scenarioId ? (
        <InterventionsGroupTypeOverviewContainer
          interventionId={Option.none()}
          groupEntityId={Option.none()}
          headerGroupType={urlParams?.headerGroupType || InterventionHeaderGroupType.AllGroups}
          groupType={Option.none()}
          scenarioId={urlParams?.scenarioId}
        />
      ) : (
        <CreateScenarioModal />
      )
    case Route.ScenarioInterventionsErpTableDetail:
      return (
        <InterventionsErpTableOverviewContainer
          erpRowId={Option.none()}
          erpType={urlParams?.erpType}
          headerGroupType={urlParams?.headerGroupType || InterventionHeaderGroupType.AllGroups}
          scenarioId={urlParams?.scenarioId}
          interventionId={Option.none()}
        />
      )
    case Route.ScenarioInterventionsErpRowDetail:
      return (
        <InterventionsErpTableOverviewContainer
          erpRowId={Option.of(urlParams?.rowId)}
          erpType={urlParams?.erpType}
          headerGroupType={urlParams?.headerGroupType || InterventionHeaderGroupType.AllGroups}
          scenarioId={urlParams?.scenarioId}
          interventionId={Option.none()}
        />
      )
    case Route.ScenarioInterventionsErpRowInterventionDetail:
      return (
        <InterventionsErpTableOverviewContainer
          erpRowId={Option.of(urlParams?.rowId)}
          erpType={urlParams?.erpType}
          headerGroupType={urlParams?.headerGroupType || InterventionHeaderGroupType.AllGroups}
          scenarioId={urlParams?.scenarioId}
          interventionId={Option.of(urlParams?.interventionId)}
        />
      )
    case Route.ScenarioInterventionsGroupTypeOverview:
      return (
        <InterventionsGroupTypeOverviewContainer
          groupEntityId={Option.none()}
          groupType={Option.of(toGroupTypeForRouting(urlParams?.groupType))}
          headerGroupType={urlParams?.headerGroupType || InterventionHeaderGroupType.AllGroups}
          scenarioId={urlParams?.scenarioId}
          interventionId={Option.none()}
        />
      )
    case Route.ScenarioInterventionsGroupEntityDetail:
      return (
        <InterventionsGroupTypeOverviewContainer
          groupEntityId={Option.of(urlParams?.groupEntityId)}
          groupType={Option.of(toGroupTypeForRouting(urlParams?.groupType))}
          headerGroupType={urlParams?.headerGroupType || InterventionHeaderGroupType.AllGroups}
          scenarioId={urlParams?.scenarioId}
          interventionId={Option.none()}
        />
      )

    case Route.ScenarioInterventionsInterventionDetail:
      return (
        <InterventionsGroupTypeOverviewContainer
          groupEntityId={Option.of(urlParams?.groupEntityId)}
          groupType={Option.of(toGroupTypeForRouting(urlParams?.groupType))}
          headerGroupType={urlParams?.headerGroupType || InterventionHeaderGroupType.AllGroups}
          scenarioId={urlParams?.scenarioId}
          interventionId={Option.of(urlParams?.interventionId)}
        />
      )
    case Route.ScenarioDetailIntroductionEmailCreation:
      return urlParams?.scenarioId ? (
        <React.Fragment>
          <ScenarioDetail scenarioId={urlParams.scenarioId} />
          <EmailCreateModal
            scenarioId={urlParams.scenarioId}
            navigationConfig={{route: Route.ScenarioDetail, payload: {scenarioId: urlParams.scenarioId}}}
            isIntroductionEmail={true}
            routeToEmailAfterCreation={true}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <ScenarioOverview />
          <CreateScenarioModal />
        </React.Fragment>
      )
    case Route.ScenarioEmails:
    case Route.ScenarioEmailsEmailCreation:
    case Route.ScenarioEmailsIntroductionEmailCreation:
      return urlParams?.scenarioId && urlParams.directory ? (
        <React.Fragment>
          <ScenarioEmailsContainer
            scenarioId={urlParams.scenarioId}
            emailId={urlParams.emailId}
            directory={urlParams.directory}
          />
          {(activeRoute === Route.ScenarioEmailsIntroductionEmailCreation ||
            activeRoute === Route.ScenarioEmailsEmailCreation) && (
            <EmailCreateModal
              scenarioId={urlParams.scenarioId}
              directory={urlParams.directory}
              navigationConfig={{
                route: Route.ScenarioEmails,
                payload: {
                  scenarioId: urlParams.scenarioId,
                  emailId: urlParams.emailId,
                  directory: urlParams.directory
                }
              }}
              isIntroductionEmail={activeRoute === Route.ScenarioEmailsIntroductionEmailCreation}
              routeToEmailAfterCreation={true}
            />
          )}
        </React.Fragment>
      ) : (
        <CreateScenarioModal />
      )
    case Route.ScenarioReferenceBookChapters:
    case Route.ScenarioReferenceBookChaptersArticle:
      return (
        urlParams?.scenarioId && (
          <ScenarioReferenceBookOverview
            scenarioId={urlParams.scenarioId}
            referenceBookChapterId={urlParams?.referenceBookChapterId}
            articleId={urlParams?.articleId}
          />
        )
      )
    case Route.ScenarioReferenceBookChaptersDetail:
    case Route.ScenarioReferenceBookChaptersArticleDetail:
      return urlParams?.scenarioId && urlParams?.referenceBookChapterId ? (
        <ReferenceBookDetail
          disabled={true}
          referenceBookChapterId={urlParams.referenceBookChapterId}
          articleId={urlParams?.articleId}
          navigationButtonLabelKey={"reference_books__scenario_add_chapter"}
          navigationOverviewConfig={{
            route: Route.ScenarioReferenceBookChaptersSelection,
            payload: {scenarioId: urlParams.scenarioId}
          }}
          navigationDetailsConfig={{
            route: Route.ScenarioReferenceBookChaptersDetail,
            payload: {scenarioId: urlParams.scenarioId, referenceBookChapterId: urlParams.referenceBookChapterId}
          }}
          articleNavigationConfig={{
            route: Route.ScenarioReferenceBookChaptersArticleDetail,
            payload: {
              scenarioId: urlParams.scenarioId,
              referenceBookChapterId: urlParams.referenceBookChapterId,
              articleId: urlParams?.articleId
            }
          }}
        />
      ) : (
        <NotFoundPage
          {...{
            ...(urlParams?.scenarioId
              ? {
                  homeRoute: Route.ScenarioReferenceBookChaptersSelection,
                  urlParams: {scenarioId: urlParams.scenarioId}
                }
              : {homeRoute: Route.Scenarios})
          }}
        />
      )
    case Route.ScenarioReferenceBookChaptersSelection:
      return urlParams?.scenarioId ? (
        <ReferenceBookChaptersSelection scenarioId={urlParams.scenarioId} />
      ) : (
        <CreateScenarioModal />
      )
    case Route.ScenarioSampleCompanySelection:
      return urlParams?.scenarioId ? (
        <SampleCompanySelection scenarioId={urlParams.scenarioId} />
      ) : (
        <CreateScenarioModal />
      )
    case Route.ScenarioSampleCompanySelectionPlaceholder:
      return <SampleCompanySelectionPlaceholderContainer scenarioId={urlParams?.scenarioId} />
    case Route.ScenarioSampleCompanyDetail:
      return (
        <SampleCompanyDetailView
          navigationButtonConfig={{
            route: Route.ScenarioSampleCompanySelection,
            payload: {scenarioId: urlParams?.scenarioId}
          }}
          hideSubHeaderOperationButton={true}
          sampleCompanyId={urlParams?.sampleCompanyId}
        />
      )
    case Route.ScenarioAssignedSampleCompanyDetail:
      return (
        <SelectedSampleCompanyContainer
          scenarioId={urlParams?.scenarioId}
          sampleCompanyId={urlParams?.sampleCompanyId}
        />
      )
    case Route.ScenarioAssignedSampleCompanyDocuments:
    case Route.ScenarioAssignedSampleCompanyDocumentsDetails:
    case Route.ScenarioAssignedSampleCompanyDocumentsDetailsFile:
      return (
        <SampleCompanyDocuments
          scenarioId={urlParams?.scenarioId}
          directoryId={urlParams?.directoryId}
          fileId={urlParams?.fileId}
          sampleCompanyId={urlParams?.sampleCompanyId}
          subRouteConfig={{
            backRoute: Route.ScenarioAssignedSampleCompanyDetail,
            directoriesRoute: Route.ScenarioAssignedSampleCompanyDocumentsDetails,
            filesRoute: Route.ScenarioAssignedSampleCompanyDocumentsDetailsFile
          }}
        />
      )
    case Route.ScenarioAssignedSampleCompanyDomainSignature:
      return (
        <SampleCompanyDomainSignature
          sampleCompanyId={urlParams?.sampleCompanyId}
          navigationButtonConfig={{
            route: Route.ScenarioAssignedSampleCompanyDetail,
            payload: {scenarioId: urlParams?.scenarioId, sampleCompanyId: urlParams?.sampleCompanyId}
          }}
        />
      )

    case Route.ScenarioCreation:
      return (
        <React.Fragment>
          <ScenarioOverview />
          <CreateScenarioModal />
        </React.Fragment>
      )
    // Manager Mode
    case Route.Projects:
      return <Projects />
    case Route.ProjectCreation:
      return (
        <React.Fragment>
          <Projects />
          <CreateProjectModal />
        </React.Fragment>
      )
    case Route.ProjectDetail:
      return urlParams?.id ? <ProjectDetail projectId={urlParams.id} /> : <CreateProjectModal />
    case Route.ScenarioSelectionDetail:
      return urlParams?.id && urlParams.scenarioId ? (
        <ScenarioSelectionDetail projectId={urlParams.id} scenarioId={urlParams.scenarioId} />
      ) : (
        <CreateProjectModal />
      )
    case Route.ScenarioSelection:
      return urlParams?.id ? <ScenarioSelection projectId={urlParams.id} /> : <CreateProjectModal />
    case Route.QuestionnaireSelectionDetailQuestion:
    case Route.QuestionnaireSelectionDetail:
      return urlParams?.id && urlParams?.questionnaireId ? (
        <ProjectQuestionnaireSelectionDetail
          questionnaireId={urlParams.questionnaireId}
          projectId={urlParams.id}
          questionId={urlParams?.questionId}
        />
      ) : (
        <CreateProjectModal />
      )
    case Route.QuestionnaireSelection:
      return urlParams?.id ? <ProjectQuestionnaireSelection projectId={urlParams.id} /> : <CreateProjectModal />
    case Route.SurveyCreation:
      return urlParams?.id ? (
        <React.Fragment>
          <ProjectDetail projectId={urlParams.id} />
          <SurveyFormModal projectId={urlParams.id} />
        </React.Fragment>
      ) : (
        <CreateProjectModal />
      )
    case Route.TestSurveyCreation:
      return urlParams?.id ? (
        <React.Fragment>
          <ProjectDetail projectId={urlParams.id} />
          <SurveyFormModal projectId={urlParams.id} createTestSurvey={true} />
        </React.Fragment>
      ) : (
        <CreateProjectModal />
      )
    case Route.SurveyDetail:
      return urlParams?.id && urlParams?.surveyId ? (
        <SurveyDetail projectId={urlParams.id} surveyId={urlParams.surveyId} />
      ) : (
        <Projects />
      )
    case Route.SurveyEdit:
      return urlParams?.id && urlParams?.surveyId ? (
        <React.Fragment>
          <SurveyDetail projectId={urlParams.id} surveyId={urlParams.surveyId} />
          <SurveyFormModal projectId={urlParams.id} surveyId={urlParams.surveyId} />
        </React.Fragment>
      ) : (
        <Projects />
      )

    // SURVEY MONITORING
    case SharedRoute.SurveyMonitoring:
    case Route.SurveyMonitoringModule:
      return urlParams?.projectId && urlParams?.surveyId ? (
        <Monitoring surveyId={urlParams.surveyId} projectId={urlParams.projectId}>
          <MonitoringDashboard
            surveyId={urlParams.surveyId}
            projectId={urlParams.projectId}
            moduleId={urlParams.moduleId}
          />
        </Monitoring>
      ) : (
        <Projects />
      )
    case Route.SurveyMonitoringParticipant:
      return urlParams?.projectId && urlParams?.surveyId && urlParams.surveyInvitationId ? (
        <Monitoring
          surveyId={urlParams.surveyId}
          projectId={urlParams.projectId}
          headerConfig={{
            returnTo: {
              text: t("dashboard__participant_header_navigate_back_label"),
              route: SharedRoute.SurveyMonitoring,
              params: {projectId: urlParams.projectId, surveyId: urlParams.surveyId}
            },
            title: t("dashboard__participant_header_label"),
            buttonText: t("projects__surveys_details_navigate_label"),
            onButtonClick: () =>
              dispatch(
                navigateToRouteAction(Route.SurveyDetail, {
                  id: urlParams.projectId,
                  surveyId: urlParams.surveyId
                })
              ),
            buttonVariant: ButtonVariant.Secondary
          }}>
          <ParticipantOverview
            surveyId={urlParams.surveyId}
            projectId={urlParams.projectId}
            surveyInvitationId={urlParams.surveyInvitationId}
            navigateToScenarioDetail={(scenarioId: UUID) =>
              dispatch(
                navigateToRouteAction(Route.SurveyMonitoringParticipantScenario, {
                  projectId: urlParams.projectId,
                  surveyId: urlParams.surveyId,
                  surveyInvitationId: urlParams.surveyInvitationId,
                  scenarioId
                })
              )
            }
            navigateToQuestionnaireDetail={(questionnaireId: UUID) =>
              dispatch(
                navigateToRouteAction(Route.SurveyMonitoringParticipantQuestionnaire, {
                  projectId: urlParams.projectId,
                  surveyId: urlParams.surveyId,
                  surveyInvitationId: urlParams.surveyInvitationId,
                  questionnaireId
                })
              )
            }
          />
        </Monitoring>
      ) : (
        <Projects />
      )
    case Route.SurveyMonitoringParticipantQuestionnaire:
      return urlParams?.projectId &&
        urlParams?.surveyId &&
        urlParams?.surveyInvitationId &&
        urlParams?.questionnaireId ? (
        <Monitoring
          surveyId={urlParams.surveyId}
          projectId={urlParams.projectId}
          headerConfig={{
            returnTo: {
              text: t("dashboard__participant_header_navigate_back_label"),
              route: SharedRoute.SurveyMonitoring,
              params: {projectId: urlParams.projectId, surveyId: urlParams.surveyId}
            },
            title: t("dashboard__participant_header_label"),
            buttonText: t("projects__surveys_details_navigate_label"),
            onButtonClick: () =>
              dispatch(
                navigateToRouteAction(Route.SurveyDetail, {
                  id: urlParams.projectId,
                  surveyId: urlParams.surveyId
                })
              ),
            buttonVariant: ButtonVariant.Secondary
          }}>
          <ParticipantQuestionnaireDetailContainer
            projectId={urlParams?.projectId}
            surveyId={urlParams?.surveyId}
            surveyInvitationId={urlParams?.surveyInvitationId}
            questionnaireId={urlParams?.questionnaireId}
            onNavigateBack={() =>
              dispatch(
                navigateToRouteAction(Route.SurveyMonitoringParticipant, {
                  projectId: urlParams.projectId,
                  surveyId: urlParams.surveyId,
                  surveyInvitationId: urlParams.surveyInvitationId
                })
              )
            }
          />
        </Monitoring>
      ) : (
        <Projects />
      )
    case Route.SurveyMonitoringParticipantScenario:
      return urlParams?.surveyId && urlParams?.projectId && urlParams?.surveyInvitationId && urlParams?.scenarioId ? (
        <Monitoring
          surveyId={urlParams.surveyId}
          projectId={urlParams.projectId}
          headerConfig={{
            returnTo: {
              text: t("dashboard__participant_header_navigate_back_label"),
              route: SharedRoute.SurveyMonitoring,
              params: {projectId: urlParams.projectId, surveyId: urlParams.surveyId}
            },
            title: t("dashboard__participant_header_label"),
            buttonText: t("projects__surveys_details_navigate_label"),
            onButtonClick: () =>
              dispatch(
                navigateToRouteAction(Route.SurveyDetail, {
                  id: urlParams.projectId,
                  surveyId: urlParams.surveyId
                })
              ),
            buttonVariant: ButtonVariant.Secondary
          }}>
          <ParticipantScenarioDetailContainer
            projectId={urlParams.projectId}
            surveyId={urlParams.surveyId}
            invitationId={urlParams.surveyInvitationId}
            scenarioId={urlParams.scenarioId}
            onNavigateBack={() =>
              dispatch(
                navigateToRouteAction(Route.SurveyMonitoringParticipant, {
                  projectId: urlParams.projectId,
                  surveyId: urlParams.surveyId,
                  surveyInvitationId: urlParams.surveyInvitationId
                })
              )
            }
          />
        </Monitoring>
      ) : (
        <NotFoundPage homeRoute={Route.Scenarios} />
      )
    // SURVEY MONITORING -- END

    case Route.RatingSurveyModuleAttendee:
    case Route.RatingSurveyModuleAttendeeQuestion:
      return urlParams?.projectId && urlParams?.surveyId && urlParams?.moduleId && urlParams?.surveyInvitationId ? (
        <RatingDetailQuestionnaire
          projectId={urlParams?.projectId}
          surveyId={urlParams?.surveyId}
          moduleId={urlParams?.moduleId}
          surveyInvitationId={urlParams?.surveyInvitationId}
          questionId={urlParams?.questionId}
          navigateTo={navigateTo}
        />
      ) : (
        <Projects />
      )
    case Route.RatingSurveyModuleAttendeeScenario:
      return urlParams?.projectId && urlParams?.surveyId && urlParams?.moduleId && urlParams?.surveyInvitationId ? (
        <RatingDetailScenarioContainer
          projectId={urlParams?.projectId}
          surveyId={urlParams?.surveyId}
          moduleId={urlParams?.moduleId}
          surveyInvitationId={urlParams?.surveyInvitationId}
          dimensionId={urlParams?.dimensionId}
          navigateTo={navigateTo}
        />
      ) : (
        <Projects />
      )

    case Route.ScenarioFiles:
      return (
        <FilesAndDirectories
          selectedDirectoryId={Option.none()}
          selectedFileId={Option.none()}
          scenarioId={urlParams?.scenarioId}
        />
      )
    case Route.ScenarioFilesDetail:
      return (
        <FilesAndDirectories
          selectedDirectoryId={Option.none()}
          selectedFileId={Option.of(urlParams?.fileId)}
          scenarioId={urlParams?.scenarioId}
        />
      )
    case Route.ScenarioDirectoriesDetail:
      return (
        <FilesAndDirectories
          selectedDirectoryId={Option.of(urlParams?.directoryId)}
          selectedFileId={Option.none()}
          scenarioId={urlParams?.scenarioId}
        />
      )
    case Route.ScenarioQuestionnaireDetail:
    case Route.ScenarioQuestionnaireDetailQuestion:
      return urlParams?.scenarioId ? (
        <ScenarioQuestionnaireSelectionDetail
          questionnaireId={urlParams?.questionnaireId}
          scenarioId={urlParams?.scenarioId}
          questionId={urlParams?.questionId}
        />
      ) : (
        <ScenarioOverview />
      )
    case Route.ScenarioQuestionnaireSelection:
      return urlParams?.scenarioId ? (
        <QuestionnaireSelection scenarioId={urlParams?.scenarioId} isRuntimeSurvey />
      ) : (
        <ScenarioOverview />
      )
    case Route.UserManagement:
      return <UserManagementDetailContainer />

    // SURVEY SCORING
    case Route.SurveyScoring:
      return urlParams?.projectId && urlParams?.surveyId ? (
        <Scoring projectId={urlParams.projectId} surveyId={urlParams.surveyId}>
          <ScoringDashboard projectId={urlParams.projectId} surveyId={urlParams.surveyId} />
        </Scoring>
      ) : (
        <NotFoundPage homeRoute={Route.Scenarios} />
      )
    case Route.SurveyScoringParticipant:
      return urlParams?.projectId && urlParams?.surveyId && urlParams?.surveyInvitationId ? (
        <Scoring
          projectId={urlParams.projectId}
          surveyId={urlParams.surveyId}
          headerConfig={{
            returnTo: {
              text: t("dashboard__progress_scoring_title"),
              route: Route.SurveyScoring,
              params: {projectId: urlParams.projectId, surveyId: urlParams.surveyId}
            },
            title: t("dashboard__participant_header_label"),
            buttonText: t("projects__surveys_details_navigate_label"),
            onButtonClick: () =>
              dispatch(
                navigateToRouteAction(Route.SurveyDetail, {
                  id: urlParams.projectId,
                  surveyId: urlParams.surveyId
                })
              ),
            buttonVariant: ButtonVariant.Secondary
          }}>
          <ParticipantOverview
            surveyId={urlParams.surveyId}
            projectId={urlParams.projectId}
            surveyInvitationId={urlParams.surveyInvitationId}
            navigateToScenarioDetail={(scenarioId: UUID) =>
              dispatch(
                navigateToRouteAction(Route.SurveyScoringParticipantScenario, {
                  projectId: urlParams.projectId,
                  surveyId: urlParams.surveyId,
                  surveyInvitationId: urlParams.surveyInvitationId,
                  scenarioId
                })
              )
            }
            navigateToQuestionnaireDetail={(questionnaireId: UUID) =>
              dispatch(
                navigateToRouteAction(Route.SurveyScoringParticipantQuestionnaire, {
                  projectId: urlParams.projectId,
                  surveyId: urlParams.surveyId,
                  surveyInvitationId: urlParams.surveyInvitationId,
                  questionnaireId
                })
              )
            }
          />
        </Scoring>
      ) : (
        <NotFoundPage homeRoute={Route.Scenarios} />
      )
    case Route.SurveyScoringParticipantScenario:
      return urlParams?.projectId && urlParams?.surveyId && urlParams?.surveyInvitationId && urlParams?.scenarioId ? (
        <Scoring
          projectId={urlParams.projectId}
          surveyId={urlParams.surveyId}
          headerConfig={{
            returnTo: {
              text: t("dashboard__progress_scoring_title"),
              route: Route.SurveyScoring,
              params: {projectId: urlParams.projectId, surveyId: urlParams.surveyId}
            },
            title: t("dashboard__participant_header_label"),
            buttonText: t("projects__surveys_details_navigate_label"),
            onButtonClick: () =>
              dispatch(
                navigateToRouteAction(Route.SurveyDetail, {
                  id: urlParams.projectId,
                  surveyId: urlParams.surveyId
                })
              ),
            buttonVariant: ButtonVariant.Secondary
          }}>
          <ParticipantScenarioDetailContainer
            projectId={urlParams.projectId}
            surveyId={urlParams.surveyId}
            scenarioId={urlParams.scenarioId}
            invitationId={urlParams.surveyInvitationId}
            onNavigateBack={() =>
              dispatch(
                navigateToRouteAction(Route.SurveyScoringParticipant, {
                  projectId: urlParams.projectId,
                  surveyId: urlParams.surveyId,
                  surveyInvitationId: urlParams.surveyInvitationId
                })
              )
            }
          />
        </Scoring>
      ) : (
        <Projects />
      )
    case Route.SurveyScoringParticipantQuestionnaire:
      return urlParams?.projectId &&
        urlParams?.surveyId &&
        urlParams?.surveyInvitationId &&
        urlParams?.questionnaireId ? (
        <Scoring
          projectId={urlParams.projectId}
          surveyId={urlParams.surveyId}
          headerConfig={{
            returnTo: {
              text: t("dashboard__progress_scoring_title"),
              route: Route.SurveyScoring,
              params: {projectId: urlParams.projectId, surveyId: urlParams.surveyId}
            },
            title: t("dashboard__participant_header_label"),
            buttonText: t("projects__surveys_details_navigate_label"),
            onButtonClick: () =>
              dispatch(
                navigateToRouteAction(Route.SurveyDetail, {
                  id: urlParams.projectId,
                  surveyId: urlParams.surveyId
                })
              ),
            buttonVariant: ButtonVariant.Secondary
          }}>
          <ParticipantQuestionnaireDetailContainer
            projectId={urlParams?.projectId}
            surveyId={urlParams?.surveyId}
            surveyInvitationId={urlParams?.surveyInvitationId}
            questionnaireId={urlParams?.questionnaireId}
            onNavigateBack={() =>
              dispatch(
                navigateToRouteAction(Route.SurveyScoringParticipant, {
                  projectId: urlParams.projectId,
                  surveyId: urlParams.surveyId,
                  surveyInvitationId: urlParams.surveyInvitationId
                })
              )
            }
          />
        </Scoring>
      ) : (
        <Projects />
      )
    // SURVEY SCORING -- END

    case SharedRoute.RatingOverviewSurveyModuleParticipantQuestionnaire:
    case SharedRoute.RatingOverviewSurveyModuleParticipantQuestionnaireQuestion:
    case Route.SurveyMonitoringParticipantQuestionnaireScoring:
      return urlParams?.id && urlParams?.surveyId && urlParams?.surveyInvitationId && urlParams?.moduleId ? (
        <RatingDetailQuestionnaire
          backButtonConfig={
            activeRoute === Route.SurveyMonitoringParticipantQuestionnaireScoring
              ? {
                  labelKey: "dashboard__participant_header_label",
                  onClick: () =>
                    dispatch(
                      navigateToRouteAction(Route.SurveyMonitoringParticipantQuestionnaire, {
                        projectId: urlParams.id,
                        surveyId: urlParams.surveyId,
                        surveyInvitationId: urlParams.surveyInvitationId,
                        questionnaireId: urlParams?.questionnaireId
                      })
                    )
                }
              : {
                  labelKey: "dashboard__progress_scoring_title",
                  onClick: () =>
                    dispatch(
                      navigateToRouteAction(Route.SurveyScoring, {
                        projectId: urlParams.id,
                        surveyId: urlParams.surveyId
                      })
                    )
                }
          }
          projectId={urlParams.id}
          surveyId={urlParams.surveyId}
          moduleId={urlParams.moduleId}
          surveyInvitationId={urlParams.surveyInvitationId}
          questionId={urlParams.questionId}
          navigateTo={(route: Route | SharedRoute, payload?: Payload) =>
            navigateTo(
              activeRoute === Route.SurveyMonitoringParticipantQuestionnaireScoring
                ? Route.SurveyMonitoringParticipantScenarioScoring
                : route,
              payload
            )
          }
        />
      ) : (
        <NotFoundPage homeRoute={Route.Scenarios} />
      )
    case SharedRoute.RatingOverviewSurveyModuleParticipantQuestionnaireNormalRater:
    case SharedRoute.RatingOverviewSurveyModuleParticipantQuestionnaireQuestionNormalRater:
      return urlParams?.id && urlParams?.surveyId && urlParams?.surveyInvitationId && urlParams?.moduleId ? (
        <RatingDetailQuestionnaire
          backButtonConfig={{
            labelKey: "rater_rating_details__header_label",
            onClick: () => dispatch(navigateToRouteAction(Route.RaterRatingDetails, {surveyId: urlParams.surveyId}))
          }}
          projectId={urlParams.id}
          surveyId={urlParams.surveyId}
          moduleId={urlParams.moduleId}
          surveyInvitationId={urlParams.surveyInvitationId}
          questionId={urlParams.questionId}
          mode={RaterMode.Rater}
          navigateTo={navigateTo}
        />
      ) : (
        <NotFoundPage homeRoute={Route.RaterRatingOverview} />
      )
    case SharedRoute.RatingOverviewSurveyModuleParticipantScenario:
    case SharedRoute.RatingOverviewSurveyModuleParticipantScenarioDimension:
    case Route.SurveyMonitoringParticipantScenarioScoring:
      return urlParams?.id && urlParams?.surveyId && urlParams?.surveyInvitationId && urlParams?.moduleId ? (
        <RatingDetailScenarioContainer
          backButtonConfig={
            activeRoute === Route.SurveyMonitoringParticipantScenarioScoring
              ? {
                  labelKey: "dashboard__participant_header_label",
                  onClick: () =>
                    dispatch(
                      navigateToRouteAction(Route.SurveyMonitoringParticipantScenario, {
                        projectId: urlParams.id,
                        surveyId: urlParams.surveyId,
                        surveyInvitationId: urlParams.surveyInvitationId,
                        scenarioId: urlParams?.scenarioId
                      })
                    )
                }
              : {
                  labelKey: "dashboard__progress_scoring_title",
                  onClick: () =>
                    dispatch(
                      navigateToRouteAction(Route.SurveyScoring, {
                        projectId: urlParams.id,
                        surveyId: urlParams.surveyId
                      })
                    )
                }
          }
          projectId={urlParams.id}
          surveyId={urlParams.surveyId}
          moduleId={urlParams.moduleId}
          surveyInvitationId={urlParams.surveyInvitationId}
          dimensionId={urlParams.dimensionId}
          navigateTo={(route: Route | SharedRoute, payload?: Payload) =>
            navigateTo(
              activeRoute === Route.SurveyMonitoringParticipantScenarioScoring
                ? Route.SurveyMonitoringParticipantQuestionnaireScoring
                : route,
              payload
            )
          }
        />
      ) : (
        <NotFoundPage homeRoute={Route.Scenarios} />
      )
    case SharedRoute.RatingOverviewSurveyModuleParticipantScenarioOverview:
      return urlParams?.id && urlParams?.surveyId && urlParams?.surveyInvitationId && urlParams?.moduleId ? (
        <RatingDetailScenarioContainer
          backButtonConfig={{
            labelKey: "dashboard__progress_scoring_title",
            onClick: () =>
              dispatch(
                navigateToRouteAction(Route.SurveyScoring, {projectId: urlParams.id, surveyId: urlParams.surveyId})
              )
          }}
          projectId={urlParams.id}
          surveyId={urlParams.surveyId}
          moduleId={urlParams.moduleId}
          surveyInvitationId={urlParams.surveyInvitationId}
          dimensionId={urlParams.dimensionId}
          isOverview={true}
          navigateTo={navigateTo}
        />
      ) : (
        <NotFoundPage homeRoute={Route.Scenarios} />
      )
    case SharedRoute.RatingOverviewSurveyModuleParticipantScenarioNormalRater:
    case SharedRoute.RatingOverviewSurveyModuleParticipantScenarioDimensionNormalRater:
      return urlParams?.id && urlParams?.surveyId && urlParams?.surveyInvitationId && urlParams?.moduleId ? (
        <RatingDetailScenarioContainer
          backButtonConfig={{
            labelKey: "rater_rating_details__header_label",
            onClick: () => dispatch(navigateToRouteAction(Route.RaterRatingDetails, {surveyId: urlParams.surveyId}))
          }}
          projectId={urlParams.id}
          surveyId={urlParams.surveyId}
          moduleId={urlParams.moduleId}
          surveyInvitationId={urlParams.surveyInvitationId}
          dimensionId={urlParams.dimensionId}
          mode={RaterMode.Rater}
          navigateTo={navigateTo}
        />
      ) : (
        <NotFoundPage homeRoute={Route.RaterRatingOverview} />
      )
    case SharedRoute.RatingOverviewSurveyModuleParticipantScenarioOverviewNormalRater:
      return urlParams?.id && urlParams?.surveyId && urlParams?.surveyInvitationId && urlParams?.moduleId ? (
        <RatingDetailScenarioContainer
          backButtonConfig={{
            labelKey: "rater_rating_details__header_label",
            onClick: () => dispatch(navigateToRouteAction(Route.RaterRatingDetails, {surveyId: urlParams.surveyId}))
          }}
          projectId={urlParams.id}
          surveyId={urlParams.surveyId}
          moduleId={urlParams.moduleId}
          surveyInvitationId={urlParams.surveyInvitationId}
          dimensionId={urlParams.dimensionId}
          mode={RaterMode.Rater}
          isOverview={true}
          navigateTo={navigateTo}
        />
      ) : (
        <NotFoundPage homeRoute={Route.RaterRatingOverview} />
      )

    case Route.RaterRatingOverview:
      return <RaterRatingOverview />
    case Route.RaterRatingDetails:
      return urlParams?.surveyId ? (
        <RaterRatingDetailView surveyId={urlParams.surveyId} />
      ) : (
        <NotFoundPage homeRoute={Route.RaterRatingOverview} />
      )
    case Route.SurveyReportingScenario:
      return urlParams?.surveyId && urlParams?.projectId && urlParams?.scenarioId && urlParams?.projectModuleId ? (
        <React.Fragment>
          <ReportingDashboardContainer
            surveyId={urlParams.surveyId}
            projectId={urlParams.projectId}
            scenarioId={urlParams.scenarioId}
            projectModuleId={urlParams.projectModuleId}
          />
        </React.Fragment>
      ) : (
        <NotFoundPage homeRoute={Route.Scenarios} />
      )
    case Route.SurveyReportingQuestionnaire:
      return urlParams?.surveyId && urlParams?.projectId && urlParams?.questionnaireId && urlParams?.projectModuleId ? (
        <React.Fragment>
          <ReportingDashboardContainer
            surveyId={urlParams.surveyId}
            projectId={urlParams.projectId}
            questionnaireId={urlParams.questionnaireId}
            projectModuleId={urlParams.projectModuleId}
          />
        </React.Fragment>
      ) : (
        <NotFoundPage homeRoute={Route.Scenarios} />
      )
    case Route.SurveyReporting:
    case Route.SurveyReportingModule:
    case Route.SurveyReportingModuleScoringOverlay:
      return urlParams?.surveyId && urlParams?.projectId ? (
        <React.Fragment>
          <ReportingDashboardContainer
            surveyId={urlParams.surveyId}
            projectId={urlParams.projectId}
            projectModuleId={urlParams.projectModuleId}
          />
        </React.Fragment>
      ) : (
        <NotFoundPage homeRoute={Route.Scenarios} />
      )
    case Route.SurveyReportingParticipant:
      return urlParams?.surveyId && urlParams?.projectId && urlParams.surveyInvitationId ? (
        <Reporting
          surveyId={urlParams.surveyId}
          projectId={urlParams.projectId}
          headerConfig={{
            returnTo: {
              text: t("reporting__header_label"),
              route:
                urlParams.query?.fromModuleId && urlParams.query?.fromScenarioId
                  ? Route.SurveyReportingScenario
                  : urlParams.query?.fromModuleId && urlParams.query?.fromQuestionnaireId
                  ? Route.SurveyReportingQuestionnaire
                  : Route.SurveyReporting,
              params: {
                projectId: urlParams.projectId,
                surveyId: urlParams.surveyId,
                projectModuleId: urlParams.query?.fromModuleId,
                scenarioId: urlParams.query?.fromScenarioId,
                questionnaireId: urlParams.query?.fromQuestionnaireId
              }
            },
            title: t("dashboard__participant_header_label")
          }}>
          <ParticipantOverview
            projectId={urlParams.projectId}
            surveyId={urlParams.surveyId}
            surveyInvitationId={urlParams.surveyInvitationId}
            navigateToQuestionnaireDetail={questionnaireId =>
              dispatch(
                navigateToRouteAction(Route.SurveyReportingParticipantQuestionnaire, {
                  projectId: urlParams.projectId,
                  surveyId: urlParams.surveyId,
                  surveyInvitationId: urlParams.surveyInvitationId,
                  questionnaireId
                })
              )
            }
            navigateToScenarioDetail={scenarioId =>
              dispatch(
                navigateToRouteAction(Route.SurveyReportingParticipantScenario, {
                  projectId: urlParams.projectId,
                  surveyId: urlParams.surveyId,
                  surveyInvitationId: urlParams.surveyInvitationId,
                  scenarioId
                })
              )
            }
          />
        </Reporting>
      ) : (
        <NotFoundPage homeRoute={Route.Projects} />
      )
    case Route.SurveyReportingParticipantScenario:
      return urlParams?.projectId && urlParams?.surveyId && urlParams?.surveyInvitationId && urlParams?.scenarioId ? (
        <Reporting
          projectId={urlParams.projectId}
          surveyId={urlParams.surveyId}
          headerConfig={{
            returnTo: {
              text: t("reporting__header_label"),
              route: urlParams.query?.fromModuleId ? Route.SurveyReportingScenario : Route.SurveyReporting,
              params: {
                projectId: urlParams.projectId,
                surveyId: urlParams.surveyId,
                projectModuleId: urlParams.query?.fromModuleId,
                scenarioId: urlParams.scenarioId
              }
            },
            title: t("dashboard__participant_header_label")
          }}>
          <ParticipantScenarioDetailContainer
            projectId={urlParams.projectId}
            surveyId={urlParams.surveyId}
            invitationId={urlParams.surveyInvitationId}
            scenarioId={urlParams.scenarioId}
            onNavigateBack={() =>
              dispatch(
                navigateToRouteAction(Route.SurveyReportingParticipant, {
                  projectId: urlParams.projectId,
                  surveyId: urlParams.surveyId,
                  surveyInvitationId: urlParams.surveyInvitationId,
                  query: {fromModuleId: urlParams.query?.fromModuleId, fromScenarioId: urlParams.scenarioId}
                })
              )
            }
          />
        </Reporting>
      ) : (
        <NotFoundPage homeRoute={Route.Projects} />
      )
    case Route.SurveyReportingParticipantQuestionnaire:
      return urlParams?.projectId &&
        urlParams?.surveyId &&
        urlParams?.surveyInvitationId &&
        urlParams?.questionnaireId ? (
        <Reporting
          projectId={urlParams.projectId}
          surveyId={urlParams.surveyId}
          headerConfig={{
            returnTo: {
              text: t("reporting__header_label"),
              route: urlParams.query?.fromModuleId ? Route.SurveyReportingQuestionnaire : Route.SurveyReporting,
              params: {
                projectId: urlParams.projectId,
                surveyId: urlParams.surveyId,
                projectModuleId: urlParams.query?.fromModuleId,
                questionnaireId: urlParams.questionnaireId
              }
            },
            title: t("dashboard__participant_header_label")
          }}>
          <ParticipantQuestionnaireDetailContainer
            projectId={urlParams.projectId}
            surveyId={urlParams.surveyId}
            surveyInvitationId={urlParams.surveyInvitationId}
            questionnaireId={urlParams.questionnaireId}
            onNavigateBack={() =>
              dispatch(
                navigateToRouteAction(Route.SurveyReportingParticipant, {
                  projectId: urlParams.projectId,
                  surveyId: urlParams.surveyId,
                  surveyInvitationId: urlParams.surveyInvitationId,
                  query: {fromModuleId: urlParams.query?.fromModuleId, fromQuestionnaireId: urlParams.questionnaireId}
                })
              )
            }
          />
        </Reporting>
      ) : (
        <NotFoundPage homeRoute={Route.Projects} />
      )

    case Route.RScripts:
      return <RScriptsContainer rScriptId={Option.none()} />
    case Route.RScriptsDetail:
      return <RScriptsContainer rScriptId={Option.of(urlParams?.rScriptId)} />

    default:
      return <NotFoundPage homeRoute={Route.Scenarios} />
  }
}
