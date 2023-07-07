import pick from "lodash-es/pick"
import * as React from "react"
import {ScenarioUpdate} from "shared/graphql/generated/globalTypes"
import {useUpdateScenario} from "shared/graphql/hooks"
import {Scenario} from "shared/models"
import {Option} from "shared/utils"

export interface UseScenarioUpdateHook {
  readonly updateScenario: (update: Partial<ScenarioUpdate>) => Promise<Option<Scenario>>
  readonly updateScenarioLoading: boolean
}

export const useScenarioUpdate = (scenario: Scenario): UseScenarioUpdateHook => {
  const scenarioUpdate = React.useMemo<ScenarioUpdate>(
    () =>
      pick(scenario, [
        "date",
        "name",
        "description",
        "maxDurationInSeconds",
        "introductionEmailId",
        "shouldDisplayTime",
        "shouldHideReferenceBookChapters",
        "tags",
        "completionEmailAddress",
        "sampleCompanyId"
      ]),
    [scenario]
  )

  const {updateScenario, isUpdateScenarioLoading} = useUpdateScenario()

  const handleScenarioUpdate = (update: Partial<ScenarioUpdate>) =>
    updateScenario(scenario.id, {...scenarioUpdate, ...update})

  return {updateScenario: handleScenarioUpdate, updateScenarioLoading: isUpdateScenarioLoading}
}
