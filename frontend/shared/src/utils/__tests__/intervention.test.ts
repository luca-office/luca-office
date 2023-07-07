import {withSurveyEventTestIndex} from "../../../tests/utils/survey-event-test-index-provider"
import {OfficeTool} from "../../enums"
import {ErpTableType, QuestionType, SurveyEventCreation, SurveyEventType} from "../../graphql/generated/globalTypes"
import {fileWasOpened, QuestionConfig, runtimeSurveyAnswerSelectionCheck} from "../../utils/intervention"
import {erpDataSetWasOpened} from "../intervention"

const invitationId = "e521f786-2e86-4925-8a99-87f16b07776c"
const surveyId = "433c9cd6-aa6e-443b-a0cc-8159f4440f94"
const questionId = "317a6072-6483-4c66-8d76-39a5733d672d"
const questionnaireId = "1b70bd5e-db22-423e-9dc0-2639c85bb0aa"
const scenarioId = "da437309-afbf-445d-8738-2a1d589a0a0c"

const questionConfig: QuestionConfig = {
  id: questionId,
  type: QuestionType.SingleChoice
}

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
    eventType: SurveyEventType.OpenPdfBinary,
    invitationId,
    surveyId,
    timestamp: "2021-04-26 10:56:24",
    data: JSON.stringify({
      scenarioId: "d768e0d4-8098-445f-9e51-7d5e3dc7ce6c",
      fileId: "6134b561-9888-451f-b8b5-a0d6b5d6046f"
    })
  },
  {
    eventType: SurveyEventType.OpenSpreadsheet,
    invitationId,
    surveyId,
    timestamp: "2021-04-26 10:58:24",
    data: JSON.stringify({
      scenarioId: "d768e0d4-8098-445f-9e51-7d5e3dc7ce6c",
      fileId: "6134b561-9888-451f-b8b5-a0d6b5d6046f"
    })
  },
  {
    eventType: SurveyEventType.OpenTextDocument,
    invitationId,
    surveyId,
    timestamp: "2021-04-26 10:57:23",
    data: JSON.stringify({
      scenarioId: "d768e0d4-8098-445f-9e51-7d5e3dc7ce6c",
      fileId: "62b412e9-a52e-4c03-83b4-76e406e4b2c5"
    })
  }
])

const answerSurveyEventsDeselectedLast: SurveyEventCreation[] = withSurveyEventTestIndex([
  {
    eventType: SurveyEventType.ErpOpenRow,
    invitationId,
    surveyId,
    timestamp: "2020-08-05 15:16:28.504000 +00:00",
    data: JSON.stringify({
      questionnaireId,
      questionId,
      answerId: "62b412e9-a52e-4c03-83b4-76e406e4b2c5"
    })
  },
  {
    eventType: SurveyEventType.DeselectQuestionnaireAnswer,
    invitationId,
    surveyId,
    timestamp: "2020-08-05 15:16:30.504000 +00:00",
    data: JSON.stringify({
      questionnaireId,
      questionId,
      answerId: "62b412e9-a52e-4c03-83b4-76e406e4b2c5"
    })
  },
  {
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId,
    surveyId,
    timestamp: "2020-08-05 15:16:26.504000 +00:00",
    data: JSON.stringify({
      questionnaireId,
      questionId,
      answerId: "62b412e9-a52e-4c03-83b4-76e406e4b2c5"
    })
  },
  {
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId,
    surveyId,
    timestamp: "2020-08-05 15:16:24.504000 +00:00",
    data: JSON.stringify({
      questionnaireId,
      questionId,
      answerId: "62b412e9-a52e-4c03-83b4-76e406e4b2c5"
    })
  }
])
const answerSurveyEventsSelectedLast: SurveyEventCreation[] = withSurveyEventTestIndex([
  {
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId,
    surveyId,
    timestamp: "2020-08-05 15:16:40.504000 +00:00",
    data: JSON.stringify({
      questionnaireId,
      questionId,
      answerId: "62b412e9-a52e-4c03-83b4-76e406e4b2c5"
    })
  },
  {
    eventType: SurveyEventType.DeselectQuestionnaireAnswer,
    invitationId,
    surveyId,
    timestamp: "2020-08-05 15:16:30.504000 +00:00",
    data: JSON.stringify({
      questionnaireId,
      questionId,
      answerId: "62b412e9-a52e-4c03-83b4-76e406e4b2c5"
    })
  },
  {
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId,
    surveyId,
    timestamp: "2020-08-05 15:16:26.504000 +00:00",
    data: JSON.stringify({
      questionnaireId,
      questionId,
      answerId: "62b412e9-a52e-4c03-83b4-76e406e4b2c5"
    })
  },
  {
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId,
    surveyId,
    timestamp: "2020-08-05 15:16:24.504000 +00:00",
    data: JSON.stringify({
      questionnaireId,
      questionId,
      answerId: "62b412e9-a52e-4c03-83b4-76e406e4b2c5"
    })
  }
])

