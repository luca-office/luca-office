import {DocumentNode} from "graphql"
import {handleApolloCacheUpdate} from "shared/utils"

/**
 * Add entity to Cache (useful when altering entities included in lists)
 * @param query - cached query to update
 * @param fieldName - data field in cached query
 * @param fieldSelector - selector for data field in cached query
 * @param mutationFieldName - data field in mutation
 * @param queryVariables - variables of cached query
 */
export const createEntityInCache = <Query, Mutation, Variables = void>(
  query: DocumentNode,
  fieldName: keyof Query,
  fieldSelector: (query: Query) => unknown[],
  mutationFieldName: keyof Mutation,
  queryVariables?: Variables
) =>
  handleApolloCacheUpdate<Query, Mutation, Variables>(
    query,
    (cache, data) => ({
      ...cache,
      [fieldName]: [...fieldSelector(cache), data[mutationFieldName]]
    }),
    fieldName,
    queryVariables
  )

/**
 * Add entities array to Cache (useful when altering entities with list responses)
 * @param query - cached query to update
 * @param fieldName - data field in cached query
 * @param fieldSelector - selector for data field in cached query
 * @param mutationFieldName - data field in mutation
 * @param queryVariables - variables of cached query
 */
export const createEntitiesInCache = <Query, Mutation, Variables = void>(
  query: DocumentNode,
  fieldName: keyof Query,
  fieldSelector: (query: Query) => unknown[],
  mutationFieldName: keyof Mutation,
  queryVariables?: Variables
) =>
  handleApolloCacheUpdate<Query, Mutation, Variables>(
    query,
    (cache, data) => ({
      ...cache,
      [fieldName]: [...fieldSelector(cache), ...((data[mutationFieldName] as unknown) as unknown[])]
    }),
    fieldName,
    queryVariables
  )
