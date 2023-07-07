import {withSurveyEventTestIndex} from "../../../tests/utils/survey-event-test-index-provider"
import {OfficeTool} from "../../enums"
import {SurveyEventCreation, SurveyEventType} from "../../graphql/generated/globalTypes"
import {notesDoesNotContainValues} from "../../utils/intervention"

const invitationId = "e521f786-2e86-4925-8a99-87f16b07776c"
const surveyId = "433c9cd6-aa6e-443b-a0cc-8159f4440f94"
const scenarioId = "ea93f160-8f51-4333-8a88-ff260e8e00c5"

const surveyEventsMock: SurveyEventCreation[] = withSurveyEventTestIndex([
  {
    eventType: SurveyEventType.ViewReferenceBookArticle,
    invitationId,
    surveyId,
    timestamp: "2021-04-26 10:51:39",
    data: JSON.stringify({
      scenarioId: "d768e0d4-8098-445f-9e51-7d5e3dc7ce6c",
      articleId: "6134b561-9888-451f-b8b5-a0d6b5d6046f"
    })
  },
  {
    eventType: SurveyEventType.ViewReferenceBookArticle,
    invitationId,
    surveyId,
    timestamp: "2021-04-26 10:53:31",
    data: JSON.stringify({
      scenarioId: "d768e0d4-8098-445f-9e51-7d5e3dc7ce6c",
      articleId: "93f8d8cc-5687-48a3-a5f1-f9c366a1a751"
    })
  },
  {
    eventType: SurveyEventType.CloseTool,
    invitationId,
    surveyId,
    timestamp: "2021-04-26 10:53:34",
    data: JSON.stringify({
      tool: OfficeTool.Calculator
    })
  },
  {
    eventType: SurveyEventType.EndProject,
    invitationId,
    surveyId,
    timestamp: "2021-04-26 10:53:31"
  },
  {
    eventType: SurveyEventType.ViewFile,
    invitationId,
    surveyId,
    timestamp: "2021-04-26 10:56:24",
    data: JSON.stringify({
      scenarioId: "d768e0d4-8098-445f-9e51-7d5e3dc7ce6c",
      fileId: "6134b561-9888-451f-b8b5-a0d6b5d6046f"
    })
  },
  {
    eventType: SurveyEventType.ViewFile,
    invitationId,
    surveyId,
    timestamp: "2021-04-26 10:58:24",
    data: JSON.stringify({
      scenarioId: "d768e0d4-8098-445f-9e51-7d5e3dc7ce6c",
      fileId: "6134b561-9888-451f-b8b5-a0d6b5d6046f"
    })
  },
  {
    eventType: SurveyEventType.ViewFile,
    invitationId,
    surveyId,
    timestamp: "2021-04-26 10:57:23",
    data: JSON.stringify({
      scenarioId: "d768e0d4-8098-445f-9e51-7d5e3dc7ce6c",
      fileId: "62b412e9-a52e-4c03-83b4-76e406e4b2c5"
    })
  }
])

const notesSurveyEventsMock: SurveyEventCreation[] = withSurveyEventTestIndex([
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:22.321Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"d","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:22.792Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"df","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:25.913Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"dfd","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:26.621Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"dfdf","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:29.467Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"dfdfd","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:29.635Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"dfdfdf","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:29.798Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"dfdfdfd","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:29.893Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"dfdfdfdf","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:30.052Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"dfdfdfdfd","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:30.186Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"dfdfdfdfdf","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:31.808Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"dfdfdfdfdf ","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:32.150Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"dfdfdfdfdf M","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:32.317Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"dfdfdfdfdf Mo","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:32.523Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"dfdfdfdfdf Moi","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:32.613Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"dfdfdfdfdf Moin","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:32.780Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"dfdfdfdfdf Moin ","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:33.244Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"dfdfdfdfdf Moin o","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:33.470Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"dfdfdfdfdf Moin oi","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:33.564Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"dfdfdfdfdf Moin oin","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:33.998Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"dfdfdfdfdf Moin oi","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:34.157Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"dfdfdfdfdf Moin o","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:34.304Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"dfdfdfdfdf Moin ","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:35.045Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"dfdfdfdfdf Moin M","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:35.228Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"dfdfdfdfdf Moin Mo","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:35.421Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"dfdfdfdfdf Moin Moi","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:35.523Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"dfdfdfdfdf Moin Moin","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:41.966Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"T","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:42.174Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"Te","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:43.061Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"Tes","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:43.308Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"Test","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:44.253Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"Test ","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:44.780Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"Test M","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:44.957Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"Test Mo","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:45.180Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"Test Moi","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:45.277Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"Test Moin","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:45.510Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"Test Moin ","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:45.741Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"Test Moin M","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:45.965Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"Test Moin Mo","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:46.195Z"
  },
  {
    surveyId: surveyId,
    eventType: SurveyEventType.UpdateNotesText,
    invitationId: invitationId,
    data: '{"text":"Test Moin Moi","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-05-03T06:42:46.298Z"
  }
])

const notesEventWithDifferentScenarioId = (scenarioId: UUID) => ({
  eventType: SurveyEventType.UpdateNotesText,
  invitationId,
  surveyId,
  timestamp: "2021-05-03T06:33:34.052Z",
  data: JSON.stringify({
    scenarioId: scenarioId,
    value: "test"
  })
})

describe("notes intervention condition check", () => {
  it("should intervene (=true) because there are no events of notes tool", async () => {
    expect(notesDoesNotContainValues(scenarioId, ["test"], surveyEventsMock)).toBe(true)
  })
  it("should intervene (=true) because there are only events of notes tool with wrong scenarioId", async () => {
    expect(
      notesDoesNotContainValues(
        scenarioId,
        ["test"],
        [...surveyEventsMock, notesEventWithDifferentScenarioId("9ad67717-8312-4cb6-8d90-ba7773d8205b")]
      )
    ).toBe(true)
  })
  it("should not intervene (=false) because last event contains Test -> not case sensitive", async () => {
    expect(notesDoesNotContainValues(scenarioId, ["test"], notesSurveyEventsMock)).toBe(false)
  })
  it("should not intervene (=false) because last event contains Test", async () => {
    expect(notesDoesNotContainValues(scenarioId, ["Test"], notesSurveyEventsMock)).toBe(false)
  })
  it("should intervene (=true) because last event does not contain 100", async () => {
    expect(notesDoesNotContainValues(scenarioId, ["100"], notesSurveyEventsMock)).toBe(true)
  })
  it("should not intervene (=false) because last event does not contain 100 but Test", async () => {
    expect(notesDoesNotContainValues(scenarioId, ["100", "Test"], notesSurveyEventsMock)).toBe(false)
  })
})
