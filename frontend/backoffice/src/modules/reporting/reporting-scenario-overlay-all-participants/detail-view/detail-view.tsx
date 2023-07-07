import {CSSInterpolation} from "@emotion/serialize"
import {sumBy} from "lodash-es"
import * as React from "react"
import {Card, CardContent, CardFooter, CardHeader, DetailViewFooter, Icon, Text} from "shared/components"
import {TableEntity} from "shared/components/rating/models"
import {getCodingItemsFromCodingDimensions, getSubDimensions} from "shared/components/rating/utils"
import {IconName} from "shared/enums"
import {
  CodingDimension,
  CodingItem,
  CodingItemResultByItemId,
  CodingItemResultsByItemId,
  CodingModel,
  ScenarioSurveyResultsForParticipant
} from "shared/models"
import {CustomStyle, spacingMedium, TextSize} from "shared/styles"
import {LucaTFunction} from "shared/translations"
import {first, isEmpty, Option} from "shared/utils"
import {CommonDetailView} from "./common-detail-view"
import {ItemDetailViewContainer} from "./item-detail-view-container"
import {dimensionToTableEntity, itemToTableEntity} from "./utils"

export interface Props extends CustomStyle {
  readonly t: LucaTFunction
  readonly codingDimensions: CodingDimension[]
  readonly codingModel: CodingModel
  readonly codingItemResultsByItem: CodingItemResultsByItemId
  readonly participantsCount: number
  readonly selectedNodeId: Option<UUID>
  readonly updateSelectedNodeId: (nodeId: UUID) => void
  readonly scenarioSurveyResultsForParticipants: ScenarioSurveyResultsForParticipant[]
}

export const DetailView: React.FC<Props> = props => {
  const {
    t,
    customStyles,
    selectedNodeId,
    codingDimensions,
    updateSelectedNodeId,
    codingModel,
    codingItemResultsByItem,
    participantsCount,
    scenarioSurveyResultsForParticipants
  } = props

  const items = getCodingItemsFromCodingDimensions(codingDimensions)
  const selectedItem = selectedNodeId.flatMap(id => Option.of(items.find(item => item.id === id))).orNull()
  const selectedDimension = selectedNodeId
    .flatMap(id => Option.of(codingDimensions.find(dimension => dimension.id === id)))
    .orNull()

  const firstResultForAverageScores = first(scenarioSurveyResultsForParticipants).orUndefined()?.codingItemResults
  const firstResultGroupedByItemId = firstResultForAverageScores?.reduce<CodingItemResultByItemId>(
    (results, current) => ({...results, [current.itemId]: current}),
    {}
  )

  const content = () => {
    if (selectedItem !== null) {
      return (
        <ItemDetailViewContainer
          participantsCount={participantsCount}
          t={t}
          item={selectedItem}
          itemResults={codingItemResultsByItem[selectedItem.id]}
        />
      )
    } else if (selectedDimension !== null) {
      if (selectedDimension.parentDimensionId === null) {
        // Maindimension
        const subdimensions = getSubDimensions(selectedDimension, codingDimensions)
        const hasNoSubdimensions = isEmpty(subdimensions)
        let entities = []

        if (hasNoSubdimensions) {
          entities = selectedDimension.items.map(item => itemToTableEntity(item, codingItemResultsByItem))
        } else {
          entities = subdimensions.map(dimension =>
            dimensionToTableEntity(dimension, dimension.items, codingItemResultsByItem)
          )
        }

        return (
          <CommonDetailView
            t={t}
            onClick={updateSelectedNodeId}
            entities={entities}
            description={selectedDimension.description}
            title={selectedDimension.title}
            showAverageScore={true}
            customScoringKey={"rating__average_score_achieved"}
            entityLabelKey={
              hasNoSubdimensions ? "coding_models__detail_items_label" : "coding_models__detail_sub_dimension_label"
            }
          />
        )
      } else {
        // Subdimension
        const entities: TableEntity[] = selectedDimension.items.map(item =>
          itemToTableEntity(item, codingItemResultsByItem)
        )

        return (
          <CommonDetailView
            t={t}
            onClick={updateSelectedNodeId}
            entities={entities}
            showAverageScore={true}
            description={selectedDimension.description}
            title={selectedDimension.title}
            entityLabelKey="coding_models__detail_items_label"
          />
        )
      }
    } else {
      // Overview
      const mainDimensions = codingDimensions.filter(dimension => dimension.parentDimensionId === null)
      const entities = mainDimensions.map(dimension => {
        const subdimensions = getSubDimensions(dimension, codingDimensions)
        const allItemsOfMainDimension = getCodingItemsFromCodingDimensions([...subdimensions, dimension])
        return dimensionToTableEntity(dimension, allItemsOfMainDimension, codingItemResultsByItem)
      })

      return (
        <CommonDetailView
          t={t}
          onClick={updateSelectedNodeId}
          entities={entities}
          showAverageScore={true}
          customScoringKey={"rating__average_score_achieved"}
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
        <Text size={TextSize.Medium}>
          {t("reporting_scoring__scenario_details_header", {count: participantsCount})}
        </Text>
      </CardHeader>
      <CardContent customStyles={styles.cardContent}>{content()}</CardContent>
      <CardFooter customStyles={styles.cardFooter}>
        {firstResultGroupedByItemId &&
          scenarioFooter(t, firstResultGroupedByItemId, selectedDimension, selectedItem, codingDimensions)}
      </CardFooter>
    </Card>
  )
}

const scenarioFooter = (
  t: LucaTFunction,
  codingItemResultByItem: CodingItemResultByItemId,
  selectedDimension: CodingDimension | null,
  selectedCodingItem: CodingItem | null,
  codingDimenions: CodingDimension[]
) => {
  const scenarioResults = Object.values(codingItemResultByItem)

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
      showAverageScoreAsProgress={true}
      score={score}
      customLabelKey="rating__rating__rating_global_achieved_score"
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
