import React from "react"
import {create} from "react-test-renderer"
import {runtimeSurveyQuestionResultsMock, singleChoiceQuestionWithImageMock} from "shared/graphql/__mocks__"
import {MultiQuestionResult, MultiQuestionResultProps} from "../multi-question-result"

const defaultProps: MultiQuestionResultProps = {
  question: singleChoiceQuestionWithImageMock,
  questionNumber: 1,
  results: runtimeSurveyQuestionResultsMock,
  freeTextAnswers: [],
  participantCount: 2,
  participantNames: {}
}

describe("MultiQuestionResult", () => {
  it("renders correctly", () => {
    const component = create(<MultiQuestionResult {...defaultProps} />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
