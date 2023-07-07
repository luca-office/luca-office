import {differenceInSeconds} from "date-fns"
import {LatestStartedProjectModule, OfficeModule} from "../models"
import {now, parseDateString} from "."
import {Option} from "./option"

export const getElapsedTimeOfLaterStartToSurveyInSeconds = (
  activeModule: Option<OfficeModule>,
  latestStartedModule: Option<LatestStartedProjectModule>
) => {
  if (latestStartedModule.isDefined()) {
    return latestStartedModule
      .map(startedModule => {
        if (activeModule.exists(activeProjectModule => startedModule.projectModuleId === activeProjectModule.id)) {
          return Math.abs(differenceInSeconds(parseDateString(startedModule.startedAt), now()))
        } else {
          return 0
        }
      })
      .getOrElse(0)
  } else {
    return 0
  }
}
