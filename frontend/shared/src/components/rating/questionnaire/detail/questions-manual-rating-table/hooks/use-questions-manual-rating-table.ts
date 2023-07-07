import {differenceBy, isEqual} from "lodash-es"
import * as React from "react"
import {RaterMode} from "../../../../../../enums"
import {QuestionScoringType} from "../../../../../../graphql/generated/globalTypes"
import {
  useCreateFreetextQuestionRating,
  useCreateFreetextQuestionRatingCriterionSelection,
  useDeleteFreetextQuestionRatingCriterionSelection,
  useSurveyInvitations,
  useUpdateFreetextQuestionRating
} from "../../../../../../graphql/hooks"
import {
  FreetextQuestionRating,
  FreetextQuestionRatingCriterionSelection,
  QuestionnaireQuestion,
  Rating,
  SurveyInvitationLight
} from "../../../../../../models"
import {exists, find, isDefined, Option, sort, sortByCreatedAt} from "../../../../../../utils"
import {useFreeTextAnswersForParticipants, useFreetextQuestionRatingsByRatingsList, useRatings} from "../../../../hooks"
import {RatingCodingCriterion} from "../../../../models"

const WAIT_INTERVAL = 250

interface CriterionSelection extends Omit<FreetextQuestionRatingCriterionSelection, "__typename" | "createdAt"> {
  readonly createdAt?: string
}

export interface UseQuestionsManualRatingTableHook {
  readonly dataLoading: boolean
  readonly actionLoading: boolean
  readonly freeTextAnswer: Option<string>
  readonly noCriterionFulfilled: boolean
  readonly isSelected: (codingCriterion: RatingCodingCriterion) => boolean
  readonly isNothingSelected: boolean
  readonly updateCriterionSelection: (codingCriterion: RatingCodingCriterion, selected: boolean) => void
  readonly setNoCriterionFulfilled: () => void
  readonly hasRatingChanged: boolean
  readonly applyRatingChanges: () => Promise<void>
  readonly refreshData: () => void
}

interface UseQuestionsManualRatingTableParams {
  readonly surveyInvitationId?: UUID
  readonly question: QuestionnaireQuestion
  readonly ratingId: Option<UUID>
  readonly surveyId: UUID
  readonly mode: RaterMode
  readonly showDataForAllParticipants: boolean
}

