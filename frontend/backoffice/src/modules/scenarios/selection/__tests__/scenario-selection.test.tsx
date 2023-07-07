import {MockedProvider} from "@apollo/client/testing"
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {DetailViewHeader, OverviewCard} from "shared/components"
import {checkLoginMock, projectScenariosMock, projectsMock, scenariosMock} from "shared/graphql/__mocks__"
import {checkLoginQuery} from "shared/graphql/queries"
import {CardOverview} from "../../../../components"
import {ModuleSelectionContainer} from "../../../common/module-selection/module-selection-container"
import * as scenarioOverviewHook from "../hooks/use-scenario-selection"
import {UseScenarioOverviewHook} from "../hooks/use-scenario-selection"
import {ScenarioSelection} from "../scenario-selection"

const testScenarios = [...scenariosMock, {...scenariosMock[0], finalizedAt: null, publishedAt: null}]
const hookValuesDefault: UseScenarioOverviewHook = {
  openSelectionDetail: jest.fn(),
  openProjectDetail: jest.fn(),
  alreadyAssignedScenarios: projectScenariosMock,
  saveScenarioAssignment: jest.fn(),
  scenarios: testScenarios,
  userMayFinalizeWithoutPublishing: true,
  isProjectFinalized: true
}
const projectId = projectsMock[0].id

const stateSpy = jest.spyOn(scenarioOverviewHook, "useScenarioSelection")

const getComponent = () => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: checkLoginQuery
        },
        result: {
          data: {
            checkLogin: checkLoginMock
          }
        }
      }
    ]}>
    <ScenarioSelection projectId={projectId} />
  </MockedProvider>
)

describe("scenario-selection", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (0 Scenario)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, scenarios: []})

    const component = mount(getComponent())
    const moduleSelectionContainer = component.find(ModuleSelectionContainer)
    expect(moduleSelectionContainer).toHaveLength(1)

    expect(moduleSelectionContainer.find(OverviewCard)).toHaveLength(0)
    expect(moduleSelectionContainer.find(CardOverview)).toHaveLength(1)
    expect(moduleSelectionContainer.find(DetailViewHeader)).toHaveLength(1)
  })
  it("has correct structure (2 finalized, published Scenario)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = mount(getComponent())
    const moduleSelectionContainer = component.find(ModuleSelectionContainer)
    expect(moduleSelectionContainer).toHaveLength(1)

    expect(moduleSelectionContainer.find(OverviewCard)).toHaveLength(
      testScenarios.filter(scenario => !!scenario.finalizedAt || !scenario.publishedAt).length + 1
    )
    expect(moduleSelectionContainer.find(DetailViewHeader)).toHaveLength(1)
  })
  it("has correct structure (test survey)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, isProjectFinalized: false})

    const component = mount(getComponent())
    const moduleSelectionContainer = component.find(ModuleSelectionContainer)
    expect(moduleSelectionContainer).toHaveLength(1)
    expect(moduleSelectionContainer.find(OverviewCard)).toHaveLength(testScenarios.length)
    expect(moduleSelectionContainer.find(DetailViewHeader)).toHaveLength(1)
  })
})
