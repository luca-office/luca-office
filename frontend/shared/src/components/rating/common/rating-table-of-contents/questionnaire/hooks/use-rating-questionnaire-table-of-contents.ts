import {isEqual} from "lodash-es"
import * as React from "react"
import {RaterMode} from "../../../../../../enums"
import {QuestionScoringType} from "../../../../../../graphql/generated/globalTypes"
import {useSurveyInvitations} from "../../../../../../graphql/hooks"
import {
  FreetextQuestionRating,
  Questionnaire,
  QuestionnaireQuestion,
  Rating,
  SurveyInvitationLight
} from "../../../../../../models"
import {exists, find, flatten, Option, removeDuplicates, sortByCreatedAt, Subject} from "../../../../../../utils"
import {
  SelectedAnswersForParticipantBySurveyInvitationsListMapEntry,
  useFreetextQuestionRatingsByRatingsList,
  useQuestionnaireRatingScore,
  useRatings,
  useSelectedAnswersForParticipantBySurveyInvitationsList
} from "../../../../hooks"
import {
  getMaxScoreOfAllQuestions,
  isAutomaticQuestionRatingFinished,
  isManualQuestionRated,
  requiresScoring as checkRequiresScoring
} from "../../../../utils"

interface QuestionScores {
  readonly maxScore: number
  readonly averageScore: number
}

export interface UseRatingQuestionnaireTableOfContentsHook {
  readonly allRated: boolean
  readonly score: number
  readonly maxScore: number
  readonly isRated: (question: QuestionnaireQuestion) => boolean
  readonly dataLoading: boolean
  readonly getScores: (questionId: UUID) => QuestionScores
  readonly getScoresOfAllQuestions: () => QuestionScores
}

interface UseRatingQuestionnaireTableOfContentsParams {
  readonly surveyId: UUID
  readonly questionnaire: Option<Questionnaire>
  readonly fetchFreetextQuestionRatingsSubject: Subject<void>
  readonly surveyInvitationId?: UUID
  readonly mode: RaterMode
  readonly showDataForAllParticipants?: boolean
}

