import {isEqual} from "lodash-es"
import * as React from "react"
import {IconName, RatingActionOption} from "../../../../../enums"
import {QuestionScoringType} from "../../../../../graphql/generated/globalTypes"
import {
  useAutomatedCodingCriteriaLazy,
  useCodingDimensionsLazy,
  useCreateScenarioCodingItemRating,
  useRatings
} from "../../../../../graphql/hooks"
import {useCodingCriteriaLazy} from "../../../../../graphql/hooks/queries/coding-models/use-coding-criteria-lazy"
import {
  AutomatedCodingCriterion,
  CodingCriterion,
  CodingDimension,
  CodingItem,
  Rating,
  Scenario,
  ScenarioCodingItemRating,
  ScenarioRatingCriterionSelection
} from "../../../../../models"
import {useLucaTranslation} from "../../../../../translations"
import {
  exists,
  find,
  flatten,
  isAutomatedCodingItem as checkIsAutomatedCodingItem,
  Option,
  sortByPosition
} from "../../../../../utils"
import {useCodingCriteriaByItemsList, useScenarioCodingItemsByRatingsList, useScenarioRatingScore} from "../../../hooks"
import {TableEntity} from "../../../models"
import {
  getCodingItemsFromCodingDimensions,
  getSelectedCodingCriteria,
  getSubDimensions,
  haveCodingItemsBeenRated
} from "../../../utils"
import {ScenarioRatingContext} from "../../detail/rating-detail-scenario/context"
import {useOverviewTableEntities} from "./use-overview-table-entities"

export interface UseRatingScenarioDetailViewHook {
  readonly dataLoading: boolean
  readonly selectedCodingDimension: Option<CodingDimension>
  readonly selectedCodingItem: Option<CodingItem>
  readonly label: string
  readonly description: string
  readonly isOverviewPage: boolean
  readonly isAutomatedCodingItem: boolean
  readonly score: number
  readonly maxScore: number
  readonly averageScore: number
  readonly backgroundIcon: Option<IconName>
  readonly overviewEntityName: string
  readonly overviewEntities: TableEntity[]
  readonly scenarioCodingItemRating: Option<ScenarioCodingItemRating>
  readonly codingCriteria: CodingCriterion[]
  readonly automatedCodingCriteria: AutomatedCodingCriterion[]
  readonly scoringType: QuestionScoringType
  readonly selectedRatingAction: RatingActionOption
  readonly setSelectedRatingAction: React.Dispatch<React.SetStateAction<RatingActionOption>>
  readonly refreshData: () => void
  readonly createScenarioCodingItemRatingLoading: boolean
  readonly isRatingInProgress: boolean
}

interface UseRatingScenarioDetailViewParams {
  readonly scenario: Scenario
  readonly selectedCodingEntityId?: UUID
  readonly ratingId: Option<UUID>
  readonly surveyInvitationId?: UUID
  readonly surveyId: UUID
  readonly showDataForAllParticipants: boolean
}

