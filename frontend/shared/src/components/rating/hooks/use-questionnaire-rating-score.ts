import {countBy, isEqual, mean, sum} from "lodash-es"
import * as React from "react"
import {QuestionType} from "../../../graphql/generated/globalTypes"
import {FreetextQuestionCriterionSelection, FreetextQuestionRating, QuestionnaireQuestion} from "../../../models"
import {exists, roundNumber, some} from "../../../utils"
import {getScoreByCriterionSelections, isAutomatedQuestion} from "../utils"
import {SelectedAnswersForParticipantByQuestionListMap} from "./use-selected-answers-for-participant-by-question-list"
import {useSelectedAnswersForParticipantBySurveyInvitationList} from "./use-selected-answers-for-participant-by-survey-invitation-list"

export interface UseQuestionnaireRatingScoreHook {
  readonly overallScore: number
  readonly getScoreByQuestion: (questionId: UUID) => number
  readonly getAverageScoreByQuestion: (questionId: UUID) => number
}

interface UseQuestionnaireRatingScoreParams {
  readonly surveyInvitationIds: UUID[]
  readonly criterionSelections: FreetextQuestionCriterionSelection[]
  readonly questions: QuestionnaireQuestion[]
  readonly freetextQuestionRatings: FreetextQuestionRating[]
  readonly selectedSurveyInvitationId?: UUID
}

export const useQuestionnaireRatingScore = ({
  surveyInvitationIds,
  criterionSelections,
  questions,
  freetextQuestionRatings,
  selectedSurveyInvitationId
}: UseQuestionnaireRatingScoreParams): UseQuestionnaireRatingScoreHook => {
  const surveyInvitationIdsRef = React.useRef<UUID[]>([])
  const questionsRef = React.useRef<QuestionnaireQuestion[]>([])
  const criterionSelectionsRef = React.useRef<FreetextQuestionCriterionSelection[]>([])
  const selectedAnswersForParticipantsRef = React.useRef<SelectedAnswersForParticipantByQuestionListMap>({})

  if (!isEqual(surveyInvitationIdsRef.current, surveyInvitationIds)) {
    surveyInvitationIdsRef.current = surveyInvitationIds ?? []
  }

  if (!isEqual(questionsRef.current, questions)) {
    questionsRef.current = questions
  }

  if (!isEqual(criterionSelectionsRef.current, criterionSelections)) {
    criterionSelectionsRef.current = criterionSelections
  }

  const freetextQuestionRatingsForParticipant = freetextQuestionRatings.filter(
    rating => rating.surveyInvitationId === selectedSurveyInvitationId
  )

  const criterionSelectionsForParticipant = freetextQuestionRatingsForParticipant.flatMap(
    rating => rating.criterionSelections
  )

  const {
    selectedAnswersForParticipants,
    getSelectedAnswersForParticipants
  } = useSelectedAnswersForParticipantBySurveyInvitationList()

  if (!isEqual(selectedAnswersForParticipantsRef.current, selectedAnswersForParticipants)) {
    selectedAnswersForParticipantsRef.current = selectedAnswersForParticipants
  }

  const scoreMap = React.useMemo(
    () =>
      questionsRef.current.reduce((accumulator, question) => {
        if (!isAutomatedQuestion(question)) {
          // Freetext Question
          return {
            ...accumulator,
            [question.id]: !exists(
              freetextQuestionRating =>
                freetextQuestionRating.questionId === question.id && freetextQuestionRating.noCriterionFulfilled,
              freetextQuestionRatingsForParticipant
            )
              ? getScoreByCriterionSelections(criterionSelectionsForParticipant, question)
              : 0
          }
        }

        const correctAnswersCount = question.answers.filter(answer => answer.isCorrect).length
        const selectedAnswers = selectedAnswersForParticipantsRef.current[question.id] ?? []
        const allCorrectAnswersSelected =
          selectedAnswers.length > 0 &&
          (question.questionType !== QuestionType.MultipleChoice || selectedAnswers.length === correctAnswersCount)
        const hasWrongAnswer = some(
          answerId => !exists(answer => answer.id === answerId && answer.isCorrect, question.answers),
          selectedAnswers
        )

        return {
          ...accumulator,
          [question.id]: hasWrongAnswer || !allCorrectAnswersSelected ? 0 : question.score
        }
      }, {} as Record<UUID, number>),
    [
      criterionSelectionsRef.current,
      questionsRef.current,
      selectedAnswersForParticipantsRef.current,
      selectedSurveyInvitationId
    ]
  )

  const averageScoreByQuestionIdMap = React.useMemo(
    () =>
      questionsRef.current.reduce((accumulator, question) => {
        if (!isAutomatedQuestion(question)) {
          return {
            ...accumulator,
            [question.id]: !exists(
              freetextQuestionRating =>
                freetextQuestionRating.questionId === question.id && freetextQuestionRating.noCriterionFulfilled,
              freetextQuestionRatings
            )
              ? getScoreByCriterionSelections(criterionSelectionsRef.current, question)
              : 0
          }
        }

        const correctAnswerIds = question.answers.filter(answer => answer.isCorrect).map(answer => answer.id)

        const scoresByParticipant = (
          selectedAnswersForParticipantsRef.current[question.id] ?? []
        ).map(selectedAnswerId => (correctAnswerIds.includes(selectedAnswerId) ? question.score : 0))

        return {
          ...accumulator,
          [question.id]: roundNumber(mean(scoresByParticipant))
        }
      }, {} as Record<UUID, number>),
    [criterionSelectionsRef.current, questionsRef.current, selectedAnswersForParticipantsRef.current]
  )

  const getScoreByQuestion = (questionId: UUID) => scoreMap[questionId] ?? 0

  const getAverageScoreByQuestion = (questionId: UUID) => averageScoreByQuestionIdMap[questionId] ?? 0

  React.useEffect(() => {
    if (questionsRef.current.length > 0 && surveyInvitationIdsRef.current.length > 0) {
      getSelectedAnswersForParticipants(surveyInvitationIdsRef.current, questionsRef.current)
    }
  }, [questionsRef.current, surveyInvitationIdsRef.current])

  return {overallScore: sum(Object.values(scoreMap)), getScoreByQuestion, getAverageScoreByQuestion}
}
