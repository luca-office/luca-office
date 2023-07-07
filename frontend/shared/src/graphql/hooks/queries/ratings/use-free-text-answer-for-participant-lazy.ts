import {useLazyQuery} from "@apollo/client"
import {Option} from "../../../../utils"
import {
  FreeTextAnswerForParticipantQuery,
  FreeTextAnswerForParticipantQueryVariables
} from "../../../generated/FreeTextAnswerForParticipantQuery"
import {freeTextAnswerForParticipantQuery} from "../../../queries"

export interface UseFreeTextAnswerForParticipantLazyHook {
  readonly freeTextAnswerForParticipant: Option<string>
  readonly freeTextAnswerForParticipantLoading: boolean
  readonly getFreeTextAnswerForParticipant: (questionId: UUID, surveyInvitationId: UUID) => void
}

export const useFreeTextAnswerForParticipantLazy = (): UseFreeTextAnswerForParticipantLazyHook => {
  const [getFreeTextAnswerForParticipant, {data, loading}] = useLazyQuery<
    FreeTextAnswerForParticipantQuery,
    FreeTextAnswerForParticipantQueryVariables
  >(freeTextAnswerForParticipantQuery)

  return {
    freeTextAnswerForParticipant: Option.of(data?.freeTextAnswerForParticipant),
    freeTextAnswerForParticipantLoading: loading,
    getFreeTextAnswerForParticipant: (questionId: UUID, surveyInvitationId: UUID) =>
      getFreeTextAnswerForParticipant({variables: {questionId, surveyInvitationId}})
  }
}
