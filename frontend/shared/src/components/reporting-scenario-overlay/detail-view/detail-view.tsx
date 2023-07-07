import {CSSInterpolation} from "@emotion/serialize"
import {sumBy} from "lodash-es"
import * as React from "react"
import {Card, CardContent, CardFooter, CardHeader, DetailViewFooter, Icon, Text} from "../../../components"
import {TableEntity} from "../../../components/rating/models"
import {getCodingItemsFromCodingDimensions, getSubDimensions} from "../../../components/rating/utils"
import {IconName} from "../../../enums"
import {CodingDimension, CodingItem, CodingItemResultByItemId, CodingModel} from "../../../models"
import {CustomStyle, spacingMedium, TextSize} from "../../../styles"
import {LucaTFunction} from "../../../translations"
import {isEmpty, Option} from "../../../utils"
import {CommonDetailView} from "./common-detail-view"
import {ItemDetailViewContainer} from "./item-detail-view-container"
import {dimensionToTableEntity, itemToTableEntity} from "./utils"

export interface Props extends CustomStyle {
  readonly t: LucaTFunction
  readonly participantName: string
  readonly codingDimensions: CodingDimension[]
  readonly codingModel: CodingModel
  readonly codingItemResultByItemId: CodingItemResultByItemId
  readonly selectedNodeId: Option<UUID>
  readonly updateSelectedNodeId: (nodeId: UUID) => void
}

export const DetailView: React.FC<Props> = props => {
  const {
    t,
    customStyles,
    participantName,
    selectedNodeId,
    codingDimensions,
    updateSelectedNodeId,
    codingModel,
    codingItemResultByItemId
  } = props

  const items = getCodingItemsFromCodingDimensions(codingDimensions)
  const selectedItem = selectedNodeId.flatMap(id => Option.of(items.find(item => item.id === id))).orNull()
  const selectedDimension = selectedNodeId
    .flatMap(id => Option.of(codingDimensions.find(dimension => dimension.id === id)))
    .orNull()

  const content = () => {
    if (selectedItem !== null) {
      return (
        <ItemDetailViewContainer t={t} item={selectedItem} itemResult={codingItemResultByItemId[selectedItem.id]} />
      )
    } else if (selectedDimension !== null) {
      if (selectedDimension.parentDimensionId === null) {
        // Maindimension
        const subdimensions = getSubDimensions(selectedDimension, codingDimensions)
        const hasNoSubdimensions = isEmpty(subdimensions)
        let entities = []

        if (hasNoSubdimensions) {
          entities = selectedDimension.items.map(item => itemToTableEntity(item, codingItemResultByItemId))
        } else {
          entities = subdimensions.map(dimension =>
            dimensionToTableEntity(dimension, dimension.items, codingItemResultByItemId)
          )
        }

        return (
          <CommonDetailView
            t={t}
            onClick={updateSelectedNodeId}
            entities={entities}
            description={selectedDimension.description}
            title={selectedDimension.title}
            entityLabelKey={
              hasNoSubdimensions ? "coding_models__detail_items_label" : "coding_models__detail_sub_dimension_label"
            }
          />
        )
      } else {
        const entities: TableEntity[] = selectedDimension.items.map(item =>
          itemToTableEntity(item, codingItemResultByItemId)
        )

        return (
          <CommonDetailView
            t={t}
            onClick={updateSelectedNodeId}
            entities={entities}
            description={selectedDimension.description}
            title={selectedDimension.title}
            entityLabelKey="coding_models__detail_items_label"
          />
        )
      }
    } else {
      const mainDimensions = codingDimensions.filter(dimension => dimension.parentDimensionId === null)
      const entities = mainDimensions.map(dimension => {
        const subdimensions = getSubDimensions(dimension, codingDimensions)
        const allItemsOfMainDimension = getCodingItemsFromCodingDimensions([...subdimensions, dimension])
        return dimensionToTableEntity(dimension, allItemsOfMainDimension, codingItemResultByItemId)
      })

      return (
        <CommonDetailView
          t={t}
          onClick={updateSelectedNodeId}
          entities={entities}
          description={codingModel.description}
          title={codingModel.title}
          entityLabelKey="coding_models__detail_main_dimension_label"
        />
      )
    }
  }

  return (
    <Card hasShadow css={customStyles}>
      <CardHeader hasGreyBackground hasShadow>
        <Icon hasSpacing name={IconName.Student} />
        <Text size={TextSize.Medium}>{participantName}</Text>
      </CardHeader>
      <CardContent customStyles={styles.cardContent}>{content()}</CardContent>
      <CardFooter customStyles={styles.cardFooter}>
        {scenarioFooter(t, codingItemResultByItemId, selectedDimension, selectedItem, codingDimensions)}
      </CardFooter>
    </Card>
  )
}

const scenarioFooter = (
  t: LucaTFunction,
  codingItemResultsByItem: CodingItemResultByItemId,
  selectedDimension: CodingDimension | null,
  selectedCodingItem: CodingItem | null,
  codingDimenions: CodingDimension[]
) => {
  const scenarioResults = Object.values(codingItemResultsByItem)

  const filterResults = () => {
    if (selectedDimension !== null) {
      // dimension selected
      return scenarioResults.filter(result => {
        return getCodingItemsFromCodingDimensions([
          ...getSubDimensions(selectedDimension, codingDimenions),
          selectedDimension
        ])
          .map(item => item.id)
          .includes(result.itemId)
      })
    } else if (selectedCodingItem !== null) {
      return scenarioResults.filter(result => selectedCodingItem.id === result.itemId)
    } else {
      return scenarioResults
    }
  }

  const filteredResults = filterResults()

  const score = sumBy(filteredResults, result => result.score)
  const maxScore = sumBy(filteredResults, result => result.maximumScore)
  const averageScore = sumBy(filteredResults, result => result.averageScore)

  return (
    <DetailViewFooter
      showAverageScoreAsProgress={false}
      score={score}
      maxScore={maxScore}
      averageScore={averageScore}
      t={t}
    />
  )
}

const styles: Record<string, CSSInterpolation> = {
  cardContent: {
    flex: "1 1 0",
    padding: spacingMedium,
    boxSizing: "border-box",
    overflow: "auto"
  },
  cardFooter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch"
  }
}
