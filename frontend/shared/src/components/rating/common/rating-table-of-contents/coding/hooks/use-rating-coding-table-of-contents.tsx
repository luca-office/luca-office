import {isEqual} from "lodash-es"
import React from "react"
import {NodeType} from "../../../../../../enums"
import {useRatings} from "../../../../../../graphql/hooks"
import {
  AutomatedCodingCriterion,
  CodingCriterion,
  CodingDimension,
  CodingItem,
  CodingNode,
  Rating,
  ScenarioCodingItemRating
} from "../../../../../../models"
import {exists, find, flatten, Option, roundNumber, sortByPosition, Subject, toPercent} from "../../../../../../utils"
import {buildCodingModelTree} from "../../../../../../utils/scenario-coding-model"
import {
  useCodingCriteriaByItemsList,
  useScenarioCodingItemsByRatingsList,
  useScenarioRatingScore
} from "../../../../hooks"
import {ScenarioCriterionSelection} from "../../../../models"
import {ScenarioRatingContext} from "../../../../scenario/detail/rating-detail-scenario/context"
import {
  getAverageScore,
  getAverageScoreForAllParticipants,
  getCodingItemsFromCodingDimensions,
  getMaxScoreOfAllCodingItems,
  getSelectedCodingCriteria,
  getSubDimensions,
  haveCodingItemsBeenRated
} from "../../../../utils"

interface EntityScores {
  readonly maxScore: number
  readonly averageScore: number
}

export interface UseRatingCodingTableOfContentsHook {
  readonly loading: boolean
  readonly codingNodes: CodingNode[]
  readonly scenarioPercentageRated: number
  readonly getPercentageRatedForCodingDimensionNode: (node: CodingNode) => number
  readonly getPercentageRatedForCodingItemNode: (node: CodingNode) => number
  readonly allRated: boolean
  readonly score: number
  readonly maxScore: number
  readonly averageScore: number
  readonly getScoresForCodingDimension: (codingDimensionId: UUID) => EntityScores
  readonly getScoresForCodingItem: (codingItemId: UUID) => EntityScores
}

interface UseRatingCodingTableOfContentsParams {
  readonly surveyInvitationId?: UUID
  readonly codingDimensions: CodingDimension[]
  readonly ratingId: Option<UUID>
  readonly surveyId: UUID
  readonly showDataForAllParticipants: boolean
}

