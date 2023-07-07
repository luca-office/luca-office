import * as React from "react"
import {Card, CardContent, CardHeader, Icon, SelectionInPreviewFooter, Text} from "../../../components"
import {ErpNavigationEntryId, ErpType, IconName, NodeType, Sorting} from "../../../enums"
import {ErpTableType} from "../../../graphql/generated/globalTypes"
import {dispatchCopyNotification} from "../../../hooks"
import {BaseNode, ErpEntity, ErpSurveyEvents, ScenarioErpEntitySelector} from "../../../models"
import {CustomStyle, Flex, spacingSmall, TextSize} from "../../../styles"
import {useLucaTranslation} from "../../../translations"
import {baseUrl, Option} from "../../../utils"
import {ErpDataSetOverlay} from "../common"
import {ErpDataSetMode} from "../common/erp-data-set-overlay/hooks/use-erp-data-set-overlay"
import {ErpExcelImportDialog} from "../common/erp-excel-import-dialog/erp-excel-import-dialog"
import {ErpContentView} from "../erp-content-view/erp-content-view"
import {TablePlaceholder} from "../erp-content-view/table-placeholder"
import {ErpNavigation} from "../erp-navigation/erp-navigation"
import {getStaticErpStructure} from "../erp-navigation/static-erp-structure"
import {ErpTableCellData} from "../erp-table"
import {getCreateTemplate, navigationIdToType} from "../utils"
import {styles} from "./erp-view.style"
import {useErpView} from "./hooks/use-erp-view"

export interface ErpScenarioSettingsConfig {
  readonly rowId: number
  readonly erpType: ErpType
  readonly scenarioErpSelector: ScenarioErpEntitySelector
}

export interface AutomatedCriterionErpConfig {
  readonly onDatasetSelected?: (rowId: number, erpTableType: ErpTableType) => void
}

export interface ErpViewProps extends CustomStyle {
  readonly scenarioId?: UUID
  readonly sampleCompanyId: UUID
  readonly sampleCompanyName: string
  readonly renderDataSetOverlayFooter?: (config: ErpScenarioSettingsConfig) => JSX.Element
  readonly readOnly: boolean
  readonly surveyEvents?: ErpSurveyEvents
  readonly selectedErpNode: Option<string>
  readonly selectedEntityId: Option<number>
  readonly automatedCriterionConfig?: AutomatedCriterionErpConfig
}

