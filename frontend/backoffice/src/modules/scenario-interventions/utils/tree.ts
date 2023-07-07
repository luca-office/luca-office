import {groupBy} from "lodash"
import {ErpType, IconName, NodeType} from "shared/enums"
import {InterventionType} from "shared/graphql/generated/globalTypes"
import {ErpRowOpeningIntervention, Intervention, InterventionNode, NotesContentIntervention} from "shared/models"
import {erpTypeLabel} from "shared/office-tools/erp/utils"
import {LucaTFunction} from "shared/translations"
import {getGroupTypeIconName, interventionTypeToGroupType} from "."
import {NOTES_CONTENT_INTERVENTION_REPLACEMENT_GROUP_ID} from "./const"

export interface BaseTypeGroupEntity {
  readonly title: string
  readonly id: UUID
}

export const buildInterventionGroupTypeTree = (
  allInterventions: Intervention[],
  scenarioId: UUID,
  groupEntityBaseType: BaseTypeGroupEntity,
  interventionType: InterventionType
): InterventionNode => {
  const parentId = groupEntityBaseType.id

  const interventionNodes: InterventionNode[] = allInterventions.map(intervention => ({
    id: intervention.id,
    name: intervention.title,
    iconName: IconName.Pin,
    parentId,
    type: NodeType.Intervention,
    interventionEmailId: intervention.interventionEmailId,
    interventionType: intervention.interventionType,
    scenarioId: intervention.scenarioId
  }))

  const tree: InterventionNode = {
    id: parentId,
    parentId: null,
    name: groupEntityBaseType.title,
    iconName: getGroupTypeIconName(interventionTypeToGroupType(interventionType)),
    type: NodeType.InterventionGroupType,
    children: interventionNodes,
    interventionEmailId: "",
    interventionType,
    scenarioId
  }

  return tree
}

export const buildInterventionNotesTree = (
  interventions: NotesContentIntervention[],
  scenarioId: UUID,
  t: LucaTFunction
): InterventionNode => {
  const parentId = NOTES_CONTENT_INTERVENTION_REPLACEMENT_GROUP_ID
  const interventionNodes: InterventionNode[] = interventions.map(intervention => ({
    id: intervention.id,
    name: intervention.title,
    iconName: IconName.Pin,
    parentId,
    type: NodeType.Intervention,
    interventionEmailId: intervention.interventionEmailId,
    interventionType: intervention.interventionType,
    scenarioId: intervention.scenarioId
  }))

  const tree: InterventionNode = {
    id: parentId,
    parentId: null,
    name: t("interventions__detail_view_table_of_contents_title_notes"),
    iconName: IconName.Notes,
    type: NodeType.InterventionGroupType,
    children: interventionNodes,
    interventionEmailId: "",
    interventionType: InterventionType.NotesContent,
    scenarioId
  }

  return tree
}

export const buildInterventionErpTree = (
  interventions: ErpRowOpeningIntervention[],
  scenarioId: UUID,
  erpType: ErpType,
  t: LucaTFunction
): InterventionNode => {
  const parentId = erpType

  const groupedByDataset = groupBy(interventions, intervention => intervention.erpRowId)
  const dataSetNodes: InterventionNode[] = Object.keys(groupedByDataset).map(rowId => ({
    id: rowId,
    name: `${t("interventions__interventions_erp_number_ac")} ${rowId}`,
    iconName: IconName.DataSet,
    parentId,
    type: NodeType.InterventionErpTableRow,
    interventionEmailId: "",
    interventionType: InterventionType.ErpRowOpening,
    erpType,
    scenarioId,
    children: groupedByDataset[rowId].map(intervention => ({
      id: intervention.id,
      name: intervention.title,
      iconName: IconName.Pin,
      parentId: rowId,
      type: NodeType.InterventionErpRowIntervention,
      interventionEmailId: intervention.interventionEmailId,
      interventionType: InterventionType.ErpRowOpening,
      scenarioId,
      erpType
    }))
  }))

  const tree: InterventionNode = {
    id: parentId,
    parentId: null,
    name: t(erpTypeLabel(erpType)),
    iconName: IconName.Database,
    type: NodeType.InterventionErpTable,
    children: dataSetNodes,
    interventionEmailId: "",
    interventionType: InterventionType.ErpRowOpening,
    scenarioId,
    erpType
  }

  return tree
}
