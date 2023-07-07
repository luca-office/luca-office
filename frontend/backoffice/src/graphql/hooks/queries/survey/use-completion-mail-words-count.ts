import {useQuery} from "@apollo/client"
import {
  CompletionEmailWordCountsQuery,
  CompletionEmailWordCountsQueryVariables
} from "../../../../graphql/generated/CompletionEmailWordCountsQuery"
import {CompletionEmailWordCount} from "../../../../models"
import {completionEmailWordCountsQuery} from "../../../queries"

export interface UseCompletionMailWordCountHook {
  readonly completionMailWordsCount: CompletionEmailWordCount[]
  readonly completionMailWordsCountLoading: boolean
}

export const useCompletionMailWordsCount = (
  scenarioId: UUID | undefined,
  surveyId: UUID,
  pollingRateInMillis?: number
): UseCompletionMailWordCountHook => {
  const {data, loading} = useQuery<CompletionEmailWordCountsQuery, CompletionEmailWordCountsQueryVariables>(
    completionEmailWordCountsQuery,
    {
      variables: {scenarioId: scenarioId ?? "", surveyId},
      skip: scenarioId === undefined,
      pollInterval: pollingRateInMillis
    }
  )

  return {
    completionMailWordsCount: data?.completionEmailWordCounts ?? [],
    completionMailWordsCountLoading: loading
  }
}
