import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Heading, Label, Overlay, ReadonlyActionField, SpreadsheetViewer, Text, TextInput} from "shared/components"
import {automatedInputValueCodingCriterionMock} from "shared/graphql/__mocks__"
import {FilesAndDirectoriesPreview} from "../../../../../../../files-and-directories/preview/files-and-directories-preview"
import {AutomatedCriterionChooseDocumentModal} from "../../choose-document-modal/choose-automated-criterion-document-modal"
import {CreateOrUpdateInputValueContentModalContainer} from "../create-or-update-input-value-criterion-modal-container"
import {UpdateInputValueContent, UpdateInputValueContentProps} from "../update-input-value-content"

const defaultProps: UpdateInputValueContentProps = {
  scenarioId: "98360aec-e7b9-4747-ae9e-9b5acd2c849c",
  isChooseDocumentModalVisible: false,
  criterion: automatedInputValueCodingCriterionMock,
  onChangeInputValue: jest.fn(),
  setIsChooseDocumentModalVisible: jest.fn(),
  codingItemId: "116eb29f-d4de-4ad5-8456-7e237f46bc89",
  codingModelId: "116eb29f-d4de-4ad5-8456-7e237f46bc89"
}

const getComponent = (props?: Partial<UpdateInputValueContentProps>) => (
  <UpdateInputValueContent {...{...defaultProps, ...props}} />
)

describe("update-input-value-content", () => {
  it("renders correctly", async () => {
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly with selected cell", async () => {
    const component = create(
      getComponent({
        criterion: {...automatedInputValueCodingCriterionMock, spreadsheetColumnIndex: 2, spreadsheetRowIndex: 1}
      })
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure - spreadsheet criterion", async () => {
    const component = shallow(getComponent())

    expect(component.find(Label)).toHaveLength(1)
    expect(component.find(Heading)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(ReadonlyActionField)).toHaveLength(2)
    expect(component.find(TextInput)).toHaveLength(1)
    expect(component.find(AutomatedCriterionChooseDocumentModal)).toHaveLength(0)
    expect(component.find(Overlay)).toHaveLength(0)
    expect(component.find(FilesAndDirectoriesPreview)).toHaveLength(0)
    expect(component.find(SpreadsheetViewer)).toHaveLength(0)
  })
  it("has correct structure - with choose document modal", async () => {
    const component = shallow(
      getComponent({
        isChooseDocumentModalVisible: true
      })
    )

    expect(component.find(Label)).toHaveLength(1)
    expect(component.find(Heading)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(ReadonlyActionField)).toHaveLength(2)
    expect(component.find(TextInput)).toHaveLength(1)
    expect(component.find(CreateOrUpdateInputValueContentModalContainer)).toHaveLength(1)
    expect(component.find(Overlay)).toHaveLength(0)
    expect(component.find(FilesAndDirectoriesPreview)).toHaveLength(0)
    expect(component.find(SpreadsheetViewer)).toHaveLength(0)
  })
})
