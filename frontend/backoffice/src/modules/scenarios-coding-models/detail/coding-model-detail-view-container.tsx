import * as React from "react"
import {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {NodeType} from "shared/enums"
import {useCodingDimensions, useCodingModel, useDeleteCodingModel} from "shared/graphql/hooks"
import {scenarioQuery} from "shared/graphql/queries"
import {BaseNode} from "shared/models"
import {find, Option, sortByPosition} from "shared/utils"
import {getExpandedNodeIdsFromCodingDimensions} from "shared/utils/scenario-coding-model"
import {navigateToRouteAction} from "../../../redux/actions/navigation-action"
import {Route} from "../../../routes"
import {findDimensionIdByItemId, findItemById} from "../utils/coding-item"
import {CodingModelDetailView} from "./coding-model-detail-view"

interface Props {
  readonly codingDimensionId: Option<UUID>
  readonly codingModelId: UUID
  readonly codingItemId: Option<UUID>
  readonly scenarioId: UUID
}

export const CodingModelDetailViewContainer: React.FC<Props> = ({
  codingDimensionId,
  codingModelId,
  codingItemId,
  scenarioId
}) => {
  const {codingDimensions} = useCodingDimensions(codingModelId)
  const {codingModel} = useCodingModel(codingModelId)

  useEffect(() => {
    setSelectedNodeId(getSelectedNodeId(codingDimensionId, codingItemId))
  }, [codingDimensionId, codingItemId])

  const {deleteEntity: deleteCodingModel} = useDeleteCodingModel([{query: scenarioQuery, variables: {id: scenarioId}}])

  const [selectedNodeId, setSelectedNodeId] = useState<Option<string>>(Option.none())

  const dispatch = useDispatch()
  const navigateToOverview = () =>
    dispatch(navigateToRouteAction(Route.ScenarioCodingModelDetail, {scenarioId, codingModelId}))

  const expandedNodeIds = getExpandedNodeIdsFromCodingDimensions(codingDimensionId, codingDimensions)

  const codingItem = codingItemId.flatMap(itemId => findItemById(itemId, codingDimensions))

  const codingDimension = codingDimensionId.flatMap(dimensionId =>
    find(dimension => dimension.id === dimensionId, codingDimensions)
  )

  const handleRemoveCodingModelFromScenario = () => {
    deleteCodingModel(codingModelId).then(() => dispatch(navigateToRouteAction(Route.ScenarioDetail, {scenarioId})))
  }
  const isReadOnly = codingModel.exists(
    model => model.scenario.finalizedAt !== null || model.scenario.publishedAt !== null
  )

  const handleSelectNode = (nodeOption: Option<BaseNode>) => {
    if (nodeOption.isDefined()) {
      setSelectedNodeId(nodeOption.map(node => node.id))
    }

    nodeOption.map(node => {
      switch (node.type) {
        case NodeType.CodingModelManualItem:
        case NodeType.CodingModelAutomatedItem:
          return findDimensionIdByItemId(node.id, codingDimensions).forEach(dimensionId =>
            dispatch(
              navigateToRouteAction(Route.ScenarioCodingItemDetail, {
                scenarioId,
                codingModelId,
                itemId: node.id,
                dimensionId
              })
            )
          )
        case NodeType.CodingModelMainDimension:
        case NodeType.CodingModelSubDimension:
          return dispatch(
            navigateToRouteAction(Route.ScenarioCodingDimensionDetail, {
              scenarioId,
              codingModelId,
              dimensionId: node.id
            })
          )

        default:
          break
      }
    })
  }

  const sortedDimensions = sortByPosition(codingDimensions)

  return codingModel
    .map(model => (
      <CodingModelDetailView
        expandedNodeIds={expandedNodeIds}
        removeCodingModel={handleRemoveCodingModelFromScenario}
        scenarioId={scenarioId}
        allCodingDimensions={sortedDimensions}
        codingDimension={codingDimension}
        isReadOnly={isReadOnly}
        codingItem={codingItem}
        codingModel={model}
        selectedNodeId={selectedNodeId}
        handleSelectNode={handleSelectNode}
        navigateToOverview={navigateToOverview}
      />
    ))
    .orNull()
}

const getSelectedNodeId = (codingDimensionId: Option<UUID>, codingItemId: Option<UUID>) => {
  if (codingItemId.isDefined()) return codingItemId
  if (codingDimensionId.isDefined()) return codingDimensionId
  return Option.none<UUID>()
}
