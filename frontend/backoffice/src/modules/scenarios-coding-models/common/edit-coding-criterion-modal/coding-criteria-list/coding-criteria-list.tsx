import * as React from "react"
import {Button, Card, CardHeader, ColumnProps, Heading, Icon, TableContainer, Text} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {AutomatedCodingItemRule} from "shared/graphql/generated/globalTypes"
import {
  AutomatedCodingCriterion,
  AutomatedCodingItem,
  CodingCriterion,
  CodingItem,
  DocumentViewScenarioCodingAutomatedCriterion,
  RScriptScenarioCodingAutomatedCriterion,
  ToolUsageScenarioCodingAutomatedCriterion
} from "shared/models"
import {CustomStyle, Flex, textEllipsis, TextSize} from "shared/styles"
import {LucaTFunction, useLucaTranslation} from "shared/translations"
import {
  featureUsageMap,
  iconForDocumentViewCodingCriterion,
  iconForOfficeTool,
  labelKeyForInputValue,
  labelKeyForOfficeTool,
  Option
} from "shared/utils"
import {
  CreateOrUpdateDocumentViewCriterionContainer,
  DocumentViewCriterionDisplayMode
} from "../../../create/create-automated-coding-criterion/document-view/create-or-update-document-view-criterion-container"
import {CreateFeatureUsageCriterionContainer} from "../../../create/create-automated-coding-criterion/feature-usage/create-feature-usage-container"
import {CreateToolUsageCriterionContainer} from "../../../create/create-automated-coding-criterion/tool-usage/create-tool-usage-container"
import {getErpDocumentViewTitle} from "../../../detail/coding-criterion/coding-criterion-util"
import {CodingCriterionCreationModalVisibility} from "../../../detail/coding-item/coding-item-detail-view-container"
import {
  CreateOrUpdateRScriptModalContainer,
  RScriptCriterionDisplayMode
} from "../../create-or-update-r-script-modal/create-or-update-r-script-modal-container"
import {CreateOrUpdateInputValueContentModalContainer} from "../coding-criteria-card/automated-criteria-content/input-value/create-or-update-input-value-criterion-modal-container"
import {codingCriteriaListStyles as styles} from "./coding-criteria-list.styles"
import {useCodingCriteriaList} from "./hooks/use-coding-criteria-list"

export interface CodingCriteriaListProps extends CustomStyle {
  readonly codingItemId: UUID
  readonly codingModelId: UUID
  readonly codingItem: Option<CodingItem>
  readonly codingCriteria: CodingCriterion[]
  readonly scenarioId: UUID
  readonly automatedCodingCriteria: Option<AutomatedCodingCriterion[]>
  readonly selectedCriterionId: Option<UUID>
  readonly selectCriterion: (criterionId: UUID) => void
  readonly titleForDocumentViewCriterion: (criterion: DocumentViewScenarioCodingAutomatedCriterion) => string
  readonly titleForRScriptCriterion: (criterion: RScriptScenarioCodingAutomatedCriterion) => string
}

