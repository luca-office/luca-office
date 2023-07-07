import {MockedProvider} from "@apollo/client/testing"
import {act, render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {mount} from "enzyme"
import {create} from "react-test-renderer"
import {DetailViewCard, DetailViewHeader, DetailViewHeaderButtonConfig, LoadingIndicator} from "shared/components"
import {IconName} from "shared/enums"
import {UseUpdateScenarioHook} from "shared/graphql/hooks"
import * as useUpdateScenarioHook from "shared/graphql/hooks/mutations/scenario/use-update-scenario"
import {scenariosMock} from "shared/graphql/__mocks__"
import {Scenario} from "shared/models"
import {Option} from "shared/utils"
import {getDateValueMock} from "sharedTests/utils/date-mock"
import wait from "waait"
import * as useScenarioDetailViewHook from "../hooks/use-scenario-detail"
import {UseScenarioDetailHook} from "../hooks/use-scenario-detail"
import {Information} from "../information/information"
import {ScenarioDetail, ScenarioDetailViewProps} from "../scenario-detail"
import {ScenarioSettings} from "../settings/scenario-settings"

const scenario = scenariosMock[0]

const defaultProps: ScenarioDetailViewProps = {
  scenarioId: scenario.id
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
  navigateToEmails: jest.fn,
  navigateToFilesAndDirectories: jest.fn,
  navigateToReferenceBookChapters: jest.fn,
  navigateToCodingModels: jest.fn,
  scenario: Option.of(scenario),
  navigateToSampleCompaniesSelection: jest.fn,
  navigateToInterventions: jest.fn,
  scenarioLoading: false,
  updateInProgress: false,
  updateScenario: jest.fn(),
  userMayArchive: true,
  settingsCounts: {
    directories: 5,
    emails: 12,
    files: 3,
    scenarioReferenceBooks: 7,
    filesSampleCompany: 10,
    interventions: 0,
    events: 2,
    codingDimensions: 4,
    erpRowCount: 1
  },
  userMayFinalizeWithoutPublishing: false,
  scenarioContributorsCount: 0,
  navigateToSelection: jest.fn(),
  navigateToEvents: jest.fn(),
  duplicateScenarioLoading: false,
  canBeDuplicated: false,
  duplicateScenario: jest.fn(),
  publishScenario: jest.fn(),
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
        <ScenarioDetail {...defaultProps} />
      </MockedProvider>
    )
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly finalized", async () => {
    scenarioDetailViewStateSpy.mockReturnValue({
      ...scenarioDetailViewHookValuesDefault,
      scenario: Option.of({...scenariosMock[0], finalizedAt: "2020-05-05"} as unknown as Scenario)
    })
    updateScenarioStateSpy.mockReturnValue(updateScenarioHookValuesDefault)
    const component = create(
      <MockedProvider>
        <ScenarioDetail {...defaultProps} />
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
        <ScenarioDetail {...defaultProps} />
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
        <ScenarioDetail {...defaultProps} />
      </MockedProvider>
    )

    await act(() => wait(0))

    expect(tree.find(DetailViewHeader)).toHaveLength(1)
    expect(tree.find(LoadingIndicator)).toHaveLength(0)
    expect(tree.find(DetailViewCard)).toHaveLength(0)
    expect(tree.find(ScenarioSettings)).toHaveLength(0)
  })
  it("has loading indicator", async () => {
    scenarioDetailViewStateSpy.mockReturnValue({...scenarioDetailViewHookValuesDefault, scenarioLoading: true})
    updateScenarioStateSpy.mockReturnValue(updateScenarioHookValuesDefault)
    const tree = mount(
      <MockedProvider>
        <ScenarioDetail {...defaultProps} />
      </MockedProvider>
    )

    await act(() => wait(0))

    expect(tree.find(DetailViewHeader)).toHaveLength(1)
    expect(tree.find(LoadingIndicator)).toHaveLength(1)
    expect(tree.find(DetailViewCard)).toHaveLength(0)
    expect(tree.find(ScenarioSettings)).toHaveLength(0)
  })

  it("shows only publish Button - not finalized or published but can be finalized and without claims", async () => {
    const publishScenario = jest.fn()
    scenarioDetailViewStateSpy.mockReturnValue({
      ...scenarioDetailViewHookValuesDefault,
      isFinalized: false,
      isPublished: false,
      canBeFinalized: true,
      userMayFinalizeWithoutPublishing: false,
      publishScenario
    })
    updateScenarioStateSpy.mockReturnValue(updateScenarioHookValuesDefault)
    const tree = mount(
      <MockedProvider>
        <ScenarioDetail {...defaultProps} />
      </MockedProvider>
    )

    await act(() => wait(0))

    const operationButton: DetailViewHeaderButtonConfig = {
      labelKey: "scenario_details__header_button_publish",
      onClick: publishScenario,
      icon: IconName.Publish,
      disabled: false,
      orlyConfirmKey: "scenario_details__header_orly_publish_button",
      orlyTextKey: "scenario_details__header_orly_publish_text",
      orlyTitleKey: "scenario_details__header_orly_publish_title",
      tooltipConfig: {
        labelKey: "scenario_details__header_button_publish_tooltip",
        warningConfig: undefined
      }
    }

    expect(tree.find(DetailViewHeader)).toHaveLength(1)
    expect(tree.find(DetailViewHeader).prop("operationButtonConfig")).toEqual(operationButton)
    expect(tree.find(DetailViewHeader).prop("secondOperationButtonConfig")).toBeUndefined()
  })
  it("show publish and finalize button - not finalized or published but can be finalized and with claims", async () => {
    const publishScenario = jest.fn()
    const finalizeScenario = jest.fn()

    scenarioDetailViewStateSpy.mockReturnValue({
      ...scenarioDetailViewHookValuesDefault,
      isFinalized: false,
      isPublished: false,
      canBeFinalized: true,
      userMayFinalizeWithoutPublishing: true,
      publishScenario,
      finalizeScenario
    })
    updateScenarioStateSpy.mockReturnValue(updateScenarioHookValuesDefault)
    const tree = mount(
      <MockedProvider>
        <ScenarioDetail {...defaultProps} />
      </MockedProvider>
    )

    await act(() => wait(0))

    const operationButton: DetailViewHeaderButtonConfig = {
      labelKey: "scenario_details__header_button_publish",
      onClick: publishScenario,
      icon: IconName.Publish,
      disabled: false,
      orlyConfirmKey: "scenario_details__header_orly_publish_button",
      orlyTextKey: "scenario_details__header_orly_publish_text",
      orlyTitleKey: "scenario_details__header_orly_publish_title",
      tooltipConfig: {
        labelKey: "scenario_details__header_button_publish_tooltip",
        warningConfig: undefined
      }
    }
    const secondOperationButton: DetailViewHeaderButtonConfig = {
      labelKey: "scenario_details__header_button_finalize",
      onClick: finalizeScenario,
      icon: IconName.LockOpen,
      orlyConfirmKey: "scenario_details__header_orly_finalize_button",
      orlyTextKey: "scenario_details__header_orly_finalize_text",
      orlyTitleKey: "scenario_details__header_orly_finalize_title",
      disabled: false,
      tooltipConfig: {labelKey: "scenario_details__header_button_finalize_tooltip", warningConfig: undefined}
    }

    expect(tree.find(DetailViewHeader)).toHaveLength(1)
    expect(tree.find(DetailViewHeader).prop("operationButtonConfig")).toEqual(operationButton)
    expect(tree.find(DetailViewHeader).prop("secondOperationButtonConfig")).toEqual(secondOperationButton)
  })
  it("show duplicate and publish button - finalized and with claims", async () => {
    const publishScenario = jest.fn()
    const finalizeScenario = jest.fn()
    const duplicateScenario = jest.fn()

    scenarioDetailViewStateSpy.mockReturnValue({
      ...scenarioDetailViewHookValuesDefault,
      isFinalized: true,
      isPublished: false,
      canBeFinalized: true,
      userMayFinalizeWithoutPublishing: true,
      publishScenario,
      finalizeScenario,
      duplicateScenario,
      canBeDuplicated: true
    })
    updateScenarioStateSpy.mockReturnValue(updateScenarioHookValuesDefault)
    const tree = mount(
      <MockedProvider>
        <ScenarioDetail {...defaultProps} />
      </MockedProvider>
    )

    await act(() => wait(0))

    const operationButton: DetailViewHeaderButtonConfig = {
      labelKey: "scenario_details__header_button_duplicate",
      onClick: duplicateScenario,
      disabled: false,
      icon: IconName.Duplicate
    }
    const secondOperationButton: DetailViewHeaderButtonConfig = {
      labelKey: "scenario_details__header_button_publish",
      onClick: publishScenario,
      icon: IconName.Publish,
      orlyConfirmKey: "scenario_details__header_orly_publish_button",
      orlyTextKey: "scenario_details__header_orly_publish_text",
      orlyTitleKey: "scenario_details__header_orly_publish_title",
      tooltipConfig: {labelKey: "scenario_details__header_button_publish_tooltip"}
    }

    expect(tree.find(DetailViewHeader)).toHaveLength(1)
    expect(tree.find(DetailViewHeader).prop("operationButtonConfig")).toEqual(operationButton)
    expect(tree.find(DetailViewHeader).prop("secondOperationButtonConfig")).toEqual(secondOperationButton)
  })

  it("navigates to overview", async () => {
    const navigateToOverviewMock = jest.fn()
    scenarioDetailViewStateSpy.mockReturnValue({
      ...scenarioDetailViewHookValuesDefault,
      navigateToOverview: navigateToOverviewMock
    })
    updateScenarioStateSpy.mockReturnValue(updateScenarioHookValuesDefault)
    const tree = mount(
      <MockedProvider>
        <ScenarioDetail {...defaultProps} />
      </MockedProvider>
    )

    const user = userEvent.setup()

    render(
      <MockedProvider>
        <ScenarioDetail {...defaultProps} />
      </MockedProvider>
    )

    await user.click(screen.getByText("scenario_details__header_navigate_back_label"))

    expect(navigateToOverviewMock).toHaveBeenCalledTimes(1)
  })
})
