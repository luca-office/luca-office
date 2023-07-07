import {Dispatch, SetStateAction, useState} from "react"
import {useDispatch} from "react-redux"
import {CodingDimensionUpdate} from "shared/graphql/generated/globalTypes"
import {useUpdateCodingDimension} from "shared/graphql/hooks"
import {CodingDimension} from "shared/models"
import {Option} from "shared/utils"
import {ResortedEntity} from "../../../../../models"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"
import {useRepositionCodingDimensionsOrCodingItems} from "../../common/hooks/use-reposition-coding-dimension"
import {CommonCodingModelUpdate} from "../../overview/coding-model-detail-overview-container"

export interface CodingModelCreationForm {
  readonly title: string
  readonly description: string
}

export interface UseMainDimensionDetailViewHook {
  readonly isCreateItemModalVisible: boolean
  readonly isCreateSubDimensionsModalVisible: boolean
  readonly isRepositionLoading: boolean
  readonly isSortModalVisible: boolean
  readonly repositionDimensions: (orderedEntities: ResortedEntity[]) => void
  readonly repositionItems: (orderedEntities: ResortedEntity[]) => void
  readonly setIsSortModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  readonly setShowCreateItemModal: Dispatch<SetStateAction<boolean>>
  readonly setShowCreateSubDimensionsModal: Dispatch<SetStateAction<boolean>>
  readonly updateCodingDimension: (update: CommonCodingModelUpdate) => Promise<Option<CodingDimension>>
  readonly navigateToDimensionDetail: (dimensionId: UUID) => void
  readonly navigateToItemDetail: (itemId: UUID) => void
}

export const useMainDimensionDetailView = (
  codingDimension: CodingDimension,
  scenarioId: UUID
): UseMainDimensionDetailViewHook => {
  const {updateCodingDimension} = useUpdateCodingDimension()

  const dispatch = useDispatch()

  const navigateToDimensionDetail = (dimensionId: UUID) =>
    dispatch(
      navigateToRouteAction(Route.ScenarioCodingDimensionDetail, {
        scenarioId,
        codingModelId: codingDimension.codingModelId,
        dimensionId
      })
    )
  const navigateToItemDetail = (itemId: UUID) =>
    dispatch(
      navigateToRouteAction(Route.ScenarioCodingItemDetail, {
        scenarioId,
        codingModelId: codingDimension.codingModelId,
        dimensionId: codingDimension.id,
        itemId
      })
    )

  const {
    isRepositionLoading,
    isSortModalVisible,
    repositionDimensions,
    repositionItems,
    setIsSortModalVisible
  } = useRepositionCodingDimensionsOrCodingItems()

  const [isCreateSubDimensionsModalVisible, setShowCreateSubDimensionsModal] = useState(false)
  const [isCreateItemModalVisible, setShowCreateItemModal] = useState(false)

  const handleUpdate = (update: CommonCodingModelUpdate): Promise<Option<CodingDimension>> => {
    const codingDimensionUpdate: CodingDimensionUpdate = {
      description: update.description ?? codingDimension.description,
      title: update.title ?? codingDimension.title
    }

    return updateCodingDimension(codingDimension.id, codingDimensionUpdate)
  }

  return {
    updateCodingDimension: handleUpdate,
    setShowCreateSubDimensionsModal,
    setShowCreateItemModal,
    isCreateItemModalVisible,
    isCreateSubDimensionsModalVisible,
    isRepositionLoading,
    setIsSortModalVisible,
    repositionDimensions,
    navigateToDimensionDetail,
    navigateToItemDetail,
    repositionItems,
    isSortModalVisible
  }
}