export const useQuestionsManualRatingTable = ({
  surveyInvitationId,
  question,
  ratingId,
  surveyId,
  mode,
  showDataForAllParticipants
}: UseQuestionsManualRatingTableParams): UseQuestionsManualRatingTableHook => {
  const createFreetextQuestionRatingCriterionSelectionTimer = React.useRef<ReturnType<typeof setTimeout>>()
  const updateFreetextQuestionRatingTimer = React.useRef<ReturnType<typeof setTimeout>>()
  const deleteFreetextQuestionRatingCriterionSelectionTimer = React.useRef<ReturnType<typeof setTimeout>>()
  const createFreetextQuestionRatingTimer = React.useRef<ReturnType<typeof setTimeout>>()
  const freetextQuestionRatingForParticipantRef = React.useRef<FreetextQuestionRating | null>()
  const ratingsRef = React.useRef<Rating[]>([])
  const freetextQuestionRatingsRef = React.useRef<FreetextQuestionRating[]>([])
  const ratingIdRef = React.useRef<UUID | null>(null)
  const questionRef = React.useRef<QuestionnaireQuestion | null>(null)
  const allSurveyInvitationsRef = React.useRef<SurveyInvitationLight[]>([])
  const surveyInvitationIdsRef = React.useRef<UUID[]>([])

  const isMounted = React.useRef(false)

  if (!isEqual(questionRef.current, question)) {
    questionRef.current = question
  }

  const [
    createFreetextQuestionRatingCriterionSelectionLoading,
    setCreateFreetextQuestionRatingCriterionSelectionLoading
  ] = React.useState(false)
  const [updateFreetextQuestionRatingLoading, setUpdateFreetextQuestionRatingLoading] = React.useState(false)
  const [
    deleteFreetextQuestionRatingCriterionSelectionLoading,
    setDeleteFreetextQuestionRatingCriterionSelectionLoading
  ] = React.useState(false)
  const [createFreetextQuestionRatingLoading, setCreateFreetextQuestionRatingLoading] = React.useState(false)

  const [criterionSelections, setCriterionSelections] = React.useState<CriterionSelection[]>([])
  const [noCriterionFulfilled, setNoCriterionFulfilled] = React.useState<boolean>(false)

  const {
    freeTextAnswersForParticipants,
    freeTextAnswersForParticipantsLoading,
    getFreeTextAnswersForParticipants
  } = useFreeTextAnswersForParticipants()
  const {ratings} = useRatings(surveyId, mode)
  const {
    freetextQuestionRatings,
    freetextQuestionRatingsLoading,
    getFreetextQuestionRatings
  } = useFreetextQuestionRatingsByRatingsList()
  const {updateFreetextQuestionRating} = useUpdateFreetextQuestionRating(question.id, `${surveyInvitationId}`)
  const {createFreetextQuestionRatingCriterionSelection} = useCreateFreetextQuestionRatingCriterionSelection(
    question.id,
    `${surveyInvitationId}`
  )
  const {deleteFreetextQuestionRatingCriterionSelection} = useDeleteFreetextQuestionRatingCriterionSelection(
    question.id,
    `${surveyInvitationId}`
  )
  const {createFreetextQuestionRating} = useCreateFreetextQuestionRating()
  const {
    surveyInvitations: allSurveyInvitations,
    surveyInvitationsLoading: allSurveyInvitationsLoading
  } = useSurveyInvitations(surveyId)

  if (!isEqual(allSurveyInvitationsRef.current, allSurveyInvitations)) {
    allSurveyInvitationsRef.current = allSurveyInvitations
  }

  const surveyInvitationIds = showDataForAllParticipants
    ? allSurveyInvitations.map(({id}) => id)
    : surveyInvitationId !== undefined
    ? [surveyInvitationId]
    : []

  if (!isEqual(surveyInvitationIdsRef.current, surveyInvitationIds)) {
    surveyInvitationIdsRef.current = surveyInvitationIds
  }

  if (!isEqual(ratingsRef.current, ratings)) {
    ratingsRef.current = ratings
  }

  if (!isEqual(freetextQuestionRatingsRef.current, freetextQuestionRatings)) {
    freetextQuestionRatingsRef.current = freetextQuestionRatings
  }

  if (!isEqual(ratingIdRef.current, ratingId.orNull())) {
    ratingIdRef.current = ratingId.orNull()
  }

  const freetextQuestionRatingForParticipant = React.useMemo(
    () =>
      find(
        freetextQuestionRating =>
          showDataForAllParticipants ||
          (freetextQuestionRating.surveyInvitationId === surveyInvitationId &&
            freetextQuestionRating.questionId === questionRef.current?.id),
        sortByCreatedAt(freetextQuestionRatingsRef.current)
      ),
    [surveyInvitationId, freetextQuestionRatingsRef.current, questionRef.current]
  )

  if (!isEqual(freetextQuestionRatingForParticipantRef.current, freetextQuestionRatingForParticipant.orNull())) {
    freetextQuestionRatingForParticipantRef.current = freetextQuestionRatingForParticipant.orNull()
  }

  const defaultCriterionSelections = freetextQuestionRatingForParticipant
    .map(rating => rating.criterionSelections)
    .getOrElse([])
  const defaultCriterionSelectionIds = sort(
    id => id,
    defaultCriterionSelections.map(criterionSelection => criterionSelection.criterionId)
  )
  const criterionSelectionIds = sort(
    id => id,
    criterionSelections.map(selection => selection.criterionId)
  )
  const haveCriterionSelectionsChanged = !isEqual(defaultCriterionSelectionIds, criterionSelectionIds)
  const hasNoCriterionFulfilledChanged = freetextQuestionRatingForParticipant
    .map(rating => rating.noCriterionFulfilled !== noCriterionFulfilled)
    .getOrElse(noCriterionFulfilled)

  const hasRatingChanged = haveCriterionSelectionsChanged || hasNoCriterionFulfilledChanged

  const isNothingSelected = criterionSelections.length === 0 && !noCriterionFulfilled

  const isSelected = (codingCriterion: RatingCodingCriterion) =>
    exists(criterionSelection => criterionSelection.criterionId === codingCriterion.id, criterionSelections)

  const updateCriterionSelection = (codingCriterion: RatingCodingCriterion, selected: boolean) => {
    const criterionSelection = find(
      criterionSelection => criterionSelection.criterionId === codingCriterion.id,
      criterionSelections
    )

    if (!selected) {
      criterionSelection.forEach(selection =>
        setCriterionSelections(criterionSelections.filter(({criterionId}) => criterionId !== selection.criterionId))
      )
      return
    }

    if (criterionSelection.isEmpty()) {
      freetextQuestionRatingForParticipant.forEach(({id: freetextQuestionRatingId}) =>
        setCriterionSelections([
          ...(question.scoringType === QuestionScoringType.Holistic ? [] : criterionSelections),
          {
            criterionId: codingCriterion.id,
            freetextQuestionRatingId
          }
        ])
      )
    }
    setNoCriterionFulfilled(false)
  }

  const handleSetNoCriterionFulfilled = () => {
    setCriterionSelections([])
    setNoCriterionFulfilled(true)
  }

  const markCreateFreetextQuestionRatingCriterionSelectionAsNoLongerLoading = () => {
    if (createFreetextQuestionRatingCriterionSelectionTimer.current) {
      clearTimeout(createFreetextQuestionRatingCriterionSelectionTimer.current)
    }
    createFreetextQuestionRatingCriterionSelectionTimer.current = setTimeout(
      () => isMounted.current && setCreateFreetextQuestionRatingCriterionSelectionLoading(false),
      WAIT_INTERVAL
    )
  }
  const markUpdateFreetextQuestionRatingLoadingAsNoLongerLoading = () => {
    if (updateFreetextQuestionRatingTimer.current) {
      clearTimeout(updateFreetextQuestionRatingTimer.current)
    }
    updateFreetextQuestionRatingTimer.current = setTimeout(
      () => isMounted.current && setUpdateFreetextQuestionRatingLoading(false),
      WAIT_INTERVAL
    )
  }
  const markDeleteFreetextQuestionRatingCriterionSelectionAsNoLongerLoading = () => {
    if (deleteFreetextQuestionRatingCriterionSelectionTimer.current) {
      clearTimeout(deleteFreetextQuestionRatingCriterionSelectionTimer.current)
    }
    deleteFreetextQuestionRatingCriterionSelectionTimer.current = setTimeout(
      () => isMounted.current && setDeleteFreetextQuestionRatingCriterionSelectionLoading(false),
      WAIT_INTERVAL
    )
  }
  const markCreateFreetextQuestionRatingLoadingAsNoLongerLoading = () => {
    if (createFreetextQuestionRatingTimer.current) {
      clearTimeout(createFreetextQuestionRatingTimer.current)
    }
    createFreetextQuestionRatingTimer.current = setTimeout(
      () => isMounted.current && setCreateFreetextQuestionRatingLoading(false),
      WAIT_INTERVAL
    )
  }

  const applyRatingChanges = () =>
    new Promise<void>((resolve, reject) =>
      freetextQuestionRatingForParticipant.forEach(({id: freetextQuestionRatingId}) => {
        const promises: Promise<void>[] = []

        if (hasNoCriterionFulfilledChanged) {
          setUpdateFreetextQuestionRatingLoading(true)
          promises.push(
            updateFreetextQuestionRating(freetextQuestionRatingId, {noCriterionFulfilled}).then(
              markUpdateFreetextQuestionRatingLoadingAsNoLongerLoading
            )
          )
        }

        const initialCriterionSelections = freetextQuestionRatingForParticipant
          .map(rating => rating.criterionSelections)
          .getOrElse([])

        if (noCriterionFulfilled) {
          setDeleteFreetextQuestionRatingCriterionSelectionLoading(true)
          promises.push(
            Promise.all(
              initialCriterionSelections.map(selection =>
                deleteFreetextQuestionRatingCriterionSelection(freetextQuestionRatingId, selection.criterionId)
              )
            ).then(markDeleteFreetextQuestionRatingCriterionSelectionAsNoLongerLoading)
          )

          Promise.all(promises)
            .then(() => resolve())
            .catch(reject)
          return
        }

        if (!haveCriterionSelectionsChanged) {
          Promise.all(promises)
            .then(() => resolve())
            .catch(reject)
          return
        }

        setDeleteFreetextQuestionRatingCriterionSelectionLoading(true)
        const deletedCriterionSelections = differenceBy(
          initialCriterionSelections,
          criterionSelections,
          selection => selection.criterionId
        )
        promises.push(
          Promise.all(
            deletedCriterionSelections.map(selection =>
              deleteFreetextQuestionRatingCriterionSelection(freetextQuestionRatingId, selection.criterionId)
            )
          ).then(markDeleteFreetextQuestionRatingCriterionSelectionAsNoLongerLoading)
        )

        setCreateFreetextQuestionRatingCriterionSelectionLoading(true)
        const createdCriterionSelections = criterionSelections.filter(
          criterionSelection => !isDefined(criterionSelection.createdAt)
        )
        promises.push(
          Promise.all(
            createdCriterionSelections.map(selection =>
              createFreetextQuestionRatingCriterionSelection({
                freetextQuestionRatingId,
                criterionId: selection.criterionId
              })
            )
          ).then(markCreateFreetextQuestionRatingCriterionSelectionAsNoLongerLoading)
        )

        Promise.all(promises)
          .then(() => resolve())
          .catch(reject)
      })
    )

  const refreshData = () =>
    ratingsRef.current.length > 0 && getFreetextQuestionRatings(ratingsRef.current, "network-only")

  React.useEffect(() => {
    // survey invitation id not needed in effect, because questionRef is enough for noticing participant Change, both of them led to problem with firing effect twice (LUCA-2648)
    if (ratingsRef.current.length > 0) {
      getFreetextQuestionRatings(ratingsRef.current).then(result => {
        if (
          questionRef.current !== null &&
          surveyInvitationId !== undefined &&
          ratingIdRef.current !== null &&
          !exists(
            freetextQuestionRating =>
              freetextQuestionRating.surveyInvitationId === surveyInvitationId &&
              freetextQuestionRating.ratingId === ratingIdRef.current &&
              freetextQuestionRating.questionId === question.id,
            result
          )
        ) {
          setCreateFreetextQuestionRatingLoading(true)
          createFreetextQuestionRating({
            ratingId: `${ratingIdRef.current}`,
            questionId: questionRef.current.id,
            surveyInvitationId: `${surveyInvitationId}`,
            noCriterionFulfilled: false
          })
            .then(() => getFreetextQuestionRatings(ratingsRef.current, "network-only"))
            .then(markCreateFreetextQuestionRatingLoadingAsNoLongerLoading)
        }
      })
    }
  }, [ratingIdRef.current, ratingsRef.current, questionRef.current])

  React.useEffect(() => {
    setCriterionSelections(freetextQuestionRatingForParticipantRef.current?.criterionSelections ?? [])
    setNoCriterionFulfilled(freetextQuestionRatingForParticipantRef.current?.noCriterionFulfilled ?? false)
  }, [freetextQuestionRatingForParticipantRef.current])

  React.useEffect(() => {
    if (surveyInvitationIdsRef.current.length > 0 && questionRef.current !== null) {
      getFreeTextAnswersForParticipants(surveyInvitationIdsRef.current, questionRef.current.id)
    }
  }, [surveyInvitationIdsRef.current, questionRef.current])

  React.useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return {
    dataLoading: freeTextAnswersForParticipantsLoading || freetextQuestionRatingsLoading || allSurveyInvitationsLoading,
    actionLoading:
      createFreetextQuestionRatingLoading ||
      createFreetextQuestionRatingCriterionSelectionLoading ||
      deleteFreetextQuestionRatingCriterionSelectionLoading ||
      updateFreetextQuestionRatingLoading,
    freeTextAnswer: freeTextAnswersForParticipants[surveyInvitationId ?? ""],
    noCriterionFulfilled,
    isSelected,
    isNothingSelected,
    updateCriterionSelection,
    setNoCriterionFulfilled: handleSetNoCriterionFulfilled,
    hasRatingChanged,
    applyRatingChanges,
    refreshData
  }
}
