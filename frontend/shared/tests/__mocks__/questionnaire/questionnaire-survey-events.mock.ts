import {QuestionnaireSurveyEvents} from "../../../src/models"

export const mockQuestionnaireSurveyEvents: QuestionnaireSurveyEvents = {
  sendStartQuestionnaire: jest.fn(),
  sendEndQuestionnaire: jest.fn(),
  sendStartEvent: jest.fn(),
  sendEndEvent: jest.fn(),
  sendPlayQuestionnaireQuestionVideo: jest.fn(),
  sendQuestionnaireQuestionVideoPlaybackEnded: jest.fn(),
  sendPauseQuestionnaireQuestionVideo: jest.fn(),
  sendPlayQuestionnaireVideo: jest.fn(),
  sendQuestionnaireVideoPlaybackEnded: jest.fn(),
  sendPauseQuestionnaireVideo: jest.fn(),
  sendSelectQuestionnaireAnswer: jest.fn(),
  sendDeselectQuestionnaireAnswer: jest.fn(),
  sendUpdateQuestionnaireFreeTextAnswer: jest.fn(),
  sendEnterFullscreenQuestionnaireVideo: jest.fn(),
  sendLeaveFullscreenQuestionnaireVideo: jest.fn(),
  sendLeaveFullscreenQuestionnaireQuestionVideo: jest.fn(),
  sendEnterFullscreenQuestionnaireQuestionVideo: jest.fn(),
  sendShrinkQuestionnaireQuestionBinary: jest.fn(),
  sendEnlargeQuestionnaireQuestionBinary: jest.fn(),
  sendShrinkQuestionnaireBinary: jest.fn(),
  sendEnlargeQuestionnaireBinary: jest.fn(),
  sendSelectQuestionnaireFreeTextAnswer: jest.fn(),
  sendDeselectQuestionnaireFreeTextAnswer: jest.fn(),
  sendResumeQuestionnaire: jest.fn()
}
