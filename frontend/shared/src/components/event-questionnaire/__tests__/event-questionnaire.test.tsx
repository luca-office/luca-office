import React from "react"
import {act, create} from "react-test-renderer"
import wait from "waait"
import {mockQuestionnaireSurveyEvents} from "../../../../tests/__mocks__/questionnaire/questionnaire-survey-events.mock"
import {questionnaireMock} from "../../../graphql/__mocks__"
import {Option} from "../../../utils"
import {EventQuestionnaire} from "../event-questionnaire"
import * as useEventQuestionnaireHook from "../hooks/use-event-questionnaire"

const useEventQuestionnaireSpy = jest.spyOn(useEventQuestionnaireHook, "useEventQuestionnaire")

const eventQuestionnaireHookDefaultValues = {
  questionnaire: Option.of(questionnaireMock),
  questionnaireLoading: false,
  isQuestionnaireFinished: false,
  numberOfAnsweredQuestions: 0,
  onSelectAnswer: jest.fn(),
  onDeselectAnswer: jest.fn(),
  onUpdateFreeText: jest.fn(),
  surveyEvents: mockQuestionnaireSurveyEvents
}

const defaultProps = {
  questionnaireId: questionnaireMock.id,
  onClose: jest.fn()
}

describe("EventQuestionnaire", () => {
  it("renders correctly", async () => {
    useEventQuestionnaireSpy.mockReturnValue(eventQuestionnaireHookDefaultValues)
    const component = create(<EventQuestionnaire {...defaultProps} />)

    await act(() => wait(0))

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
