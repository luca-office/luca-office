import {css} from "@emotion/react"
import * as React from "react"
import {Button, Heading} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {CodingDimension, DeleteEntityHook} from "shared/models"
import {Flex, fontColorLight, spacingMedium, spacingSmall} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {ResortModal} from "../../../../components"
import {Route} from "../../../../routes"
import {CreateItemModal} from "../../create/create-item/create-item-modal"
import {CodingModelCommonDetailViewContainer} from "../common/detail-view/coding-model-common-detail-view-container"
import {DimensionsTable, DimensionTableEntity} from "../common/dimensions-table/dimensions-table"
import {RepositionCodingDimensionsHook} from "../common/hooks/use-reposition-coding-dimension"
import {CommonCodingModelUpdate} from "../overview/coding-model-detail-overview-container"

interface Props extends Omit<RepositionCodingDimensionsHook, "repositionDimensions"> {
  readonly entities: DimensionTableEntity[]
  readonly maxScore: number
  readonly showCreateItemModal: boolean
  readonly setShowCreateItemModal: React.Dispatch<React.SetStateAction<boolean>>
  readonly navigateToItemDetail: (itemId: UUID) => void
  readonly codingDimension: CodingDimension
  readonly scenarioId: UUID
  readonly updateCodingDimension: (update: CommonCodingModelUpdate) => Promise<Option<CodingDimension>>
  readonly deleteCodingDimensionHook: DeleteEntityHook
  readonly deleteCodingItemHook: DeleteEntityHook
  readonly isReadOnly: boolean
}

export const SubDimensionDetailView: React.FC<Props> = ({
  codingDimension,
  updateCodingDimension,
  deleteCodingDimensionHook,
  deleteCodingItemHook,
  entities,
  maxScore,
  scenarioId,
  isReadOnly,
  setShowCreateItemModal,
  navigateToItemDetail,
  isRepositionLoading,
  isSortModalVisible,
  repositionItems,
  setIsSortModalVisible,
  showCreateItemModal
}) => {
  const {t} = useLucaTranslation()

  const emptyTablePlaceholder = (
    <div>
      <Heading customStyles={styles.placeholder} level={HeadingLevel.h3}>
        {t("coding_models__detail_items_table_placeholder_title")}
      </Heading>
      <div css={[Flex.row, styles.buttons]}>
        {!isReadOnly && (
          <Button icon={IconName.Add} onClick={() => setShowCreateItemModal(true)}>
            {t("coding_models__detail_items_table_placeholder_button")}
          </Button>
        )}
      </div>
    </div>
  )

  return (
    <>
      <CodingModelCommonDetailViewContainer
        isReadOnly={isReadOnly}
        editDescriptionDialogTitleKey="coding_models__detail_sub_dimension_edit_description_modal"
        headerTitleKey="coding_models__detail_sub_dimension_label_singular"
        descriptionPlaceholderKey="coding_models__create_sub_dimension_description_placeholder"
        description={codingDimension.description}
        title={codingDimension.title}
        headerDeleteButtonConfig={{
          deleteEntityHook: deleteCodingDimensionHook,
          entityId: codingDimension.id,
          navigateTo: {
            route: Route.ScenarioCodingDimensionDetail,
            payload: {
              scenarioId,
              codingModelId: codingDimension.codingModelId,
              dimensionId: codingDimension.parentDimensionId
            }
          }
        }}
        renderCustomContent={() => (
          <DimensionsTable
            onEntityClick={itemId => navigateToItemDetail(itemId)}
            isReadOnly={isReadOnly}
            isItemsTable={true}
            placeholder={emptyTablePlaceholder}
            onAddClick={() => setShowCreateItemModal(true)}
            onSortClick={() => setIsSortModalVisible(true)}
            deleteEntityConfig={{
              deleteEntityHook: deleteCodingItemHook,
              navigateTo: {
                route: Route.ScenarioCodingDimensionDetail,
                payload: {
                  scenarioId: scenarioId,
                  codingModelId: codingDimension.codingModelId,
                  dimensionId: codingDimension.id
                }
              }
            }}
            maximumScore={maxScore}
            labelKey="coding_models__detail_items_label"
            entities={entities}
          />
        )}
        maxScore={maxScore}
        handleUpdate={updateCodingDimension}
      />
      {showCreateItemModal && (
        <CreateItemModal
          onDismiss={() => setShowCreateItemModal(false)}
          onConfirm={() => setShowCreateItemModal(false)}
          codingModelId={codingDimension.codingModelId}
          parentDimension={codingDimension}
          scenarioId={scenarioId}
        />
      )}
      {isSortModalVisible && (
        <ResortModal<DimensionTableEntity>
          entities={entities}
          disabled={isRepositionLoading}
          onConfirm={repositionItems}
          onDismiss={() => setIsSortModalVisible(false)}
          descriptionTextKey="coding_models__detail_item_sort_modal_description"
          titleKey="coding_models__detail_item_sort_modal_title"
          tableLabel={`${t("coding_models__detail_items_label")} (${entities.length})`}
        />
      )}
    </>
  )
}

const styles = {
  placeholder: css({
    marginBottom: spacingMedium
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
  })
}
