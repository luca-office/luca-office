import {ProjectModuleProgressType} from "../graphql/generated/globalTypes"
import {LucaI18nLangKey} from "../translations"

export const getSurveyStatusLabelKey = (
  status: ProjectModuleProgressType | undefined,
  hasSurveyEnded?: boolean
): LucaI18nLangKey => {
  switch (status) {
    case ProjectModuleProgressType.InProgress:
      return hasSurveyEnded ? "dashboard__attendee_status_not_completed" : "dashboard__attendee_status_progressing"
    case ProjectModuleProgressType.Completed:
      return "dashboard__attendee_status_completed"
    default:
      return "dashboard__attendee_status_open"
  }
}
