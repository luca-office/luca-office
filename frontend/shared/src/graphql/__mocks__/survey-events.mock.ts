import {SurveyEvent} from "../../models"
import {OfficeTool, SurveyEventType} from "../generated/globalTypes"
import {SurveyEventFragment} from "../generated/SurveyEventFragment"

const surveyId = "55f35571-5d08-4b71-adc1-8a97a0d81cc7"
const surveyInvitationId = "52fc915d-2777-4100-bd4e-bd8f85154384"

export const surveyEventScenarioId = "b3266640-6d3c-4467-819e-731e69986bef"
export const surveyEventQuestionnaireId = "8e3d8232-e18c-4628-b6f9-55a3469b7067"

export const surveyEventFragmentsMock: SurveyEventFragment[] = [
  {
    __typename: "SurveyEvent",
    timestamp: new Date(2018, 10, 5).toISOString(),
    eventType: SurveyEventType.StartEvent,
    data: null,
    surveyId,
    index: 0,
    invitationId: surveyInvitationId
  },
  {
    __typename: "SurveyEvent",
    timestamp: new Date(2021, 10, 5).toISOString(),
    eventType: SurveyEventType.UpdateQuestionnaireFreeTextAnswer,
    data: JSON.stringify({
      questionnaireId: surveyEventQuestionnaireId,
      questionId: "e1910cd5-e513-484e-846c-340178b11e7a",
      value: "Freetext Answer"
    }),
    surveyId,
    index: 0,
    invitationId: surveyInvitationId
  },
  {
    __typename: "SurveyEvent",
    timestamp: new Date(2020, 10, 5).toISOString(),
    eventType: SurveyEventType.AnswerEmail,
    data: JSON.stringify({
      scenarioId: surveyEventScenarioId,
      createdEmailId: "606e404b-df9d-478a-89cb-b29ae3a90999",
      answeredEmailId: "14cf9cb0-6df4-4341-8a25-2762eadc65d3"
    }),
    surveyId,
    index: 0,
    invitationId: surveyInvitationId
  },
  {
    __typename: "SurveyEvent",
    timestamp: new Date(2019, 10, 5).toISOString(),
    eventType: SurveyEventType.MinimizeTool,
    data: JSON.stringify({scenarioId: surveyEventScenarioId, tool: OfficeTool.Calculator}),
    surveyId,
    index: 0,
    invitationId: surveyInvitationId
  },
  {
    __typename: "SurveyEvent",
    timestamp: new Date(2017, 10, 5).toISOString(),
    eventType: SurveyEventType.EndEvent,
    data: null,
    surveyId,
    index: 0,
    invitationId: surveyInvitationId
  }
]

export const surveyEventsMock: SurveyEvent[] = [
  {
    __typename: "SurveyEvent",
    timestamp: new Date(2018, 10, 5),
    eventType: SurveyEventType.StartEvent,
    data: null,
    surveyId,
    index: 0,
    invitationId: surveyInvitationId
  },
  {
    __typename: "SurveyEvent",
    timestamp: new Date(2021, 10, 5),
    eventType: SurveyEventType.UpdateQuestionnaireFreeTextAnswer,
    data: {
      questionnaireId: surveyEventQuestionnaireId,
      questionId: "e1910cd5-e513-484e-846c-340178b11e7a",
      value: "Freetext Answer"
    },
    surveyId,
    index: 0,
    invitationId: surveyInvitationId
  },
  {
    __typename: "SurveyEvent",
    timestamp: new Date(2020, 10, 5),
    eventType: SurveyEventType.AnswerEmail,
    data: {
      scenarioId: surveyEventScenarioId,
      createdEmailId: "606e404b-df9d-478a-89cb-b29ae3a90999",
      answeredEmailId: "14cf9cb0-6df4-4341-8a25-2762eadc65d3"
    },
    surveyId,
    index: 0,
    invitationId: surveyInvitationId
  },
  {
    __typename: "SurveyEvent",
    timestamp: new Date(2019, 10, 5),
    eventType: SurveyEventType.MinimizeTool,
    data: {scenarioId: surveyEventScenarioId, tool: OfficeTool.Calculator},
    surveyId,
    index: 0,
    invitationId: surveyInvitationId
  },
  {
    __typename: "SurveyEvent",
    timestamp: new Date(2017, 10, 5),
    eventType: SurveyEventType.EndEvent,
    data: null,
    surveyId,
    index: 0,
    invitationId: surveyInvitationId
  }
]
