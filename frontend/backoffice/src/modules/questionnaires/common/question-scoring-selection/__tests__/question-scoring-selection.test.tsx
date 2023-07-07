import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Label, SelectableCard} from "shared/components"
import {questionnaireQuestionsMock} from "shared/graphql/__mocks__/questionnaire-questions.mock"
import {QuestionScoringType, QuestionType} from "shared/graphql/generated/globalTypes"
import {fakeTranslate} from "sharedTests/utils/translate-mock"
import {QuestionScoringSelection, QuestionScoringSelectionProps} from "../question-scoring-selection"

const scoreSpy = jest.fn()
const defaultProps: QuestionScoringSelectionProps = {
  isEditable: true,
  questionnaireQuestion: questionnaireQuestionsMock[1],
  onScoringTypeChange: scoreSpy,
  t: fakeTranslate
}

const getComponent = (props?: Partial<QuestionScoringSelectionProps>) => (
  <QuestionScoringSelection {...defaultProps} {...props} />
)

describe("question-scoring-selection", () => {
  it("renders correctly", () => {
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure single choice, with scoring", async () => {
    const tree = shallow(
      getComponent({
        questionnaireQuestion: {
          ...questionnaireQuestionsMock[0],
          scoringType: QuestionScoringType.Holistic,
          questionType: QuestionType.SingleChoice
        }
      })
    )

    expect(tree.find(Label)).toHaveLength(1)
    expect(tree.find(SelectableCard)).toHaveLength(2)
    expect(tree.find(SelectableCard).first().prop("disabled")).toBe(false)
    expect(tree.find(SelectableCard).first().prop("selected")).toBe(false)
    expect(tree.find(SelectableCard).last().prop("selected")).toBe(true)
  })
  it("has correct structure multi choice, with scoring", async () => {
    const tree = shallow(
      getComponent({
        questionnaireQuestion: {
          ...questionnaireQuestionsMock[0],
          scoringType: QuestionScoringType.Analytical,
          questionType: QuestionType.MultipleChoice
        }
      })
    )

    expect(tree.find(Label)).toHaveLength(1)
    expect(tree.find(SelectableCard)).toHaveLength(2)
    expect(tree.find(SelectableCard).first().prop("disabled")).toBe(false)
    expect(tree.find(SelectableCard).first().prop("selected")).toBe(false)
    expect(tree.find(SelectableCard).last().prop("selected")).toBe(true)
  })
  it("has correct structure freetext, with scoring", async () => {
    const tree = shallow(
      getComponent({
        questionnaireQuestion: {
          ...questionnaireQuestionsMock[0],
          scoringType: QuestionScoringType.Holistic,
          questionType: QuestionType.FreeText
        }
      })
    )

    expect(tree.find(Label)).toHaveLength(1)
    expect(tree.find(SelectableCard)).toHaveLength(3)
    expect(tree.find(SelectableCard).first().prop("disabled")).toBe(false)
    expect(tree.find(SelectableCard).first().prop("selected")).toBe(false)
    expect(tree.find(SelectableCard).at(1).prop("selected")).toBe(true)
    expect(tree.find(SelectableCard).last().prop("selected")).toBe(false)
  })
  it("has correct structure not editable", async () => {
    const tree = shallow(
      getComponent({
        isEditable: false,
        questionnaireQuestion: {
          ...questionnaireQuestionsMock[0],
          scoringType: QuestionScoringType.Holistic,
          questionType: QuestionType.FreeText
        }
      })
    )

    expect(tree.find(Label)).toHaveLength(1)
    expect(tree.find(SelectableCard)).toHaveLength(3)
    expect(tree.find(SelectableCard).first().prop("disabled")).toBe(true)
    expect(tree.find(SelectableCard).first().prop("selected")).toBe(false)
    expect(tree.find(SelectableCard).at(1).prop("selected")).toBe(true)
    expect(tree.find(SelectableCard).last().prop("selected")).toBe(false)
  })
})
