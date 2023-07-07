import {css} from "@emotion/react"
import * as React from "react"
import {Button, Heading, Text} from "shared/components"
import {HeadingLevel} from "shared/enums"
import {useDeleteCodingDimension, useDeleteCodingItem} from "shared/graphql/hooks"
import {CodingDimension} from "shared/models"
import {Flex, fontColorLight, spacingMedium, spacingSmall, spacingTiny, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {sortByPosition} from "shared/utils"
import {ResortModal} from "../../../../components"
import {Route} from "../../../../routes"
import {CreateSubDimensionModal} from "../../create"
import {CreateItemModal} from "../../create/create-item/create-item-modal"
import {
  accumulateItemScoreFromDimension,
  countItemsFromDimension,
  toTableItemEntity
} from "../../utils/util-dimension-table"
import {CodingModelCommonDetailViewContainer} from "../common/detail-view/coding-model-common-detail-view-container"
import {DimensionsTable, DimensionTableEntity} from "../common/dimensions-table/dimensions-table"
import {useMainDimensionDetailView} from "./hooks/use-main-dimension-detail-view"

interface Props {
  readonly allCodingDimensions: CodingDimension[]
  readonly codingDimension: CodingDimension
  readonly scenarioId: UUID
  readonly isReadOnly: boolean
}

export const MainDimensionDetailView: React.FC<Props> = ({
  allCodingDimensions,
  codingDimension,
  scenarioId,
  isReadOnly
}) => {
  const {t} = useLucaTranslation()

  const {
    updateCodingDimension,
    setShowCreateSubDimensionsModal,
    setShowCreateItemModal,
    isCreateSubDimensionsModalVisible,
    isCreateItemModalVisible,
    isSortModalVisible,
    isRepositionLoading,
    setIsSortModalVisible,
    navigateToItemDetail,
    navigateToDimensionDetail,
    repositionDimensions,
    repositionItems
  } = useMainDimensionDetailView(codingDimension, scenarioId)

  const maxScore = accumulateItemScoreFromDimension(codingDimension, allCodingDimensions)

  const deleteDimensionHook = useDeleteCodingDimension(codingDimension.codingModelId, scenarioId)
  const deleteItemHook = useDeleteCodingItem(codingDimension.id)

  const subDimensions = allCodingDimensions.filter(dim => dim.parentDimensionId === codingDimension.id)

  const subdimensionsEntities: DimensionTableEntity[] = subDimensions.map(dimension => ({
    id: dimension.id,
    title: dimension.title,
    itemsCount: countItemsFromDimension(dimension, allCodingDimensions),
    maxScore: accumulateItemScoreFromDimension(dimension, allCodingDimensions)
  }))

  const sortedItems: DimensionTableEntity[] = sortByPosition(codingDimension.items.map(toTableItemEntity))

  const dimensionHasItems = codingDimension.items.length > 0

  const emptyTablePlaceholder = (
    <div>
      <Heading customStyles={styles.placeholder} level={HeadingLevel.h3}>
        {t("coding_models__detail_main_dimension_table_placeholder_title")}
      </Heading>
      {!isReadOnly && (
        <>
          <Text size={TextSize.Medium} customStyles={styles.placeholderSub}>
            {t("coding_models__detail_main_dimension_table_placeholder_sub_title")}
          </Text>
          <div css={[Flex.row, styles.buttons]}>
            <Button onClick={() => setShowCreateSubDimensionsModal(true)} customStyles={styles.button}>
              {t("coding_models__detail_sub_dimension_label")}
            </Button>
            <Button onClick={() => setShowCreateItemModal(true)}>{t("coding_models__detail_items_label")}</Button>
          </div>
        </>
      )}
    </div>
  )

  return (
    <>
      <CodingModelCommonDetailViewContainer
        isReadOnly={isReadOnly}
        headerTitleKey="coding_models__detail_main_dimension_label_singular"
        editDescriptionDialogTitleKey="coding_models__detail_main_dimension_edit_description_modal"
        description={codingDimension.description}
        descriptionPlaceholderKey="coding_models__create_main_dimension_description_placeholder"
        title={codingDimension.title}
        headerDeleteButtonConfig={{
          deleteEntityHook: deleteDimensionHook,
          entityId: codingDimension.id,
          navigateTo: {
            route: Route.ScenarioCodingModelDetail,
            payload: {codingModelId: codingDimension.codingModelId, scenarioId}
          }
        }}
        renderCustomContent={() => (
          <DimensionsTable
            isReadOnly={isReadOnly}
            placeholder={emptyTablePlaceholder}
            onEntityClick={entityId =>
              dimensionHasItems ? navigateToItemDetail(entityId) : navigateToDimensionDetail(entityId)
            }
            onAddClick={() =>
              dimensionHasItems ? setShowCreateItemModal(true) : setShowCreateSubDimensionsModal(true)
            }
            onSortClick={() => setIsSortModalVisible(true)}
            isItemsTable={dimensionHasItems}
            customStyles={styles.dimensionsTable}
            maximumScore={maxScore}
            deleteEntityConfig={{
              deleteEntityHook: dimensionHasItems ? deleteItemHook : deleteDimensionHook,
              navigateTo: {
                route: Route.ScenarioCodingDimensionDetail,
                payload: {scenarioId, codingModelId: codingDimension.codingModelId, dimensionId: codingDimension.id}
              }
            }}
            labelKey={
              dimensionHasItems ? "coding_models__detail_items_label" : "coding_models__detail_sub_dimension_label"
            }
            entities={dimensionHasItems ? sortedItems : subdimensionsEntities}
          />
        )}
        maxScore={maxScore}
        handleUpdate={updateCodingDimension}
      />
      {isCreateSubDimensionsModalVisible && (
        <CreateSubDimensionModal
          scenarioId={scenarioId}
          onConfirm={() => setShowCreateSubDimensionsModal(false)}
          onDismiss={() => setShowCreateSubDimensionsModal(false)}
          codingModelId={codingDimension.codingModelId}
          parentDimension={codingDimension}
        />
      )}
      {isCreateItemModalVisible && (
        <CreateItemModal
          scenarioId={scenarioId}
          codingModelId={codingDimension.codingModelId}
          onConfirm={() => setShowCreateItemModal(false)}
          onDismiss={() => setShowCreateItemModal(false)}
          parentDimension={codingDimension}
        />
      )}
      {isSortModalVisible && (
        <ResortModal<DimensionTableEntity>
          entities={dimensionHasItems ? sortedItems : subdimensionsEntities}
          disabled={isRepositionLoading}
          onConfirm={dimensionHasItems ? repositionItems : repositionDimensions}
          onDismiss={() => setIsSortModalVisible(false)}
          descriptionTextKey={
            dimensionHasItems
              ? "coding_models__detail_item_sort_modal_description"
              : "coding_models__detail_sub_dimension_sort_modal_description"
          }
          titleKey={
            dimensionHasItems
              ? "coding_models__detail_item_sort_modal_title"
              : "coding_models__detail_sub_dimension_sort_modal_title"
          }
          tableLabel={
            dimensionHasItems
              ? `${t("coding_models__detail_items_label")} (${sortedItems.length})`
              : `${t("coding_models__detail_sub_dimension_label")} (${subdimensionsEntities.length})`
          }
        />
      )}
    </>
  )
}

const styles = {
  placeholder: css({
    marginBottom: spacingTiny
  }),
  placeholderSub: css({
    marginBottom: spacingMedium,
    color: fontColorLight
  }),
  buttons: css({
    justifyContent: "center"
  }),
  button: css({
    marginRight: spacingSmall
  }),
  dimensionsTable: {
    marginTop: spacingMedium
  }
}
