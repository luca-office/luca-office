/* eslint-disable max-lines */
import {max, orderBy, sumBy} from "lodash-es"
import * as React from "react"
import {
  AutomatedCodingItemRuleField,
  Column,
  ColumnProps,
  Columns,
  Heading,
  Icon,
  Label,
  ReadonlyActionField,
  Text,
  Tooltip
} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {AutomatedCodingItemRule, ScoringType} from "shared/graphql/generated/globalTypes"
import {useDeleteCodingItem} from "shared/graphql/hooks"
import {
  AutomatedCodingCriterion,
  AutomatedCodingItem,
  DocumentViewScenarioCodingAutomatedCriterion,
  FeatureUsageScenarioCodingAutomatedCriterion,
  InputValueScenarioCodingAutomatedCriterion,
  RScript,
  RScriptScenarioCodingAutomatedCriterion,
  ToolUsageScenarioCodingAutomatedCriterion
} from "shared/models"
import {Flex, FontWeight, TextSize} from "shared/styles"
import {LucaTFunction, useLucaTranslation} from "shared/translations"
import {
  criterionsForAutomatedCodingItem,
  iconForDocumentViewCodingCriterion,
  iconForInputValue,
  iconForOfficeTool,
  labelKeyForFeatureType,
  labelKeyForInputValue,
  labelKeyForOfficeTool,
  Option
} from "shared/utils"
import {Route} from "../../../../routes"
import {
  CreateOrUpdateRScriptModalContainer,
  RScriptCriterionDisplayMode
} from "../../common/create-or-update-r-script-modal/create-or-update-r-script-modal-container"
import {CreateOrUpdateInputValueContentModalContainer} from "../../common/edit-coding-criterion-modal/coding-criteria-card/automated-criteria-content/input-value/create-or-update-input-value-criterion-modal-container"
import {EditCodingCriterionModal} from "../../common/edit-coding-criterion-modal/edit-coding-criterion-modal"
import {UpdateCodingItemModal} from "../../common/update-coding-item-modal/update-coding-item-modal"
import {
  CreateOrUpdateDocumentViewCriterionContainer,
  DocumentViewCriterionDisplayMode
} from "../../create/create-automated-coding-criterion/document-view/create-or-update-document-view-criterion-container"
import {CreateFeatureUsageCriterionContainer} from "../../create/create-automated-coding-criterion/feature-usage/create-feature-usage-container"
import {CreateToolUsageCriterionContainer} from "../../create/create-automated-coding-criterion/tool-usage/create-tool-usage-container"
import {itemNameForScoringType, languageKeyForScoringType} from "../../utils/coding-item"
import {AutomatedCodingCriterionCommonTable} from "../coding-criterion/automated-coding-criterion-common-table/automated-coding-criterion-common-table"
import {getErpDocumentViewTitle} from "../coding-criterion/coding-criterion-util"
import {CodingModelCommonDetailViewContainer} from "../common/detail-view/coding-model-common-detail-view-container"
import {AutomatedCodingItemDetailViewComponentProps} from "./coding-item-detail-view-container"
import {codingItemDetailStyles} from "./coding-item-detail-view-styles"

