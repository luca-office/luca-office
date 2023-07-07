import * as React from "react"
import {create} from "react-test-renderer"
import {questionnaireQuestionsMock} from "shared/graphql/__mocks__/questionnaire-questions.mock"
import {fakeTranslate} from "sharedTests/utils/translate-mock"
import {QuestionAnswerTable, QuestionAnswerTableProps} from "../question-answer-table"

const defaultProps: QuestionAnswerTableProps = {
  deleteAnswer: jest.fn,
  handleCreateAnswer: jest.fn,
  hideActions: false,
  isEditable: true,
  openAnswersSortOverlay: jest.fn,
  showQuestionScoring: true,
  toggleFreeTextAnswer: jest.fn,
  updateQuestionnaireAnswer: jest.fn(),
  updateQuestionnaireQuestion: jest.fn(),
  questionnaireQuestion: questionnaireQuestionsMock[1],
  readonly: false,
  t: fakeTranslate
}

const getComponent = (props?: Partial<QuestionAnswerTableProps>) => <QuestionAnswerTable {...defaultProps} {...props} />

describe("question-answer-table", () => {
  it("renders correctly", () => {
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
