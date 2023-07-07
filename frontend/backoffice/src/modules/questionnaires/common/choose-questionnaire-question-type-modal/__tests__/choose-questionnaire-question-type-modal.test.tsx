import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Modal, Overlay, SelectableCard} from "shared/components"
import {Option} from "shared/utils"
import {
  ChooseQuestionnaireQuestionTypeModal,
  ChooseQuestionnaireQuestionTypeModalProps
} from "../choose-questionnaire-question-type-modal"

const defaultProps: ChooseQuestionnaireQuestionTypeModalProps = {
  disabled: false,
  onDismiss: jest.fn(),
  onConfirm: jest.fn(),
  selectedQuestionType: Option.none(),
  setSelectedQuestionType: jest.fn()
}

const getComponent = (props?: Partial<ChooseQuestionnaireQuestionTypeModalProps>) => (
  <ChooseQuestionnaireQuestionTypeModal {...{...defaultProps, ...props}} />
)

describe("choose-questionnaire-question-type-modal", () => {
  it("renders correctly", () => {
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (no error message)", () => {
    const component = shallow(getComponent())

    const overlay = component.find(Overlay)
    expect(overlay).toHaveLength(1)

    const modal = overlay.dive().find(Modal)
    expect(modal).toHaveLength(1)

    const modalContent = modal.dive()
    const selectableCard = modalContent.find(SelectableCard)
    expect(selectableCard).toHaveLength(3)

    const errorMessage = modalContent.find(".error-message")
    expect(errorMessage).toHaveLength(0)
  })
  it("has correct structure (error message)", () => {
    const component = shallow(getComponent({errorMessage: "error-message"}))

    const overlay = component.find(Overlay)
    expect(overlay).toHaveLength(1)

    const modal = overlay.dive().find(Modal)
    expect(modal).toHaveLength(1)

    const modalContent = modal.dive()
    const selectableCard = modalContent.find(SelectableCard)
    expect(selectableCard).toHaveLength(3)

    const errorMessage = modalContent.find(".error-message")
    expect(errorMessage).toHaveLength(1)
  })
  it("triggers dismiss correctly", () => {
    const onDismissMock = jest.fn()
    const component = shallow(getComponent({onDismiss: onDismissMock}))

    const modal = component.find(Overlay).dive().find(Modal)
    expect(modal).toHaveLength(1)

    const onDismissHandler = modal.prop("onDismiss")
    expect(onDismissHandler).toBeDefined()

    onDismissHandler!()
    expect(onDismissMock).toHaveBeenCalledTimes(1)
  })
})
