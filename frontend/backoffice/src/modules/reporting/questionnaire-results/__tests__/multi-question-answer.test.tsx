import React from "react"
import {create} from "react-test-renderer"
import {MultiQuestionAnswer, MultiQuestionAnswerProps} from "../multi-question-answer"

const defaultProps: MultiQuestionAnswerProps = {
  selectionCount: 5,
  percent: "36 %",
  text: "test text",
  participantCount: 2,
  freeTextAnswers: [],
  participantNames: {}
}

describe("MultiQuestionAnswer", () => {
  it("renders correctly (SC/MC no FreeText)", () => {
    const component = create(<MultiQuestionAnswer {...defaultProps} />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("renders correctly (SC/MC with FreeText)", () => {
    const component = create(<MultiQuestionAnswer {...defaultProps} />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
