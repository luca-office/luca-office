import {DocumentNode} from "graphql"
import {handleApolloCacheUpdate} from "shared/utils"

/**
 * Updates an entity in the Cache (useful when altering entities included in lists)
 * @param query - cached query to update
 * @param fieldName - data field in cached query
 * @param fieldSelector - selector for data field in cached query
 * @param mutationFieldName - data field in mutation
 * @param queryVariables - variables of cached query
 */
export const updateEntityInCache = <Query, DataType extends {id: UUID}, Mutation, Variables = void>(
  query: DocumentNode,
  fieldName: keyof Query,
  fieldSelector: (query: Query) => DataType[],
  mutationFieldName: keyof Mutation,
  queryVariables?: Variables
) =>
  handleApolloCacheUpdate<Query, Mutation, Variables>(
    query,
    (cache, data) => {
      const update = (data[mutationFieldName] as unknown) as DataType

      return {
        ...cache,
        ...(cache[fieldName]
          ? {[fieldName]: [...fieldSelector(cache).filter(entry => entry.id !== update.id), update]}
          : {})
      }
    },
    fieldName,
    queryVariables
  )
