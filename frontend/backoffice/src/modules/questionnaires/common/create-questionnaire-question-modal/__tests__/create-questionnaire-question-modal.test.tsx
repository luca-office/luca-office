import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Modal, Overlay, SelectableCard} from "shared/components"
import {questionnairesMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import {ChooseQuestionnaireQuestionTypeModal} from "../../choose-questionnaire-question-type-modal/choose-questionnaire-question-type-modal"
import {CreateEventModalProps, CreateQuestionnaireQuestionModal} from "../create-questionnaire-question-modal"
import * as useCreateQuestionnaireQuestionModalHook from "../hooks/use-create-questionnaire-question-modal"
import {UseCreateQuestionnaireQuestionModalHook} from "../hooks/use-create-questionnaire-question-modal"

const questionnaire = questionnairesMock[0]

const hookValuesDefault: UseCreateQuestionnaireQuestionModalHook = {
  createQuestion: jest.fn(),
  selectedQuestionType: Option.none(),
  setSelectedQuestionType: jest.fn()
}

const stateSpy = jest.spyOn(useCreateQuestionnaireQuestionModalHook, "useCreateQuestionnaireQuestionModal")

const defaultProps: CreateEventModalProps = {
  questionnaireId: questionnaire.id,
  onDismiss: jest.fn(),
  navigateToQuestion: jest.fn()
}

const getComponent = (props?: Partial<CreateEventModalProps>) => (
  <CreateQuestionnaireQuestionModal {...{...defaultProps, ...props}} />
)

describe("create-questionnaire-question-modal", () => {
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

    const contentTypeCard = modal.dive().find(SelectableCard)
    expect(contentTypeCard).toHaveLength(3)
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
