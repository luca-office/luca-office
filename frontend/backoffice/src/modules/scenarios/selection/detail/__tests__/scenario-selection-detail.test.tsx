import {MockedProvider} from "@apollo/client/testing"
import {act} from "@testing-library/react"
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {ContentLoadingIndicator, ContentMissingIndicator, DetailViewHeader, LoadingIndicator} from "shared/components"
import {projectsMock, scenariosMock} from "shared/graphql/__mocks__"
import {UseUpdateScenarioHook} from "shared/graphql/hooks"
import * as useUpdateScenarioHook from "shared/graphql/hooks/mutations/scenario/use-update-scenario"
import {Scenario} from "shared/models"
import {Option} from "shared/utils"
import {getDateValueMock} from "sharedTests/utils/date-mock"
import wait from "waait"
import * as useScenarioDetailViewHook from "../../../detail/hooks/use-scenario-detail"
import {UseScenarioDetailHook} from "../../../detail/hooks/use-scenario-detail"
import {Information} from "../../../detail/information/information"
import {ScenarioSettings} from "../../../detail/settings/scenario-settings"
import {ScenarioSelectionDetail, ScenarioSelectionDetailProps} from "../scenario-selection-detail"

const scenario = scenariosMock[0]

const defaultProps: ScenarioSelectionDetailProps = {
  scenarioId: scenario.id,
  projectId: projectsMock[0].id
}

const scenarioDetailViewHookValuesDefault: UseScenarioDetailHook = {
  isFinalized: false,
  isPublished: false,
  codingModelConfig: {
    hasDimensionWithoutItem: false,
    hasHolisticItemsWithLessThanTwoCriteria: false,
    hasItemsWithoutCriteria: false,
    hasNoDimension: false
  },
  canBeFinalized: true,
  finalizeScenario: jest.fn(),
  isFinalizeScenarioLoading: false,
  isPublishScenarioLoading: false,
  navigateToOverview: jest.fn(),
  navigateToEmails: jest.fn(),
  navigateToReferenceBookChapters: jest.fn(),
  navigateToFilesAndDirectories: jest.fn(),
  navigateToSampleCompaniesSelection: jest.fn(),
  navigateToCodingModels: jest.fn(),
  navigateToInterventions: jest.fn(),
  scenario: Option.of(scenario),
  scenarioLoading: false,
  updateInProgress: false,
  updateScenario: jest.fn(),
  userMayFinalizeWithoutPublishing: false,
  publishScenario: jest.fn(),
  userMayArchive: false,
  settingsCounts: {
    directories: 5,
    emails: 12,
    files: 3,
    scenarioReferenceBooks: 7,
    filesSampleCompany: 0,
    events: 1,
    interventions: 0,
    codingDimensions: 3,
    erpRowCount: 1
  },
  scenarioContributorsCount: 0,
  navigateToSelection: jest.fn(),
  duplicateScenarioLoading: false,
  canBeDuplicated: false,
  duplicateScenario: jest.fn(),
  navigateToEvents: jest.fn(),
  navigateToPreview: jest.fn()
}

const updateScenarioHookValuesDefault: UseUpdateScenarioHook = {
  updateScenario: jest.fn(() => Promise.resolve(Option.of(scenario))),
  isUpdateScenarioLoading: false
}

const scenarioDetailViewStateSpy = jest.spyOn(useScenarioDetailViewHook, "useScenarioDetail")
const updateScenarioStateSpy = jest.spyOn(useUpdateScenarioHook, "useUpdateScenario")

describe("scenario-detail", () => {
  const _Date = Date
  beforeEach(() => {
    const mockDate = getDateValueMock(1970, 1, 1)
    Date = mockDate
  })
  afterEach(() => {
    Date = _Date
  })
  it("renders correctly", async () => {
    scenarioDetailViewStateSpy.mockReturnValue(scenarioDetailViewHookValuesDefault)
    updateScenarioStateSpy.mockReturnValue(updateScenarioHookValuesDefault)
    const component = create(
      <MockedProvider>
        <ScenarioSelectionDetail {...defaultProps} />
      </MockedProvider>
    )
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly finalized", async () => {
    scenarioDetailViewStateSpy.mockReturnValue({
      ...scenarioDetailViewHookValuesDefault,
      scenario: Option.of(({...scenariosMock[0], finalizedAt: "2020-05-05"} as unknown) as Scenario)
    })
    updateScenarioStateSpy.mockReturnValue(updateScenarioHookValuesDefault)
    const component = create(
      <MockedProvider>
        <ScenarioSelectionDetail {...defaultProps} />
      </MockedProvider>
    )
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    scenarioDetailViewStateSpy.mockReturnValue(scenarioDetailViewHookValuesDefault)
    updateScenarioStateSpy.mockReturnValue(updateScenarioHookValuesDefault)
    const tree = mount(
      <MockedProvider>
        <ScenarioSelectionDetail {...defaultProps} />
      </MockedProvider>
    )

    await act(() => wait(0))

    expect(tree.find(DetailViewHeader)).toHaveLength(1)
    expect(tree.find(LoadingIndicator)).toHaveLength(0)
    expect(tree.find(Information)).toHaveLength(1)
    expect(tree.find(ScenarioSettings)).toHaveLength(1)
  })
  it("has correct structure (no scenario)", async () => {
    scenarioDetailViewStateSpy.mockReturnValue({...scenarioDetailViewHookValuesDefault, scenario: Option.none()})
    updateScenarioStateSpy.mockReturnValue(updateScenarioHookValuesDefault)
    const tree = mount(
      <MockedProvider>
        <ScenarioSelectionDetail {...defaultProps} />
      </MockedProvider>
    )

    await act(() => wait(0))

    expect(tree.find(DetailViewHeader)).toHaveLength(1)
    expect(tree.find(ContentMissingIndicator)).toHaveLength(1)
  })
  it("has loading indicator", async () => {
    scenarioDetailViewStateSpy.mockReturnValue({...scenarioDetailViewHookValuesDefault, scenarioLoading: true})
    updateScenarioStateSpy.mockReturnValue(updateScenarioHookValuesDefault)
    const tree = mount(
      <MockedProvider>
        <ScenarioSelectionDetail {...defaultProps} />
      </MockedProvider>
    )

    await act(() => wait(0))

    expect(tree.find(DetailViewHeader)).toHaveLength(1)
    expect(tree.find(ContentLoadingIndicator)).toHaveLength(1)
  })
})