export const AutomatedCodingItemDetailView: React.FC<AutomatedCodingItemDetailViewComponentProps> = ({
  codingCriteria,
  codingItem,
  codingModelId,
  editCodingCriterionModalVisibility,
  getTitleForDocumentViewTableEntity,
  hideCodingItemUpdateModal,
  hideEditCodingCriterionModal,
  isReadOnly,
  rScripts,
  scenarioId,
  showEditCodingCriterionModal,
  updateCodingItem,
  visibleCodingItemUpdateModalType,
  sampleCompanyId,
  visibleCreateCriterionModal,
  setVisibleCreateCriterionModal
}) => {
  const {t} = useLucaTranslation()

  const deleteItemHook = useDeleteCodingItem(codingItem.dimensionId)

  const automatedCriterions = criterionsForAutomatedCodingItem(codingCriteria, codingItem)

  const score =
    codingItem.scoringType === ScoringType.Analytical
      ? sumBy(codingCriteria, criteria => criteria.score)
      : max(codingCriteria.map(criterion => criterion.score)) ?? 0

  const alreadyUsedToolsOfToolUsage = codingCriteria
    .filter(codingCriterion => codingCriterion.__typename === "ToolUsageScenarioCodingAutomatedCriterion")
    .map(criterion => (criterion as ToolUsageScenarioCodingAutomatedCriterion).officeTool)

  const content = (
    <div css={codingItemDetailStyles.tableWrapper}>
      <Columns>
        <Column>
          <ReadonlyActionField
            label={t("coding_models__detail_item_view_scoring_method")}
            customStyles={codingItemDetailStyles.columns.scoringMethodColumn}
            renderValue={() => (
              <div css={Flex.row}>
                <Tooltip
                  title={t("coding_models__create_item_label_rating_method_automated_title_tooltip_title")}
                  text={t("coding_models__create_item_label_rating_method_automated_title_tooltip_text")}
                  icon={IconName.Gear}>
                  <Icon customStyles={codingItemDetailStyles.icon} name={IconName.Gear} />
                </Tooltip>

                <Text size={TextSize.Medium}>
                  {t("coding_models__create_item_label_rating_method_automated_title")}
                </Text>
              </div>
            )}
          />
        </Column>
        <Column>
          <ReadonlyActionField
            label={t("coding_models__detail_item_view_scoring_type")}
            buttonLabel={undefined}
            onClick={undefined}
            customStyles={codingItemDetailStyles.editScoring(true)}
            renderValue={() => (
              <div css={Flex.row}>
                <Icon
                  customStyles={codingItemDetailStyles.icon}
                  name={itemNameForScoringType(codingItem.scoringType)}
                />
                <Text size={TextSize.Medium}>{t(languageKeyForScoringType(codingItem.scoringType))}</Text>
              </div>
            )}
          />
        </Column>
      </Columns>

      <AutomatedCodingItemRuleField
        customStyles={codingItemDetailStyles.editRule}
        automatedCodingItem={codingItem as AutomatedCodingItem}
      />

      <div css={codingItemDetailStyles.tableWrapper}>
        <Label label={`${t("coding_models__detail_item_criteria")} (${codingCriteria.length})`} />
        <AutomatedCodingCriterionCommonTable
          onEntityClick={entity => showEditCodingCriterionModal(Option.of(entity.id))}
          onAddClick={() =>
            setVisibleCreateCriterionModal(
              Option.of({visibleCriterionType: codingItem.rule as AutomatedCodingItemRule})
            )
          }
          onEditClick={() => showEditCodingCriterionModal(Option.none())}
          isReadOnly={isReadOnly}
          customMiddleColumns={getCustomMiddleColumn(codingItem.rule, t, getTitleForDocumentViewTableEntity, rScripts)}
          entities={orderBy(automatedCriterions, criteria => criteria.score, "desc")}
        />
      </div>
    </div>
  )

  return (
    <React.Fragment>
      <CodingModelCommonDetailViewContainer
        descriptionPlaceholderKey="coding_models__detail_item_edit_description_description_placeholder"
        isReadOnly={isReadOnly}
        headerTitleKey="coding_models__detail_items_label_singular"
        editDescriptionDialogTitleKey="coding_models__detail_item_edit_description_modal"
        description={codingItem.description}
        title={codingItem.title}
        headerDeleteButtonConfig={{
          deleteEntityHook: deleteItemHook,
          entityId: codingItem.id,
          navigateTo: {
            route: Route.ScenarioCodingDimensionDetail,
            payload: {scenarioId, codingModelId, dimensionId: codingItem.dimensionId}
          }
        }}
        renderCustomContent={() => content}
        maxScore={score}
        handleUpdate={updateCodingItem}
      />
      {visibleCodingItemUpdateModalType
        .map(type => (
          <UpdateCodingItemModal
            codingItemId={codingItem.id}
            type={type}
            onDismiss={hideCodingItemUpdateModal}
            onUpdate={hideCodingItemUpdateModal}
          />
        ))
        .orNull()}
      {editCodingCriterionModalVisibility.isVisible && (
        <EditCodingCriterionModal
          codingModelId={codingModelId}
          rScripts={rScripts}
          scenarioId={scenarioId}
          automatedCodingCriteria={codingCriteria}
          selectedCodingCriterionId={editCodingCriterionModalVisibility.defaultSelectedCriterionId}
          codingItemId={codingItem.id}
          onDismiss={hideEditCodingCriterionModal}
          sampleCompanyId={sampleCompanyId}
        />
      )}
      {visibleCreateCriterionModal
        .map(({visibleCriterionType}) => {
          switch (visibleCriterionType) {
            case AutomatedCodingItemRule.DocumentView:
              return (
                <CreateOrUpdateDocumentViewCriterionContainer
                  displayMode={DocumentViewCriterionDisplayMode.Create}
                  scenarioId={scenarioId}
                  onDismiss={() => setVisibleCreateCriterionModal(Option.none())}
                  onSuccess={() => setVisibleCreateCriterionModal(Option.none())}
                  criterion={Option.none()}
                  codingItemId={codingItem.id}
                  codingModelId={codingModelId}
                />
              )
            case AutomatedCodingItemRule.RScript:
              return (
                <CreateOrUpdateRScriptModalContainer
                  onDismiss={() => setVisibleCreateCriterionModal(Option.none())}
                  onSuccess={() => setVisibleCreateCriterionModal(Option.none())}
                  displayMode={RScriptCriterionDisplayMode.Create}
                  criterion={Option.none()}
                  codingItemId={codingItem.id}
                  codingModelId={codingModelId}
                />
              )
            case AutomatedCodingItemRule.InputValue:
              return (
                <CreateOrUpdateInputValueContentModalContainer
                  onDismiss={() => setVisibleCreateCriterionModal(Option.none())}
                  onConfirm={() => setVisibleCreateCriterionModal(Option.none())}
                  criterion={Option.none()}
                  codingItemId={codingItem.id}
                  scenarioId={scenarioId}
                  codingModelId={codingModelId}
                />
              )
            case AutomatedCodingItemRule.ToolUsage:
              return (
                <CreateToolUsageCriterionContainer
                  onDismiss={() => setVisibleCreateCriterionModal(Option.none())}
                  onSuccess={() => setVisibleCreateCriterionModal(Option.none())}
                  codingItemId={codingItem.id}
                  alreadyUsedTools={alreadyUsedToolsOfToolUsage}
                  codingModelId={codingModelId}
                />
              )
            case AutomatedCodingItemRule.FeatureUsage:
              return (
                <CreateFeatureUsageCriterionContainer
                  onDismiss={() => setVisibleCreateCriterionModal(Option.none())}
                  onSuccess={() => setVisibleCreateCriterionModal(Option.none())}
                  codingItemId={codingItem.id}
                  codingModelId={codingModelId}
                />
              )
          }
        })
        .orNull()}
    </React.Fragment>
  )
}

