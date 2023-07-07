import React from "react"
import {create} from "react-test-renderer"
import * as questionStateHook from "shared/components/questionnaire/hooks/use-questionnaire-question-state"
import {questionnaireMock} from "shared/graphql/__mocks__"
import {EventQuestionnairePreview} from "../event-questionnaire-preview"

const stateSpy = jest.spyOn(questionStateHook, "useQuestionnaireQuestionState")

const hookValuesDefault = {
  isQuestionnaireFinished: false,
  numberOfAnsweredQuestions: 0,
  onSelectAnswer: jest.fn(),
  onDeselectAnswer: jest.fn(),
  onUpdateFreeText: jest.fn()
}

describe("EventQuestionnairePreview", () => {
  it("renders correctly", () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(<EventQuestionnairePreview questionnaire={questionnaireMock} onClose={jest.fn()} />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
