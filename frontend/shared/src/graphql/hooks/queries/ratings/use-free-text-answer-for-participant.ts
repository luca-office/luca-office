import {useQuery} from "@apollo/client"
import {Option} from "../../../../utils"
import {
  FreeTextAnswerForParticipantQuery,
  FreeTextAnswerForParticipantQueryVariables
} from "../../../generated/FreeTextAnswerForParticipantQuery"
import {freeTextAnswerForParticipantQuery} from "../../../queries"

export interface UseFreeTextAnswerForParticipantHook {
  readonly freeTextAnswerForParticipant: Option<string>
  readonly freeTextAnswerForParticipantLoading: boolean
}

export interface UseFreeTextAnswerForParticipantParams {
  readonly questionId: UUID
  readonly surveyInvitationId: UUID
  readonly skip?: boolean
}

export const useFreeTextAnswerForParticipant = ({
  questionId,
  surveyInvitationId,
  skip
}: UseFreeTextAnswerForParticipantParams): UseFreeTextAnswerForParticipantHook => {
  const {data, loading} = useQuery<FreeTextAnswerForParticipantQuery, FreeTextAnswerForParticipantQueryVariables>(
    freeTextAnswerForParticipantQuery,
    {variables: {questionId, surveyInvitationId}, skip}
  )

  return {
    freeTextAnswerForParticipant: Option.of(data?.freeTextAnswerForParticipant),
    freeTextAnswerForParticipantLoading: loading
  }
}
