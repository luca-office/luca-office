import wait from "waait"
import {scenarioIdMock} from "../../../tests/__mocks__"
import {getDateValueMock} from "../../../tests/utils/date-mock"
import {
  surveyEventFragmentsMock,
  surveyEventQuestionnaireId,
  surveyEventScenarioId,
  surveyEventsMock
} from "../../graphql/__mocks__"
import {SurveyEventCreation, SurveyEventType} from "../../graphql/generated/globalTypes"
import {CalculatorKey} from "../../office-tools"
import {addSurveyEventAction} from "../../redux/actions/data/survey-events-action"
import {formatDateForBackend, parseDateString} from "../date"
import {
  convertSurveyEvent,
  findSurveyEventsByEventType,
  getSurveyEventsByQuestionnaireId,
  getSurveyEventsByScenarioId,
  initSurveyEventQueue,
  sendBaseSurveyEvent
} from "../survey-event"
import {sendCalculatorKeyPressedEvent} from "../survey-events"

const surveyEventFragment = surveyEventFragmentsMock[0]
const surveyId = surveyEventFragment.surveyId
const surveyInvitationId = surveyEventFragment.invitationId!

const countSpy = jest.fn()

const updaterSpy = (surveyEvents: SurveyEventCreation[], onSuccess?: () => void) => {
  countSpy(surveyEvents.length)
  onSuccess && onSuccess()
  return Promise.resolve()
}

const dispatchEvents = (eventCount: number) => {
  while (eventCount > 0) {
    sendCalculatorKeyPressedEvent(scenarioIdMock, CalculatorKey.Addition)("123", "123")
    eventCount--
  }
}

describe("survey event", () => {
  describe("initSurveyEventQueue", () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })
    it("can initSurveyEventQueue with events", async () => {
      initSurveyEventQueue(updaterSpy, 500)
      dispatchEvents(24)
      await wait(500)
      expect(countSpy).toHaveBeenCalledWith(24)
    })
    it("can initSurveyEventQueue without events", async () => {
      initSurveyEventQueue(updaterSpy, 0)
      await wait(50)
      expect(countSpy).not.toHaveBeenCalled()
    })
    it("can initSurveyEventQueue with event flow", async () => {
      initSurveyEventQueue(updaterSpy, 0)
      expect(countSpy).not.toHaveBeenCalled()
      dispatchEvents(24)
      await wait(50)
      expect(countSpy).toHaveBeenCalledWith(24)
      dispatchEvents(13)
      await wait(50)
      expect(countSpy).toHaveBeenCalledWith(13)
      expect(countSpy).toHaveBeenCalledTimes(2)
      await wait(50)
      expect(countSpy).toHaveBeenCalledTimes(2)
    })
  })
  describe("sendSurveyEvent", () => {
    const _Date = Date
    beforeEach(() => {
      const mockDate = getDateValueMock(1970, 1, 1)
      Date = mockDate
    })
    afterEach(() => {
      Date = _Date
    })
    it("correctly sends survey event", () => {
      const mockDispatch = jest.fn()
      sendBaseSurveyEvent({
        surveyId,
        invitationId: surveyInvitationId,
        eventType: SurveyEventType.StartEvent,
        data: {mock: "data"},
        dispatch: mockDispatch
      })
      const expectedSurveyEvent = addSurveyEventAction({
        surveyId,
        eventType: SurveyEventType.StartEvent,
        invitationId: surveyInvitationId,
        data: JSON.stringify({mock: "data"}),
        timestamp: formatDateForBackend(new Date())
      })
      expect(mockDispatch).toHaveBeenCalledWith({
        ...expectedSurveyEvent,
        payload: {
          ...expectedSurveyEvent.payload,
          index: expect.any(Number)
        }
      })
    })
  })
  describe("convertSurveyEvent", () => {
    it("correctly converts survey-event fragment to survey-event (no data)", () => {
      expect(convertSurveyEvent(surveyEventFragment)).toEqual({
        ...surveyEventFragment,
        timestamp: parseDateString(surveyEventFragment.timestamp),
        data: null
      })
    })
    it("correctly converts survey-event fragment to survey-event (data)", () => {
      const fragment = surveyEventFragmentsMock[1]
      expect(convertSurveyEvent(fragment)).toEqual({
        ...fragment,
        timestamp: parseDateString(fragment.timestamp),
        data: JSON.parse(fragment.data!)
      })
    })
  })
  describe("getSurveyEventsByScenarioId", () => {
    it("returns correct result if events for scenario are available", () => {
      expect(getSurveyEventsByScenarioId(surveyEventsMock, surveyEventScenarioId)).toEqual([
        surveyEventsMock[3],
        surveyEventsMock[2]
      ])
    })
    it("returns correct result if no events for scenario are available", () => {
      expect(getSurveyEventsByScenarioId(surveyEventsMock, "b6fc8363-d990-4c99-915d-c600023bb2b9")).toEqual([])
    })
  })
  describe("getSurveyEventsByQuestionnaireId", () => {
    it("returns correct result if events for questionnaire are available", () => {
      expect(getSurveyEventsByQuestionnaireId(surveyEventsMock, surveyEventQuestionnaireId)).toEqual([
        surveyEventsMock[1]
      ])
    })
    it("returns correct result if no events for questionnaire are available", () => {
      expect(getSurveyEventsByQuestionnaireId(surveyEventsMock, "f472f1ac-84f3-4270-9d94-49d40fb1e7f9")).toEqual([])
    })
  })
  describe("findSurveyEventsByEventType", () => {
    it("returns the searched events", () => {
      const surveyEvent = surveyEventsMock[2]
      expect(findSurveyEventsByEventType(surveyEventsMock, surveyEvent.eventType)).toEqual([surveyEvent])
    })
    it("returns empty array if element can't be found", () => {
      expect(findSurveyEventsByEventType(surveyEventsMock, SurveyEventType.ErpCloseRow)).toEqual([])
    })
  })
})
