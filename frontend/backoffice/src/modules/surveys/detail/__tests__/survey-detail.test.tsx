import {MockedProvider} from "@apollo/client/testing"
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {
  Card,
  CardContent,
  CardFooter,
  Content,
  ContentBottomActionbar,
  ContentLoadingIndicator,
  ContentMissingIndicator,
  DeleteOrArchiveEntityButton,
  DetailViewHeader,
  LoadingIndicator,
  ReadonlyActionField
} from "shared/components"
import {projectsMock, surveysMock, userAccountsMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import {mockedFormMethods} from "sharedTests/utils/form-methods-mock"
import {OverlayEditField} from "../../../../components"
import {surveyResultsOverviewMock} from "../../../../graphql/__mocks__"
import {DashboardActionFooter, SurveyProgress} from "../../../dashboard/common"
import * as projectDetailHook from "../hooks/use-survey-detail"
import {UseSurveyDetailHook} from "../hooks/use-survey-detail"
import {InviteSurveyAttendeesModalContainer} from "../invite-attendees/invite-survey-attendees-modal-container"
import {SurveyDetail} from "../survey-detail"
import {SurveyDetailDataDownload} from "../survey-detail-data-download/survey-detail-data-download"
import {SurveyDetailSettings} from "../survey-detail-settings/survey-detail-settings"

const survey = surveysMock[0]
const project = projectsMock[0]

const hookValuesDefault: UseSurveyDetailHook = {
  survey: Option.of(survey),
  project: Option.of(project),
  author: Option.of(project.author),
  dataLoading: false,
  formMethods: mockedFormMethods,
  inviteAttendeesModalVisible: false,
  isEditable: true,
  navigateToDashboard: jest.fn(),
  navigateToProjectDetail: jest.fn(),
  navigateToReportingOverview: jest.fn(),
  navigateToSurveyUpdate: jest.fn(),
  toggleInviteAttendeesModal: jest.fn(),
  navigateToRatingOverview: jest.fn(),
  updateInProgress: false,
  updateSurvey: jest.fn(),
  surveyResultsOverview: Option.of(surveyResultsOverviewMock),
  isRatingFinalized: false,
  isInvitationEnabled: false,
  raters: userAccountsMock,
  completedParticipantsCount: {
    numCompletedParticipants: 3,
    totalParticipants: 6
  }
}

const stateSpy = jest.spyOn(projectDetailHook, "useSurveyDetail")
const getComponent = () => (
  <MockedProvider>
    <SurveyDetail projectId={project.id} surveyId={survey.id} />
  </MockedProvider>
)

describe("survey-detail", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (with project)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = mount(getComponent())
    expect(component.find(Content)).toHaveLength(1)
    expect(component.find(ContentBottomActionbar)).toHaveLength(1)
    expect(component.find(DashboardActionFooter)).toHaveLength(1)
    expect(component.find(DetailViewHeader)).toHaveLength(1)
    expect(component.find(DetailViewHeader).find(DeleteOrArchiveEntityButton)).toHaveLength(1)
    expect(component.find(Card)).toHaveLength(6)
    expect(component.find(Card).find(CardContent)).toHaveLength(6)
    expect(component.find(Card).find(CardFooter)).toHaveLength(3)
    expect(component.find(Card).find(SurveyDetailSettings)).toHaveLength(1)
    expect(component.find(Card).find(SurveyDetailDataDownload)).toHaveLength(1)
    expect(component.find(Card).find(SurveyProgress)).toHaveLength(1)
    expect(component.find(OverlayEditField)).toHaveLength(1)
    expect(component.find(ReadonlyActionField)).toHaveLength(3)
  })
  it("has correct structure (loading)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, survey: Option.none(), dataLoading: true})

    const component = mount(getComponent())
    expect(component.find(ContentLoadingIndicator)).toHaveLength(1)
    expect(component.find(LoadingIndicator)).toHaveLength(1)
  })
  it("has correct structure (project not found)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, survey: Option.none()})

    const component = mount(getComponent())
    expect(component.find(ContentMissingIndicator)).toHaveLength(1)
  })
  it("has correct structure (inviteAttendeesModalVisible)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, inviteAttendeesModalVisible: true})

    const component = mount(getComponent())
    expect(component.find(Content)).toHaveLength(1)
    expect(component.find(ContentBottomActionbar)).toHaveLength(1)
    expect(component.find(DashboardActionFooter)).toHaveLength(1)
    expect(component.find(DetailViewHeader)).toHaveLength(1)
    expect(component.find(DetailViewHeader).find(DeleteOrArchiveEntityButton)).toHaveLength(1)
    expect(component.find(Card)).toHaveLength(6)
    expect(component.find(Card).find(CardContent)).toHaveLength(6)
    expect(component.find(Card).find(CardFooter)).toHaveLength(3)
    expect(component.find(Card).find(SurveyDetailSettings)).toHaveLength(1)
    expect(component.find(Card).find(SurveyDetailDataDownload)).toHaveLength(1)
    expect(component.find(Card).find(SurveyProgress)).toHaveLength(1)
    expect(component.find(OverlayEditField)).toHaveLength(1)
    expect(component.find(ReadonlyActionField)).toHaveLength(3)
    expect(component.find(InviteSurveyAttendeesModalContainer)).toHaveLength(1)
  })
})
