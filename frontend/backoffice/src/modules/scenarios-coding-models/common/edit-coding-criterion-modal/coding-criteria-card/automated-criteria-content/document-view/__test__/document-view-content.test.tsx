import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Heading, Label, ReadonlyActionField, Text} from "shared/components"
import {automatedDocumentViewCodingCriterionMock} from "shared/graphql/__mocks__"
import {CreateOrUpdateDocumentViewCriterionContainer} from "../../../../../../create/create-automated-coding-criterion/document-view/create-or-update-document-view-criterion-container"
import {DocumentViewContent} from "../document-view-content"

const scenarioId = "0908bf34-d9b8-4d56-ad1b-c1127c6c25fa"
const codingModelId = "0908bf34-d9b8-4d56-ad1b-c1127c6c25fa"

describe("document-view-content", () => {
  it("renders correctly", async () => {
    const component = create(
      <DocumentViewContent
        titleForDocumentViewCodingCriterion={jest.fn()}
        isUpdateModalVisible={false}
        setIsUpdateModalVisible={jest.fn()}
        criterion={automatedDocumentViewCodingCriterionMock}
        scenarioId={scenarioId}
        codingModelId={codingModelId}
      />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = shallow(
      <DocumentViewContent
        titleForDocumentViewCodingCriterion={jest.fn()}
        isUpdateModalVisible={false}
        setIsUpdateModalVisible={jest.fn()}
        criterion={automatedDocumentViewCodingCriterionMock}
        scenarioId={scenarioId}
        codingModelId={codingModelId}
      />
    )

    expect(component.find(Label)).toHaveLength(1)
    expect(component.find(Heading)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(ReadonlyActionField)).toHaveLength(1)
    expect(component.find(CreateOrUpdateDocumentViewCriterionContainer)).toHaveLength(0)
  })
  it("has correct structure show dialog", () => {
    const component = shallow(
      <DocumentViewContent
        titleForDocumentViewCodingCriterion={jest.fn()}
        isUpdateModalVisible={true}
        setIsUpdateModalVisible={jest.fn()}
        criterion={automatedDocumentViewCodingCriterionMock}
        codingModelId={codingModelId}
        scenarioId={scenarioId}
      />
    )

    expect(component.find(Label)).toHaveLength(1)
    expect(component.find(Heading)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(ReadonlyActionField)).toHaveLength(1)
    expect(component.find(CreateOrUpdateDocumentViewCriterionContainer)).toHaveLength(1)
  })
  it("triggers setIsUpdateModalVisible correctly", () => {
    const setIsUpdateModalVisible = jest.fn()
    const component = shallow(
      <DocumentViewContent
        titleForDocumentViewCodingCriterion={jest.fn()}
        isUpdateModalVisible={true}
        setIsUpdateModalVisible={setIsUpdateModalVisible}
        criterion={automatedDocumentViewCodingCriterionMock}
        scenarioId={scenarioId}
        codingModelId={codingModelId}
      />
    )

    expect(component.find(ReadonlyActionField)).toHaveLength(1)
    component.find(ReadonlyActionField).simulate("click")
    expect(setIsUpdateModalVisible).toBeCalledTimes(1)
  })
})