export const ErpView = ({
  readOnly,
  scenarioId = "",
  sampleCompanyId,
  sampleCompanyName,
  selectedEntityId,
  renderDataSetOverlayFooter,
  surveyEvents,
  selectedErpNode,
  automatedCriterionConfig,
  customStyles
}: ErpViewProps) => {
  const {t} = useLucaTranslation()

  const navigationEntries = getStaticErpStructure(sampleCompanyName, t)

  const {
    selectErpNavigationNode,
    selectedErpNavigationNode,
    columns,
    entities,
    isLoading,
    currentErpTypeName,
    dispatch,
    isDataSetOverlayVisible,
    setIsDataSetOverlayVisible,
    selectedEntity,
    setSelectedEntity,
    selectedEntityIndex,
    setSelectedEntityIndex,
    getEntity,
    currentErpType,
    isImportDialogVisible,
    setIsImportDialogVisible,
    linkRef,
    isReadOnly
  } = useErpView(sampleCompanyId, sampleCompanyName, readOnly, selectedErpNode)

  const handleEntityDoubleClick = (entity: ErpEntity, rowIndex: number) => {
    setSelectedEntity(Option.of(entity))
    setSelectedEntityIndex(rowIndex)
    setIsDataSetOverlayVisible(true)

    currentErpType.forEach(type => surveyEvents?.sendErpOpenRow(type, entity.id, rowIndex))
  }

  const renderAutomatedCriterionSelectionFooter = (config: ErpScenarioSettingsConfig) => (
    <SelectionInPreviewFooter
      textKey="coding_models__automated_item_document_view_erp_selection_footer"
      headingKey="coding_models__automated_item_document_view_column_header"
      title={t("erp_dataset__criterion_title")}
      onConfirm={() =>
        automatedCriterionConfig?.onDatasetSelected?.(config.rowId, (config.erpType as unknown) as ErpTableType)
      }
      icon={IconName.DataSet}
    />
  )

  const handleAddEntityClick = () => {
    setSelectedEntity(Option.none())
    setSelectedEntityIndex(-1)
    setIsDataSetOverlayVisible(true)
  }

  const onSelectedFilterActiveChange = (selectedRowsCount: number, isSelectedFilterActive: boolean) =>
    currentErpType.forEach(tableType =>
      surveyEvents?.sendErpUpdateShowOnlySelectedRows(tableType, selectedRowsCount, isSelectedFilterActive)
    )

  const handleCollapseStateChange = (node: BaseNode, isCollapsed: boolean) => {
    if (isCollapsed) {
      surveyEvents?.sendErpCollapseDirectory(node.id)
    } else {
      surveyEvents?.sendErpExpandDirectory(node.id)
    }
  }

  const handleEntrySelection = (node: BaseNode) => {
    selectErpNavigationNode(node)

    if (node.type === NodeType.Table) {
      const erpType = navigationIdToType(node.id as ErpNavigationEntryId) ?? undefined

      surveyEvents?.sendErpSelectTable(erpType, node.name, node.isLocked ?? false)
    }
  }

  const handleChangeAllRowsSelectionState = (rowsCount: number, isSelected: boolean) =>
    currentErpType.forEach(type => {
      if (isSelected) {
        surveyEvents?.sendErpSelectAllRows(type, rowsCount)
      } else {
        surveyEvents?.sendErpDeselectAllRows(type, rowsCount)
      }
    })

  const handleChangeRowSelectionState = (rowId: number, rowIndex: number, isSelected: boolean) =>
    currentErpType.forEach(type => {
      if (isSelected) {
        surveyEvents?.sendErpSelectRow(type, rowId, rowIndex)
      } else {
        surveyEvents?.sendErpDeselectRow(type, rowId, rowIndex)
      }
    })

  const handleCellSelection = (
    entityId: number,
    rowIndex: number,
    columnName: string,
    columnIndex: number,
    value: string
  ) => {
    currentErpType.forEach(type => {
      surveyEvents?.sendErpSelectCell(type, entityId, rowIndex, columnName, columnIndex, value)
    })
  }

  const handleCopyToClipboard = (cellData: ErpTableCellData) => {
    dispatchCopyNotification(dispatch)
    currentErpType.forEach(type => {
      surveyEvents?.sendErpCopyCellContentToClipboard(
        type,
        cellData.entityId,
        cellData.rowIndex,
        cellData.columnName,
        cellData.columnIndex,
        `${cellData.value}`
      )
    })
  }

  const handleSearchTable = (query: string, resultsCount: number) => {
    currentErpType.forEach(type => surveyEvents?.sendErpSearchTable(type, query, resultsCount))
  }

  const handleSortTable = (columnName: string, columnIndex: number, sorting: Sorting) => {
    currentErpType.forEach(type => surveyEvents?.sendErpSortTable(type, columnName, columnIndex, sorting))
  }

  const handleCloseRow = (entityId: number, rowIndex: number) => {
    setIsDataSetOverlayVisible(false)

    currentErpType.forEach(type => surveyEvents?.sendErpCloseRow(type, entityId, rowIndex))
  }

  const handleOpenAttachment = (entityId: number, dataIndex: number, binaryFileId: UUID) => {
    currentErpType.forEach(type => surveyEvents?.sendErpOpenAttachment(type, entityId, dataIndex, binaryFileId))
  }

  const handleCopyReferenceToClipboard = (value: string, propertyName: string, entityId: number, dataIndex: number) => {
    currentErpType.forEach(type =>
      surveyEvents?.sendErpCopyReferenceToClipboard(type, entityId, dataIndex, propertyName, value)
    )
  }

  const handleCopyCoreDataToClipboard = (value: string, entityId: number, dataIndex: number) => {
    currentErpType.forEach(type => surveyEvents?.sendErpCopyCoreDataToClipboard(type, entityId, dataIndex, value))
  }

  const handleCopyCoreDataAndReferencesToClipboard = (value: string, entityId: number, dataIndex: number) => {
    currentErpType.forEach(type =>
      surveyEvents?.sendErpCopyCoreDataAndReferencesToClipboard(type, entityId, dataIndex, value)
    )
  }

  const handleNavigateToReference = (dataIndex: number, targetType: ErpType, targetId: number) => {
    currentErpType.forEach(type => surveyEvents?.sendErpNavigateToReference(type, dataIndex, targetType, targetId))
  }

  const handleNavigateBack = (type: ErpType, rowId: number, targetType: ErpType, targetId: number) => {
    surveyEvents?.sendErpNavigateBack(type, rowId, targetType, targetId)
  }

  return (
    <div css={[styles.erpView, customStyles]}>
      <a css={styles.downloadLink} ref={linkRef} href={`${baseUrl}/binary/erp/sample-company/${sampleCompanyId}`} />
      <ErpNavigation
        selectedNode={selectedErpNode}
        customStyles={styles.navigation}
        navigationEntries={navigationEntries}
        onEntrySelected={handleEntrySelection}
        isReadonly={isReadOnly}
        onImportClicked={() => setIsImportDialogVisible(true)}
        onExportClicked={() => linkRef.current?.click()}
        onChangeCollapseState={handleCollapseStateChange}
      />
      {selectedErpNavigationNode
        .map(() => (
          <ErpContentView
            customStyles={styles.content}
            entities={entities}
            isLoadingEntities={isLoading}
            columns={columns}
            label={currentErpTypeName}
            onEntityDoubleClicked={handleEntityDoubleClick}
            onAddEntityClicked={handleAddEntityClick}
            isReadonly={isReadOnly}
            onChangeAllRowsSelectionState={handleChangeAllRowsSelectionState}
            onChangeRowSelectionState={handleChangeRowSelectionState}
            onSelectCell={handleCellSelection}
            onCopyToClipboard={handleCopyToClipboard}
            onSearchTable={handleSearchTable}
            onSortTable={handleSortTable}
            selectedEntityId={selectedEntityId}
            onSelectedFilterActiveChange={onSelectedFilterActiveChange}
          />
        ))
        .getOrElse(
          <Card customStyles={styles.placeholderCard}>
            <CardHeader hasGreyBackground={true} hasShadow={true}>
              <div css={Flex.row}>
                <Icon css={{marginRight: spacingSmall}} name={IconName.Table} />
                <Text size={TextSize.Medium}>{t("erp__no_table")}</Text>
              </div>
            </CardHeader>
            <CardContent>
              <TablePlaceholder title={t("erp__no_table_selected")} subTitle={t("erp__no_table_select_hint")} />
            </CardContent>
          </Card>
        )}
      {isDataSetOverlayVisible &&
        currentErpType
          .map(type => (
            <ErpDataSetOverlay
              scenarioId={scenarioId}
              currentErpType={type}
              mode={selectedEntity.map(() => ErpDataSetMode.Default).getOrElse(ErpDataSetMode.Create)}
              sampleCompanyId={sampleCompanyId}
              data={selectedEntity.getOrElse(getCreateTemplate(sampleCompanyId, type) as ErpEntity)}
              dataIndex={selectedEntityIndex}
              getEntity={getEntity}
              onDismiss={handleCloseRow}
              disabled={readOnly}
              renderDataSetOverlayFooter={
                automatedCriterionConfig !== undefined
                  ? renderAutomatedCriterionSelectionFooter
                  : renderDataSetOverlayFooter
              }
              onOpenAttachment={handleOpenAttachment}
              onCopyReferenceToClipboard={handleCopyReferenceToClipboard}
              onCopyCoreDataToClipboard={handleCopyCoreDataToClipboard}
              onCopyCoreDataAndReferencesToClipboard={handleCopyCoreDataAndReferencesToClipboard}
              onNavigateBack={handleNavigateBack}
              onNavigateToReference={handleNavigateToReference}
            />
          ))
          .orNull()}
      {isImportDialogVisible && (
        <ErpExcelImportDialog onDismiss={() => setIsImportDialogVisible(false)} sampleCompanyId={sampleCompanyId} />
      )}
    </div>
  )
}
