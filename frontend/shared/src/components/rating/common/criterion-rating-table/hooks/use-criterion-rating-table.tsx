import {useApolloClient} from "@apollo/client"
import {isEqual, uniq} from "lodash-es"
import * as React from "react"
import {IconName, RaterMode} from "../../../../../enums"
import {QuestionScoringType} from "../../../../../graphql/generated/globalTypes"
import {useCheckLogin, useSurveyUserAccounts} from "../../../../../graphql/hooks"
import {
  AutomatedCodingCriterion,
  CodingCriterion,
  CodingItem,
  FreetextQuestionCriterionSelection,
  FreetextQuestionRating,
  Rating,
  ScenarioCodingItemRating,
  UserAccount
} from "../../../../../models"
import {useLucaTranslation} from "../../../../../translations"
import {
  every,
  exists,
  flatten,
  getAutomatedCodingCriterionDescriptionData,
  isAutomatedCodingCriterion,
  isAutomatedCodingItem as checkIsAutomatedCodingItem,
  isDefined,
  Option
} from "../../../../../utils"
import {ColumnProps} from "../../../../table/table"
import {getCriterionRatingTableColumns} from "../../../config"
import {useFreetextQuestionRatingsByRatingsList, useRatings, useScenarioCodingItemsByRatingsList} from "../../../hooks"
import {CriterionMetadata, RatingCodingCriterion} from "../../../models"
import {haveCodingItemsBeenRated} from "../../../utils"

export interface UseCriterionRatingTableHook {
  readonly dataLoading: boolean
  readonly isFinalRater: boolean
  readonly sortedEntities: (RatingCodingCriterion & CriterionMetadata)[]
  readonly showNoCriterionFulfilledFooter: boolean
  readonly finishedRatersCount: number
  readonly totalRatersCount: number
  readonly noCriterionFulfilledCount: number
  readonly columns: ColumnProps<RatingCodingCriterion & CriterionMetadata>[]
  readonly showAutomatedCodingItemRuleField: boolean
  readonly isComputerRater: boolean
  readonly showAdditionalRaterInfos: boolean
  readonly participantsCount: number
}

export interface UseCriterionRatingTableParams {
  readonly criteria: RatingCodingCriterion[]
  readonly scoringType: QuestionScoringType
  readonly setNoCriterionFulfilled?: () => void
  readonly scoringTypeIcon?: IconName
  readonly isSelected: (criterion: RatingCodingCriterion) => boolean
  readonly isComputerRaterSelection?: (criterion: RatingCodingCriterion) => boolean
  readonly readOnly: boolean
  readonly mode: RaterMode
  readonly surveyId: UUID
  readonly isScenario: boolean
  readonly codingItem?: CodingItem
  readonly useRadioButtonForHolisticScoringType?: boolean
  readonly showSelectionInputsWhileReadonly?: boolean
  readonly showSelectionInput: boolean
  readonly useOnlyFinalScores?: boolean
  readonly showRaterCount: boolean
  readonly showRaterPercentage?: boolean
  readonly showDataForAllParticipants: boolean
  readonly selectedQuestionId?: UUID
  readonly selectedSurveyInvitationIdForFinalRating?: UUID
}

