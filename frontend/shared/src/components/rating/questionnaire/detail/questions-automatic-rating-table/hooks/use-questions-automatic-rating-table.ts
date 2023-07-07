import {isEqual} from "lodash-es"
import * as React from "react"
import {useSurveyInvitations, useSurveyUserAccounts} from "../../../../../../graphql/hooks"
import {QuestionnaireAnswer, QuestionnaireQuestion} from "../../../../../../models"
import {useSelectedAnswersForParticipantBySurveyInvitationList} from "../../../../hooks"

export interface UseQuestionsAutomaticRatingTableHook {
  readonly dataLoading: boolean
  readonly isSelected: (answer: QuestionnaireAnswer) => boolean
  readonly ratersCount: number
  readonly getRatingsCount: (answer: QuestionnaireAnswer) => number
}

interface UseQuestionsAutomaticRatingTableParams {
  readonly surveyId: UUID
  readonly surveyInvitationId?: UUID
  readonly question: QuestionnaireQuestion
  readonly showDataForAllParticipants?: boolean
}

export const useQuestionsAutomaticRatingTable = ({
  surveyId,
  surveyInvitationId,
  question,
  showDataForAllParticipants = false
}: UseQuestionsAutomaticRatingTableParams): UseQuestionsAutomaticRatingTableHook => {
  const surveyInvitationIdsRef = React.useRef<UUID[]>([])
  const questionRef = React.useRef<QuestionnaireQuestion | null>(null)

  if (!isEqual(questionRef.current, question)) {
    questionRef.current = question ?? null
  }

  const {surveyUserAccounts: raters, surveyUserAccountsLoading: raterLoading} = useSurveyUserAccounts(surveyId)
  const {surveyInvitationsLoading, surveyInvitations} = useSurveyInvitations(surveyId)
  const {
    selectedAnswersForParticipants,
    selectedAnswersForParticipantsLoading,
    getSelectedAnswersForParticipants
  } = useSelectedAnswersForParticipantBySurveyInvitationList()

  const surveyInvitationIds = showDataForAllParticipants
    ? surveyInvitations.map(({id}) => id)
    : surveyInvitationId !== undefined
    ? [surveyInvitationId]
    : []

  if (!isEqual(surveyInvitationIdsRef.current, surveyInvitationIds)) {
    surveyInvitationIdsRef.current = surveyInvitationIds
  }

  const ratersCount = raters.length

  const getRatingsCount = (answer: QuestionnaireAnswer) =>
    (selectedAnswersForParticipants[question.id] ?? []).filter(answerId => answerId === answer.id).length

  const isSelected = (answer: QuestionnaireAnswer) => selectedAnswersForParticipants[question.id]?.includes(answer.id)

  React.useEffect(() => {
    if (questionRef.current !== null && surveyInvitationIdsRef.current.length > 0) {
      getSelectedAnswersForParticipants(surveyInvitationIdsRef.current, [questionRef.current], "network-only")
    }
  }, [questionRef.current, surveyInvitationIdsRef.current])

  return {
    dataLoading: selectedAnswersForParticipantsLoading || surveyInvitationsLoading || raterLoading,
    isSelected,
    ratersCount,
    getRatingsCount
  }
}
