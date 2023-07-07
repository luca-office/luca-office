import * as React from "react"
import {useDispatch} from "react-redux"
import {ErpType, InterventionHeaderGroupType} from "shared/enums"
import {useInterventions, useScenario, useScenarioQuestionnaires} from "shared/graphql/hooks"
import {ErpRowOpeningIntervention} from "shared/models"
import {Option} from "shared/utils"
import {navigateToRouteAction} from "../../../redux/actions/navigation-action"
import {Route} from "../../../routes"
import {InterventionsErpTableOverview} from "./erp-intervention/interventions-erp-table-overview"

export interface InterventionsContainerProps {
  readonly scenarioId: UUID
  readonly headerGroupType: InterventionHeaderGroupType
  readonly erpType: ErpType
  readonly interventionId: Option<UUID>
  readonly erpRowId: Option<string>
}

export const InterventionsErpTableOverviewContainer: React.FC<InterventionsContainerProps> = ({
  scenarioId,
  erpType,
  interventionId,
  headerGroupType,
  erpRowId
}) => {
  const dispatch = useDispatch()

  const {interventions, interventionsLoading} = useInterventions(scenarioId)
  const {scenario: scenarioOption, scenarioLoading} = useScenario(scenarioId)
  const {scenarioQuestionnaires, scenarioQuestionnairesLoading} = useScenarioQuestionnaires(scenarioId)

  const isReadOnly = scenarioOption.exists(scenario => scenario.finalizedAt !== null || scenario.publishedAt !== null)

  const interventionInDetail = Option.of(
    interventions
      .getOrElse([])
      .find(intervention => intervention.id === interventionId.getOrElse("")) as ErpRowOpeningIntervention
  )

  const handleNavigateToScenario = () => dispatch(navigateToRouteAction(Route.ScenarioDetail, {scenarioId}))

  return (
    <InterventionsErpTableOverview
      erpType={erpType}
      erpRowId={erpRowId.map(rowId => parseInt(rowId, 10))}
      headerGroupType={headerGroupType}
      interventions={interventions.getOrElse([])}
      interventionInDetail={interventionInDetail}
      isReadOnly={isReadOnly}
      isLoading={interventionsLoading || scenarioLoading || scenarioQuestionnairesLoading}
      navigateToScenario={handleNavigateToScenario}
      scenarioId={scenarioId}
      scenarioQuestionnaires={scenarioQuestionnaires
        .getOrElse([])
        .filter(questionnaire => questionnaire.scenarioId === scenarioId)}
    />
  )
}
