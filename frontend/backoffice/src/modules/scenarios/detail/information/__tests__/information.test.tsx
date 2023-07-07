import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Column, Columns, ReadonlyActionField} from "shared/components"
import {scenariosMock} from "shared/graphql/__mocks__"
import {ScenarioUpdate} from "shared/graphql/generated/globalTypes"
import {Option} from "shared/utils"
import {getDateValueMock} from "sharedTests/utils/date-mock"
import {InlineEditableHeaderContainer, MetaEntryTags, OverlayEditField} from "../../../../../components"
import {EditDurationModalContainer} from "../../../../../components/edit-duration-modal/edit-duration-modal-container"
import * as useScenarioUpdateHook from "../../hooks/use-scenario-update"
import {UseScenarioUpdateHook} from "../../hooks/use-scenario-update"
import {InviteScenarioContributorsModalContainer} from "../../invite-contributors/scenario-invite-contributors-container"
import {EditScenarioDateModalContainer} from "../edit-date-modal/edit-date-modal-container"
import {Information, InformationProps} from "../information"
import {MetaContributors} from "../meta-entries/meta-contributors"
import {MetaEmail} from "../meta-entries/meta-email"

const scenario = scenariosMock[0]
const scenarioId = scenario.id

const defaultUpdateData: ScenarioUpdate = {
  name: scenario.name,
  description: scenario.description,
  tags: scenario.tags,
  maxDurationInSeconds: scenario.maxDurationInSeconds,
  shouldDisplayTime: true, // this is not implemented in UI in MVP,
  shouldHideReferenceBookChapters: scenario.shouldHideReferenceBookChapters,
  introductionEmailId: scenario.introductionEmailId,
  completionEmailAddress: scenario.completionEmailAddress,
  sampleCompanyId: scenario.sampleCompanyId,
  date: scenario.date
}

const defaultProps: InformationProps = {
  scenario: scenariosMock[0],
  updateInProgress: false,
  isInviteContributorsModalVisible: false,
  scenarioContributorsCount: 0,
  toggleIsInviteContributorsModalVisible: jest.fn(),
  toggleIsEditDateModalVisible: jest.fn(),
  toggleIsEditDurationModalVisible: jest.fn(),
  isFinalizeScenarioLoading: false,
  isPublishScenarioLoading: false,
  isEditDateModalVisible: false,
  isEditDurationModalVisible: false,
  duplicateScenarioLoading: false,
  updateScenario: jest.fn()
}

const scenarioUpdateHookValuesDefault: UseScenarioUpdateHook = {
  updateScenario: jest.fn(() => Promise.resolve(Option.of(scenario))),
  updateScenarioLoading: false
}

const scenarioUpdateStateSpy = jest.spyOn(useScenarioUpdateHook, "useScenarioUpdate")

const getComponent = (props?: Partial<InformationProps>) => <Information {...{...defaultProps, ...props}} />

