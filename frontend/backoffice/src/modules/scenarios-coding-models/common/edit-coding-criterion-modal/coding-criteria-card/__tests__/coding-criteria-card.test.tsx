import {act} from "@testing-library/react"
import {mount, shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, DeleteOrArchiveEntityButton, Text, TextArea, TextInput} from "shared/components"
import {
  automatedCodingCriteriaMock,
  automatedToolUsageCodingCriterionMock,
  codingCriteriaMock,
  codingItemMock
} from "shared/graphql/__mocks__"
import {AutomatedCodingCriterion, CodingCriterion} from "shared/models"
import {Option} from "shared/utils"
import wait from "waait"
import {UpdateToolUsageContent} from "../automated-criteria-content/tool-usage/update-tool-usage-content"
import {CodingCriteriaCard, CodingCriteriaCardProps} from "../coding-criteria-card"
import * as useCodingCriteriaCardHook from "../hooks/use-coding-criteria-card"
import {UseCodingCriteriaCardHook} from "../hooks/use-coding-criteria-card"

const codingItem = codingItemMock
const codingCriteria = codingCriteriaMock

const hookValuesDefault: UseCodingCriteriaCardHook = {
  selectedCriterion: Option.of<CodingCriterion | AutomatedCodingCriterion>(codingCriteria[0]),
  score: `${codingCriteria[0].score}`,
  description: codingCriteria[0].description,
  onScoreChange: jest.fn(),
  onDescriptionChange: jest.fn(),
  updateScore: jest.fn(),
  updateDescription: jest.fn(),
  updateAutomatedCriterionUpdate: jest.fn(),
  deleteHook: () => ({deleteEntity: jest.fn(), deleteEntityLoading: false})
}

const stateSpy = jest.spyOn(useCodingCriteriaCardHook, "useCodingCriteriaCard")

const defaultProps: CodingCriteriaCardProps = {
  codingModelId: "96673a36-6027-4a3b-b727-53a534cde234",
  codingItem: Option.of(codingItem),
  selectedCriterionId: Option.of(codingCriteria[0].id),
  codingCriteria: codingCriteria,
  deselectCriterion: jest.fn(),
  scenarioId: "9ffa3bfc-1bf6-4b2b-a6a5-f1663868b9e0",
  titleForDocumentViewCodingCriterion: jest.fn(),
  automatedCodingCriteria: automatedCodingCriteriaMock,
  getAssociatedRScriptForRScriptCodingCriterion: jest.fn()
}
const getComponent = (props?: Partial<CodingCriteriaCardProps>) => (
  <CodingCriteriaCard {...{...defaultProps, ...props}} />
)

describe("coding-criteria-card", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (selected criterion)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = shallow(getComponent({automatedCodingCriteria: []}))
    await act(() => wait(0))

    expect(component.find(DeleteOrArchiveEntityButton)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(3)
    expect(component.find(TextInput)).toHaveLength(1)
    expect(component.find(TextArea)).toHaveLength(1)
  })
  it("has correct structure (no selected criterion)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, selectedCriterion: Option.none()})

    const component = shallow(getComponent({selectedCriterionId: Option.none()}))
    await act(() => wait(0))

    expect(component.find(Button)).toHaveLength(0)
    expect(component.find(Text)).toHaveLength(0)
    expect(component.find(TextInput)).toHaveLength(0)
    expect(component.find(TextArea)).toHaveLength(0)
  })
  it("has correct structure with tool Usage criterion", async () => {
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      selectedCriterion: Option.of<CodingCriterion | AutomatedCodingCriterion>(automatedToolUsageCodingCriterionMock)
    })

    const component = mount(getComponent({selectedCriterionId: Option.of(automatedToolUsageCodingCriterionMock.id)}))
    await act(() => wait(0))

    expect(component.find(Button)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(3)
    expect(component.find(TextInput)).toHaveLength(1)
    expect(component.find(TextArea)).toHaveLength(0)
    expect(component.find(UpdateToolUsageContent)).toHaveLength(1)
  })
})
