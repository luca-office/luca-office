import {shallow} from "enzyme"
import React from "react"
import {create} from "react-test-renderer"
import {QuestionType} from "../../../../graphql/generated/globalTypes"
import {Checkbox} from "../../../checkbox/checkbox"
import {TextInput} from "../../../input"
import {RadioButton} from "../../../radio-button/radio-button"
import {AdditionalFreeTextAnswer, AdditionalFreeTextAnswerPropsProps} from "../additional-freetext-answer"

const defaultProps: AdditionalFreeTextAnswerPropsProps = {
  isSelected: false,
  onClick: jest.fn(),
  questionType: QuestionType.SingleChoice,
  isDisabled: false,
  onChangeFreeText: jest.fn()
}

const getComponent = (props?: Partial<AdditionalFreeTextAnswerPropsProps>) => (
  <AdditionalFreeTextAnswer {...{...defaultProps, ...props}} />
)

describe("AdditionalFreetextAnswer", () => {
  it("renders correctly with default props", () => {
    const component = getComponent()
    const tree = create(component).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("has correct structure (single choice)", () => {
    const singleChoiceAnswer = shallow(getComponent())
    const radioButtons = singleChoiceAnswer.find(RadioButton)
    const checkBoxes = singleChoiceAnswer.find(Checkbox)
    const textInputs = singleChoiceAnswer.find(TextInput)

    expect(radioButtons).toHaveLength(1)
    expect(checkBoxes).toHaveLength(0)
    expect(textInputs).toHaveLength(1)
  })

  it("has correct structure (multiple choice)", () => {
    const multipleChoiceAnswer = shallow(getComponent({questionType: QuestionType.MultipleChoice}))
    const checkBoxes = multipleChoiceAnswer.find(Checkbox)
    const radioButtons = multipleChoiceAnswer.find(RadioButton)
    const textInputs = multipleChoiceAnswer.find(TextInput)

    expect(checkBoxes).toHaveLength(1)
    expect(radioButtons).toHaveLength(0)
    expect(textInputs).toHaveLength(1)
  })
})
