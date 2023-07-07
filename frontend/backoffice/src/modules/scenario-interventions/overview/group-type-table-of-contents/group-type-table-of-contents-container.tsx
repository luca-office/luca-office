import {groupBy, sortBy} from "lodash-es"
import * as React from "react"
import {useState} from "react"
import {useDispatch} from "react-redux"
import {InterventionHeaderGroupType, NodeType} from "shared/enums"
import {InterventionType} from "shared/graphql/generated/globalTypes"
import {
  ErpRowOpeningIntervention,
  Intervention,
  InterventionNode,
  NotesContentIntervention,
  ScenarioQuestionnaire,
  SpreadsheetCellContentIntervention
} from "shared/models"
import {Option} from "shared/utils"
import {useNavigate} from "../../../../hooks/use-navigate"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {Route} from "../../../../routes"
import {ErpInterventionConfig} from "../../detail/intervention-group-entity/intervention-group-entity-detail-view"
import {
  getGroupEntityBaseFromIntervention,
  getInterventionsForHeaderGroupType,
  getInterventionsForTypeName,
  interventionTypeToGroupType
} from "../../utils"
import {InterventionsGroupTypeTableOfContents} from "./group-type-table-of-contents"

export interface InterventionsGroupTypeTableOfContentsContainerProps {
  readonly groupEntityId: Option<UUID>
  readonly headerGroupType: InterventionHeaderGroupType
  readonly interventions: Intervention[]
  readonly isLoading: boolean
  readonly scenarioId: UUID
  readonly scenarioQuestionnaires: ScenarioQuestionnaire[]
  readonly selectedInterventionId: Option<UUID>
  readonly erpConfig?: ErpInterventionConfig
}

export const InterventionsGroupTypesTableOfContentsContainer: React.FC<InterventionsGroupTypeTableOfContentsContainerProps> = ({
  isLoading,
  interventions,
  scenarioId,
  selectedInterventionId,
  groupEntityId,
  scenarioQuestionnaires,
  headerGroupType,
  erpConfig
}) => {
  React.useEffect(() => {
    if (groupEntityId.isDefined() && selectedInterventionId.isEmpty()) {
      setSelectedNodeId(groupEntityId)
    } else if (selectedInterventionId.isDefined()) {
      setSelectedNodeId(selectedInterventionId)
    }
  }, [selectedInterventionId, groupEntityId])

  React.useEffect(() => {
    if (erpConfig?.erpType && erpConfig.rowId.isEmpty() && selectedInterventionId.isEmpty()) {
      setSelectedNodeId(Option.of(erpConfig.erpType.toString()))
    } else if (erpConfig?.rowId.isDefined() && selectedInterventionId.isEmpty()) {
      setSelectedNodeId(erpConfig.rowId.map(id => id.toString()))
    }
  }, [erpConfig])

  const {navigate} = useNavigate()

  const [selectedNodeId, setSelectedNodeId] = useState<Option<string>>(selectedInterventionId)

  const dispatch = useDispatch()

  const filteredInterventions = sortBy(
    getInterventionsForHeaderGroupType(interventions, headerGroupType).filter(
      intervention =>
        intervention.interventionType !== InterventionType.NotesContent &&
        intervention.interventionType !== InterventionType.ErpRowOpening
    ),
    intervention =>
      intervention.__typename !== "RuntimeSurveyAnswerSelectionIntervention"
        ? intervention.timeOffsetInSeconds
        : intervention.title
  )

  const notesContentInterventions = sortBy(
    getInterventionsForTypeName(interventions, "NotesContentIntervention") as NotesContentIntervention[],
    intervention => intervention.timeOffsetInSeconds
  )

  const erpRowOpeningInterventions = sortBy(
    getInterventionsForTypeName(interventions, "ErpRowOpeningIntervention") as ErpRowOpeningIntervention[],
    intervention => intervention.timeOffsetInSeconds
  )

  const spreadsheetCellContentInterventions = getInterventionsForTypeName(
    interventions,
    "SpreadsheetCellContentIntervention"
  ) as SpreadsheetCellContentIntervention[]

  const interventionsGroupedByEntityId = groupBy(
    filteredInterventions,
    intervention => getGroupEntityBaseFromIntervention(intervention, scenarioQuestionnaires).id
  )

  const handleSelectNode = (nodeOption: Option<InterventionNode>) => {
    if (nodeOption.isDefined()) {
      setSelectedNodeId(nodeOption.map(node => node.id))
    }

    nodeOption.map(node => {
      switch (node.type) {
        case NodeType.InterventionGroupType:
          dispatch(
            navigateToRouteAction(Route.ScenarioInterventionsGroupEntityDetail, {
              scenarioId: node.scenarioId,
              groupType: interventionTypeToGroupType(node.interventionType),
              headerGroupType,
              groupEntityId: node.id
            })
          )

          break
        case NodeType.Intervention:
          dispatch(
            navigateToRouteAction(Route.ScenarioInterventionsInterventionDetail, {
              scenarioId: node.scenarioId,
              groupType: interventionTypeToGroupType(node.interventionType),
              groupEntityId: node.parentId,
              headerGroupType,
              interventionId: node.id
            })
          )
          break
        case NodeType.InterventionErpTable:
          dispatch(
            navigateToRouteAction(Route.ScenarioInterventionsErpTableDetail, {
              scenarioId: node.scenarioId,
              groupType: interventionTypeToGroupType(node.interventionType),
              erpType: node.erpType,
              headerGroupType,
              interventionId: node.id
            })
          )
          break
        case NodeType.InterventionErpTableRow:
          dispatch(
            navigateToRouteAction(Route.ScenarioInterventionsErpRowDetail, {
              scenarioId: node.scenarioId,
              groupType: interventionTypeToGroupType(node.interventionType),
              erpType: node.erpType,
              headerGroupType,
              rowId: node.id
            })
          )
          break
        case NodeType.InterventionErpRowIntervention:
          dispatch(
            navigateToRouteAction(Route.ScenarioInterventionsErpRowInterventionDetail, {
              scenarioId: node.scenarioId,
              groupType: interventionTypeToGroupType(node.interventionType),
              erpType: node.erpType,
              headerGroupType,
              rowId: node.parentId,
              interventionId: node.id
            })
          )
          break

        default:
          break
      }
    })
  }

  const navigateToHeaderGroupType = (headerGroupType: InterventionHeaderGroupType) =>
    navigate({
      route: Route.ScenarioInterventions,
      payload: {
        scenarioId,
        groupType: undefined,
        headerGroupType
      }
    })

  return (
    <InterventionsGroupTypeTableOfContents
      filteredAndGroupedInterventions={interventionsGroupedByEntityId}
      navigateToHeaderGroupType={navigateToHeaderGroupType}
      notesContentInterventions={notesContentInterventions}
      spreadsheetCellContentInterventions={spreadsheetCellContentInterventions}
      erpOpeningInterventions={erpRowOpeningInterventions}
      handleSelectNode={handleSelectNode}
      isLoading={isLoading}
      scenarioId={scenarioId}
      scenarioQuestionnaires={scenarioQuestionnaires}
      selectedHeaderGroupType={headerGroupType}
      selectedNodeId={selectedNodeId}
    />
  )
}
