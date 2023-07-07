import {groupBy} from "lodash-es"
import * as React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  deleteEntityButtonStyles,
  Heading,
  Icon,
  OrlyButtonContainer,
  ReadonlyActionField,
  Text
} from "shared/components"
import {ErpType, HeadingLevel, IconName, InterventionGroupType, InterventionHeaderGroupType} from "shared/enums"
import {ErpTableType} from "shared/graphql/generated/globalTypes"
import {InterventionFragment_EmailOpeningIntervention} from "shared/graphql/generated/InterventionFragment"
import {
  ErpRowOpeningIntervention,
  Intervention,
  NavigationConfig,
  NotesContentIntervention,
  ScenarioQuestionnaire
} from "shared/models"
import {erpTypeLabel} from "shared/office-tools/erp/utils"
import {Flex, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {first, Option} from "shared/utils"
import {Route} from "../../../../routes"
import {CreateNotesContentInterventionModalContainer} from "../../create"
import {ErpDatasetsTable} from "../../overview/erp-intervention/erp-datasets-table"
import {
  getGroupEntityBaseFromIntervention,
  getGroupTypeIconName,
  getInterventionsForTypeName,
  groupTypeToToolLabelKey,
  interventionGroupTypeToLanguageKey
} from "../../utils"
import {routingConfigForInterventionGroupEntity} from "../../utils/routing"
import {interventionGroupStyles} from "./intervention-group-entity-detail-view.style"
import {InterventionsTable} from "./interventions-table/interventions-table"

export interface InterventionGroupEntityBase {
  readonly title: string
  readonly id: UUID
}

export interface ErpInterventionConfig {
  readonly rowId: Option<number>
  readonly erpType: ErpType
}
export interface InterventionGroupEntityDetailViewProps {
  readonly erpConfig?: ErpInterventionConfig
  readonly handleDeleteAllInterventionsFromGroupEntity: () => void
  readonly interventionGroupEntity: Option<InterventionGroupEntityBase>
  readonly interventionGroupType: Option<InterventionGroupType>
  readonly interventionHeaderGroupType: InterventionHeaderGroupType
  readonly interventions: Intervention[]
  readonly isCreateNotesInterventionModalVisible: boolean
  readonly isDeleteInterventionsFromGroupLoading: boolean
  readonly isReadOnly: boolean
  readonly navigate: (navigationConfig: NavigationConfig<Route>) => void
  readonly onDeleteEntityClick: (intervention: Intervention) => void
  readonly onDeleteErpRowClick: (erpRowId: number) => void
  readonly scenarioId: UUID
  readonly scenarioMaxDurationInSeconds: number
  readonly scenarioQuestionnaires: ScenarioQuestionnaire[]
  readonly toggleIsCreateNotesInterventionModalVisible: () => void
}

export const InterventionGroupEntityDetailView: React.FC<InterventionGroupEntityDetailViewProps> = ({
  erpConfig,
  handleDeleteAllInterventionsFromGroupEntity,
  interventionGroupEntity,
  interventionGroupType,
  interventionHeaderGroupType,
  interventions,
  isCreateNotesInterventionModalVisible,
  isDeleteInterventionsFromGroupLoading,
  isReadOnly,
  navigate,
  onDeleteEntityClick,
  onDeleteErpRowClick,
  scenarioId,
  scenarioMaxDurationInSeconds,
  scenarioQuestionnaires,
  toggleIsCreateNotesInterventionModalVisible
}) => {
  const {t} = useLucaTranslation()

  const interventionsGroupedByEntityId = groupBy(
    interventions,
    intervention => getGroupEntityBaseFromIntervention(intervention, scenarioQuestionnaires).id
  )

  const isNotesIntervention = interventionGroupType.contains(InterventionGroupType.Notes)
  const isErpIntervention = interventionGroupType.contains(InterventionGroupType.Erp)

  const isErpRowDetailView = erpConfig?.rowId.isDefined() ?? false

  const notesInterventions = getInterventionsForTypeName(
    interventions,
    "NotesContentIntervention"
  ) as NotesContentIntervention[]

  const erpInterventions = getInterventionsForTypeName(
    interventions,
    "ErpRowOpeningIntervention"
  ) as ErpRowOpeningIntervention[]

  const interventionsForGroupEntity = interventionGroupEntity
    .map(interventionGroupEntity => interventionsGroupedByEntityId[interventionGroupEntity.id])
    .getOrElse([])

  const renderErpTable = () =>
    erpConfig?.rowId
      .map(rowId => (
        <InterventionsTable
          entities={erpInterventions.filter(intervention => intervention.erpRowId === rowId)}
          customStyles={interventionGroupStyles.table}
          isReadOnly={isReadOnly}
          onDeleteEntityClick={onDeleteEntityClick}
          onEntityClick={entity => {
            interventionGroupType.forEach(groupType =>
              navigate({
                route: Route.ScenarioInterventionsErpRowInterventionDetail,
                payload: {
                  scenarioId: scenarioId,
                  groupType,
                  erpType: erpConfig.erpType,
                  headerGroupType: interventionHeaderGroupType,
                  rowId: rowId,
                  interventionId: entity.id
                }
              })
            )
          }}
        />
      ))
      .getOrElse(
        <ErpDatasetsTable
          interventions={erpInterventions.filter(
            intervention => intervention.erpTableType === ((erpConfig.erpType as unknown) as ErpTableType)
          )}
          onEntityClick={entity =>
            navigate({
              route: Route.ScenarioInterventionsErpRowDetail,
              payload: {
                scenarioId: scenarioId,
                erpType: erpConfig.erpType,
                headerGroupType: interventionHeaderGroupType,
                rowId: entity.rowId
              }
            })
          }
          customStyles={interventionGroupStyles.interventionTable}
          onDeleteEntityClick={entity => onDeleteErpRowClick(entity.rowId)}
          isReadOnly={isReadOnly}
        />
      )

  const handleNavigation = (groupEntity: InterventionGroupEntityBase) =>
    interventionGroupType.map(groupType =>
      navigate(
        routingConfigForInterventionGroupEntity(groupEntity, groupType, {
          scenarioId,
          emailDirectory:
            groupType === InterventionGroupType.Email && interventionsForGroupEntity[0]
              ? (interventionsForGroupEntity[0] as InterventionFragment_EmailOpeningIntervention).email.directory
              : undefined,
          sampleCompanyId: first(erpInterventions)
            .map(intervention => intervention.sampleCompanyId)
            .orUndefined(),
          erpConfig
        })
      )
    )

  return (
    <Card>
      <CardHeader hasGreyBackground hasShadow>
        <div css={interventionGroupStyles.header}>
          {interventionGroupType
            .map(groupType => (
              <div css={Flex.row}>
                <Icon customStyles={interventionGroupStyles.icon} name={getGroupTypeIconName(groupType)} />
                <Heading level={HeadingLevel.h3}>
                  {t("interventions__group_type_header", {groupType: t(interventionGroupTypeToLanguageKey(groupType))})}
                  {erpConfig?.erpType ? ` - ${t(erpTypeLabel(erpConfig?.erpType))}` : undefined}
                </Heading>
              </div>
            ))
            .orNull()}
          {interventionGroupEntity
            .map(() => (
              <OrlyButtonContainer
                customButtonStyles={deleteEntityButtonStyles.trashButton}
                customModalStyles={interventionGroupStyles.modal}
                iconName={IconName.Trash}
                disabled={isReadOnly}
                isConfirmButtonLoading={isDeleteInterventionsFromGroupLoading}
                onConfirm={handleDeleteAllInterventionsFromGroupEntity}
                modalTitleKey="interventions__interventions_detail_delete_position_modal_title"
                modalTextKey="interventions__interventions_detail_delete_position_modal_description"
              />
            ))
            .getOrElse(
              <Heading level={HeadingLevel.h3}>{t("interventions__detail_view_overview_empty_placeholder")}</Heading>
            )}
        </div>
      </CardHeader>
      <CardContent customStyles={interventionGroupStyles.content}>
        {interventionGroupEntity
          .map(groupEntity => (
            <div css={Flex.column}>
              <ReadonlyActionField
                label={t("interventions__group_type_label")}
                buttonLabel={
                  !isNotesIntervention
                    ? `${t(
                        interventionGroupType.contains(InterventionGroupType.Event) || isErpRowDetailView
                          ? "common_to_masculinum"
                          : "common_to"
                      )} ${t(
                        isErpRowDetailView
                          ? "erp_dataset__general"
                          : groupTypeToToolLabelKey(interventionGroupType.getOrElse(InterventionGroupType.File))
                      )}`
                    : undefined
                }
                onClick={() => handleNavigation(groupEntity)}
                customStyles={interventionGroupStyles.position}
                renderValue={() => (
                  <div css={Flex.row}>
                    <Icon
                      customStyles={interventionGroupStyles.icon}
                      name={getGroupTypeIconName(interventionGroupType.getOrElse(InterventionGroupType.File))}
                    />
                    <Text size={TextSize.Medium}>
                      {erpConfig?.erpType && erpConfig.rowId.isDefined()
                        ? erpConfig.rowId
                            .map(
                              rowId =>
                                `${t("interventions__interventions_erp_number_ac")} ${rowId} (${t(
                                  erpTypeLabel(erpConfig.erpType)
                                )})`
                            )
                            .orUndefined()
                        : groupEntity.title}
                    </Text>
                  </div>
                )}
              />

              {isErpIntervention ? (
                renderErpTable()
              ) : (
                <InterventionsTable
                  entities={isNotesIntervention ? notesInterventions : interventionsForGroupEntity}
                  customStyles={interventionGroupStyles.table}
                  isReadOnly={isReadOnly}
                  onAddClick={
                    isNotesIntervention && !isReadOnly ? toggleIsCreateNotesInterventionModalVisible : undefined
                  }
                  onDeleteEntityClick={onDeleteEntityClick}
                  onEntityClick={entity => {
                    interventionGroupType.map(groupType =>
                      navigate({
                        route: Route.ScenarioInterventionsInterventionDetail,
                        payload: {
                          scenarioId,
                          groupType: groupType,
                          groupEntityId: groupEntity.id,
                          headerGroupType: interventionHeaderGroupType,
                          interventionId: entity.id
                        }
                      })
                    )
                  }}
                />
              )}
            </div>
          ))
          .getOrElse(
            <div css={interventionGroupStyles.placeholder}>
              <div>
                <Text customStyles={interventionGroupStyles.contentPlaceholderTitle} size={TextSize.Medium}>
                  {t("interventions__detail_view_overview_empty_placeholder")}
                </Text>
                <Text customStyles={interventionGroupStyles.contentPlaceholderHint} size={TextSize.Medium}>
                  {t("interventions__detail_view_overview_no_position_or_intervention_placeholder")}
                </Text>
              </div>
            </div>
          )}
      </CardContent>
      {isCreateNotesInterventionModalVisible && (
        <CreateNotesContentInterventionModalContainer
          onDismiss={toggleIsCreateNotesInterventionModalVisible}
          scenarioId={scenarioId}
          scenarioMaxDurationInSeconds={scenarioMaxDurationInSeconds}
        />
      )}
    </Card>
  )
}
