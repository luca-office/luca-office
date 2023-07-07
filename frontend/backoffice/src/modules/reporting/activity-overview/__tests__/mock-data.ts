import {BinaryViewerTool} from "shared/enums"
import {SurveyEventType} from "shared/graphql/generated/globalTypes"
import {SurveyEvent} from "shared/models"

export const mockSurveyEvents: SurveyEvent[] = [
  {
    __typename: "SurveyEvent",
    timestamp: new Date(2018, 10, 5, 10, 20, 12, 0),
    eventType: SurveyEventType.StartScenario,
    data: null,
    surveyId: "123",
    index: 0,
    invitationId: "123"
  },
  {
    __typename: "SurveyEvent",
    timestamp: new Date(2018, 10, 5, 10, 21, 12, 0),
    eventType: SurveyEventType.OpenTool,
    data: {tool: BinaryViewerTool.PDFViewer},
    surveyId: "123",
    index: 0,
    invitationId: "123"
  },
  {
    __typename: "SurveyEvent",
    timestamp: new Date(2018, 10, 5, 10, 22, 12, 0),
    eventType: SurveyEventType.OpenTool,
    data: {tool: BinaryViewerTool.VideoPlayer},
    surveyId: "123",
    index: 0,
    invitationId: "123"
  },
  {
    __typename: "SurveyEvent",
    timestamp: new Date(2018, 10, 5, 10, 23, 12, 0),
    eventType: SurveyEventType.CloseTool,
    data: {tool: BinaryViewerTool.PDFViewer},
    surveyId: "123",
    index: 0,
    invitationId: "123"
  },
  {
    __typename: "SurveyEvent",
    timestamp: new Date(2018, 10, 5, 10, 24, 12, 0),
    eventType: SurveyEventType.EndScenario,
    data: null,
    surveyId: "123",
    index: 0,
    invitationId: "123"
  }
]
