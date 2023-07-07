import React from "react"
import {create} from "react-test-renderer"
import {QuestionnaireFooter, QuestionnaireFooterProps} from "../questionnaire-footer"

const defaultProps: QuestionnaireFooterProps = {
  buttonLabel: "Label",
  onButtonClick: jest.fn(),
  answeredQuestionsCount: 4,
  totalQuestionsCount: 6,
  isButtonDisabled: true
}

const getComponent = (props?: Partial<QuestionnaireFooterProps>) => (
  <QuestionnaireFooter {...{...defaultProps, ...props}} />
)

describe("Questionnaire Footer", () => {
  it("renders correctly with default props", () => {
    const component = getComponent()
    const tree = create(component)

    expect(tree).toMatchSnapshot()
  })
})
