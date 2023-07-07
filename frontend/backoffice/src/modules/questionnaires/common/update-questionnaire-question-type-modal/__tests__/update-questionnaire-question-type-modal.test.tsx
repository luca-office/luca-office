import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Modal, Overlay, SelectableCard} from "shared/components"
import {multipleChoiceQuestionMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import {ChooseQuestionnaireQuestionTypeModal} from "../../choose-questionnaire-question-type-modal/choose-questionnaire-question-type-modal"
import * as useUpdateQuestionnaireQuestionTypeModalHook from "../hooks/use-update-questionnaire-question-type-modal"
import {UseUpdateQuestionnaireQuestionTypeModalHook} from "../hooks/use-update-questionnaire-question-type-modal"
import {
  UpdateQuestionnaireQuestionTypeModal,
  UpdateQuestionnaireQuestionTypeModalProps
} from "../update-questionnaire-question-type-modal"

const hookValuesDefault: UseUpdateQuestionnaireQuestionTypeModalHook = {
  updateQuestion: jest.fn(() => Promise.resolve(Option.of(multipleChoiceQuestionMock))),
  actionLoading: false,
  selectedQuestionType: Option.none(),
  setSelectedQuestionType: jest.fn(),
  errorMessage: Option.none()
}

const stateSpy = jest.spyOn(useUpdateQuestionnaireQuestionTypeModalHook, "useUpdateQuestionnaireQuestionTypeModal")

const defaultProps: UpdateQuestionnaireQuestionTypeModalProps = {
  question: multipleChoiceQuestionMock,
  onDismiss: jest.fn()
}

const getComponent = (props?: Partial<UpdateQuestionnaireQuestionTypeModalProps>) => (
  <UpdateQuestionnaireQuestionTypeModal {...{...defaultProps, ...props}} />
)

describe("update-questionnaire-question-type-modal", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = shallow(getComponent())

    const modalWrapper = component.find(ChooseQuestionnaireQuestionTypeModal)
    expect(modalWrapper).toHaveLength(1)

    const overlay = modalWrapper.dive().find(Overlay)
    expect(overlay).toHaveLength(1)

    const modal = overlay.dive().find(Modal)
    expect(modal).toHaveLength(1)

    const selectableCard = modal.dive().find(SelectableCard)
    expect(selectableCard).toHaveLength(3)
  })

  it("triggers dismiss correctly", async () => {
    const onDismissMock = jest.fn()
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = shallow(getComponent({onDismiss: onDismissMock}))

    const modal = component.find(ChooseQuestionnaireQuestionTypeModal).dive().find(Overlay).dive().find(Modal)
    expect(modal).toHaveLength(1)

    const onDismissHandler = modal.prop("onDismiss")
    expect(onDismissHandler).toBeDefined()

    onDismissHandler!()
    expect(onDismissMock).toHaveBeenCalledTimes(1)
  })
})