const realMock: SurveyEventCreation[] = withSurveyEventTestIndex([
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data:
      '{"questionnaireId":"4ec17389-30f0-4276-a3f2-3a54e9407bf0","questionId":"694bda10-aba0-4cd7-815b-81acea37e496","answerId":"f7422b2b-03b0-4dd9-b511-f501b19f3ff4"}',
    timestamp: "2021-04-28T11:53:12.870Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data:
      '{"questionnaireId":"4ec17389-30f0-4276-a3f2-3a54e9407bf0","questionId":"694bda10-aba0-4cd7-815b-81acea37e496","answerId":"8ad314c8-5ff4-407d-8a49-173a727fb97a"}',
    timestamp: "2021-04-28T11:53:13.560Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data:
      '{"questionnaireId":"4ec17389-30f0-4276-a3f2-3a54e9407bf0","questionId":"694bda10-aba0-4cd7-815b-81acea37e496","answerId":"551cc36b-e042-43ff-8090-0847fb85bb56"}',
    timestamp: "2021-04-28T11:53:14.179Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data:
      '{"questionnaireId":"4ec17389-30f0-4276-a3f2-3a54e9407bf0","questionId":"694bda10-aba0-4cd7-815b-81acea37e496","answerId":"8ad314c8-5ff4-407d-8a49-173a727fb97a"}',
    timestamp: "2021-04-28T11:53:14.645Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data:
      '{"questionnaireId":"4ec17389-30f0-4276-a3f2-3a54e9407bf0","questionId":"694bda10-aba0-4cd7-815b-81acea37e496","answerId":"f7422b2b-03b0-4dd9-b511-f501b19f3ff4"}',
    timestamp: "2021-04-28T11:53:15.126Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data:
      '{"questionnaireId":"4ec17389-30f0-4276-a3f2-3a54e9407bf0","questionId":"694bda10-aba0-4cd7-815b-81acea37e496","answerId":"8ad314c8-5ff4-407d-8a49-173a727fb97a"}',
    timestamp: "2021-04-28T11:53:15.641Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data:
      '{"questionnaireId":"4ec17389-30f0-4276-a3f2-3a54e9407bf0","questionId":"694bda10-aba0-4cd7-815b-81acea37e496","answerId":"551cc36b-e042-43ff-8090-0847fb85bb56"}',
    timestamp: "2021-04-28T11:53:16.582Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data:
      '{"questionnaireId":"4ec17389-30f0-4276-a3f2-3a54e9407bf0","questionId":"694bda10-aba0-4cd7-815b-81acea37e496","answerId":"8ad314c8-5ff4-407d-8a49-173a727fb97a"}',
    timestamp: "2021-04-28T11:53:17.821Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data:
      '{"questionnaireId":"4ec17389-30f0-4276-a3f2-3a54e9407bf0","questionId":"694bda10-aba0-4cd7-815b-81acea37e496","answerId":"f7422b2b-03b0-4dd9-b511-f501b19f3ff4"}',
    timestamp: "2021-04-28T11:53:18.182Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data:
      '{"questionnaireId":"4ec17389-30f0-4276-a3f2-3a54e9407bf0","questionId":"694bda10-aba0-4cd7-815b-81acea37e496","answerId":"8ad314c8-5ff4-407d-8a49-173a727fb97a"}',
    timestamp: "2021-04-28T11:53:18.574Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data:
      '{"questionnaireId":"4ec17389-30f0-4276-a3f2-3a54e9407bf0","questionId":"694bda10-aba0-4cd7-815b-81acea37e496","answerId":"551cc36b-e042-43ff-8090-0847fb85bb56"}',
    timestamp: "2021-04-28T11:53:18.998Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data:
      '{"questionnaireId":"4ec17389-30f0-4276-a3f2-3a54e9407bf0","questionId":"694bda10-aba0-4cd7-815b-81acea37e496","answerId":"8ad314c8-5ff4-407d-8a49-173a727fb97a"}',
    timestamp: "2021-04-28T11:53:19.878Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data:
      '{"questionnaireId":"4ec17389-30f0-4276-a3f2-3a54e9407bf0","questionId":"694bda10-aba0-4cd7-815b-81acea37e496","answerId":"f7422b2b-03b0-4dd9-b511-f501b19f3ff4"}',
    timestamp: "2021-04-28T11:53:20.993Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data:
      '{"questionnaireId":"4ec17389-30f0-4276-a3f2-3a54e9407bf0","questionId":"694bda10-aba0-4cd7-815b-81acea37e496","answerId":"8ad314c8-5ff4-407d-8a49-173a727fb97a"}',
    timestamp: "2021-04-28T11:53:21.827Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data:
      '{"questionnaireId":"4ec17389-30f0-4276-a3f2-3a54e9407bf0","questionId":"694bda10-aba0-4cd7-815b-81acea37e496","answerId":"f7422b2b-03b0-4dd9-b511-f501b19f3ff4"}',
    timestamp: "2021-04-28T11:53:28.478Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data:
      '{"questionnaireId":"4ec17389-30f0-4276-a3f2-3a54e9407bf0","questionId":"694bda10-aba0-4cd7-815b-81acea37e496","answerId":"f7422b2b-03b0-4dd9-b511-f501b19f3ff4"}',
    timestamp: "2021-04-28T11:53:28.479Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.ShowEmail,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data: '{"id":"12637d30-d71b-4080-b4bc-69296d9f7ad3","scenarioId":"18b68589-548b-4e96-8e82-77261f05dd27"}',
    timestamp: "2021-04-28T11:53:40.342Z"
  }
])