export const useRatingCodingTableOfContents = ({
  surveyInvitationId,
  codingDimensions,
  ratingId,
  surveyId,
  showDataForAllParticipants
}: UseRatingCodingTableOfContentsParams): UseRatingCodingTableOfContentsHook => {
  const allCodingItemsRef = React.useRef<CodingItem[]>([])
  const criterionSelectionsRef = React.useRef<ScenarioCriterionSelection[]>([])
  const codingCriteriaRef = React.useRef<Array<CodingCriterion | AutomatedCodingCriterion>>([])
  const refreshRatingSubjectRef = React.useRef<Subject<void>>()
  const refreshRatingSubjectListenerIdRef = React.useRef<UUID>()
  const ratingIdRef = React.useRef<UUID | null>(null)
  const scenarioCodingItemRatingsRef = React.useRef<ScenarioCodingItemRating[]>([])
  const ratingsRef = React.useRef<Rating[]>([])

  const {refreshRatingSubject} = React.useContext(ScenarioRatingContext)

  if (!isEqual(refreshRatingSubjectRef.current, refreshRatingSubject)) {
    refreshRatingSubjectRef.current = refreshRatingSubject
  }

  if (!isEqual(ratingIdRef.current, ratingId.orNull())) {
    ratingIdRef.current = ratingId.orNull()
  }

  const {codingCriteria, codingCriteriaLoading, getCodingCriteria} = useCodingCriteriaByItemsList()
  const {ratings, ratingsLoading} = useRatings(surveyId)

  const finalRatings = ratings.filter(rating => rating.isFinalScore)
  const allCodingItems = React.useMemo(() => getCodingItemsFromCodingDimensions(codingDimensions), [codingDimensions])
  const ratingOption = ratingId.flatMap(id => find(entry => entry.id === id, ratings))

  if (!isEqual(allCodingItemsRef.current, allCodingItems)) {
    allCodingItemsRef.current = allCodingItems
  }

  if (!isEqual(codingCriteriaRef.current, codingCriteria)) {
    codingCriteriaRef.current = codingCriteria
  }

  if (!isEqual(ratingsRef.current, ratings)) {
    ratingsRef.current = ratings
  }

  React.useEffect(() => {
    if (allCodingItemsRef.current.length > 0) {
      getCodingCriteria({items: allCodingItems})
    }
  }, [allCodingItemsRef.current])

  const {
    scenarioCodingItemRatings: allScenarioCodingItemRatingsByRatings,
    scenarioCodingItemRatingsLoading: allScenarioCodingItemRatingsByRatingsLoading,
    getScenarioCodingItemRatings: getAllScenarioCodingItemRatingsByRatings
  } = useScenarioCodingItemsByRatingsList()

  const scenarioCodingItemRatings =
    ratingIdRef.current !== null
      ? allScenarioCodingItemRatingsByRatings.filter(
          scenarioCodingItemRating => scenarioCodingItemRating.ratingId === ratingIdRef.current
        )
      : []

  if (!isEqual(scenarioCodingItemRatingsRef.current, scenarioCodingItemRatings)) {
    scenarioCodingItemRatingsRef.current = scenarioCodingItemRatings
  }

  const scenarioRatingsForParticipant = React.useMemo(
    () =>
      scenarioCodingItemRatingsRef.current.filter(
        scenarioRating => scenarioRating.surveyInvitationId === surveyInvitationId
      ),
    [scenarioCodingItemRatingsRef.current, surveyInvitationId]
  )

  const allCriterionSelections = flatten(allScenarioCodingItemRatingsByRatings.map(entry => entry.criterionSelections))
  const criterionSelections = flatten(scenarioRatingsForParticipant.map(rating => rating.criterionSelections))

  if (!isEqual(criterionSelectionsRef.current, criterionSelections)) {
    criterionSelectionsRef.current = criterionSelections
  }

  const {score, maxScore, averageScore} = useScenarioRatingScore({
    codingCriteria: codingCriteriaRef.current,
    criterionSelections: criterionSelectionsRef.current,
    codingItems: allCodingItemsRef.current,
    allCriterionSelections,
    scenarioCodingItemRatings,
    averageScoreForAllParticipants: showDataForAllParticipants,
    selectedSurveyInvitationId: surveyInvitationId
  })

  const codingNodes = sortByPosition(codingDimensions)
    .filter(dimension => dimension.parentDimensionId === null)
    .map((parentDimension, index) =>
      buildCodingModelTree({
        parentDimension,
        allDimensions: codingDimensions,
        mainDimensionIndex: index,
        allCodingCriteria: codingCriteria,
        criterionSelections,
        scenarioCodingItemRatings: scenarioRatingsForParticipant,
        ratings: showDataForAllParticipants ? finalRatings : ratingOption.map(rating => [rating]).getOrElse([])
      })
    )

  const getNodeItems = (node: CodingNode): CodingNode[] => {
    if (node.type === NodeType.CodingModelMainDimension) {
      const subDimensions = node.children?.filter(({type}) => type === NodeType.CodingModelSubDimension) ?? []
      const items =
        node.children?.filter(
          ({type}) => type === NodeType.CodingModelManualItem || type === NodeType.CodingModelAutomatedItem
        ) ?? []
      return items.length > 0 ? items : subDimensions.flatMap(getNodeItems)
    }
    return node.children ?? []
  }

  const getPercentageRatedForCodingDimensionNode = (node: CodingNode) => {
    const items = getNodeItems(node)
    const itemLength = items.length

    // empty dimensions count as completely evaluated
    if (itemLength === 0) {
      return 100
    }

    if (!showDataForAllParticipants) {
      const ratedItemsLength = items.filter(item => !!item.isRated).length ?? 0
      return toPercent(ratedItemsLength, itemLength)
    }

    const codingItems = allCodingItems.filter(codingItem => exists(item => codingItem.id === item.id, items))
    const finishedRatings = finalRatings.filter(rating =>
      haveCodingItemsBeenRated({
        scenarioCodingItemRatings: allScenarioCodingItemRatingsByRatings,
        codingItems,
        codingCriteria: codingCriteria.filter(codingCriterion =>
          exists(codingItem => codingCriterion.itemId === codingItem.id, codingItems)
        ),
        criterionSelections: allCriterionSelections,
        ratings: [rating]
      })
    )
    return finalRatings.length > 0 ? roundNumber((finishedRatings.length / finalRatings.length) * 100) : 0
  }

  const getPercentageRatedForCodingItemNode = (node: CodingNode) => {
    const codingItem = find(codingItem => codingItem.id === node.id, allCodingItems)
    const finishedRatings = codingItem
      .map(item =>
        finalRatings.filter(rating =>
          haveCodingItemsBeenRated({
            scenarioCodingItemRatings: allScenarioCodingItemRatingsByRatings,
            codingItems: [item],
            codingCriteria: codingCriteria.filter(codingCriterion => codingCriterion.itemId === item.id),
            criterionSelections: allCriterionSelections,
            ratings: [rating]
          })
        )
      )
      .getOrElse([])

    return showDataForAllParticipants
      ? finalRatings.length > 0
        ? roundNumber((finishedRatings.length / finalRatings.length) * 100)
        : 0
      : node.isRated
      ? 100
      : 0
  }

  const allRated = React.useMemo(
    () =>
      !exists(
        node =>
          node.type !== NodeType.CodingModelAutomatedItem && node.type !== NodeType.CodingModelManualItem
            ? getPercentageRatedForCodingDimensionNode(node) !== 100
            : !node.isRated,
        codingNodes
      ),
    [codingNodes]
  )

  const allCodingItemNodes = codingNodes.flatMap(node => (!node.parentId ? getNodeItems(node) : node.children) ?? [])
  const ratedItems = allCodingItemNodes.filter(item => !!item.isRated)
  const scenarioPercentageRated = showDataForAllParticipants
    ? maxScore > 0
      ? roundNumber((averageScore / maxScore) * 100)
      : 0
    : toPercent(ratedItems.length, allCodingItemNodes.length)

  const allSelectedCodingCriteria = getSelectedCodingCriteria(codingCriteria, allCriterionSelections)

  const getScoresForCodingDimension = (codingDimensionId: UUID): EntityScores =>
    find(({id}) => id === codingDimensionId, codingDimensions)
      .map(codingDimension => {
        const subDimensions = getSubDimensions(codingDimension, codingDimensions)
        const items = getCodingItemsFromCodingDimensions([codingDimension, ...subDimensions])

        return {
          maxScore: getMaxScoreOfAllCodingItems(items),
          averageScore: showDataForAllParticipants
            ? getAverageScoreForAllParticipants({
                allSelectedCodingCriteria,
                codingItems: items,
                scenarioCodingItemRatings: scenarioCodingItemRatings
              })
            : getAverageScore({
                allSelectedCodingCriteria,
                codingItems: items
              })
        }
      })
      .getOrElse({maxScore: 0, averageScore: 0})

  const getScoresForCodingItem = (codingItemId: UUID): EntityScores =>
    find(({id}) => id === codingItemId, allCodingItems)
      .map(codingItem => {
        return {
          maxScore: codingItem.maximumScore,
          averageScore: showDataForAllParticipants
            ? getAverageScoreForAllParticipants({
                allSelectedCodingCriteria,
                codingItems: [codingItem],
                scenarioCodingItemRatings: scenarioCodingItemRatings
              })
            : getAverageScore({
                allSelectedCodingCriteria,
                codingItems: [codingItem]
              })
        }
      })
      .getOrElse({maxScore: 0, averageScore: 0})

  React.useEffect(() => {
    getAllScenarioCodingItemRatingsByRatings(ratingsRef.current, "network-only")
  }, [ratingsRef.current])

  React.useEffect(() => {
    const listenerId = refreshRatingSubjectRef.current?.subscribe(() => {
      getAllScenarioCodingItemRatingsByRatings(ratings, "network-only")
      getCodingCriteria({items: allCodingItems, fetchPolicy: "network-only"})
    })

    if (
      refreshRatingSubjectListenerIdRef.current !== undefined &&
      refreshRatingSubjectListenerIdRef.current !== listenerId
    ) {
      refreshRatingSubjectRef.current?.unsubscribe(refreshRatingSubjectListenerIdRef.current)
    }
    refreshRatingSubjectListenerIdRef.current = listenerId

    return () => {
      if (refreshRatingSubjectListenerIdRef.current !== undefined) {
        refreshRatingSubjectRef.current?.unsubscribe(refreshRatingSubjectListenerIdRef.current)
      }
    }
  }, [refreshRatingSubjectRef.current])

  return {
    loading: codingCriteriaLoading || allScenarioCodingItemRatingsByRatingsLoading || ratingsLoading,
    codingNodes,
    scenarioPercentageRated,
    getPercentageRatedForCodingDimensionNode,
    getPercentageRatedForCodingItemNode,
    allRated,
    score,
    maxScore,
    averageScore,
    getScoresForCodingDimension,
    getScoresForCodingItem
  }
}