export const CodingCriteriaList: React.FC<CodingCriteriaListProps> = ({
  automatedCodingCriteria: automatedCodingCriteriaOption,
  customStyles,
  codingItemId,
  codingModelId,
  codingItem,
  codingCriteria,
  selectedCriterionId,
  selectCriterion,
  titleForDocumentViewCriterion,
  titleForRScriptCriterion,
  scenarioId
}) => {
  const {t} = useLucaTranslation()
  const {createCodingCriterion, visibleCreateCriterionModal, setVisibleCreateCriterionModal} = useCodingCriteriaList(
    codingItemId,
    codingModelId
  )

  const hasAutomatedCriteria = automatedCodingCriteriaOption.isDefined()

  const automatedCodingCriteria = automatedCodingCriteriaOption.getOrElse([])

  const hasAtLeastOneAutomatedCriterion = automatedCodingCriteria.length > 0

  const dismissVisibleCriterionModal = () => setVisibleCreateCriterionModal(Option.none())

  const alreadyUsedToolsForToolUsage = automatedCodingCriteria
    .filter(codingCriterion => codingCriterion.__typename === "ToolUsageScenarioCodingAutomatedCriterion")
    .map(criterion => (criterion as ToolUsageScenarioCodingAutomatedCriterion).officeTool)

  const handleButtonClick = () => {
    if (codingItem.exists(item => item.__typename === "AutomatedCodingItem")) {
      codingItem.forEach(codingItem => {
        const item = codingItem as AutomatedCodingItem
        setVisibleCreateCriterionModal(
          Option.of<CodingCriterionCreationModalVisibility>({
            visibleCriterionType: item.rule
          })
        )
      })
    } else {
      createCodingCriterion()
    }
  }

  return (
    <div css={[styles.listWrapper, customStyles]}>
      <Card customStyles={styles.card}>
        <CardHeader customStyles={styles.tableHeader} hasGreyBackground hasShadow>
          <Heading level={HeadingLevel.h3}>
            {t("coding_criteria__criterion_list_label", {count: codingCriteria.length})}
          </Heading>
        </CardHeader>
        {hasAutomatedCriteria ? (
          <TableContainer
            entities={automatedCodingCriteria}
            columns={getAutomatedColumns(
              t,
              selectedCriterionId,
              automatedCodingCriteria,
              titleForDocumentViewCriterion,
              titleForRScriptCriterion
            )}
            entityKey={criterion => criterion.id}
            onClick={entity => selectCriterion(entity.id)}
            customStyles={styles.table}
            customBodyRowStyles={styles.listBodyRow}
            customRowStyles={() => styles.list(hasAtLeastOneAutomatedCriterion)}
            hideHeader={true}
            placeHolderText={t("coding_criteria__criterion_list_placeholder")}
          />
        ) : (
          <TableContainer
            entities={codingCriteria}
            columns={getColumns(t, selectedCriterionId, codingCriteria)}
            entityKey={criterion => criterion.id}
            onClick={entity => selectCriterion(entity.id)}
            customStyles={styles.table}
            customBodyRowStyles={styles.listBodyRow}
            customRowStyles={() => styles.list(hasAtLeastOneAutomatedCriterion)}
            hideHeader={true}
            placeHolderText={t("coding_criteria__criterion_list_placeholder")}
          />
        )}
      </Card>
      <div css={styles.footer}>
        <Button customStyles={styles.footerButton} icon={IconName.Add} onClick={handleButtonClick}>
          {t("coding_criteria__criterion_create_button")}
        </Button>
      </div>
      {visibleCreateCriterionModal
        .map(({visibleCriterionType}) => {
          switch (visibleCriterionType) {
            case AutomatedCodingItemRule.DocumentView:
              return (
                <CreateOrUpdateDocumentViewCriterionContainer
                  displayMode={DocumentViewCriterionDisplayMode.Create}
                  scenarioId={scenarioId}
                  onDismiss={dismissVisibleCriterionModal}
                  onSuccess={dismissVisibleCriterionModal}
                  criterion={Option.none()}
                  codingItemId={codingItemId}
                  codingModelId={codingModelId}
                />
              )
            case AutomatedCodingItemRule.RScript:
              return (
                <CreateOrUpdateRScriptModalContainer
                  onDismiss={dismissVisibleCriterionModal}
                  onSuccess={dismissVisibleCriterionModal}
                  displayMode={RScriptCriterionDisplayMode.Create}
                  criterion={Option.none()}
                  codingItemId={codingItemId}
                  codingModelId={codingModelId}
                />
              )
            case AutomatedCodingItemRule.InputValue:
              return (
                <CreateOrUpdateInputValueContentModalContainer
                  onDismiss={dismissVisibleCriterionModal}
                  onConfirm={dismissVisibleCriterionModal}
                  criterion={Option.none()}
                  codingItemId={codingItemId}
                  scenarioId={scenarioId}
                  codingModelId={codingModelId}
                />
              )
            case AutomatedCodingItemRule.FeatureUsage:
              return (
                <CreateFeatureUsageCriterionContainer
                  onDismiss={dismissVisibleCriterionModal}
                  onSuccess={dismissVisibleCriterionModal}
                  codingItemId={codingItemId}
                  codingModelId={codingModelId}
                />
              )
            case AutomatedCodingItemRule.ToolUsage:
              return (
                <CreateToolUsageCriterionContainer
                  onDismiss={dismissVisibleCriterionModal}
                  onSuccess={dismissVisibleCriterionModal}
                  codingItemId={codingItemId}
                  alreadyUsedTools={alreadyUsedToolsForToolUsage}
                  codingModelId={codingModelId}
                />
              )
          }
        })
        .orNull()}
    </div>
  )
}

