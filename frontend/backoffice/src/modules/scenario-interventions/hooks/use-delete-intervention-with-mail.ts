import {InterventionHeaderGroupType} from "shared/enums"
import {useDeleteEmail, useDeleteIntervention} from "shared/graphql/hooks"
import {Intervention, ScenarioQuestionnaire} from "shared/models"
import {useNavigate} from "../../../hooks/use-navigate"
import {Route} from "../../../routes"
import {getGroupEntityBaseFromIntervention, interventionTypeToGroupType} from "../utils"

export interface UseDeleteInterventionWithEmailHook {
  readonly handleDeleteInterventionWithEmail: (intervention: Intervention) => void
  readonly deleteIsLoading: boolean
}

export const useDeleteInterventionWithAssignedInterventionMail = (
  scenarioId: UUID,
  headerGroupType: InterventionHeaderGroupType,
  scenarioQuestionnaires: ScenarioQuestionnaire[]
): UseDeleteInterventionWithEmailHook => {
  const {deleteEntity: deleteEmail, deleteEntityLoading} = useDeleteEmail(scenarioId)
  const {deleteEntity: deleteIntervention, deleteEntityLoading: deleteInterventionLoading} = useDeleteIntervention(
    scenarioId
  )
  const {navigate} = useNavigate()

  const handleDeleteInterventionWithEmail = (intervention: Intervention) => {
    deleteIntervention(intervention.id)
      .then(() => deleteEmail(intervention.interventionEmailId))
      .then(() =>
        navigate({
          route: Route.ScenarioInterventionsGroupEntityDetail,
          payload: {
            scenarioId: intervention.scenarioId,
            groupType: interventionTypeToGroupType(intervention.interventionType),
            headerGroupType: headerGroupType,
            groupEntityId: getGroupEntityBaseFromIntervention(intervention, scenarioQuestionnaires).id
          }
        })
      )
  }

  return {
    deleteIsLoading: deleteEntityLoading || deleteInterventionLoading,
    handleDeleteInterventionWithEmail
  }
}
