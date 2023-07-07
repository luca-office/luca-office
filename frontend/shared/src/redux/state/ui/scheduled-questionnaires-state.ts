export interface ScheduledQuestionnaire {
  readonly questionnaireId: UUID
  readonly timerHandle: number
}

export interface ScheduledQuestionnairesState {
  scheduledQuestionnaires: Array<ScheduledQuestionnaire>
  activeQuestionnaireIds: UUID[]
}

export const initialScheduledQuestionnaireState: ScheduledQuestionnairesState = {
  scheduledQuestionnaires: [],
  activeQuestionnaireIds: []
}