const secondRealMock: SurveyEventCreation[] = withSurveyEventTestIndex([
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data:
      '{"questionnaireId":"4ec17389-30f0-4276-a3f2-3a54e9407bf0","questionId":"694bda10-aba0-4cd7-815b-81acea37e496","answerId":"f7422b2b-03b0-4dd9-b511-f501b19f3ff4"}',
    timestamp: "2021-04-28T13:01:54.020Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data:
      '{"questionnaireId":"4ec17389-30f0-4276-a3f2-3a54e9407bf0","questionId":"694bda10-aba0-4cd7-815b-81acea37e496","answerId":"8ad314c8-5ff4-407d-8a49-173a727fb97a"}',
    timestamp: "2021-04-28T13:01:54.531Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data:
      '{"questionnaireId":"4ec17389-30f0-4276-a3f2-3a54e9407bf0","questionId":"694bda10-aba0-4cd7-815b-81acea37e496","answerId":"551cc36b-e042-43ff-8090-0847fb85bb56"}',
    timestamp: "2021-04-28T13:01:55.002Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data:
      '{"questionnaireId":"4ec17389-30f0-4276-a3f2-3a54e9407bf0","questionId":"694bda10-aba0-4cd7-815b-81acea37e496","answerId":"8ad314c8-5ff4-407d-8a49-173a727fb97a"}',
    timestamp: "2021-04-28T13:01:55.473Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data:
      '{"questionnaireId":"4ec17389-30f0-4276-a3f2-3a54e9407bf0","questionId":"694bda10-aba0-4cd7-815b-81acea37e496","answerId":"f7422b2b-03b0-4dd9-b511-f501b19f3ff4"}',
    timestamp: "2021-04-28T13:01:55.859Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data:
      '{"questionnaireId":"4ec17389-30f0-4276-a3f2-3a54e9407bf0","questionId":"694bda10-aba0-4cd7-815b-81acea37e496","answerId":"8ad314c8-5ff4-407d-8a49-173a727fb97a"}',
    timestamp: "2021-04-28T13:01:56.267Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data:
      '{"questionnaireId":"4ec17389-30f0-4276-a3f2-3a54e9407bf0","questionId":"694bda10-aba0-4cd7-815b-81acea37e496","answerId":"551cc36b-e042-43ff-8090-0847fb85bb56"}',
    timestamp: "2021-04-28T13:01:56.793Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data:
      '{"questionnaireId":"4ec17389-30f0-4276-a3f2-3a54e9407bf0","questionId":"694bda10-aba0-4cd7-815b-81acea37e496","answerId":"8ad314c8-5ff4-407d-8a49-173a727fb97a"}',
    timestamp: "2021-04-28T13:01:57.383Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.SelectQuestionnaireAnswer,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data:
      '{"questionnaireId":"4ec17389-30f0-4276-a3f2-3a54e9407bf0","questionId":"694bda10-aba0-4cd7-815b-81acea37e496","answerId":"f7422b2b-03b0-4dd9-b511-f501b19f3ff4"}',
    timestamp: "2021-04-28T13:01:57.831Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.ShowEmail,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data: '{"id":"7b168cda-3528-4a4f-9afe-40d60d16fc11","scenarioId":"18b68589-548b-4e96-8e82-77261f05dd27"}',
    timestamp: "2021-04-28T13:02:10.259Z"
  }
])

