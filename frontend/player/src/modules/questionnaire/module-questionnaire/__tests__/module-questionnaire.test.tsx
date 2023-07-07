import {MockedProvider} from "@apollo/client/testing"
import React from "react"
import {act, create} from "react-test-renderer"
import {questionnaireMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import {mockQuestionnaireSurveyEvents} from "sharedTests/__mocks__/questionnaire/questionnaire-survey-events.mock"
import {getDateValueMock} from "sharedTests/utils/date-mock"
import wait from "waait"
import * as useChat from "../../hooks/use-chat"
import * as useModuleQuestionnaireHook from "../hooks/use-module-questionnaire"
import {ModuleQuestionnaire} from "../module-questionnaire"

const useEventQuestionnaireSpy = jest.spyOn(useModuleQuestionnaireHook, "useModuleQuestionnaire")
const useChatSpy = jest.spyOn(useChat, "useChat")

jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn()
}))

const moduleQuestionnaireHookDefaultValues = {
  questionnaire: Option.of(questionnaireMock),
  loading: false,
  isQuestionnaireFinished: false,
  numberOfAnsweredQuestions: 0,
  onSelectAnswer: jest.fn(),
  onDeselectAnswer: jest.fn(),
  onUpdateFreeText: jest.fn(),
  isStartModalVisible: false,
  setIsStartModalVisible: jest.fn(),
  onFinishQuestionnaire: jest.fn(),
  isFinishModalVisible: false,
  setIsFinishModalVisible: jest.fn(),
  surveyEvents: mockQuestionnaireSurveyEvents,
  navigateToVerifyToken: jest.fn(),
  isQuestionnaireDurationExpired: false,
  getQuestionnaireDurationInMillis: jest.fn(),
  onTimeUpConfirm: jest.fn()
}

const useChatHookDefaultValues = {
  isChatVisible: false,
  closeChat: jest.fn(),
  messages: [],
  openChat: jest.fn(),
  isChatAccessible: false,
  sendParticipantMessage: jest.fn(),
  supervisorName: "",
  unreadMessageCount: 0
}

const defaultProps = {
  questionnaireIdOption: Option.of(questionnaireMock.id)
}

describe("ModuleQuestionnaire", () => {
  const _Date = Date
  beforeEach(() => {
    const mockDate = getDateValueMock(1970, 1, 1)
    Date = mockDate
  })
  afterEach(() => {
    Date = _Date
  })
  it("renders correctly", async () => {
    useEventQuestionnaireSpy.mockReturnValue(moduleQuestionnaireHookDefaultValues)
    useChatSpy.mockReturnValue(useChatHookDefaultValues)
    const component = create(
      <MockedProvider>
        <ModuleQuestionnaire {...defaultProps} />
      </MockedProvider>
    )

    await act(() => wait(0))

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
