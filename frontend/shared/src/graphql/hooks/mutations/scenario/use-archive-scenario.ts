import {useMutation} from "@apollo/client"
import {ArchiveEntityHook, Scenario} from "../../../../models"
import {Option} from "../../../../utils"
import {deleteEntityFromCache} from "../../../cache"
import {ArchiveScenarioMutation, ArchiveScenarioMutationVariables} from "../../../generated/ArchiveScenarioMutation"
import {ScenariosQuery} from "../../../generated/ScenariosQuery"
import {archiveScenarioMutation} from "../../../mutations"
import {scenariosQuery} from "../../../queries"

export const useArchiveScenario = (): ArchiveEntityHook => {
  const [archiveScenario, {loading}] = useMutation<ArchiveScenarioMutation, ArchiveScenarioMutationVariables>(
    archiveScenarioMutation
  )

  return {
    archiveEntity: (id: UUID) =>
      new Promise<Option<Scenario>>((resolve, reject) => {
        archiveScenario({
          variables: {id},
          update: deleteEntityFromCache<ScenariosQuery, ArchiveScenarioMutation, undefined, Scenario>(
            scenariosQuery,
            "scenarios",
            scenarios => scenarios.id !== id
          )
        })
          .then(result => resolve(Option.of(result.data?.archiveScenario)))
          .catch(reject)
      }),
    archiveEntityLoading: loading
  }
}
