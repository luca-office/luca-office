import {differenceInSeconds} from "date-fns"
import {getScenarioOrQuestionnaireDurationInSeconds} from "shared/components/desktop/config"
import {LatestStartedProjectModule, OfficeModule, Scenario} from "shared/models"
import {ElapsedTimeOfProjectModuleForResumption} from "shared/redux/state/data/project-resumption-state"
import {now, Option, parseDateString} from "shared/utils"

export const getScenarioDurationInSeconds = (
  scenario: Scenario,
  latestStartedProjectModule: Option<LatestStartedProjectModule>,
  activeModuleOption: Option<OfficeModule>,
  projectResumptionProjectModuleDelay: number | null
) => {
  const scenarioMaxDurationInSeconds = getScenarioOrQuestionnaireDurationInSeconds(scenario.maxDurationInSeconds)

  if (
    latestStartedProjectModule.exists(module =>
      activeModuleOption.exists(activeModule => activeModule.id === module.projectModuleId)
    ) &&
    projectResumptionProjectModuleDelay === null
  ) {
    return latestStartedProjectModule
      .map(latestStartedProjectModule => {
        // later start
        const startDate = parseDateString(latestStartedProjectModule.startedAt)
        const differenceToNow = Math.abs(differenceInSeconds(startDate, now()))

        return scenarioMaxDurationInSeconds - differenceToNow
      })
      .orUndefined()
  } else if (projectResumptionProjectModuleDelay !== null) {
    // project resumption
    return scenarioMaxDurationInSeconds - projectResumptionProjectModuleDelay
  } else {
    return scenarioMaxDurationInSeconds
  }
}

export const isResumptionOfActiveModule = (
  scenarioId: UUID | null,
  questionnaireId: UUID | null,
  projectResumptionProjectModuleDelay: Option<ElapsedTimeOfProjectModuleForResumption>
) =>
  projectResumptionProjectModuleDelay.exists(
    delay =>
      (delay.questionnaireId !== null && delay.questionnaireId === questionnaireId) ||
      (delay.scenarioId !== null && delay.scenarioId === scenarioId)
  )
