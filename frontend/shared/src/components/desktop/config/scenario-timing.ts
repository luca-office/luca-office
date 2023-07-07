export const DEFAULT_PROJECT_MODULE_DURATION_IN_S = 60 * 60

/**
 * get scenario or questionnaire duration or map to default (in case of test surveys without duration)
 * @param maxDurationInSeconds
 */
export const getScenarioOrQuestionnaireDurationInSeconds = (maxDurationInSeconds?: number | null) =>
  maxDurationInSeconds !== null && maxDurationInSeconds !== undefined && maxDurationInSeconds > 0
    ? maxDurationInSeconds
    : DEFAULT_PROJECT_MODULE_DURATION_IN_S