const getCustomMiddleColumn = (
  codingItemRule: AutomatedCodingItemRule,
  t: LucaTFunction,
  getTitleForDocumentViewTableEntity: (criterion: DocumentViewScenarioCodingAutomatedCriterion) => string,
  rScripts: RScript[]
): ColumnProps<AutomatedCodingCriterion>[] => {
  switch (codingItemRule) {
    case AutomatedCodingItemRule.ToolUsage:
      return [
        {
          header: (
            <div css={Flex.row}>
              <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
                {t("coding_criteria__automated_criterion_tool_usage_column")}
              </Heading>
            </div>
          ),
          key: "toolUsage",
          content: entity => {
            const toolUsageEntity = entity as ToolUsageScenarioCodingAutomatedCriterion
            return (
              <Column>
                <div css={Flex.row}>
                  <Icon
                    customStyles={codingItemDetailStyles.icon}
                    name={iconForOfficeTool(toolUsageEntity.officeTool)}
                  />
                  <Text size={TextSize.Medium}>{t(labelKeyForOfficeTool(toolUsageEntity.officeTool))}</Text>
                </div>
              </Column>
            )
          }
        }
      ]
    case AutomatedCodingItemRule.RScript:
      return [
        {
          header: (
            <div css={Flex.row}>
              <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
                {t("coding_models__automated_item_r_scripts_column_header")}
              </Heading>
            </div>
          ),
          key: "rScript",
          content: entity => {
            const rScriptEntity = entity as RScriptScenarioCodingAutomatedCriterion

            return (
              <Text size={TextSize.Medium}>
                {rScripts.find(script => script.id === rScriptEntity.rScriptId)?.title ||
                  t("r_scripts__title_placeholder")}
              </Text>
            )
          }
        }
      ]
    case AutomatedCodingItemRule.FeatureUsage:
      return [
        {
          header: (
            <div css={Flex.row}>
              <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
                {t("coding_criteria__automated_criterion_tool_usage_column")}
              </Heading>
            </div>
          ),
          key: "featureUsageTool",
          content: entity => {
            const featureUsageEntity = entity as FeatureUsageScenarioCodingAutomatedCriterion
            return (
              <Column>
                <div css={Flex.row}>
                  <Icon
                    customStyles={codingItemDetailStyles.icon}
                    name={iconForOfficeTool(featureUsageEntity.officeTool)}
                  />
                  <Text size={TextSize.Medium}>{t(labelKeyForOfficeTool(featureUsageEntity.officeTool))}</Text>
                </div>
              </Column>
            )
          }
        },
        {
          header: (
            <div css={Flex.row}>
              <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
                {t("coding_models__automated_item_feature_usage_table_header")}
              </Heading>
            </div>
          ),
          key: "featureUsageFeature",
          content: entity => {
            const featureUsageEntity = entity as FeatureUsageScenarioCodingAutomatedCriterion
            return (
              <Text size={TextSize.Medium}>
                {t(labelKeyForFeatureType(featureUsageEntity.featureType, featureUsageEntity.officeTool))}
              </Text>
            )
          }
        }
      ]
    case AutomatedCodingItemRule.DocumentView:
      return [
        {
          header: (
            <div css={Flex.row}>
              <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
                {t("coding_models__automated_item_document_view_column_header")}
              </Heading>
            </div>
          ),
          key: "documentView",
          content: entity => {
            const documentViewEntity = entity as DocumentViewScenarioCodingAutomatedCriterion
            return (
              <Column>
                <div css={Flex.row}>
                  <Icon
                    customStyles={codingItemDetailStyles.icon}
                    name={iconForDocumentViewCodingCriterion(documentViewEntity)}
                  />
                  <Text size={TextSize.Medium}>
                    {documentViewEntity.erpTableType !== null
                      ? getErpDocumentViewTitle(documentViewEntity, t)
                      : getTitleForDocumentViewTableEntity(documentViewEntity)}
                  </Text>
                </div>
              </Column>
            )
          }
        }
      ]

    case AutomatedCodingItemRule.InputValue:
      return [
        {
          header: (
            <div css={Flex.row}>
              <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
                {t("coding_models__automated_item_input_value_position")}
              </Heading>
            </div>
          ),
          key: "viewerTool",
          content: entity => {
            const inputValueEntity = entity as InputValueScenarioCodingAutomatedCriterion
            return (
              <Column>
                <div css={Flex.row}>
                  <Icon
                    customStyles={codingItemDetailStyles.icon}
                    name={iconForInputValue(inputValueEntity.officeTool)}
                  />
                  <Text size={TextSize.Medium}>{t(labelKeyForInputValue(inputValueEntity.officeTool))}</Text>
                </div>
              </Column>
            )
          }
        },
        {
          header: (
            <div css={Flex.row}>
              <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
                {t("coding_models__automated_item_input_value_value")}
              </Heading>
            </div>
          ),
          key: "value",
          content: entity => {
            const inputValueEntity = entity as InputValueScenarioCodingAutomatedCriterion
            return (
              <Column>
                <div css={Flex.row}>
                  <Text size={TextSize.Medium}>{inputValueEntity.value}</Text>
                </div>
              </Column>
            )
          }
        }
      ]

    default:
      return []
  }
}
