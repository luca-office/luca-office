import {act} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, Table, TableContainer} from "shared/components"
import {automatedCodingCriteriaMock, codingCriteriaMock, manualCodingItemMock} from "shared/graphql/__mocks__"
import {AutomatedCodingItemRule} from "shared/graphql/generated/globalTypes"
import {Option} from "shared/utils"
import wait from "waait"
import {CreateOrUpdateDocumentViewCriterionContainer} from "../../../../create/create-automated-coding-criterion/document-view/create-or-update-document-view-criterion-container"
import {CodingCriterionCreationModalVisibility} from "../../../../detail/coding-item/coding-item-detail-view-container"
import {CreateOrUpdateRScriptModalContainer} from "../../../create-or-update-r-script-modal/create-or-update-r-script-modal-container"
import {CreateOrUpdateInputValueContentModalContainer} from "../../coding-criteria-card/automated-criteria-content/input-value/create-or-update-input-value-criterion-modal-container"
import {CodingCriteriaList, CodingCriteriaListProps} from "../coding-criteria-list"
import * as useCodingCriteriaListHook from "../hooks/use-coding-criteria-list"
import {UseCodingCriteriaListHook} from "../hooks/use-coding-criteria-list"

const codingItem = manualCodingItemMock
const codingCriteria = codingCriteriaMock

const hookValuesDefault: UseCodingCriteriaListHook = {
  createCodingCriterion: jest.fn(),
  setVisibleCreateCriterionModal: jest.fn(),
  visibleCreateCriterionModal: Option.none()
}

const stateSpy = jest.spyOn(useCodingCriteriaListHook, "useCodingCriteriaList")

const defaultProps: CodingCriteriaListProps = {
  codingItemId: codingItem.id,
  scenarioId: "45c1fb44-5211-462c-99d3-c55096594be2",
  codingCriteria,
  selectedCriterionId: Option.none(),
  selectCriterion: jest.fn(),
  automatedCodingCriteria: Option.of(automatedCodingCriteriaMock),
  titleForDocumentViewCriterion: jest.fn(),
  titleForRScriptCriterion: jest.fn(),
  codingItem: Option.none(),
  codingModelId: "71111aa0-f432-4be2-bf4c-60569ea8cbc4"
}

const getComponent = (props?: Partial<CodingCriteriaListProps>) => (
  <CodingCriteriaList {...{...defaultProps, ...props}} />
)

describe("coding-criteria-list", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (with selected criterion)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent({selectedCriterionId: Option.of(codingCriteria[0].id)}))
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = shallow(getComponent({automatedCodingCriteria: Option.none()}))
    await act(() => wait(0))

    const table = component.find(TableContainer)
    expect(table).toHaveLength(1)
    expect(table.dive().find(Table).dive().find(".entity-row")).toHaveLength(codingCriteria.length)

    expect(component.find(Button)).toHaveLength(1)
  })
  it("has correct structure with r script view modal", async () => {
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      visibleCreateCriterionModal: Option.of<CodingCriterionCreationModalVisibility>({
        visibleCriterionType: AutomatedCodingItemRule.RScript
      })
    })

    const component = shallow(getComponent({automatedCodingCriteria: Option.none()}))
    await act(() => wait(0))

    const table = component.find(TableContainer)
    expect(table).toHaveLength(1)
    expect(table.dive().find(Table).dive().find(".entity-row")).toHaveLength(codingCriteria.length)
    expect(component.find(Button)).toHaveLength(1)
    expect(component.find(CreateOrUpdateRScriptModalContainer)).toHaveLength(1)
    expect(component.find(CreateOrUpdateDocumentViewCriterionContainer)).toHaveLength(0)
  })
  it("has correct structure with create document view modal", async () => {
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      visibleCreateCriterionModal: Option.of<CodingCriterionCreationModalVisibility>({
        visibleCriterionType: AutomatedCodingItemRule.DocumentView
      })
    })

    const component = shallow(getComponent({automatedCodingCriteria: Option.none()}))
    await act(() => wait(0))

    const table = component.find(TableContainer)
    expect(table).toHaveLength(1)
    expect(table.dive().find(Table).dive().find(".entity-row")).toHaveLength(codingCriteria.length)
    expect(component.find(Button)).toHaveLength(1)
    expect(component.find(CreateOrUpdateRScriptModalContainer)).toHaveLength(0)
    expect(component.find(CreateOrUpdateDocumentViewCriterionContainer)).toHaveLength(1)
  })
  it("has correct structure with create input value modal", async () => {
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      visibleCreateCriterionModal: Option.of<CodingCriterionCreationModalVisibility>({
        visibleCriterionType: AutomatedCodingItemRule.InputValue
      })
    })

    const component = shallow(getComponent({automatedCodingCriteria: Option.none()}))
    await act(() => wait(0))

    const table = component.find(TableContainer)
    expect(table).toHaveLength(1)
    expect(table.dive().find(Table).dive().find(".entity-row")).toHaveLength(codingCriteria.length)
    expect(component.find(Button)).toHaveLength(1)
    expect(component.find(CreateOrUpdateRScriptModalContainer)).toHaveLength(0)
    expect(component.find(CreateOrUpdateDocumentViewCriterionContainer)).toHaveLength(0)
    expect(component.find(CreateOrUpdateInputValueContentModalContainer)).toHaveLength(1)
  })
})
