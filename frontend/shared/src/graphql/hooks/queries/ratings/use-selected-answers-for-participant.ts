import {useQuery} from "@apollo/client"
import {
  SelectedAnswersForParticipantQuery,
  SelectedAnswersForParticipantQueryVariables
} from "../../../generated/SelectedAnswersForParticipantQuery"
import {selectedAnswersForParticipantQuery} from "../../../queries"

export interface UseSelectedAnswersForParticipantHook {
  readonly selectedAnswersForParticipant: UUID[]
  readonly selectedAnswersForParticipantLoading: boolean
}

export const useSelectedAnswersForParticipant = (
  questionId: UUID,
  surveyInvitationId: UUID
): UseSelectedAnswersForParticipantHook => {
  const {data, loading} = useQuery<SelectedAnswersForParticipantQuery, SelectedAnswersForParticipantQueryVariables>(
    selectedAnswersForParticipantQuery,
    {variables: {questionId, surveyInvitationId}}
  )

  return {
    selectedAnswersForParticipant: data?.selectedAnswersForParticipant ?? [],
    selectedAnswersForParticipantLoading: loading
  }
}
