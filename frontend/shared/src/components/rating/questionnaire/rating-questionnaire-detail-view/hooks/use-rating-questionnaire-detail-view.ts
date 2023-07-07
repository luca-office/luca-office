import {isEqual, meanBy} from "lodash-es"
import * as React from "react"
import {IconName, RaterMode, RatingActionOption} from "../../../../../enums"
import {QuestionScoringType} from "../../../../../graphql/generated/globalTypes"
import {useSurveyInvitations} from "../../../../../graphql/hooks"
import {
  FreetextQuestionCriterionSelection,
  FreetextQuestionRating,
  Questionnaire,
  QuestionnaireQuestion,
  Rating,
  SurveyInvitationLight
} from "../../../../../models"
import {find, flatten, Option, roundNumber, some, sortByCreatedAt, sortByPosition} from "../../../../../utils"
import {
  useFreetextQuestionRatingsByRatingsList,
  useQuestionnaireRatingScore,
  useRatings,
  useSelectedAnswersForParticipantBySurveyInvitationList
} from "../../../hooks"
import {
  getMaxScoreOfAllQuestions,
  getMaxScoreOfQuestion,
  isAutomaticQuestionRatingFinished,
  isManualQuestionRated,
  requiresScoring
} from "../../../utils"

export interface UseRatingQuestionnaireDetailViewHook {
  readonly questions: QuestionnaireQuestion[]
  readonly selectedQuestion: Option<QuestionnaireQuestion>
  readonly label: string
  readonly description?: string
  readonly isOverviewPage: boolean
  readonly requiresScoring: boolean
  readonly score: number
  readonly maxScore: number
  readonly averageScore: number
  readonly backgroundIcon: Option<IconName>
  readonly selectedRatingAction: RatingActionOption
  readonly setSelectedRatingAction: React.Dispatch<React.SetStateAction<RatingActionOption>>
  readonly refetchFreetextQuestionRatings: () => void
  readonly getScoreByQuestion: (questionId: UUID) => number
  readonly getAverageScoreByQuestion: (questionId: UUID) => number
  readonly isRatingInProgress: boolean
  readonly criterionSelections: FreetextQuestionCriterionSelection[]
  readonly freetextQuestionRatingsForParticipant: FreetextQuestionRating[]
  readonly dataLoading: boolean
}

interface UseRatingQuestionnaireDetailViewParams {
  readonly surveyId: UUID
  readonly questionnaire: Questionnaire
  readonly surveyInvitationId?: UUID
  readonly selectedQuestionId?: UUID
  readonly mode: RaterMode
  readonly showDataForAllParticipants?: boolean
}