export const useRatingQuestionnaireTableOfContents = ({
  surveyId,
  questionnaire: questionnaireOption,
  fetchFreetextQuestionRatingsSubject,
  surveyInvitationId,
  mode,
  showDataForAllParticipants = false
}: UseRatingQuestionnaireTableOfContentsParams): UseRatingQuestionnaireTableOfContentsHook => {
  const ratingsRef = React.useRef<Rating[]>([])
  const questionsRef = React.useRef<QuestionnaireQuestion[]>([])
  const fetchFreetextQuestionRatingsSubjectRef = React.useRef<Subject<void>>()
  const fetchFreetextQuestionRatingsSubjectIdRef = React.useRef<UUID>()
  const freetextQuestionRatingsRef = React.useRef<FreetextQuestionRating[]>([])
  const sortedFreetextQuestionRatingsRef = React.useRef<FreetextQuestionRating[]>([])
  const allSurveyInvitationsRef = React.useRef<SurveyInvitationLight[]>([])
  const surveyInvitationIdsRef = React.useRef<UUID[]>([])

  if (!isEqual(fetchFreetextQuestionRatingsSubjectRef.current, fetchFreetextQuestionRatingsSubject)) {
    fetchFreetextQuestionRatingsSubjectRef.current = fetchFreetextQuestionRatingsSubject
  }

  const {ratings, ratingsLoading} = useRatings(surveyId, mode)
  const {
    freetextQuestionRatings,
    getFreetextQuestionRatings,
    freetextQuestionRatingsLoading
  } = useFreetextQuestionRatingsByRatingsList()
  const {
    selectedAnswersForParticipant: allSelectedAnswers,
    getSelectedAnswersForParticipant: getAllSelectedAnswers,
    selectedAnswersForParticipantLoading: allSelectedAnswersLoading
  } = useSelectedAnswersForParticipantBySurveyInvitationsList()
  const {
    surveyInvitations: allSurveyInvitations,
    surveyInvitationsLoading: allSurveyInvitationsLoading
  } = useSurveyInvitations(surveyId)

  const questions = questionnaireOption
    .map(questionnaire => questionnaire.questions.filter(q => q.scoringType !== QuestionScoringType.None))
    .getOrElse([])

  if (!isEqual(questionsRef.current, questions)) {
    questionsRef.current = questions
  }

  if (!isEqual(freetextQuestionRatingsRef.current, freetextQuestionRatings)) {
    freetextQuestionRatingsRef.current = freetextQuestionRatings
  }

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

  const sortedFreetextQuestionRatings = React.useMemo(() => sortByCreatedAt(freetextQuestionRatingsRef.current), [
    freetextQuestionRatingsRef.current
  ])

  const sortedFreetextQuestionRatingsForParticipant = React.useMemo(
    () =>
      showDataForAllParticipants
        ? sortedFreetextQuestionRatingsRef.current
        : sortedFreetextQuestionRatingsRef.current.filter(
            freetextQuestionRating => freetextQuestionRating.surveyInvitationId === surveyInvitationId
          ),
    [sortedFreetextQuestionRatingsRef.current, surveyInvitationId]
  )

  if (!isEqual(sortedFreetextQuestionRatingsRef.current, sortedFreetextQuestionRatings)) {
    sortedFreetextQuestionRatingsRef.current = sortedFreetextQuestionRatings
  }

  const allRated = React.useMemo(
    () =>
      !exists(
        question =>
          !question.score &&
          !exists(
            freetextQuestionRating =>
              freetextQuestionRating.questionId === question.id && !freetextQuestionRating.noCriterionFulfilled,
            showDataForAllParticipants
              ? sortedFreetextQuestionRatingsRef.current
              : sortedFreetextQuestionRatingsRef.current.filter(
                  freetextQuestionRating => freetextQuestionRating.surveyInvitationId === surveyInvitationId
                )
          ),
        questionsRef.current
      ),
    [questionsRef.current, sortedFreetextQuestionRatingsRef.current]
  )

  const criterionSelections = React.useMemo(
    () =>
      flatten(
        sortedFreetextQuestionRatingsRef.current
          .filter(
            freetextQuestionRating =>
              showDataForAllParticipants || freetextQuestionRating.surveyInvitationId === surveyInvitationId
          )
          .map(freetextQuestionRating => freetextQuestionRating.criterionSelections)
      ),
    [sortedFreetextQuestionRatingsRef.current, surveyInvitationId]
  )

  const {overallScore: score, getScoreByQuestion, getAverageScoreByQuestion} = useQuestionnaireRatingScore({
    surveyInvitationIds: surveyInvitationIdsRef.current,
    criterionSelections,
    questions,
    freetextQuestionRatings: sortedFreetextQuestionRatingsRef.current,
    selectedSurveyInvitationId: surveyInvitationId
  })
  const maxScore = React.useMemo(() => getMaxScoreOfAllQuestions(questions), [questions])

  if (!isEqual(ratingsRef.current, ratings)) {
    ratingsRef.current = ratings
  }

  const isRated = (question: QuestionnaireQuestion) => {
    const selectedAnswers = showDataForAllParticipants
      ? allSurveyInvitationsRef.current.reduce((accumulator, {id}) => {
          const data = allSelectedAnswers[id]
          return data !== undefined
            ? {
                ...accumulator,
                ...Object.keys(data).reduce(
                  (dataAccumulator, questionId) => ({
                    ...dataAccumulator,
                    [questionId]: removeDuplicates([...(accumulator[questionId] ?? []), ...data[questionId]])
                  }),
                  {} as SelectedAnswersForParticipantBySurveyInvitationsListMapEntry
                )
              }
            : accumulator
        }, {} as SelectedAnswersForParticipantBySurveyInvitationsListMapEntry)
      : allSelectedAnswers[`${surveyInvitationId}`]

    return checkRequiresScoring(question)
      ? isManualQuestionRated({
          question,
          criterionSelections,
          freetextQuestionRatings: showDataForAllParticipants
            ? sortedFreetextQuestionRatingsRef.current
            : sortedFreetextQuestionRatingsForParticipant,
          ratings: []
        })
      : isAutomaticQuestionRatingFinished(question, selectedAnswers?.[question.id] ?? [])
  }

  const getScores = (questionId: UUID): QuestionScores =>
    find(({id}) => id === questionId, questions)
      .map(question => ({
        maxScore: getMaxScoreOfAllQuestions([question]),
        averageScore: showDataForAllParticipants
          ? getAverageScoreByQuestion(question.id)
          : getScoreByQuestion(question.id)
      }))
      .getOrElse({maxScore: 0, averageScore: 0})

  const getScoresOfAllQuestions = () =>
    questions.reduce(
      (scores, question) => {
        const {maxScore, averageScore} = getScores(question.id)
        return {maxScore: scores.maxScore + maxScore, averageScore: scores.averageScore + averageScore}
      },
      {maxScore: 0, averageScore: 0} as QuestionScores
    )

  React.useEffect(() => {
    getAllSelectedAnswers(
      showDataForAllParticipants
        ? allSurveyInvitationsRef.current.map(({id}) => id)
        : surveyInvitationId !== undefined
        ? [surveyInvitationId]
        : [],
      questionsRef.current
    )
  }, [surveyInvitationId, questionsRef.current, allSurveyInvitationsRef.current, showDataForAllParticipants])

  React.useEffect(() => {
    if (ratingsRef.current.length > 0) {
      getFreetextQuestionRatings(ratingsRef.current)
    }
  }, [ratingsRef.current])

  React.useEffect(() => {
    const listenerId = fetchFreetextQuestionRatingsSubjectRef.current?.subscribe(() =>
      getFreetextQuestionRatings(ratings, "network-only")
    )

    if (
      fetchFreetextQuestionRatingsSubjectIdRef.current !== undefined &&
      fetchFreetextQuestionRatingsSubjectIdRef.current !== listenerId
    ) {
      fetchFreetextQuestionRatingsSubjectRef.current?.unsubscribe(fetchFreetextQuestionRatingsSubjectIdRef.current)
    }
    fetchFreetextQuestionRatingsSubjectIdRef.current = listenerId

    return () => {
      if (fetchFreetextQuestionRatingsSubjectIdRef.current !== undefined) {
        fetchFreetextQuestionRatingsSubjectRef.current?.unsubscribe(fetchFreetextQuestionRatingsSubjectIdRef.current)
      }
    }
  }, [fetchFreetextQuestionRatingsSubjectRef.current])

  return {
    allRated,
    score,
    maxScore,
    isRated,
    dataLoading:
      ratingsLoading || freetextQuestionRatingsLoading || allSelectedAnswersLoading || allSurveyInvitationsLoading,
    getScores,
    getScoresOfAllQuestions
  }
}
