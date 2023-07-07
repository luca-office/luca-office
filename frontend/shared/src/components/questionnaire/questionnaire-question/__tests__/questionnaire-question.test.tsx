import {shallow} from "enzyme"
import React from "react"
import {create} from "react-test-renderer"
import {answers} from "../../../../__mocks__"
import {IconName} from "../../../../enums"
import {
  freeTextQuestionMock,
  multipleChoiceQuestionMock,
  multipleChoiceQuestionWithExtraFreeTextMock,
  singleChoiceQuestionMock
} from "../../../../graphql/__mocks__"
import {Checkbox} from "../../../checkbox/checkbox"
import {RadioButton} from "../../../radio-button/radio-button"
import {TextArea} from "../../../textarea/textarea"
import {AdditionalFreeTextAnswer} from "../additional-freetext-answer"
import {QuestionnaireQuestionComponent, QuestionnaireQuestionProps} from "../questionnaire-question"
import {SelectableAnswer} from "../selectable-answer"

const defaultProps: QuestionnaireQuestionProps = {
  question: multipleChoiceQuestionMock,
  questionNumber: 1
}

const getComponent = (props?: Partial<QuestionnaireQuestionProps>) => {
  return <QuestionnaireQuestionComponent {...{...defaultProps, ...props}} />
}

describe("Questionnaire Question Component", () => {
  it("renders correctly with default props", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure (general, default)", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(".questionnaire-question-question-type-icon").first().getElement().props.name).toBe(
      IconName.MultipleChoice
    )
    expect(tree.find(".questionnaire-question-description").first().props().children).toBe(
      multipleChoiceQuestionMock.text
    )
  })

  it("has correct structure (multiple choice)", () => {
    const component = getComponent({question: multipleChoiceQuestionMock})
    const tree = shallow(component)

    const selectableAnswers = tree.find(SelectableAnswer)
    expect(selectableAnswers).toHaveLength(answers.length)

    const checkbox = tree.find(SelectableAnswer).at(0).dive().find(Checkbox)
    expect(checkbox).toHaveLength(1)
  })

  it("has correct structure (multiple choice, additional free text)", () => {
    const component = getComponent({question: multipleChoiceQuestionWithExtraFreeTextMock})
    const tree = shallow(component)

    const selectableAnswers = tree.find(SelectableAnswer)
    expect(selectableAnswers).toHaveLength(answers.length)

    const checkbox = tree.find(SelectableAnswer).at(0).dive().find(Checkbox)
    expect(checkbox).toHaveLength(1)

    const freeTextAnswer = tree.find(AdditionalFreeTextAnswer)
    expect(freeTextAnswer).toHaveLength(1)
  })

  it("has correct structure (single choice)", () => {
    const component = getComponent({question: singleChoiceQuestionMock})
    const tree = shallow(component)

    const selectableAnswers = tree.find(SelectableAnswer)
    expect(selectableAnswers).toHaveLength(answers.length)

    const radioButton = tree.find(SelectableAnswer).at(0).dive().find(RadioButton)
    expect(radioButton).toHaveLength(1)
  })

  it("has correct structure (free text)", () => {
    const component = getComponent({question: freeTextQuestionMock})
    const tree = shallow(component)

    const selectableAnswers = tree.find(SelectableAnswer)
    expect(selectableAnswers).toHaveLength(0)

    const textArea = tree.find(TextArea)
    expect(textArea).toHaveLength(1)
  })
})
