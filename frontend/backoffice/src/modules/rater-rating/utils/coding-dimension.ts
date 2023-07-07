import {ApolloClient} from "@apollo/client"
import {CodingDimensionsQuery, CodingDimensionsQueryVariables} from "shared/graphql/generated/CodingDimensionsQuery"
import {codingDimensionsQuery} from "shared/graphql/queries"
import {CodingDimension} from "shared/models"

export const getCodingDimensions = (client: ApolloClient<unknown>, codingModelId: UUID): Promise<CodingDimension[]> =>
  new Promise<CodingDimension[]>((resolve, reject) =>
    client
      .query<CodingDimensionsQuery, CodingDimensionsQueryVariables>({
        query: codingDimensionsQuery,
        variables: {modelId: codingModelId}
      })
      .then(result => resolve(result.data?.codingDimensions ?? []))
      .catch(reject)
  )
