import * as React from "react"
import {InterventionGroupType, InterventionHeaderGroupType} from "shared/enums"
import {useDeleteEmail, useDeleteIntervention} from "shared/graphql/hooks"
import {ErpRowOpeningIntervention, Intervention, ScenarioQuestionnaire} from "shared/models"
import {Option} from "shared/utils"
import {useNavigate} from "../../../../hooks/use-navigate"
import {useDeleteInterventionWithAssignedInterventionMail} from "../../hooks/use-delete-intervention-with-mail"
import {getGroupEntityBaseFromIntervention, getInterventionsForTypeName} from "../../utils"
import {ErpInterventionConfig, InterventionGroupEntityDetailView} from "./intervention-group-entity-detail-view"

export interface InterventionGroupEntityBase {
  readonly title: string
  readonly id: UUID
}
interface Props {
  readonly interventionGroupType: Option<InterventionGroupType>
  readonly interventionHeaderGroupType: InterventionHeaderGroupType
  readonly interventionGroupEntity: Option<InterventionGroupEntityBase>
  readonly interventions: Intervention[]
  readonly erpConfig?: ErpInterventionConfig
  readonly scenarioId: UUID
  readonly scenarioMaxDurationInSeconds: number
  readonly isReadOnly: boolean
  readonly scenarioQuestionnaires: ScenarioQuestionnaire[]
}

export const InterventionGroupEntityDetailViewContainer: React.FC<Props> = ({
  scenarioId,
  scenarioMaxDurationInSeconds,
  interventions,
  interventionHeaderGroupType,
  interventionGroupEntity,
  scenarioQuestionnaires,
  ...rest
}) => {
  const {navigate} = useNavigate()

  const {deleteEntity} = useDeleteIntervention(scenarioId)
  const {deleteEntity: deleteEmail} = useDeleteEmail(scenarioId)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState(false)
  const [isCreateNotesInterventionModalVisible, setIsCreateNotesInterventionModalVisible] = React.useState(false)

  const {handleDeleteInterventionWithEmail} = useDeleteInterventionWithAssignedInterventionMail(
    scenarioId,
    interventionHeaderGroupType,
    scenarioQuestionnaires
  )

  const deleteAllInterventionsFromGroupEntity = () => {
    return interventionGroupEntity.map(entity => {
      const filteredInterventions = interventions.filter(
        intervention => getGroupEntityBaseFromIntervention(intervention, scenarioQuestionnaires).id === entity.id
      )
      setIsDeleteLoading(true)
      Promise.all(filteredInterventions.map(i => deleteEntity(i.id)))
        .then(() =>
          Promise.all(filteredInterventions.map(intervention => deleteEmail(intervention.interventionEmailId)))
        )
        .then(() => setIsDeleteLoading(false))
    })
  }

  const deleteAllInterventionsFromErpRow = (erpRowId: number) => {
    const filteredInterventions = (getInterventionsForTypeName(
      interventions,
      "ErpRowOpeningIntervention"
    ) as ErpRowOpeningIntervention[]).filter(intervention => intervention.erpRowId === erpRowId)
    setIsDeleteLoading(true)
    Promise.all(filteredInterventions.map(i => deleteEntity(i.id)))
      .then(() => Promise.all(filteredInterventions.map(intervention => deleteEmail(intervention.interventionEmailId))))
      .then(() => setIsDeleteLoading(false))
  }

  return (
    <InterventionGroupEntityDetailView
      handleDeleteAllInterventionsFromGroupEntity={deleteAllInterventionsFromGroupEntity}
      isDeleteInterventionsFromGroupLoading={isDeleteLoading}
      isCreateNotesInterventionModalVisible={isCreateNotesInterventionModalVisible}
      toggleIsCreateNotesInterventionModalVisible={() =>
        setIsCreateNotesInterventionModalVisible(!isCreateNotesInterventionModalVisible)
      }
      scenarioId={scenarioId}
      scenarioMaxDurationInSeconds={scenarioMaxDurationInSeconds}
      scenarioQuestionnaires={scenarioQuestionnaires}
      onDeleteEntityClick={handleDeleteInterventionWithEmail}
      onDeleteErpRowClick={deleteAllInterventionsFromErpRow}
      interventionGroupEntity={interventionGroupEntity}
      interventionHeaderGroupType={interventionHeaderGroupType}
      interventions={interventions}
      navigate={navigate}
      {...rest}
    />
  )
}