export const useRatingQuestionnaireDetailView = ({
  surveyId,
  questionnaire,
  surveyInvitationId,
  selectedQuestionId,
  mode,
  showDataForAllParticipants = false
}: UseRatingQuestionnaireDetailViewParams): UseRatingQuestionnaireDetailViewHook => {
  const ratingsRef = React.useRef<Rating[]>([])
  const questionsRef = React.useRef<QuestionnaireQuestion[]>([])
  const selectedQuestionRef = React.useRef<QuestionnaireQuestion | null>(null)
  const freetextQuestionRatingsRef = React.useRef<FreetextQuestionRating[]>([])
  const sortedFreetextQuestionRatingsRef = React.useRef<FreetextQuestionRating[]>([])
  const allSurveyInvitationsRef = React.useRef<SurveyInvitationLight[]>([])
  const surveyInvitationIdsRef = React.useRef<UUID[]>([])

  const [selectedRatingAction, setSelectedRatingAction] = React.useState<RatingActionOption>(RatingActionOption.None)

  const {ratings} = useRatings(surveyId, mode)
  const {
    freetextQuestionRatings,
    getFreetextQuestionRatings,
    freetextQuestionRatingsLoading
  } = useFreetextQuestionRatingsByRatingsList()
  const {
    surveyInvitationsLoading: allSurveyInvitationsLoading,
    surveyInvitations: allSurveyInvitations
  } = useSurveyInvitations(surveyId)
  const {
    selectedAnswersForParticipants: allSelectedAnswers,
    selectedAnswersForParticipantsLoading: allSelectedAnswersLoading,
    getSelectedAnswersForParticipants: getAllSelectedAnswers
  } = useSelectedAnswersForParticipantBySurveyInvitationList()

  if (!isEqual(ratingsRef.current, ratings)) {
    ratingsRef.current = ratings
  }

  if (!isEqual(freetextQuestionRatingsRef.current, freetextQuestionRatings)) {
    freetextQuestionRatingsRef.current = freetextQuestionRatings
  }

  if (!isEqual(allSurveyInvitationsRef.current, allSurveyInvitations)) {
    allSurveyInvitationsRef.current = allSurveyInvitations
  }

  const sortedFreetextQuestionRatings = React.useMemo(() => sortByCreatedAt(freetextQuestionRatingsRef.current), [
    freetextQuestionRatingsRef.current
  ])

  if (!isEqual(sortedFreetextQuestionRatingsRef.current, sortedFreetextQuestionRatings)) {
    sortedFreetextQuestionRatingsRef.current = sortedFreetextQuestionRatings
  }

  const criterionSelections = React.useMemo(() => {
    const sortedRatings = showDataForAllParticipants
      ? sortedFreetextQuestionRatingsRef.current
      : sortedFreetextQuestionRatingsRef.current.filter(
          freetextQuestionRating => freetextQuestionRating.surveyInvitationId === surveyInvitationId
        )
    return flatten(sortedRatings.map(freetextQuestionRating => freetextQuestionRating.criterionSelections))
  }, [sortedFreetextQuestionRatingsRef.current, showDataForAllParticipants])

  const sortedFreetextQuestionRatingsForParticipant = React.useMemo(
    () =>
      showDataForAllParticipants
        ? sortedFreetextQuestionRatingsRef.current
        : sortedFreetextQuestionRatingsRef.current.filter(
            freetextQuestionRating => freetextQuestionRating.surveyInvitationId === surveyInvitationId
          ),
    [sortedFreetextQuestionRatingsRef.current, showDataForAllParticipants]
  )

  const questions = sortByPosition(questionnaire.questions)

  const selectedQuestion = React.useMemo<Option<QuestionnaireQuestion>>(
    () => (!selectedQuestionId ? Option.none() : find(question => question.id === selectedQuestionId, questions)),
    [questions, selectedQuestionId]
  )

  if (!isEqual(questionsRef.current, questions)) {
    questionsRef.current = questions
  }

  if (!isEqual(selectedQuestionRef.current, selectedQuestion.orNull())) {
    selectedQuestionRef.current = selectedQuestion.orNull()
  }

  const label = selectedQuestion.map(({text}) => text).getOrElse(questionnaire.title)
  const description = selectedQuestion.isDefined() ? undefined : questionnaire.description

  const isOverviewPage = selectedQuestion.isEmpty()
  const questionRequiresScoring = selectedQuestion.map(requiresScoring).getOrElse(false)

  const surveyInvitationIds = showDataForAllParticipants
    ? allSurveyInvitations.map(({id}) => id)
    : surveyInvitationId !== undefined
    ? [surveyInvitationId]
    : []

  if (!isEqual(surveyInvitationIdsRef.current, surveyInvitationIds)) {
    surveyInvitationIdsRef.current = surveyInvitationIds
  }

  const {overallScore, getScoreByQuestion, getAverageScoreByQuestion} = useQuestionnaireRatingScore({
    surveyInvitationIds: surveyInvitationIdsRef.current,
    criterionSelections,
    questions,
    freetextQuestionRatings: sortedFreetextQuestionRatingsRef.current,
    selectedSurveyInvitationId: surveyInvitationId
  })

  const score = selectedQuestion.map(question => getScoreByQuestion(question.id)).getOrElse(overallScore)
  const maxScore = React.useMemo(
    () =>
      selectedQuestion.map(question => getMaxScoreOfQuestion(question)).getOrElse(getMaxScoreOfAllQuestions(questions)),
    [selectedQuestion.orNull(), questions]
  )

  // make sure criterionSelections is not empty, otherwise meanBy would return NaN
  const questionsForAverageScore = selectedQuestion.map(question => [question]).getOrElse(questions)
  const averageScore =
    questionsForAverageScore.length > 0
      ? roundNumber(meanBy(questionsForAverageScore, question => getAverageScoreByQuestion(question.id)))
      : 0

  const backgroundIcon = selectedQuestion.map<IconName>(() =>
    questionRequiresScoring ? IconName.MouseLined : IconName.Gear
  )

  const isRatingFinished = React.useMemo(
    () =>
      selectedQuestionRef.current !== null
        ? requiresScoring(selectedQuestionRef.current)
          ? isManualQuestionRated({
              question: selectedQuestionRef.current,
              criterionSelections,
              freetextQuestionRatings: sortedFreetextQuestionRatingsForParticipant
            })
          : selectedQuestionRef.current.scoringType === QuestionScoringType.None
          ? true
          : isAutomaticQuestionRatingFinished(
              selectedQuestionRef.current,
              allSelectedAnswers[`${selectedQuestionRef.current?.id}`] ?? []
            )
        : !some(
            question =>
              requiresScoring(question)
                ? !isManualQuestionRated({
                    question,
                    criterionSelections,
                    freetextQuestionRatings: sortedFreetextQuestionRatingsForParticipant
                  })
                : !isAutomaticQuestionRatingFinished(question, allSelectedAnswers[question.id] ?? []),
            questionsRef.current
          ),
    [selectedQuestionRef.current, criterionSelections, allSelectedAnswers, questionsRef.current]
  )

  const refetchFreetextQuestionRatings = () => {
    if (ratingsRef.current !== undefined) {
      getFreetextQuestionRatings(ratingsRef.current, "network-only")
    }
    if (questionsRef.current.length > 0) {
      getAllSelectedAnswers(surveyInvitationIds, questionsRef.current, "network-only")
    }
  }

  React.useEffect(() => {
    if (ratingsRef.current !== undefined) {
      getFreetextQuestionRatings(ratingsRef.current)
    }
  }, [ratingsRef.current])

  React.useEffect(() => {
    if (questionsRef.current.length > 0 && surveyInvitationIdsRef.current.length > 0) {
      getAllSelectedAnswers(surveyInvitationIdsRef.current, questionsRef.current, "network-only")
    }
  }, [questionsRef.current, surveyInvitationIdsRef.current])

  return {
    questions,
    selectedQuestion,
    label,
    description,
    isOverviewPage,
    requiresScoring: questionRequiresScoring,
    score,
    maxScore,
    averageScore,
    backgroundIcon,
    selectedRatingAction,
    setSelectedRatingAction,
    refetchFreetextQuestionRatings,
    getScoreByQuestion,
    getAverageScoreByQuestion,
    isRatingInProgress: !isRatingFinished,
    criterionSelections,
    freetextQuestionRatingsForParticipant: sortedFreetextQuestionRatingsForParticipant,
    dataLoading: freetextQuestionRatingsLoading || allSelectedAnswersLoading || allSurveyInvitationsLoading
  }
}
