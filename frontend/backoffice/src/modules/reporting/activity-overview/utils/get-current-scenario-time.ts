import {differenceInSeconds} from "date-fns"
import {SurveyEventType} from "shared/graphql/generated/globalTypes"
import {SurveyEvent} from "shared/models"

export const getCurrentScenarioTime = (surveyEvents: SurveyEvent[]): number => {
  if (surveyEvents.length === 0) return 0
  const startScenario = surveyEvents.find(event => event.eventType === SurveyEventType.StartScenario)
  if (startScenario === undefined) return 0
  const endScenario = surveyEvents.find(event => event.eventType === SurveyEventType.EndScenario)
  const endTime = endScenario !== undefined ? endScenario.timestamp : surveyEvents[surveyEvents.length - 1].timestamp
  return differenceInSeconds(endTime, startScenario.timestamp)
}
