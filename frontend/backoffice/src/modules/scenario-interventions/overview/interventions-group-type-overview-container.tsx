import * as React from "react"
import {useDispatch} from "react-redux"
import {InterventionGroupType, InterventionHeaderGroupType} from "shared/enums"
import {useInterventions, useScenario, useScenarioQuestionnaires} from "shared/graphql/hooks"
import {Option} from "shared/utils"
import {navigateToRouteAction} from "../../../redux/actions/navigation-action"
import {Route} from "../../../routes"
import {InterventionsGroupTypeOverview} from "./interventions-group-type-overview"

export interface InterventionsContainerProps {
  readonly scenarioId: UUID
  readonly groupType: Option<InterventionGroupType>
  readonly headerGroupType: InterventionHeaderGroupType
  readonly groupEntityId: Option<UUID>
  readonly interventionId: Option<UUID>
}

export const InterventionsGroupTypeOverviewContainer: React.FC<InterventionsContainerProps> = ({
  scenarioId,
  groupType,
  groupEntityId,
  interventionId,
  headerGroupType
}) => {
  const dispatch = useDispatch()

  const {interventions, interventionsLoading} = useInterventions(scenarioId)
  const {scenario: scenarioOption, scenarioLoading} = useScenario(scenarioId)
  const {scenarioQuestionnaires, scenarioQuestionnairesLoading} = useScenarioQuestionnaires(scenarioId)

  const isReadOnly = scenarioOption.exists(scenario => scenario.finalizedAt !== null || scenario.publishedAt !== null)

  const interventionInDetail = Option.of(
    interventions.getOrElse([]).find(intervention => intervention.id === interventionId.getOrElse(""))
  )
  const handleNavigateToScenario = () => dispatch(navigateToRouteAction(Route.ScenarioDetail, {scenarioId}))

  return (
    <InterventionsGroupTypeOverview
      groupEntityId={groupEntityId}
      groupType={groupType}
      headerGroupType={headerGroupType}
      interventionInDetailView={interventionInDetail}
      interventions={interventions.getOrElse([])}
      isReadOnly={isReadOnly}
      isLoading={interventionsLoading || scenarioLoading || scenarioQuestionnairesLoading}
      navigateToScenario={handleNavigateToScenario}
      scenarioId={scenarioId}
      scenarioMaxDurationInSeconds={scenarioOption.map(scenario => scenario.maxDurationInSeconds || 0).getOrElse(0)}
      scenarioQuestionnaires={scenarioQuestionnaires
        .getOrElse([])
        .filter(questionnaire => questionnaire.scenarioId === scenarioId)}
    />
  )
}
