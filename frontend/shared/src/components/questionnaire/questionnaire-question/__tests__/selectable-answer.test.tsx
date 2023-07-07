import {mount, shallow} from "enzyme"
import React from "react"
import {create} from "react-test-renderer"
import {questionnaireMock} from "../../../../graphql/__mocks__"
import {QuestionType} from "../../../../graphql/generated/globalTypes"
import {QuestionnaireAnswer} from "../../../../models"
import {Checkbox} from "../../../checkbox/checkbox"
import {RadioButton} from "../../../radio-button/radio-button"
import {Text} from "../../../typography/typography"
import {SelectableAnswer, SelectableAnswerProps} from "../selectable-answer"
import {fireEvent, render, screen, waitFor} from "@testing-library/react"

const mockAnswer = questionnaireMock.questions[0].answers[0]

const changeSpy = jest.fn()
const defaultProps: SelectableAnswerProps<QuestionnaireAnswer> = {
  questionType: QuestionType.SingleChoice,
  answer: mockAnswer,
  isSelected: false,
  handleSelectionChange: changeSpy
}

const getComponent = (props?: Partial<SelectableAnswerProps<QuestionnaireAnswer>>) => (
  <SelectableAnswer {...{...defaultProps, ...props}} />
)

describe("SelectableAnswer", () => {
  it("renders correctly with default props", () => {
    const component = getComponent()
    const tree = create(component).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("has correct structure (single choice)", () => {
    const singleChoiceAnswer = shallow(getComponent())

    expect(singleChoiceAnswer.find(".answer-container")).toHaveLength(1)
    expect(singleChoiceAnswer.find(Checkbox)).toHaveLength(0)
    expect(singleChoiceAnswer.find(RadioButton)).toHaveLength(1)
    expect(singleChoiceAnswer.find(Text)).toHaveLength(1)
  })

  it("has correct structure (multiple choice)", () => {
    const multipleChoiceAnswer = shallow(getComponent({questionType: QuestionType.MultipleChoice}))

    expect(multipleChoiceAnswer.find(".answer-container")).toHaveLength(1)
    expect(multipleChoiceAnswer.find(Checkbox)).toHaveLength(1)
    expect(multipleChoiceAnswer.find(RadioButton)).toHaveLength(0)
    expect(multipleChoiceAnswer.find(Text)).toHaveLength(1)
  })
  it("triggers actions correctly", async () => {
    render(getComponent({questionType: QuestionType.MultipleChoice}))

    fireEvent.click(screen.getByRole("button"))

    await waitFor(() => {
      expect(changeSpy).toBeCalledTimes(1)
      expect(changeSpy).toHaveBeenCalledWith(mockAnswer.id)
    })
  })
})
