import * as React from "react"
import {useState} from "react"
import {useDispatch} from "react-redux"
import {CodingDimensionUpdate, CodingModelUpdate} from "shared/graphql/generated/globalTypes"
import {useUpdateCodingModel} from "shared/graphql/hooks"
import {CodingDimension, CodingModel} from "shared/models"
import {Option} from "shared/utils"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {Route} from "../../../../routes"
import {useRepositionCodingDimensionsOrCodingItems} from "../common/hooks/use-reposition-coding-dimension"
import {CodingModelDetailOverview} from "./coding-model-detail-overview"

interface Props {
  readonly codingModel: CodingModel
  readonly codingDimensions: CodingDimension[]
}

export type CommonCodingModelUpdate = Partial<CodingDimensionUpdate>

export const CodingModelDetailOverviewContainer: React.FC<Props> = ({codingModel, codingDimensions}) => {
  const {updateCodingModel} = useUpdateCodingModel()

  const dispatch = useDispatch()

  const {
    isRepositionLoading,
    isSortModalVisible,
    repositionDimensions,
    setIsSortModalVisible
  } = useRepositionCodingDimensionsOrCodingItems()

  const navigateToDimensionDetail = (dimensionId: UUID) =>
    dispatch(
      navigateToRouteAction(Route.ScenarioCodingDimensionDetail, {
        scenarioId: codingModel.scenario.id,
        codingModelId: codingModel.id,
        dimensionId
      })
    )

  const [isCreateMainDimensionsModalVisible, setShowCreateMainDimensionsModal] = useState(false)

  const handleUpdate = (update: CommonCodingModelUpdate): Promise<Option<CodingModel>> => {
    const codingModelUpdate: CodingModelUpdate = {
      description: update.description ?? codingModel.description,
      title: update.title ?? codingModel.title
    }

    return updateCodingModel(codingModel.id, codingModelUpdate)
  }

  return (
    <CodingModelDetailOverview
      navigateToDimensionDetail={navigateToDimensionDetail}
      isReadOnly={codingModel.scenario.finalizedAt !== null || codingModel.scenario.publishedAt !== null}
      handleUpdate={handleUpdate}
      codingDimensions={codingDimensions}
      codingModel={codingModel}
      isCreateMainDimensionsModalVisible={isCreateMainDimensionsModalVisible}
      isRepositionLoading={isRepositionLoading}
      isSortModalVisible={isSortModalVisible}
      repositionDimensions={repositionDimensions}
      setIsSortModalVisible={setIsSortModalVisible}
      setShowCreateMainDimensionsModal={setShowCreateMainDimensionsModal}
    />
  )
}