export const useCriterionRatingTable = ({
  criteria,
  scoringType,
  setNoCriterionFulfilled,
  scoringTypeIcon,
  isSelected,
  isComputerRaterSelection,
  readOnly,
  mode,
  surveyId,
  isScenario,
  codingItem,
  useRadioButtonForHolisticScoringType,
  showSelectionInputsWhileReadonly,
  showSelectionInput,
  useOnlyFinalScores = false,
  showRaterCount,
  showRaterPercentage,
  showDataForAllParticipants,
  selectedQuestionId,
  selectedSurveyInvitationIdForFinalRating
}: UseCriterionRatingTableParams): UseCriterionRatingTableHook => {
  const {t} = useLucaTranslation()

  const client = useApolloClient()

  const filteredCriteriaRef = React.useRef<RatingCodingCriterion[]>()
  const codingItemRef = React.useRef<CodingItem>()
  const allRatingsRef = React.useRef<Rating[]>([])
  const finalScoreRatingsRef = React.useRef<Rating[]>([])
  const scenarioCodingItemRatingsRef = React.useRef<ScenarioCodingItemRating[]>([])
  const allScenarioCodingItemRatingsRef = React.useRef<ScenarioCodingItemRating[]>([])
  const freetextQuestionRatingsRef = React.useRef<FreetextQuestionRating[]>([])
  const criteriaRef = React.useRef<RatingCodingCriterion[]>([])
  const ratersRef = React.useRef<UserAccount[]>([])
  const accountRef = React.useRef<UserAccount | null>(null)
  const ratingsWithoutFinalScoresRef = React.useRef<Rating[]>([])

  if (!isEqual(codingItemRef.current, codingItem)) {
    codingItemRef.current = codingItem
  }

  if (!isEqual(criteriaRef.current, criteria)) {
    criteriaRef.current = criteria
  }

  const isComputerRater = isComputerRaterSelection !== undefined

  const [sortedEntitiesLoading, setSortedEntitiesLoading] = React.useState<boolean>(false)
  const [sortedEntities, setSortedEntities] = React.useState<(RatingCodingCriterion & CriterionMetadata)[]>([])

  const {account, checkLoginLoading: accountLoading} = useCheckLogin()
  const {surveyUserAccounts: raters, surveyUserAccountsLoading: ratersLoading} = useSurveyUserAccounts(surveyId)
  const {allRatings, ratingsLoading} = useRatings(surveyId, mode)
  const {
    scenarioCodingItemRatings: allScenarioCodingItemRatingsByRatings,
    scenarioCodingItemRatingsLoading: allScenarioCodingItemRatingsByRatingsLoading,
    getScenarioCodingItemRatings: getAllScenarioCodingItemRatingsByRatings
  } = useScenarioCodingItemsByRatingsList()

  const {
    freetextQuestionRatings,
    freetextQuestionRatingsLoading,
    getFreetextQuestionRatings
  } = useFreetextQuestionRatingsByRatingsList()

  const scenarioCodingItemRatings = allScenarioCodingItemRatingsByRatings.filter(scenarioCodingItemRating =>
    exists(rating => scenarioCodingItemRating.ratingId === rating.id, allRatings)
  )

  const participantsCount = uniq(allScenarioCodingItemRatingsByRatings.map(rating => rating.surveyInvitationId)).length

  const isFinalRater = mode === RaterMode.FinalRater
  const isAutomatedCodingItem = codingItem !== undefined && checkIsAutomatedCodingItem(codingItem)
  const filteredCriteria =
    scoringType !== QuestionScoringType.Analytical || isAutomatedCodingItem
      ? criteria
      : criteria.filter(criterion => criterion.score !== 0)
  const finalScoreRatings = allRatings.filter(rating => rating.isFinalScore)

  if (!isEqual(filteredCriteriaRef.current, filteredCriteria)) {
    filteredCriteriaRef.current = filteredCriteria
  }

  if (!isEqual(allRatingsRef.current, allRatings)) {
    allRatingsRef.current = allRatings
  }

  if (!isEqual(scenarioCodingItemRatingsRef.current, scenarioCodingItemRatings)) {
    scenarioCodingItemRatingsRef.current = scenarioCodingItemRatings
  }

  if (!isEqual(allScenarioCodingItemRatingsRef.current, allScenarioCodingItemRatingsByRatings)) {
    allScenarioCodingItemRatingsRef.current = allScenarioCodingItemRatingsByRatings
  }

  if (!isEqual(freetextQuestionRatingsRef.current, freetextQuestionRatings)) {
    freetextQuestionRatingsRef.current = freetextQuestionRatings
  }

  if (!isEqual(ratersRef.current, raters)) {
    ratersRef.current = raters
  }

  if (!isEqual(finalScoreRatingsRef.current, finalScoreRatings)) {
    finalScoreRatingsRef.current = finalScoreRatings
  }

  if (!isEqual(accountRef.current, account.orNull())) {
    accountRef.current = account.orNull()
  }

  const ratingsWithoutFinalScores = React.useMemo(
    () => allRatingsRef.current.filter(({isFinalScore}) => !isFinalScore),
    [allRatingsRef.current]
  )

  if (!isEqual(ratingsWithoutFinalScoresRef.current, ratingsWithoutFinalScores)) {
    ratingsWithoutFinalScoresRef.current = ratingsWithoutFinalScores
  }

  const scenarioRatingsWithoutFinalScore = allScenarioCodingItemRatingsRef.current.filter(({ratingId}) =>
    exists(({id}) => ratingId !== id, finalScoreRatingsRef.current)
  )

  const freetextQuestionRatingsWithoutFinalScore = freetextQuestionRatingsRef.current.filter(({ratingId}) =>
    exists(({id}) => ratingId !== id, finalScoreRatingsRef.current)
  )

  const showAdditionalRaterInfos = React.useMemo(() => {
    if (!isFinalRater) {
      return false
    }

    const invitedRaters = ratersRef.current.filter(
      ({id: raterId}) =>
        raterId !== accountRef.current?.id ||
        exists(({isFinalScore, userAccountId}) => userAccountId === raterId && !isFinalScore, allRatingsRef.current)
    )
    return invitedRaters.length > 0
  }, [isFinalRater, ratersRef.current, accountRef.current, allRatingsRef.current])

  const getScenarioFinishedRatersCount = (raterRatings: Rating[]) =>
    raterRatings.reduce((accumulator, rating) => {
      if (rating.isFinalScore) {
        return accumulator
      }

      const scenarioRatingsList = scenarioCodingItemRatingsRef.current.filter(
        scenarioCodingItemRating => scenarioCodingItemRating.ratingId === rating.id
      )
      const criterionSelections = flatten(scenarioRatingsList.map(scenarioRating => scenarioRating.criterionSelections))
      const wasItemRated =
        isDefined(rating.finalizedAt) ||
        haveCodingItemsBeenRated({
          codingItems: codingItemRef.current !== undefined ? [codingItemRef.current] : [],
          codingCriteria: (criteriaRef.current as unknown) as Array<CodingCriterion | AutomatedCodingCriterion>,
          criterionSelections,
          scenarioCodingItemRatings: scenarioCodingItemRatingsRef.current,
          ratings: raterRatings
        })

      return wasItemRated ? accumulator + 1 : accumulator
    }, 0)

  const isQuestionnaireCriterionRated = (
    criterionSelections: FreetextQuestionCriterionSelection[],
    criterion: RatingCodingCriterion
  ) => exists(criterionSelection => criterionSelection.criterionId === criterion.id, criterionSelections)

  const getQuestionnaireFinishedRatersCount = (raterRatings: Rating[]) =>
    raterRatings.reduce((accumulator, rating) => {
      if (rating.isFinalScore) {
        return accumulator
      }

      const freetextQuestionRatings = freetextQuestionRatingsRef.current.filter(({ratingId}) => ratingId === rating.id)
      const wasRated =
        isDefined(rating.finalizedAt) ||
        (freetextQuestionRatings.length > 0 &&
          every(
            //every returns true for empty array
            freetextQuestionRating =>
              freetextQuestionRating.noCriterionFulfilled ||
              exists(
                criterion => isQuestionnaireCriterionRated(freetextQuestionRating.criterionSelections, criterion),
                criteriaRef.current
              ),
            freetextQuestionRatings
          ))
      return wasRated ? accumulator + 1 : accumulator
    }, 0)

  const finishedRatersCount = React.useMemo(() => {
    const raterRatings = allRatingsRef.current.filter(({isFinalScore}) => !isFinalScore)
    return isScenario ? getScenarioFinishedRatersCount(raterRatings) : getQuestionnaireFinishedRatersCount(raterRatings)
  }, [
    codingItemRef.current,
    allRatingsRef.current,
    scenarioCodingItemRatingsRef.current,
    freetextQuestionRatingsRef.current,
    criteriaRef.current
  ])
  const totalRatersCount = useOnlyFinalScores ? finalScoreRatings.length : raters.length

  const showNoCriterionFulfilledFooter =
    (isAutomatedCodingItem || scoringType !== QuestionScoringType.Holistic) && isDefined(setNoCriterionFulfilled)

  const getNoCriterionFulfilledCount = () => {
    if (isScenario) {
      return scenarioRatingsWithoutFinalScore.filter(
        rating =>
          rating.codingItemId === codingItem?.id &&
          rating.noCriterionFulfilled &&
          rating.surveyInvitationId === selectedSurveyInvitationIdForFinalRating
      ).length
    } else {
      return freetextQuestionRatingsWithoutFinalScore.filter(
        rating =>
          rating.questionId === selectedQuestionId &&
          rating.noCriterionFulfilled &&
          rating.surveyInvitationId === selectedSurveyInvitationIdForFinalRating
      ).length
    }
  }

  const getScenarioRatingsCount = (criterion: RatingCodingCriterion) =>
    scenarioRatingsWithoutFinalScore
      .filter(scenarioRating =>
        selectedSurveyInvitationIdForFinalRating !== undefined
          ? scenarioRating.surveyInvitationId === selectedSurveyInvitationIdForFinalRating
          : true
      )
      .filter(rating =>
        exists(
          ({automatedCriterionId, manualCriterionId}) =>
            automatedCriterionId === criterion.id || manualCriterionId === criterion.id,
          rating.criterionSelections
        )
      ).length

  const getFreetextQuestionRatingsCount = (ratingCodingCriterion: RatingCodingCriterion) => {
    const criteriaSelections = freetextQuestionRatingsWithoutFinalScore
      .filter(rating =>
        selectedSurveyInvitationIdForFinalRating !== undefined
          ? rating.surveyInvitationId === selectedSurveyInvitationIdForFinalRating
          : true
      )
      .flatMap(rating => rating.criterionSelections)
      .filter(criterion => criterion.criterionId === ratingCodingCriterion.id)

    return criteriaSelections.length
  }

  const getRatingsCount = (criterion: RatingCodingCriterion) =>
    isScenario ? getScenarioRatingsCount(criterion) : getFreetextQuestionRatingsCount(criterion)

  const columns = getCriterionRatingTableColumns({
    t,
    getRatingsCount,
    finishedRatersCount,
    scoringTypeIcon,
    scoringType,
    isComputerRaterSelection,
    readOnly,
    isSelected,
    useRadioButtonForHolisticScoringType,
    showSelectionInputsWhileReadonly,
    showAdditionalRaterInfos,
    showSelectionInput,
    showRaterCount,
    showRaterPercentage,
    showDataForAllParticipants,
    participantsCount
  })

  const prevAllRatings = React.useRef<Rating[]>()
  React.useEffect(() => {
    if (mode !== RaterMode.FinalRater || isEqual(prevAllRatings.current, allRatings)) {
      return
    }

    if (isScenario && !allScenarioCodingItemRatingsByRatingsLoading) {
      getAllScenarioCodingItemRatingsByRatings(allRatings)
    }
    if (!isScenario && !freetextQuestionRatingsLoading) {
      getFreetextQuestionRatings(allRatings)
    }
    prevAllRatings.current = allRatings
  }, [mode, isScenario, allRatings, allScenarioCodingItemRatingsByRatingsLoading, freetextQuestionRatingsLoading])

  React.useEffect(() => {
    if (!filteredCriteriaRef.current) {
      return
    }

    setSortedEntitiesLoading(true)
    Promise.all(
      filteredCriteriaRef.current.map(
        entity =>
          new Promise<RatingCodingCriterion & CriterionMetadata>((resolve, reject) => {
            if (!isAutomatedCodingCriterion(entity)) {
              resolve({...entity, automatedData: Option.none()})
              return
            }

            getAutomatedCodingCriterionDescriptionData(t, client, entity)
              .then(data => resolve({...entity, automatedData: Option.of(data)}))
              .catch(reject)
          })
      )
    )
      .then(result => {
        setSortedEntities(result)
        setSortedEntitiesLoading(false)
      })
      .catch(() => setSortedEntitiesLoading(false))
  }, [filteredCriteriaRef.current])

  const noCriterionFulfilledCount = getNoCriterionFulfilledCount()

  return {
    dataLoading:
      accountLoading ||
      ratersLoading ||
      ratingsLoading ||
      allScenarioCodingItemRatingsByRatingsLoading ||
      freetextQuestionRatingsLoading ||
      sortedEntitiesLoading,
    isFinalRater,
    sortedEntities,
    showNoCriterionFulfilledFooter,
    finishedRatersCount,
    totalRatersCount,
    noCriterionFulfilledCount,
    columns,
    showAutomatedCodingItemRuleField: isAutomatedCodingItem,
    isComputerRater,
    showAdditionalRaterInfos,
    participantsCount
  }
}
