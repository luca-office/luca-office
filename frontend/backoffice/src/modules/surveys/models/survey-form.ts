export interface SurveyForm {
  readonly title: string
  readonly isAutomaticStartEnabled: boolean
  readonly isManualAsynchronous: boolean
  readonly isOpenParticipationEnabled: boolean
  readonly isAnonymousAuthAllowed: boolean
  readonly dateRange: Date[] // [start, end]
}