const erpRowOpeningMock: SurveyEventCreation[] = withSurveyEventTestIndex([
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.ErpOpenRow,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data: JSON.stringify({
      scenarioId,
      rowId: 10,
      tableType: ErpTableType.Component,
      rowIndex: 2
    }),
    timestamp: "2021-04-28T13:01:54.020Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.ErpOpenRow,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data: JSON.stringify({
      scenarioId,
      erpRowId: 4,
      tableType: ErpTableType.Component,
      rowIndex: 2
    }),
    timestamp: "2021-04-28T13:01:54.531Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.ErpOpenRow,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data: JSON.stringify({
      scenarioId,
      rowId: 2,
      tableType: ErpTableType.Component,
      rowIndex: 2
    }),
    timestamp: "2021-04-28T13:01:55.002Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.ErpOpenRow,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data: JSON.stringify({
      scenarioId,
      rowId: 7,
      tableType: ErpTableType.Component,
      rowIndex: 2
    }),
    timestamp: "2021-04-28T13:01:55.473Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.ErpOpenRow,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data: JSON.stringify({
      scenarioId,
      rowId: 6,
      tableType: ErpTableType.Component,
      rowIndex: 2
    }),
    timestamp: "2021-04-28T13:01:55.859Z"
  },
  {
    surveyId: "1d939e9e-36a2-4565-801f-e8eda4dd577d",
    eventType: SurveyEventType.ErpOpenRow,
    invitationId: "bd78b687-dd60-4193-aeea-3e449a71a6b0",
    data: JSON.stringify({
      scenarioId,
      rowId: 5,
      tableType: ErpTableType.Component,
      rowIndex: 2
    }),
    timestamp: "2021-04-28T13:01:56.267Z"
  },
  {
    surveyId: "8cc1915a-0fc6-40fb-a918-92c72b89661a",
    eventType: SurveyEventType.ErpOpenRow,
    invitationId: "80127245-b585-4fe9-b3cf-a03d675816ac",
    data: '{"scenarioId":"da437309-afbf-445d-8738-2a1d589a0a0c","tableType":"Component","rowId":3,"rowIndex":7}',
    timestamp: "2021-06-03T08:36:43.567Z"
  }
])

