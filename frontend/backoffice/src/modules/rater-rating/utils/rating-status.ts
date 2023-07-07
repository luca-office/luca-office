import {IconName, RatingStatus} from "shared/enums"
import {ProjectModuleProgressType} from "shared/graphql/generated/globalTypes"
import {SurveyInvitationFragment_projectModuleProgresses} from "shared/graphql/generated/SurveyInvitationFragment"
import {LucaTFunction} from "shared/translations"

export const getRatingStatus = (
  isSurveyInProgress: boolean,
  participantsCount: number,
  ratedParticipantsCount: number
): RatingStatus =>
  isSurveyInProgress
    ? RatingStatus.SurveyInProgress
    : ratedParticipantsCount < participantsCount
    ? RatingStatus.RatingInProgress
    : RatingStatus.Completed

export const getRatingStatusIcon = (ratingStatus: RatingStatus): IconName => {
  switch (ratingStatus) {
    case RatingStatus.SurveyInProgress:
      return IconName.Sandglass
    case RatingStatus.RatingInProgress:
      return IconName.EditBordered
    case RatingStatus.Completed:
      return IconName.Check
    default:
      return IconName.Alert
  }
}

export const getRatingStatusLabel = (t: LucaTFunction, ratingStatus: RatingStatus): string => {
  switch (ratingStatus) {
    case RatingStatus.SurveyInProgress:
      return t("rater_rating__status_survey_in_progress")
    case RatingStatus.RatingInProgress:
      return t("rater_rating__status_rating_in_progress")
    case RatingStatus.Completed:
      return t("rater_rating__status_rating_completed")
    default:
      return ""
  }
}

export const isRatingOfEveryModulePossible = (
  projectModuleProgresses: SurveyInvitationFragment_projectModuleProgresses[]
) => {
  return (
    projectModuleProgresses.every(module => module.status === ProjectModuleProgressType.Completed) &&
    projectModuleProgresses.length > 0
  )
}

export const isRatingOfSomeModulePossible = (
  projectModuleProgresses: SurveyInvitationFragment_projectModuleProgresses[]
) => {
  return (
    projectModuleProgresses.some(module => module.status === ProjectModuleProgressType.Completed) &&
    projectModuleProgresses.length > 0
  )
}
