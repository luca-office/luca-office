import {Option} from "../../../utils"

export type ProjectResumptionState = {
  readonly elapsedTimeOfProjectModule: Option<ElapsedTimeOfProjectModuleForResumption>
  readonly areDelayedEmailsInitialized: boolean
  readonly areInterventionEmailsInitialized: boolean
}

export interface ElapsedTimeOfProjectModuleForResumption {
  readonly scenarioId: UUID | null
  readonly questionnaireId: UUID | null
  readonly elapsedTimeInSeconds: number
}

export const initialProjectResumptionState: ProjectResumptionState = {
  elapsedTimeOfProjectModule: Option.none(),
  areDelayedEmailsInitialized: false,
  areInterventionEmailsInitialized: false
}
