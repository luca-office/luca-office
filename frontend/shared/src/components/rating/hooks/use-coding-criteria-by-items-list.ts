import {useApolloClient} from "@apollo/client"
import {FetchPolicy} from "@apollo/client/core/watchQueryOptions"
import {flatten} from "lodash-es"
import * as React from "react"
import {CodingCriteriaQuery, CodingCriteriaQueryVariables} from "../../../graphql/generated/CodingCriteriaQuery"
import {
  ScenarioCodingAutomatedCriteriaQuery,
  ScenarioCodingAutomatedCriteriaQueryVariables
} from "../../../graphql/generated/ScenarioCodingAutomatedCriteriaQuery"
import {automatedCodingCriteriaQuery, codingCriteriaQuery} from "../../../graphql/queries"
import {AutomatedCodingCriterion, CodingCriterion, CodingItem} from "../../../models"
import {isAutomatedCodingItem} from "../../../utils"

interface GetCodingCriteriaParams {
  readonly items: CodingItem[]
  readonly onSuccess?: (codingCriteria: Array<CodingCriterion | AutomatedCodingCriterion>) => void
  readonly onError?: (error: unknown) => void
  readonly fetchPolicy?: FetchPolicy
}

export interface UseCodingCriteriaByItemsListHook {
  readonly codingCriteria: Array<CodingCriterion | AutomatedCodingCriterion>
  readonly codingCriteriaLoading: boolean
  readonly getCodingCriteria: (params: GetCodingCriteriaParams) => void
}

export const useCodingCriteriaByItemsList = (): UseCodingCriteriaByItemsListHook => {
  const client = useApolloClient()

  const isMounted = React.useRef(false)

  const [codingCriteria, setCodingCriteria] = React.useState<Array<CodingCriterion | AutomatedCodingCriterion>>([])
  const [codingCriteriaLoading, setCodingCriteriaLoading] = React.useState<boolean>(false)

  const getCodingCriteria = ({items, onSuccess, onError, fetchPolicy}: GetCodingCriteriaParams) => {
    setCodingCriteriaLoading(true)
    Promise.all(
      items.map(item =>
        isAutomatedCodingItem(item)
          ? new Promise<Array<CodingCriterion | AutomatedCodingCriterion>>((resolve, reject) =>
              client
                .query<ScenarioCodingAutomatedCriteriaQuery, ScenarioCodingAutomatedCriteriaQueryVariables>({
                  query: automatedCodingCriteriaQuery,
                  variables: {itemId: item.id},
                  fetchPolicy
                })
                .then(result => resolve(result.data?.scenarioCodingAutomatedCriteria ?? []))
                .catch(reject)
            )
          : new Promise<Array<CodingCriterion | AutomatedCodingCriterion>>((resolve, reject) =>
              client
                .query<CodingCriteriaQuery, CodingCriteriaQueryVariables>({
                  query: codingCriteriaQuery,
                  variables: {itemId: item.id},
                  fetchPolicy
                })
                .then(result => resolve(result.data?.codingCriteria ?? []))
                .catch(reject)
            )
      )
    )
      .then(results => {
        const criteria = flatten(results)
        onSuccess?.(criteria)

        if (isMounted.current) {
          setCodingCriteria(criteria)
          setCodingCriteriaLoading(false)
        }
      })
      .catch(error => {
        onError?.(error)
        console.error(error)

        if (isMounted.current) {
          setCodingCriteria([])
          setCodingCriteriaLoading(false)
        }
      })
  }

  React.useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return {codingCriteria, codingCriteriaLoading, getCodingCriteria}
}
