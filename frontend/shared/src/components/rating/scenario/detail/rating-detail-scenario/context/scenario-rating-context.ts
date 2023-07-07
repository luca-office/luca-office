import * as React from "react"
import {Subject} from "../../../../../../utils"

interface ScenarioRatingContextValues {
  readonly refreshRatingSubject?: Subject<void>
}

export const ScenarioRatingContext = React.createContext<ScenarioRatingContextValues>({})
