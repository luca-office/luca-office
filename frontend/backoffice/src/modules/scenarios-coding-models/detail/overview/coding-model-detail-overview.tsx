import {css} from "@emotion/react"
import * as React from "react"
import {useDispatch} from "react-redux"
import {CreateMainDimensionModal} from "shared/components"
import {useDeleteCodingDimension} from "shared/graphql/hooks"
import {CodingDimension, CodingModel} from "shared/models"
import {spacingMedium} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {ResortModal} from "../../../../components"
import {ResortedEntity} from "../../../../models"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {Route} from "../../../../routes"
import {
  accumulateItemScoreFromDimension,
  countItemsFromDimension,
  getTotalAccumulatedScore,
  getTotalItems
} from "../../utils/util-dimension-table"
import {CodingModelCommonDetailViewContainer} from "../common/detail-view/coding-model-common-detail-view-container"
import {DimensionsTable, DimensionTableEntity} from "../common/dimensions-table/dimensions-table"
import {CommonCodingModelUpdate} from "./coding-model-detail-overview-container"
import {DimensionMetadata} from "./detail-dimension-metadata/dimension-metadata"

interface Props {
  readonly codingDimensions: CodingDimension[]
  readonly codingModel: CodingModel
  readonly handleUpdate: (update: CommonCodingModelUpdate) => Promise<Option<CodingModel>>
  readonly isCreateMainDimensionsModalVisible: boolean
  readonly isRepositionLoading: boolean
  readonly isSortModalVisible: boolean
  readonly repositionDimensions: (orderedEntities: ResortedEntity[]) => void
  readonly navigateToDimensionDetail: (dimensionId: UUID) => void
  readonly setIsSortModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  readonly setShowCreateMainDimensionsModal: React.Dispatch<React.SetStateAction<boolean>>
  readonly isReadOnly: boolean
}

export const CodingModelDetailOverview: React.FC<Props> = ({
  codingDimensions,
  codingModel,
  handleUpdate,
  isSortModalVisible,
  isRepositionLoading,
  setIsSortModalVisible,
  setShowCreateMainDimensionsModal,
  navigateToDimensionDetail,
  repositionDimensions,
  isReadOnly,
  isCreateMainDimensionsModalVisible
}) => {
  const mainDimensions = codingDimensions.filter(dimension => dimension.parentDimensionId === null)
  const subDimensions = codingDimensions.filter(dimension => dimension.parentDimensionId !== null)
  const itemsCount = getTotalItems(codingDimensions)
  const totalScore = getTotalAccumulatedScore(codingDimensions)

  const dispatch = useDispatch()
  const {t} = useLucaTranslation()

  const deleteDimensionEntity = useDeleteCodingDimension(codingModel.id, codingModel.scenarioId)

  const tableEntities: DimensionTableEntity[] = mainDimensions.map(dimension => ({
    id: dimension.id,
    title: dimension.title,
    itemsCount: countItemsFromDimension(dimension, codingDimensions),
    maxScore: accumulateItemScoreFromDimension(dimension, codingDimensions)
  }))

  const onCreate = (codingDimension: CodingDimension) =>
    dispatch(
      navigateToRouteAction(Route.ScenarioCodingDimensionDetail, {
        codingModelId: codingDimension.codingModelId,
        dimensionId: codingDimension.id,
        scenarioId: codingModel.scenario.id
      })
    )

  return (
    <>
      <CodingModelCommonDetailViewContainer
        isReadOnly={isReadOnly}
        editDescriptionDialogTitleKey="coding_models__detail_main_dimension_edit_description_modal"
        description={codingModel.description}
        descriptionPlaceholderKey="coding_models__overview_description_placeholder"
        title={codingModel.title}
        renderCustomContent={() => (
          <>
            <DimensionMetadata
              customStyles={styles.dimensionMetadata}
              dimensionsCount={{
                items: itemsCount,
                mainDimension: mainDimensions.length,
                subDimension: subDimensions.length
              }}
            />
            <DimensionsTable
              onEntityClick={dimensionId => navigateToDimensionDetail(dimensionId)}
              onSortClick={() => setIsSortModalVisible(true)}
              isReadOnly={isReadOnly}
              onAddClick={() => setShowCreateMainDimensionsModal(true)}
              labelKey="coding_models__detail_main_dimension_label"
              deleteEntityConfig={{
                deleteEntityHook: deleteDimensionEntity,
                navigateTo: {
                  route: Route.ScenarioCodingModelDetail,
                  payload: {codingModelId: codingModel.id, scenarioId: codingModel.scenario.id}
                }
              }}
              maximumScore={totalScore}
              entities={tableEntities}
              customStyles={styles.dimensionTable}
            />
          </>
        )}
        handleUpdate={handleUpdate}
        headerTitleKey="overview"
        maxScore={totalScore}
      />
      {isCreateMainDimensionsModalVisible && (
        <CreateMainDimensionModal
          scenarioId={codingModel.scenario.id}
          onConfirm={() => setShowCreateMainDimensionsModal(false)}
          onDismiss={() => setShowCreateMainDimensionsModal(false)}
          codingModelId={codingModel.id}
          onCreate={onCreate}
        />
      )}
      {isSortModalVisible && (
        <ResortModal<DimensionTableEntity>
          entities={tableEntities}
          disabled={isRepositionLoading}
          onConfirm={repositionDimensions}
          onDismiss={() => setIsSortModalVisible(false)}
          descriptionTextKey="coding_models__detail_main_dimension_sort_modal_description"
          titleKey="coding_models__detail_main_dimension_sort_modal_title"
          tableLabel={`${t("coding_models__detail_main_dimension_label")} (${tableEntities.length})`}
        />
      )}
    </>
  )
}

const styles = {
  dimensionTable: css({marginTop: spacingMedium}),
  dimensionMetadata: {
    marginTop: spacingMedium
  }
}