describe("intervention condition check", () => {
  it("file opening is not fulfilled - file Id not in survey event type", async () => {
    expect(
      fileWasOpened("d768e0d4-8098-445f-9e51-7d5e3dc7ce6c", "94ca8578-5873-4d6c-97ec-80d461c59415", surveyEventsMock)
    ).toBe(false)
  })

  it("file opening is not fulfilled - different scenario Id", async () => {
    expect(
      fileWasOpened("78cd87c0-e1bf-4ac5-b957-90f9b1e289b4", "62b412e9-a52e-4c03-83b4-76e406e4b2c5", surveyEventsMock)
    ).toBe(false)
  })

  it("file opening is fulfilled - scenario Id and file id matches exactly one", async () => {
    expect(
      fileWasOpened("d768e0d4-8098-445f-9e51-7d5e3dc7ce6c", "62b412e9-a52e-4c03-83b4-76e406e4b2c5", surveyEventsMock)
    ).toBe(true)
  })
  it("file opening is fulfilled - scenario Id and file id has two corresponding survey events", async () => {
    expect(
      fileWasOpened("d768e0d4-8098-445f-9e51-7d5e3dc7ce6c", "6134b561-9888-451f-b8b5-a0d6b5d6046f", surveyEventsMock)
    ).toBe(true)
  })
  it("should intervenate (=true) if negated and no selection events", async () => {
    expect(
      runtimeSurveyAnswerSelectionCheck("62b412e9-a52e-4c03-83b4-76e406e4b2c5", true, surveyEventsMock, questionConfig)
    ).toBe(true)
  })
  it("should intervenate (true) because negated and last event is deselect - multiple choice", async () => {
    expect(
      runtimeSurveyAnswerSelectionCheck(
        "62b412e9-a52e-4c03-83b4-76e406e4b2c5",
        true,
        answerSurveyEventsDeselectedLast,
        {id: questionId, type: QuestionType.MultipleChoice}
      )
    ).toBe(true)
  })
  it("should intervenate (=true) because negated and answer id is in no Event", async () => {
    expect(
      runtimeSurveyAnswerSelectionCheck(
        "08a0e11e-d15e-406b-97fd-9f77d20c4a4e",
        true,
        answerSurveyEventsDeselectedLast,
        questionConfig
      )
    ).toBe(true)
  })
  it("should not intervenate (=false) for not negated, because last event is deselect - multiple choice", async () => {
    expect(
      runtimeSurveyAnswerSelectionCheck(
        "62b412e9-a52e-4c03-83b4-76e406e4b2c5",
        false,
        answerSurveyEventsDeselectedLast,
        {id: questionId, type: QuestionType.MultipleChoice}
      )
    ).toBe(false)
  })
  it("should be true for not negated - selected last timestamp", async () => {
    expect(
      runtimeSurveyAnswerSelectionCheck(
        "62b412e9-a52e-4c03-83b4-76e406e4b2c5",
        false,
        answerSurveyEventsSelectedLast,
        questionConfig
      )
    ).toBe(true)
  })
  it("should intervenate(=true) for not negated - mocks from real test", async () => {
    expect(
      runtimeSurveyAnswerSelectionCheck("f7422b2b-03b0-4dd9-b511-f501b19f3ff4", false, realMock, {
        id: "694bda10-aba0-4cd7-815b-81acea37e496",
        type: QuestionType.SingleChoice
      })
    ).toBe(true)
  })
  it("should be true for negated - mocks from real test", async () => {
    expect(
      runtimeSurveyAnswerSelectionCheck("8ad314c8-5ff4-407d-8a49-173a727fb97a", true, realMock, {
        id: "694bda10-aba0-4cd7-815b-81acea37e496",
        type: QuestionType.SingleChoice
      })
    ).toBe(true)
  })
  it("answer 1 selected -> should intervenate (=true) cause its not negated", async () => {
    expect(
      runtimeSurveyAnswerSelectionCheck("f7422b2b-03b0-4dd9-b511-f501b19f3ff4", false, secondRealMock, {
        id: "694bda10-aba0-4cd7-815b-81acea37e496",
        type: QuestionType.SingleChoice
      })
    ).toBe(true)
  })
  it("answer 1 selected -> should not intervenate (=false) cause it is negated", async () => {
    expect(
      runtimeSurveyAnswerSelectionCheck("f7422b2b-03b0-4dd9-b511-f501b19f3ff4", true, secondRealMock, {
        id: "694bda10-aba0-4cd7-815b-81acea37e496",
        type: QuestionType.SingleChoice
      })
    ).toBe(false)
  })
  it("answer 2 not selected -> should intervenate (=true) cause it is negated", async () => {
    expect(
      runtimeSurveyAnswerSelectionCheck("8ad314c8-5ff4-407d-8a49-173a727fb97a", true, secondRealMock, {
        id: "694bda10-aba0-4cd7-815b-81acea37e496",
        type: QuestionType.SingleChoice
      })
    ).toBe(true)
  })
  it("answer 2 not selected -> should not intervenate (=false) cause it is not negated", async () => {
    expect(
      runtimeSurveyAnswerSelectionCheck("8ad314c8-5ff4-407d-8a49-173a727fb97a", false, secondRealMock, {
        id: "694bda10-aba0-4cd7-815b-81acea37e496",
        type: QuestionType.SingleChoice
      })
    ).toBe(false)
  })

  it("erp opening: rowId and tableType are in events => was opened (=true)", async () => {
    expect(erpDataSetWasOpened(scenarioId, 2, ErpTableType.Component.toString(), erpRowOpeningMock)).toBe(true)
  })
  it("erp opening: rowId ist not in event and tableType is in events => was not opened (=false)", async () => {
    expect(erpDataSetWasOpened(scenarioId, 23, ErpTableType.Component.toString(), erpRowOpeningMock)).toBe(false)
  })
  it("erp opening: rowId and tableType are not in events => was not opened (=false)", async () => {
    expect(erpDataSetWasOpened(scenarioId, 3442, ErpTableType.Customer, erpRowOpeningMock)).toBe(false)
  })
})
