import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Modal, Overlay, SelectableCard} from "shared/components"
import {IconName} from "shared/enums"
import {OfficeTool} from "shared/graphql/generated/globalTypes"
import {AutomatedCriterionChooseDocumentModal} from "../choose-automated-criterion-document-modal"

describe("automated-criterion-choose-document-modal", () => {
  it("renders correctly", async () => {
    const component = create(
      <AutomatedCriterionChooseDocumentModal
        defaultDocumentType={OfficeTool.FileBrowser}
        isDocumentViewCriterion={false}
        onConfirm={jest.fn()}
        onDismiss={jest.fn()}
      />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure - no document view", () => {
    const component = shallow(
      <AutomatedCriterionChooseDocumentModal
        defaultDocumentType={OfficeTool.FileBrowser}
        isDocumentViewCriterion={false}
        onConfirm={jest.fn()}
        onDismiss={jest.fn()}
      />
    )

    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(Overlay)).toHaveLength(1)
    expect(component.find(SelectableCard)).toHaveLength(3)
  })
  it("has correct structure - document view", () => {
    const component = shallow(
      <AutomatedCriterionChooseDocumentModal
        defaultDocumentType={OfficeTool.FileBrowser}
        isDocumentViewCriterion={true}
        onConfirm={jest.fn()}
        onDismiss={jest.fn()}
      />
    )

    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(Overlay)).toHaveLength(1)
    expect(component.find(SelectableCard)).toHaveLength(4)
    expect(component.find(SelectableCard).last().prop("iconName")).toEqual(IconName.DataSet)
  })
  it("selects default Document Type", () => {
    const component = shallow(
      <AutomatedCriterionChooseDocumentModal
        defaultDocumentType={OfficeTool.EmailClient}
        isDocumentViewCriterion={true}
        onConfirm={jest.fn()}
        onDismiss={jest.fn()}
      />
    )

    expect(component.find(SelectableCard).first().prop("selected")).toBe(true)
  })
  it("handles confirmation action", () => {
    const confirm = jest.fn()
    const component = shallow(
      <AutomatedCriterionChooseDocumentModal
        defaultDocumentType={OfficeTool.EmailClient}
        isDocumentViewCriterion={true}
        onConfirm={confirm}
        onDismiss={jest.fn()}
      />
    )

    component.find(SelectableCard).first().simulate("click")
    component.find(Modal).dive().find(".confirm-button").simulate("click")

    expect(confirm).toBeCalledWith(OfficeTool.EmailClient)
  })
})
