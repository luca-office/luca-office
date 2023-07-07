import React from "react"
import {create} from "react-test-renderer"
import {questionnaireMock} from "../../../../graphql/__mocks__"
import {ModuleQuestionnaireFooter, ModuleQuestionnaireFooterProps} from "../module-questionnaire-footer"

const defaultProps: ModuleQuestionnaireFooterProps = {
  isQuestionnaireFinished: false,
  numberOfAnsweredQuestions: 0,
  newMessagesCount: 0,
  onChatButtonClicked: jest.fn(),
  onFinishQuestionnaire: jest.fn(),
  questions: questionnaireMock.questions,
  isChatDisabled: true,
  buttonLabel: "ButtonLabel"
}

const getComponent = (props?: Partial<ModuleQuestionnaireFooterProps>) => (
  <ModuleQuestionnaireFooter {...{...defaultProps, ...props}} />
)

describe("ModuleQuestionnaireFooter", () => {
  it("renders correctly with default props", () => {
    const component = create(getComponent())
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("renders correctly with enabled chat", () => {
    const component = create(getComponent({isChatDisabled: false, newMessagesCount: 5}))
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
