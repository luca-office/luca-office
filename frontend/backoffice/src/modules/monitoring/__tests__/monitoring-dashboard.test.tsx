// importing from direct file because of issues of babel loader and spyOn
import {MockedProvider} from "@apollo/client/testing"
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Card, CardContent, CardHeader} from "shared/components"
import {
  projectModulesMock,
  projectsMock,
  runtimeSurveyResultsMock,
  surveyInvitationsProgressMock,
  surveysMock
} from "shared/graphql/__mocks__"
import {ProjectModule} from "shared/models"
import {computeSurveyProgress, Option} from "shared/utils"
import {DonutChartWithLegend} from "../../../components"
import {MonitoringDashboard, MonitoringDashboardProps} from ".."
import * as hook from "../dashboard/hooks/use-monitoring-dashboard"
import {UseMonitoringDashboardHook} from "../dashboard/hooks/use-monitoring-dashboard"
import {ProjectProgressNavigation} from "../progress-navigation/project-progress-navigation"
import {ProgressTable} from "../progress-table/progress-table"

const hookValuesDefault: UseMonitoringDashboardHook = {
  survey: Option.of(surveysMock[0]),
  currentModuleOfSynchronSurvey: Option.none(),
  dataLoading: false,
  navigateToParticipantOverview: jest.fn,
  project: Option.of(projectsMock[0]),
  surveyProgress: computeSurveyProgress(projectModulesMock, Option.of(surveyInvitationsProgressMock)),
  scenarioCount: 1,
  questionnaireCount: 2,
  activeModuleIndex: 0,
  activeModule: Option.of<ProjectModule>(projectModulesMock[0]),
  projectModules: projectModulesMock,
  onlineCount: 0,
  selectedQuestionnaireId: null,
  runtimeSurveyResults: [runtimeSurveyResultsMock],
  scenarioQuestionnaires: [],
  setSelectedQuestionnaireId: jest.fn()
}

const getComponent = (props?: MonitoringDashboardProps) => (
  <MockedProvider>
    <MonitoringDashboard
      projectId={projectsMock[0].id}
      surveyId={surveysMock[0].id}
      moduleId={projectModulesMock[0].id}
      {...props}
    />
  </MockedProvider>
)

const stateSpy = jest.spyOn(hook, "useMonitoringDashboard")

describe("monitoring-dashboard", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (with survey)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = mount(getComponent())
    expect(component.find(ProjectProgressNavigation)).toHaveLength(1)
    expect(component.find(Card)).toHaveLength(4)
    expect(component.find(CardHeader)).toHaveLength(2)
    expect(component.find(CardContent)).toHaveLength(4)
    expect(component.find(DonutChartWithLegend)).toHaveLength(1)
    expect(component.find(ProgressTable)).toHaveLength(1)
  })
  it("has correct structure (without module)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, activeModule: Option.none()})

    const component = mount(getComponent())
    expect(component.find(ProjectProgressNavigation)).toHaveLength(1)
    expect(component.find(Card)).toHaveLength(4)
    expect(component.find(CardHeader)).toHaveLength(2)
    expect(component.find(CardContent)).toHaveLength(4)
    expect(component.find(DonutChartWithLegend)).toHaveLength(1)
    expect(component.find(ProgressTable)).toHaveLength(1)
  })
})