describe("information", () => {
  const _Date = Date
  beforeEach(() => {
    const mockDate = getDateValueMock(1970, 1, 1)
    Date = mockDate
  })
  afterEach(() => {
    Date = _Date
  })

  it("renders correctly", async () => {
    scenarioUpdateStateSpy.mockReturnValue(scenarioUpdateHookValuesDefault)
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    scenarioUpdateStateSpy.mockReturnValue(scenarioUpdateHookValuesDefault)
    const tree = shallow(getComponent())

    expect(tree.find(Columns)).toHaveLength(2)
    expect(tree.find(Column)).toHaveLength(6)
    expect(tree.find(InlineEditableHeaderContainer)).toHaveLength(1)
    expect(tree.find(ReadonlyActionField)).toHaveLength(2)
    expect(tree.find(MetaEntryTags)).toHaveLength(1)
    expect(tree.find(MetaEmail)).toHaveLength(1)
    expect(tree.find(MetaContributors)).toHaveLength(1)
  })
  it("has correct structure with edit date modal", async () => {
    scenarioUpdateStateSpy.mockReturnValue(scenarioUpdateHookValuesDefault)
    const tree = shallow(getComponent({isEditDateModalVisible: true}))

    expect(tree.find(Columns)).toHaveLength(2)
    expect(tree.find(Column)).toHaveLength(6)
    expect(tree.find(InlineEditableHeaderContainer)).toHaveLength(1)
    expect(tree.find(ReadonlyActionField)).toHaveLength(2)
    expect(tree.find(MetaEntryTags)).toHaveLength(1)
    expect(tree.find(MetaEmail)).toHaveLength(1)
    expect(tree.find(MetaContributors)).toHaveLength(1)
    expect(tree.find(EditScenarioDateModalContainer)).toHaveLength(1)
    expect(tree.find(EditDurationModalContainer)).toHaveLength(0)
    expect(tree.find(InviteScenarioContributorsModalContainer)).toHaveLength(0)
  })
  it("has correct structure with invite modal", async () => {
    scenarioUpdateStateSpy.mockReturnValue(scenarioUpdateHookValuesDefault)
    const tree = shallow(getComponent({isInviteContributorsModalVisible: true}))

    expect(tree.find(Columns)).toHaveLength(2)
    expect(tree.find(Column)).toHaveLength(6)
    expect(tree.find(InlineEditableHeaderContainer)).toHaveLength(1)
    expect(tree.find(ReadonlyActionField)).toHaveLength(2)
    expect(tree.find(MetaEntryTags)).toHaveLength(1)
    expect(tree.find(MetaEmail)).toHaveLength(1)
    expect(tree.find(MetaContributors)).toHaveLength(1)
    expect(tree.find(EditScenarioDateModalContainer)).toHaveLength(0)
    expect(tree.find(EditDurationModalContainer)).toHaveLength(0)
    expect(tree.find(InviteScenarioContributorsModalContainer)).toHaveLength(1)
  })
  it("has correct structure with edit duration", async () => {
    scenarioUpdateStateSpy.mockReturnValue(scenarioUpdateHookValuesDefault)
    const tree = shallow(getComponent({isEditDurationModalVisible: true}))

    expect(tree.find(Columns)).toHaveLength(2)
    expect(tree.find(Column)).toHaveLength(6)
    expect(tree.find(InlineEditableHeaderContainer)).toHaveLength(1)
    expect(tree.find(ReadonlyActionField)).toHaveLength(2)
    expect(tree.find(MetaEntryTags)).toHaveLength(1)
    expect(tree.find(MetaEmail)).toHaveLength(1)
    expect(tree.find(MetaContributors)).toHaveLength(1)
    expect(tree.find(EditScenarioDateModalContainer)).toHaveLength(0)
    expect(tree.find(EditDurationModalContainer)).toHaveLength(1)
    expect(tree.find(InviteScenarioContributorsModalContainer)).toHaveLength(0)
  })

  it("renders correctly without time", async () => {
    scenarioUpdateStateSpy.mockReturnValue(scenarioUpdateHookValuesDefault)
    const tree = shallow(getComponent({scenario: {...scenariosMock[0], maxDurationInSeconds: null}}))

    const html = tree.html()
    expect(html).toContain("placeholder__no_entry")
    expect(html).not.toContain("null unit__seconds_short")
  })

  it("handles update", async () => {
    const mockUpdateScenario = jest.fn()

    scenarioUpdateStateSpy.mockReturnValue(scenarioUpdateHookValuesDefault)
    const tree = shallow(getComponent({updateScenario: mockUpdateScenario}))

    const inlineEditableHeaderContainers = tree.find(InlineEditableHeaderContainer)
    inlineEditableHeaderContainers.at(0).props().onConfirm("update")
    expect(mockUpdateScenario).toHaveBeenCalledWith(scenarioId, {...defaultUpdateData, name: "update"})

    const overlayEditField = tree.find(OverlayEditField)
    overlayEditField.props().onUpdate({description: "update"})
    expect(mockUpdateScenario).toHaveBeenCalledWith(scenarioId, {...defaultUpdateData, description: "update"})
  })
})