const getColumns = (
  t: LucaTFunction,
  selectedCriterionId: Option<UUID>,
  codingCriteria: CodingCriterion[]
): ColumnProps<CodingCriterion>[] => [
  {
    key: "label",
    header: t("coding_criteria__criterion_list_label", {count: codingCriteria.length}),
    customHeaderStyles: styles.labelHeader,
    customStyles: styles.labelColumn,
    content: criterion => (
      <div css={[styles.columnCell(selectedCriterionId.map(id => criterion.id === id).getOrElse(false))]}>
        <Text customStyles={textEllipsis} size={TextSize.Small}>
          {criterion.description || t("coding_criteria__criterion_list_description_placeholder")}
        </Text>
      </div>
    )
  },
  {
    key: "points",
    header: null,
    customStyles: styles.pointColumn,
    content: criterion => (
      <div css={[styles.columnCell(selectedCriterionId.map(id => criterion.id === id).getOrElse(false))]}>
        {t("coding_criteria__criterion_list_score", {score: criterion.score || 0})}
      </div>
    )
  }
]

const getAutomatedColumns = (
  t: LucaTFunction,
  selectedCriterionId: Option<UUID>,
  codingCriteria: AutomatedCodingCriterion[],
  getTitleForDocumentViewCodingCriterion: (criterion: DocumentViewScenarioCodingAutomatedCriterion) => string,
  getTitleForRScriptCriterion: (criterion: RScriptScenarioCodingAutomatedCriterion) => string
): ColumnProps<AutomatedCodingCriterion>[] => [
  {
    key: "label",
    header: t("coding_criteria__criterion_list_label", {count: codingCriteria.length}),
    customHeaderStyles: styles.labelHeader,
    customStyles: styles.labelColumn,
    content: criterion => (
      <div css={[styles.columnCell(selectedCriterionId.map(id => criterion.id === id).getOrElse(false))]}>
        <Text customStyles={textEllipsis} size={TextSize.Small}>
          {columnContentByCodingCriterion(
            criterion,
            t,
            getTitleForDocumentViewCodingCriterion,
            getTitleForRScriptCriterion
          )}
        </Text>
      </div>
    )
  },
  {
    key: "points",
    header: null,
    customStyles: styles.pointColumn,
    content: criterion => (
      <div css={[styles.columnCell(selectedCriterionId.map(id => criterion.id === id).getOrElse(false))]}>
        {t("coding_criteria__criterion_list_score", {score: criterion.score || 0})}
      </div>
    )
  }
]

const columnContentByCodingCriterion = (
  codingCriterion: AutomatedCodingCriterion,
  t: LucaTFunction,
  getTitleForDocumentViewCodingCriterion: (criterion: DocumentViewScenarioCodingAutomatedCriterion) => string,
  getTitleForRScriptCriterion: (criterion: RScriptScenarioCodingAutomatedCriterion) => string
): JSX.Element => {
  switch (codingCriterion.__typename) {
    case "ToolUsageScenarioCodingAutomatedCriterion":
      return (
        <div css={Flex.row}>
          <Icon customStyles={styles.icon} name={iconForOfficeTool(codingCriterion.officeTool)} />
          <Text size={TextSize.Medium}>{`${t(labelKeyForOfficeTool(codingCriterion.officeTool))} ${t("used")}`}</Text>
        </div>
      )
    case "InputValueScenarioCodingAutomatedCriterion":
      return (
        <div css={Flex.row}>
          <Icon customStyles={styles.icon} name={iconForOfficeTool(codingCriterion.officeTool)} />
          <Text size={TextSize.Medium}>{`${t(labelKeyForInputValue(codingCriterion.officeTool))}`}</Text>
        </div>
      )
    case "DocumentViewScenarioCodingAutomatedCriterion":
      return (
        <div css={Flex.row}>
          <Icon customStyles={styles.icon} name={iconForDocumentViewCodingCriterion(codingCriterion)} />
          <Text size={TextSize.Medium}>{`${
            codingCriterion.erpTableType !== null
              ? getErpDocumentViewTitle(codingCriterion, t)
              : getTitleForDocumentViewCodingCriterion(codingCriterion)
          }`}</Text>
        </div>
      )
    case "FeatureUsageScenarioCodingAutomatedCriterion":
      return (
        <div css={Flex.row}>
          <Icon customStyles={styles.icon} name={iconForOfficeTool(codingCriterion.officeTool)} />
          <Text size={TextSize.Medium}>{`${t(
            featureUsageMap
              .get(codingCriterion.officeTool)
              ?.find(info => info.featureType === codingCriterion.featureType)?.languageKey ??
              "coding_models__automated_item_feature_usage_feature_type_combination_error"
          )} ${t("used")}`}</Text>
        </div>
      )
    case "RScriptScenarioCodingAutomatedCriterion":
      return <Text size={TextSize.Medium}>{`${getTitleForRScriptCriterion(codingCriterion)}`}</Text>
  }
}
