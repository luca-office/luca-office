import {sumBy} from "lodash-es"
import * as React from "react"
import {useDispatch} from "react-redux"
import {CodingDimensionUpdate} from "shared/graphql/generated/globalTypes"
import {useDeleteCodingDimension, useDeleteCodingItem, useUpdateCodingDimension} from "shared/graphql/hooks"
import {CodingDimension} from "shared/models"
import {Option, sortByPosition} from "shared/utils"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {Route} from "../../../../routes"
import {toTableItemEntity} from "../../utils/util-dimension-table"
import {DimensionTableEntity} from "../common/dimensions-table/dimensions-table"
import {useRepositionCodingDimensionsOrCodingItems} from "../common/hooks/use-reposition-coding-dimension"
import {CommonCodingModelUpdate} from "../overview/coding-model-detail-overview-container"
import {SubDimensionDetailView} from "./sub-dimension-detail-view"

interface Props {
  readonly codingDimension: CodingDimension
  readonly scenarioId: UUID
  readonly isReadOnly: boolean
}

export const SubDimensionDetailViewContainer: React.FC<Props> = ({codingDimension, scenarioId, isReadOnly}) => {
  const {updateCodingDimension} = useUpdateCodingDimension()

  const dispatch = useDispatch()

  const entitiesForItemsTable: DimensionTableEntity[] = sortByPosition(codingDimension.items.map(toTableItemEntity))

  const [showCreateItemModal, setShowCreateItemModal] = React.useState(false)

  const {
    setIsSortModalVisible,
    isSortModalVisible,
    repositionItems,
    isRepositionLoading
  } = useRepositionCodingDimensionsOrCodingItems()
  const deleteItemHook = useDeleteCodingItem(codingDimension.id)
  const deleteCodingDimensionHook = useDeleteCodingDimension(codingDimension.codingModelId, scenarioId)

  const maxScore = sumBy(codingDimension.items, item => item.maximumScore)

  const navigateToItemDetail = (itemId: UUID) =>
    dispatch(
      navigateToRouteAction(Route.ScenarioCodingItemDetail, {
        scenarioId,
        codingModelId: codingDimension.codingModelId,
        dimensionId: codingDimension.id,
        itemId
      })
    )

  const handleUpdate = (update: CommonCodingModelUpdate): Promise<Option<CodingDimension>> => {
    const codingDimensionUpdate: CodingDimensionUpdate = {
      description: update.description ?? codingDimension.description,
      title: update.title ?? codingDimension.title,
      parentDimensionId: update.parentDimensionId ?? codingDimension.parentDimensionId
    }

    return updateCodingDimension(codingDimension.id, codingDimensionUpdate)
  }

  return (
    <SubDimensionDetailView
      setIsSortModalVisible={setIsSortModalVisible}
      isRepositionLoading={isRepositionLoading}
      isSortModalVisible={isSortModalVisible}
      repositionItems={repositionItems}
      isReadOnly={isReadOnly}
      scenarioId={scenarioId}
      navigateToItemDetail={navigateToItemDetail}
      showCreateItemModal={showCreateItemModal}
      setShowCreateItemModal={setShowCreateItemModal}
      updateCodingDimension={handleUpdate}
      deleteCodingDimensionHook={deleteCodingDimensionHook}
      deleteCodingItemHook={deleteItemHook}
      codingDimension={codingDimension}
      entities={entitiesForItemsTable}
      maxScore={maxScore}
    />
  )
}
