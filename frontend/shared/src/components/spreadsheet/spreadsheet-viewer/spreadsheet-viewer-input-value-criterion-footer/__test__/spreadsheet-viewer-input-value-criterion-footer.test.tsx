import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {mockedFormMethods} from "../../../../../../tests/utils/form-methods-mock"
import {Option} from "../../../../../utils"
import {Button} from "../../../../button/button"
import {TextInput} from "../../../../input"
import {CustomSelect} from "../../../../select/custom-select"
import {SelectionInPreviewFooter} from "../../../../selection-in-preview-footer/selection-in-preview-footer"
import {
  InputValueCriterionSpreadsheetFooter,
  SpreadsheetInputValueFooterProps,
  SpreadsheetInputValueSelectionType
} from "../spreadsheet-viewer-input-value-criterion-footer"

const defaultProps: SpreadsheetInputValueFooterProps = {
  fileName: "fileName.xls",
  inputValueAutomatedCriterionConfig: {
    formMethods: mockedFormMethods,
    onConfirm: jest.fn(),
    selectedCellName: Option.none()
  },
  selectedSelectionType: SpreadsheetInputValueSelectionType.SpecificCell,
  setSelectedSelectionType: jest.fn()
}

const getComponent = (props?: Partial<SpreadsheetInputValueFooterProps>) => (
  <InputValueCriterionSpreadsheetFooter {...{...defaultProps, ...props}} />
)

describe("spreadsheet-input-value-footer", () => {
  it("renders correctly", () => {
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure - specific cell", () => {
    const component = mount(getComponent())
    expect(component.find(SelectionInPreviewFooter)).toHaveLength(1)
    expect(component.find(TextInput)).toHaveLength(2)
    expect(component.find(CustomSelect)).toHaveLength(1)
    expect(component.find(Button)).toHaveLength(1)
  })
  it("has correct structure - whole table", () => {
    const component = mount(getComponent({selectedSelectionType: SpreadsheetInputValueSelectionType.WholeTable}))
    expect(component.find(SelectionInPreviewFooter)).toHaveLength(1)
    expect(component.find(TextInput)).toHaveLength(1)
    expect(component.find(CustomSelect)).toHaveLength(1)
    expect(component.find(Button)).toHaveLength(1)
  })
  it("shows correct cell - no cell selected", () => {
    const component = mount(
      getComponent({
        inputValueAutomatedCriterionConfig: {
          ...defaultProps.inputValueAutomatedCriterionConfig,
          selectedCellName: Option.none()
        }
      })
    )
    expect(component.find(TextInput).last().prop("value")).toEqual("A1")
  })
  it("shows correct cell -  cell selected", () => {
    const component = mount(
      getComponent({
        inputValueAutomatedCriterionConfig: {
          ...defaultProps.inputValueAutomatedCriterionConfig,
          selectedCellName: Option.of("C2")
        }
      })
    )
    expect(component.find(TextInput).last().prop("value")).toEqual("C2")
  })
})
