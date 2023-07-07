import {IconName, TimeUnit} from "shared/enums"
import {ProjectModule} from "shared/models"
import {secondsToGivenTimeUnit} from "shared/utils"

export const getSecondaryButtonIcon = (
  hasSurveyStarted: boolean,
  hasSurveyEnded: boolean,
  hasNextModule: boolean,
  isAsyncSurvey: boolean
) => {
  if (hasSurveyStarted && !hasSurveyEnded) {
    return hasNextModule && !isAsyncSurvey ? IconName.Play : IconName.Check
  } else if (hasSurveyEnded) {
    return undefined
  } else {
    return IconName.Play
  }
}

export const getModuleDurationInMinutes = ({scenario}: ProjectModule) => {
  if (scenario && scenario.maxDurationInSeconds !== null) {
    return secondsToGivenTimeUnit(TimeUnit.Minute, scenario.maxDurationInSeconds)
  } else {
    return null
  }
}
