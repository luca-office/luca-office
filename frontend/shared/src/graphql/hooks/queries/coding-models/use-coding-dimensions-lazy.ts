import {useApolloClient} from "@apollo/client"
import {FetchPolicy} from "@apollo/client/core/watchQueryOptions"
import * as React from "react"
import {CodingDimension} from "../../../../models"
import {CodingDimensionsQuery, CodingDimensionsQueryVariables} from "../../../generated/CodingDimensionsQuery"
import {codingDimensionsQuery} from "../../../queries"

export interface UseCodingDimensionsLazyHook {
  readonly codingDimensions: CodingDimension[]
  readonly codingDimensionsLoading: boolean
  readonly getCodingDimensions: (modelId: UUID, fetchPolicy?: FetchPolicy) => void
}

export const useCodingDimensionsLazy = (): UseCodingDimensionsLazyHook => {
  const client = useApolloClient()

  const [codingDimensionsLoading, setCodingDimensionsLoading] = React.useState(false)
  const [codingDimensions, setCodingDimensions] = React.useState<CodingDimension[]>([])

  const getCodingDimensions = (modelId: UUID, fetchPolicy?: FetchPolicy) => {
    setCodingDimensionsLoading(false)
    client
      .query<CodingDimensionsQuery, CodingDimensionsQueryVariables>({
        query: codingDimensionsQuery,
        variables: {modelId},
        fetchPolicy
      })
      .then(result => {
        setCodingDimensions(result.data?.codingDimensions ?? [])
        setCodingDimensionsLoading(false)
      })
      .catch(() => {
        setCodingDimensions([])
        setCodingDimensionsLoading(false)
      })
  }

  return {codingDimensions, codingDimensionsLoading, getCodingDimensions}
}
