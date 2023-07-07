import {Questionnaire, QuestionnaireLight, ScenarioQuestionnaire} from "../../models"
import {QuestionnaireType} from "../generated/globalTypes"
import {questionnaireMock} from "./questionnaire-question.mock"
import {scenariosMock} from "./scenarios.mock"
import {userAccountMock} from "./user-account.mock"

export const questionnairesMock: Questionnaire[] = [
  {
    __typename: "Questionnaire",
    id: "123",
    authorId: userAccountMock.id,
    author: userAccountMock,
    createdAt: "2020-07-21T12:15:48.373Z",
    modifiedAt: "2020-08-21T12:15:48.373Z",
    finalizedAt: "2020-08-21T12:15:48.373Z",
    publishedAt: null,
    description: "test description",
    title: "My new questionnaire",
    questionnaireType: QuestionnaireType.RuntimeSurvey,
    binaryFile: null,
    binaryFileId: null,
    questionsCount: 5,
    questions: questionnaireMock.questions,
    maxDurationInSeconds: 60
  },
  {
    __typename: "Questionnaire",
    id: "1234",
    authorId: userAccountMock.id,
    author: userAccountMock,
    createdAt: "2020-07-21T12:15:48.373Z",
    modifiedAt: "2020-08-21T12:15:48.373Z",
    finalizedAt: "2020-08-21T12:15:48.373Z",
    publishedAt: null,
    description: "test description",
    title: "My Forschung questionnaire",
    questionnaireType: QuestionnaireType.RuntimeSurvey,
    binaryFile: null,
    binaryFileId: null,
    questionsCount: 5,
    questions: questionnaireMock.questions,
    maxDurationInSeconds: 60
  },
  {
    __typename: "Questionnaire",
    id: "41212",
    authorId: userAccountMock.id,
    author: userAccountMock,
    createdAt: "2020-07-21T12:15:48.373Z",
    modifiedAt: "2020-08-21T12:15:48.373Z",
    finalizedAt: "2020-08-21T12:15:48.373Z",
    publishedAt: null,
    description: "test description",
    title: "Global questionnaire",
    questionnaireType: QuestionnaireType.Global,
    binaryFile: null,
    binaryFileId: null,
    questionsCount: 5,
    questions: questionnaireMock.questions,
    maxDurationInSeconds: 60
  },
  {
    __typename: "Questionnaire",
    id: "1222",
    authorId: userAccountMock.id,
    author: userAccountMock,
    createdAt: "2020-07-21T12:15:48.373Z",
    modifiedAt: "2020-08-21T12:15:48.373Z",
    finalizedAt: null,
    publishedAt: null,
    description: "test description",
    title: "My new questionnaire",
    questionnaireType: QuestionnaireType.RuntimeSurvey,
    binaryFileId: null,
    binaryFile: null,
    questionsCount: 5,
    questions: questionnaireMock.questions,
    maxDurationInSeconds: 60
  }
]

export const scenarioQuestionnairesMock: ScenarioQuestionnaire[] = [
  {
    __typename: "ScenarioQuestionnaire",
    scenarioId: scenariosMock[0].id,
    activationDelayInSeconds: 0,
    questionnaire: {
      ...questionnairesMock[0]
    },
    questionnaireId: questionnairesMock[0].id
  },
  {
    __typename: "ScenarioQuestionnaire",
    scenarioId: scenariosMock[0].id,
    activationDelayInSeconds: 20,
    questionnaire: {
      ...questionnairesMock[1]
    },
    questionnaireId: questionnairesMock[1].id
  }
]

export const questionnairesLightMock: QuestionnaireLight[] = [
  {
    __typename: "Questionnaire",
    id: "123",
    createdAt: "2020-07-21T12:15:48.373Z",
    modifiedAt: "2020-08-21T12:15:48.373Z",
    author: userAccountMock,
    finalizedAt: "2020-08-21T12:15:48.373Z",
    publishedAt: null,
    description: "test description",
    title: "My new questionnaire",
    questionnaireType: QuestionnaireType.RuntimeSurvey,
    questionsCount: 5,
    maxDurationInSeconds: 60
  }
]