export const useRatingScenarioDetailView = ({
  scenario,
  selectedCodingEntityId,
  ratingId,
  surveyInvitationId,
  surveyId,
  showDataForAllParticipants
}: UseRatingScenarioDetailViewParams): UseRatingScenarioDetailViewHook => {
  const {t} = useLucaTranslation()

  const isMounted = React.useRef<boolean>(false)
  const selectedCodingDimensionRef = React.useRef<CodingDimension | null>(null)
  const ratingIdRef = React.useRef<UUID | null>(null)
  const scenarioCodingItemRatingRef = React.useRef<ScenarioCodingItemRating | null>(null)
  const criterionSelectionsRef = React.useRef<ScenarioRatingCriterionSelection[]>([])
  const allCriterionSelectionsRef = React.useRef<ScenarioRatingCriterionSelection[]>([])
  const codingDimensionsRef = React.useRef<CodingDimension[]>([])
  const scenarioCodingItemRatingListRef = React.useRef<ScenarioCodingItemRating[]>([])
  const selectedCodingItemRef = React.useRef<CodingItem | null>(null)
  const allScenarioCodingItemRatingsRef = React.useRef<ScenarioCodingItemRating[]>([])
  const ratingsRef = React.useRef<Rating[]>([])
  const allRatingsRef = React.useRef<Rating[]>([])
  const allCodingCriteriaRef = React.useRef<Array<CodingCriterion | AutomatedCodingCriterion>>([])

  if (!isEqual(ratingIdRef.current, ratingId.orNull())) {
    ratingIdRef.current = ratingId.orNull()
  }

  const {refreshRatingSubject} = React.useContext(ScenarioRatingContext)

  const [overviewEntities, setOverviewEntities] = React.useState<TableEntity[]>([])
  const [selectedRatingAction, setSelectedRatingAction] = React.useState<RatingActionOption>(RatingActionOption.None)

  const [selectedCodingDimension, setSelectedCodingDimension] = React.useState<Option<CodingDimension>>(Option.none())
  const [selectedCodingItem, setSelectedCodingItem] = React.useState<Option<CodingItem>>(Option.none())

  const [selectedCodingDimensionCodingCriteria, setSelectedCodingDimensionCodingCriteria] = React.useState<
    Array<CodingCriterion | AutomatedCodingCriterion>
  >([])
  const [selectedCodingItemCodingCriteria, setSelectedCodingItemCodingCriteria] = React.useState<
    Array<CodingCriterion | AutomatedCodingCriterion>
  >([])

  if (!isEqual(selectedCodingDimensionRef.current, selectedCodingDimension.orNull())) {
    selectedCodingDimensionRef.current = selectedCodingDimension.orNull()
  }

  if (!isEqual(selectedCodingItemRef.current, selectedCodingItem.orNull())) {
    selectedCodingItemRef.current = selectedCodingItem.orNull()
  }

  const {codingDimensions, codingDimensionsLoading, getCodingDimensions} = useCodingDimensionsLazy()
  const {codingCriteria, codingCriteriaLoading, getCodingCriteria} = useCodingCriteriaLazy()
  const {
    automatedCodingCriteria,
    automatedCodingCriteriaLoading,
    getAutomatedCodingCriteria
  } = useAutomatedCodingCriteriaLazy()
  const {
    codingCriteria: allCodingCriteria,
    codingCriteriaLoading: allCodingCriteriaLoading,
    getCodingCriteria: getAllCodingCriteria
  } = useCodingCriteriaByItemsList()

  if (!isEqual(allCodingCriteriaRef.current, allCodingCriteria)) {
    allCodingCriteriaRef.current = allCodingCriteria
  }

  const {createScenarioCodingItemRating, createScenarioCodingItemRatingLoading} = useCreateScenarioCodingItemRating()
  const {
    scenarioCodingItemRatings: allScenarioCodingItemRatingsByRatings,
    scenarioCodingItemRatingsLoading: allScenarioCodingItemRatingsByRatingsLoading,
    getScenarioCodingItemRatings: getAllScenarioCodingItemRatingsByRatings
  } = useScenarioCodingItemsByRatingsList()
  const {ratings: allRatings, ratingsLoading: allRatingsLoading} = useRatings(surveyId)

  const scenarioCodingItemRatings =
    ratingIdRef.current !== null
      ? getScenarioCodingItemRatingsForRating({
          scenarioCodingItemRatings: allScenarioCodingItemRatingsByRatings,
          ratingId: ratingIdRef.current
        })
      : []

  if (!isEqual(scenarioCodingItemRatingListRef.current, scenarioCodingItemRatings)) {
    scenarioCodingItemRatingListRef.current = scenarioCodingItemRatings
  }

  if (!isEqual(allRatingsRef.current, allRatings)) {
    allRatingsRef.current = allRatings
  }

  const ratingOption = ratingId.flatMap(id => find(entry => entry.id === id, allRatings))
  const ratings = ratingOption.map(rating => [rating]).getOrElse([])

  if (!isEqual(ratingsRef.current, ratings)) {
    ratingsRef.current = ratings
  }

  const scenarioCodingItemRating = React.useMemo(
    () =>
      find(
        scenarioCodingItemRating =>
          scenarioCodingItemRating.surveyInvitationId === surveyInvitationId &&
          scenarioCodingItemRating.ratingId === ratingIdRef.current &&
          scenarioCodingItemRating.codingItemId === selectedCodingItemRef.current?.id,
        scenarioCodingItemRatingListRef.current
      ),
    [ratingIdRef.current, selectedCodingItemRef.current, scenarioCodingItemRatingListRef.current, surveyInvitationId]
  )

  if (!isEqual(scenarioCodingItemRatingRef.current, scenarioCodingItemRating.orNull())) {
    scenarioCodingItemRatingRef.current = scenarioCodingItemRating.orNull()
  }

  if (!isEqual(codingDimensionsRef.current, codingDimensions)) {
    codingDimensionsRef.current = codingDimensions
  }

  const allScenarioCodingItemRatings =
    selectedCodingItemRef.current === null
      ? scenarioCodingItemRatingListRef.current
      : scenarioCodingItemRatingRef.current !== null
      ? [scenarioCodingItemRatingRef.current]
      : []

  if (!isEqual(allScenarioCodingItemRatingsRef.current, allScenarioCodingItemRatings)) {
    allScenarioCodingItemRatingsRef.current = allScenarioCodingItemRatings
  }

  const allCriterionSelections = allScenarioCodingItemRatingsByRatings.flatMap(entry => entry.criterionSelections)
  const criterionSelections = allScenarioCodingItemRatingsRef.current.flatMap(entry => entry.criterionSelections)

  const criterionSelectionsForParticipant = allScenarioCodingItemRatingsRef.current
    .filter(rating => rating.surveyInvitationId === surveyInvitationId)
    .flatMap(entry => entry.criterionSelections)

  if (!isEqual(criterionSelectionsRef.current, criterionSelections)) {
    criterionSelectionsRef.current = criterionSelections
  }

  if (!isEqual(allCriterionSelectionsRef.current, allCriterionSelections)) {
    allCriterionSelectionsRef.current = allCriterionSelections
  }

  const {convertCodingDimensions, convertCodingItems} = useOverviewTableEntities(codingDimensionsRef.current)

  const codingItems = React.useMemo(() => getCodingItemsFromCodingDimensions(codingDimensionsRef.current), [
    codingDimensionsRef.current
  ])

  const mainDimensions = React.useMemo(
    () => codingDimensionsRef.current.filter(codingDimension => codingDimension.parentDimensionId === null),
    [codingDimensionsRef.current]
  )

  const subDimensions = React.useMemo(
    () =>
      !selectedCodingDimensionRef.current
        ? []
        : getSubDimensions(selectedCodingDimensionRef.current, codingDimensionsRef.current),
    [selectedCodingDimensionRef.current, codingDimensionsRef.current]
  )

  const label =
    selectedCodingDimension
      .map<string | null>(({title}) => title)
      .getOrElse(selectedCodingItem.map(({title}) => title).orNull()) ?? scenario.name
  const description =
    selectedCodingDimension
      .map<string | null>(({description}) => description)
      .getOrElse(selectedCodingItem.map(({description}) => description).orNull()) ?? scenario.description

  const isOverviewPage = selectedCodingItem.isEmpty()
  const isAutomatedCodingItem = selectedCodingItem.exists(checkIsAutomatedCodingItem)
  const scoringType = selectedCodingItem
    .map(({scoringType}) => (scoringType as unknown) as QuestionScoringType)
    .getOrElse(QuestionScoringType.None)

  const {score, maxScore, averageScore} = useScenarioRatingScore({
    codingCriteria: selectedCodingDimension
      .map(() => selectedCodingDimensionCodingCriteria)
      .orElse(selectedCodingItem.map(() => selectedCodingItemCodingCriteria))
      .getOrElse(allCodingCriteria),
    criterionSelections,
    codingItems: selectedCodingDimension
      .map(codingDimension =>
        !codingDimension.parentDimensionId && !codingDimension.items.length
          ? getCodingItemsFromCodingDimensions(subDimensions)
          : codingDimension.items
      )
      .getOrElse(selectedCodingItem.map(codingItem => [codingItem]).getOrElse(codingItems)),
    allCriterionSelections,
    scenarioCodingItemRatings: scenarioCodingItemRatingListRef.current,
    averageScoreForAllParticipants: showDataForAllParticipants,
    selectedSurveyInvitationId: surveyInvitationId
  })

  const backgroundIcon = selectedCodingItem.map<IconName>(() =>
    !isAutomatedCodingItem ? IconName.MouseLined : IconName.Gear
  )

  const overviewEntityName = selectedCodingDimension
    .map(codingDimension =>
      !codingDimension.parentDimensionId && !codingDimension.items.length
        ? `${t("rating_scenario__dimensions_label")} (${subDimensions.length})`
        : `${t("rating_scenario__items_label")} (${codingDimension.items.length})`
    )
    .getOrElse(`${t("rating_scenario__main_dimensions_label")} (${mainDimensions.length})`)

  const isRatingFinished = React.useMemo(
    () =>
      selectedCodingDimensionRef.current !== null
        ? haveCodingItemsBeenRated({
            scenarioCodingItemRatings: scenarioCodingItemRatingListRef.current,
            codingItems: getCodingItemsFromCodingDimensions([selectedCodingDimensionRef.current]),
            codingCriteria: allCodingCriteria,
            criterionSelections: criterionSelectionsRef.current,
            ratings: ratingsRef.current
          })
        : selectedCodingItemRef.current !== null
        ? haveCodingItemsBeenRated({
            scenarioCodingItemRatings: scenarioCodingItemRatingListRef.current,
            codingItems: [selectedCodingItemRef.current],
            codingCriteria: isAutomatedCodingItem ? automatedCodingCriteria : codingCriteria,
            criterionSelections: criterionSelectionsRef.current,
            ratings: ratingsRef.current
          })
        : haveCodingItemsBeenRated({
            scenarioCodingItemRatings: scenarioCodingItemRatingListRef.current,
            codingItems,
            codingCriteria: allCodingCriteria,
            criterionSelections: criterionSelectionsRef.current,
            ratings: ratingsRef.current
          }),
    [
      allCodingCriteria,
      criterionSelectionsRef.current,
      selectedCodingDimensionRef.current,
      selectedCodingItemRef.current,
      isAutomatedCodingItem,
      automatedCodingCriteria,
      codingCriteria,
      codingItems,
      scenarioCodingItemRatingListRef.current,
      ratingsRef.current
    ]
  )

  const refreshData = () => {
    refreshRatingSubject?.next()

    getAllScenarioCodingItemRatingsByRatings(allRatings, "network-only")

    if (scenario.codingModel?.id !== undefined) {
      getCodingDimensions(scenario.codingModel.id, "network-only")
    }
  }

  const prevScenario = React.useRef<Scenario>()
  React.useEffect(() => {
    const hasScenarioChanged = prevScenario.current?.id !== scenario.id
    const hasCodingModelChanged = prevScenario.current?.codingModel?.id !== scenario.codingModel?.id
    const haveDimensionsChanged =
      prevScenario.current?.codingModel?.dimensionsCount !== scenario.codingModel?.dimensionsCount

    if (scenario.codingModel && (hasScenarioChanged || hasCodingModelChanged || haveDimensionsChanged)) {
      getCodingDimensions(scenario.codingModel.id)
    }
    prevScenario.current = scenario
  }, [scenario, prevScenario])

  React.useEffect(() => {
    if (codingCriteriaLoading || automatedCodingCriteriaLoading || !selectedCodingItemRef.current) {
      return
    }

    if (isAutomatedCodingItem) {
      getAutomatedCodingCriteria(selectedCodingItemRef.current.id)
      return
    }
    getCodingCriteria(selectedCodingItemRef.current.id)
  }, [selectedCodingItemRef.current, codingCriteriaLoading, automatedCodingCriteriaLoading])

  React.useEffect(() => {
    if (codingDimensionsLoading) {
      return
    }
    if (selectedCodingDimension.isEmpty() && selectedCodingItem.isEmpty() && codingItems.length > 0) {
      getAllCodingCriteria({items: codingItems})
      return
    }
    selectedCodingDimension.forEach(codingDimension => {
      const items = getCodingItemsFromCodingDimensions([codingDimension])
      getAllCodingCriteria({items})
    })
  }, [selectedCodingDimension.orNull(), selectedCodingItem.orNull(), codingItems, codingDimensionsLoading])

  // use layoutEffect here to make sure overviewEntities are set correctly
  React.useLayoutEffect(() => {
    const allSelectedCodingCriteria = getSelectedCodingCriteria(
      allCodingCriteriaRef.current,
      allCriterionSelectionsRef.current
    )

    if (
      (selectedCodingDimensionRef.current === null || selectedCodingDimensionRef.current === undefined) &&
      (selectedCodingItemRef.current === null || selectedCodingItemRef.current === undefined) &&
      codingDimensionsRef.current.length > 0
    ) {
      convertCodingDimensions(
        allScenarioCodingItemRatingsRef.current,
        criterionSelectionsForParticipant,
        mainDimensions,
        allSelectedCodingCriteria
      ).then(entities => isMounted.current && setOverviewEntities(entities))
      return
    }

    if (selectedCodingDimensionRef.current !== null) {
      if (!selectedCodingDimensionRef.current.parentDimensionId && !selectedCodingDimensionRef.current.items.length) {
        convertCodingDimensions(
          allScenarioCodingItemRatingsRef.current,
          criterionSelectionsForParticipant,
          subDimensions,
          allSelectedCodingCriteria
        ).then(entities => isMounted.current && setOverviewEntities(entities))
      } else {
        convertCodingItems(
          allScenarioCodingItemRatingsRef.current,
          criterionSelectionsForParticipant,
          selectedCodingDimensionRef.current.items,
          allSelectedCodingCriteria
        ).then(entities => isMounted.current && setOverviewEntities(entities))
      }
    }

    if (selectedCodingItemRef.current !== null) {
      convertCodingItems(
        allScenarioCodingItemRatingsRef.current,
        criterionSelectionsForParticipant,
        [selectedCodingItemRef.current],
        allSelectedCodingCriteria
      ).then(entities => isMounted.current && setOverviewEntities(entities))
    }
  }, [
    selectedCodingDimensionRef.current,
    selectedCodingItemRef.current,
    codingItems,
    subDimensions,
    criterionSelectionsRef.current,
    mainDimensions,
    codingDimensionsRef.current,
    allScenarioCodingItemRatingsRef.current,
    allCodingCriteriaRef.current,
    allCriterionSelectionsRef.current,
    surveyInvitationId
  ])

  const prevSelectedCodingEntityId = React.useRef<UUID>()
  const prevCodingDimensions = React.useRef<CodingDimension[]>()
  const prevCodingItems = React.useRef<CodingItem[]>()
  React.useEffect(() => {
    if (
      prevSelectedCodingEntityId.current === selectedCodingEntityId &&
      isEqual(prevCodingDimensions.current, codingDimensions) &&
      isEqual(prevCodingItems.current, codingItems)
    ) {
      return
    }
    prevSelectedCodingEntityId.current = selectedCodingEntityId
    prevCodingDimensions.current = codingDimensions
    prevCodingItems.current = codingItems

    if (!selectedCodingEntityId) {
      setSelectedCodingDimension(Option.none())
      setSelectedCodingItem(Option.none())
      return
    }

    const codingDimension = find(({id}) => id === selectedCodingEntityId, codingDimensions)
    setSelectedCodingDimension(codingDimension)
    setSelectedCodingItem(
      codingDimension.isEmpty() ? find(({id}) => id === selectedCodingEntityId, codingItems) : Option.none()
    )
  }, [
    selectedCodingDimension.orNull(),
    selectedCodingItem.orNull(),
    codingDimensions,
    codingItems,
    selectedCodingEntityId
  ])

  React.useEffect(() => {
    if (ratingIdRef.current !== null) {
      getAllScenarioCodingItemRatingsByRatings(allRatingsRef.current).then(result => {
        const scenarioCodingItemRatings = getScenarioCodingItemRatingsForRating({
          scenarioCodingItemRatings: result,
          ratingId: `${ratingIdRef.current}`
        })

        if (
          selectedCodingItemRef.current !== null &&
          surveyInvitationId !== undefined &&
          !exists(
            scenarioCodingItemRating =>
              scenarioCodingItemRating.surveyInvitationId === surveyInvitationId &&
              scenarioCodingItemRating.ratingId === ratingIdRef.current &&
              scenarioCodingItemRating.codingItemId === selectedCodingItemRef.current?.id,
            scenarioCodingItemRatings
          )
        ) {
          createScenarioCodingItemRating({
            ratingId: `${ratingIdRef.current}`,
            surveyInvitationId,
            codingItemId: `${selectedCodingItemRef.current?.id}`,
            noCriterionFulfilled: false
          }).then(() => {
            if (ratingIdRef.current !== null) {
              getAllScenarioCodingItemRatingsByRatings(allRatingsRef.current, "network-only")
            }
          })
        }
      })
    }
  }, [ratingIdRef.current, selectedCodingItemRef.current, allRatingsRef.current])

  React.useEffect(() => {
    if (selectedCodingDimensionRef.current !== null) {
      const subDimensions = getSubDimensions(selectedCodingDimensionRef.current, codingDimensionsRef.current)
      const items =
        selectedCodingDimensionRef.current.items.length > 0
          ? selectedCodingDimensionRef.current.items
          : getCodingItemsFromCodingDimensions(subDimensions)

      getAllCodingCriteria({items, onSuccess: criteria => setSelectedCodingDimensionCodingCriteria(criteria)})
    }
  }, [selectedCodingDimensionRef.current, codingDimensionsRef.current])

  React.useEffect(() => {
    if (selectedCodingItemRef.current !== null) {
      getAllCodingCriteria({
        items: [selectedCodingItemRef.current],
        onSuccess: criteria => setSelectedCodingItemCodingCriteria(criteria)
      })
    }
  }, [selectedCodingItemRef.current])

  React.useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return {
    dataLoading:
      allCodingCriteriaLoading ||
      codingCriteriaLoading ||
      codingDimensionsLoading ||
      allScenarioCodingItemRatingsByRatingsLoading ||
      automatedCodingCriteriaLoading ||
      allRatingsLoading,
    selectedCodingDimension,
    selectedCodingItem,
    label,
    description,
    isOverviewPage,
    isAutomatedCodingItem,
    score,
    maxScore,
    averageScore,
    backgroundIcon,
    overviewEntityName,
    overviewEntities: sortByPosition(overviewEntities),
    scenarioCodingItemRating,
    codingCriteria,
    automatedCodingCriteria,
    scoringType,
    selectedRatingAction,
    setSelectedRatingAction,
    refreshData,
    createScenarioCodingItemRatingLoading,
    isRatingInProgress: !isRatingFinished
  }
}

const getScenarioCodingItemRatingsForRating = ({
  scenarioCodingItemRatings,
  ratingId
}: {
  readonly scenarioCodingItemRatings: ScenarioCodingItemRating[]
  readonly ratingId: UUID
}) => scenarioCodingItemRatings.filter(scenarioCodingItemRating => scenarioCodingItemRating.ratingId === ratingId)
