import {max, orderBy, sumBy} from "lodash-es"
import * as React from "react"
import {
  Button,
  Checkbox,
  Column,
  ColumnProps,
  Columns,
  Heading,
  Icon,
  Label,
  RadioButton,
  ReadonlyActionField,
  TableContainer,
  Text,
  Tooltip
} from "shared/components"
import {ButtonVariant, HeadingLevel, IconName} from "shared/enums"
import {ScoringType} from "shared/graphql/generated/globalTypes"
import {useDeleteCodingItem} from "shared/graphql/hooks"
import {CodingCriterion} from "shared/models"
import {Flex, FontWeight, spacingSmall, textEllipsis, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {Route} from "../../../../routes"
import {EditCodingCriterionModal} from "../../common/edit-coding-criterion-modal/edit-coding-criterion-modal"
import {UpdateCodingItemModal} from "../../common/update-coding-item-modal/update-coding-item-modal"
import {itemNameForScoringType, languageKeyForScoringType} from "../../utils/coding-item"
import {CodingModelCommonDetailViewContainer} from "../common/detail-view/coding-model-common-detail-view-container"
import {ManualCodingItemDetailViewComponentProps} from "./coding-item-detail-view-container"
import {codingItemDetailStyles} from "./coding-item-detail-view-styles"

export const ManualCodingItemDetailView: React.FC<ManualCodingItemDetailViewComponentProps> = ({
  codingItem,
  isReadOnly,
  codingCriteria,
  updateCodingItem,
  addCodingCriterion,
  scenarioId,
  codingModelId,
  visibleCodingItemUpdateModalType,
  showUpdateCodingItemTypeModal,
  hideCodingItemUpdateModal,
  editCodingCriterionModalVisibility,
  showEditCodingCriterionModal,
  hideEditCodingCriterionModal
}) => {
  const {t} = useLucaTranslation()

  const deleteItemHook = useDeleteCodingItem(codingItem.dimensionId)

  const score =
    codingItem.scoringType === ScoringType.Analytical
      ? sumBy(codingCriteria, criteria => criteria.score)
      : max(codingCriteria.map(criterion => criterion.score)) ?? 0

  const columns: ColumnProps<CodingCriterion>[] = [
    {
      header: <Icon name={itemNameForScoringType(codingItem.scoringType)} />,
      key: "scoringType",
      customStyles: codingItemDetailStyles.columns.scoringTypeColumn,
      customHeaderStyles: codingItemDetailStyles.columns.scoringTypeColumnHeader,
      content: () => (
        <Column>
          {codingItem.scoringType === ScoringType.Analytical ? (
            <Checkbox defaultChecked={false} />
          ) : (
            <div css={codingItemDetailStyles.columns.scoringTypeColumnContentItem}>
              <RadioButton customStyles={{marginRight: -spacingSmall}} selected={false} />
            </div>
          )}
        </Column>
      )
    },
    {
      header: (
        <div css={Flex.row}>
          <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
            {t("description")}
          </Heading>
        </div>
      ),
      key: "description",
      content: entity => {
        const hasDescription = entity.description.length > 0
        return (
          <Column>
            <Text
              onClick={() => showEditCodingCriterionModal(Option.of(entity.id))}
              customStyles={[codingItemDetailStyles.descriptionText(!hasDescription), textEllipsis]}
              size={TextSize.Medium}>
              {!hasDescription ? t("coding_models__detail_item_missing_description") : entity.description}
            </Text>
          </Column>
        )
      }
    },
    {
      header: (
        <div css={codingItemDetailStyles.columns.pointsColumnHeader}>
          <Button
            onClick={() => showEditCodingCriterionModal(Option.none())}
            variant={ButtonVariant.IconOnly}
            disabled={isReadOnly}
            customStyles={codingItemDetailStyles.button}
            icon={IconName.EditBordered}
          />
          <Tooltip title={t("scenario_details__header_button_is_finalized")} inactive={!isReadOnly}>
            <Button
              onClick={addCodingCriterion}
              variant={ButtonVariant.IconOnly}
              disabled={isReadOnly}
              icon={IconName.Add}
            />
          </Tooltip>
        </div>
      ),
      customStyles: codingItemDetailStyles.columns.pointsColumn,
      key: "score",
      content: entity => (
        <Column>
          <Text customStyles={codingItemDetailStyles.score} size={TextSize.Medium}>
            {`${entity.score}  ${
              entity.score === 1 ? t("coding_models__detail_score_singular") : t("coding_models__detail_score")
            }`}
          </Text>
        </Column>
      )
    }
  ]

  const content = (
    <div css={codingItemDetailStyles.tableWrapper}>
      <Columns>
        <Column>
          <ReadonlyActionField
            label={t("coding_models__detail_item_view_scoring_method")}
            customStyles={codingItemDetailStyles.columns.scoringMethodColumn}
            renderValue={() => (
              <div css={Flex.row}>
                <Icon customStyles={codingItemDetailStyles.icon} name={IconName.Mouse} />

                <Text size={TextSize.Medium}>{t("coding_models__create_item_label_rating_method_manual_title")}</Text>
              </div>
            )}
          />
        </Column>
        <Column>
          <ReadonlyActionField
            label={t("coding_models__detail_item_view_scoring_type")}
            buttonLabel={t("edit_button")}
            onClick={showUpdateCodingItemTypeModal}
            customStyles={codingItemDetailStyles.editScoring(false)}
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

      <div css={codingItemDetailStyles.tableWrapper}>
        <Label label={`${t("coding_models__detail_item_criteria")} (${codingCriteria.length})`} />
        <TableContainer<CodingCriterion>
          entities={orderBy(codingCriteria, criteria => criteria.score, "desc")}
          entityKey={entity => entity.id}
          showFooter
          placeHolderText={t("coding_models__detail_table_item_criteria_placeholder")}
          customHeaderRowStyles={codingItemDetailStyles.headerRow}
          customRowStyles={() => codingItemDetailStyles.tableRow}
          columns={columns}
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
          scenarioId={scenarioId}
          selectedCodingCriterionId={editCodingCriterionModalVisibility.defaultSelectedCriterionId}
          codingItemId={codingItem.id}
          onDismiss={hideEditCodingCriterionModal}
        />
      )}
    </React.Fragment>
  )
}
