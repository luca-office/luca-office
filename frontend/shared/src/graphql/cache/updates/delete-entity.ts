import {DocumentNode} from "graphql"
import {handleApolloCacheUpdate} from "../../../utils"

/**
 * Delete entity from Cache (useful when altering entities included in lists)
 * @param query - cached query to update
 * @param fieldName - data field in cached query
 * @param filterFn - filter entity by custom criteria
 * @param queryVariables - variables of cached query
 */
export function deleteEntityFromCache<Query, Mutation, Variables, Fragment>(
  query: DocumentNode,
  fieldName: keyof Query,
  filterFn: (entity: Fragment) => boolean,
  queryVariables?: Variables
) {
  return handleApolloCacheUpdate<Query, Mutation, Variables>(
    query,
    cache => {
      const newList = (((cache[fieldName] as unknown) as Fragment[]) || []).filter(filterFn)

      return cache[fieldName] ? (({...cache, [fieldName]: newList} as unknown) as Query) : cache
    },
    fieldName,
    queryVariables
  )
}

/**
 * Delete entity with unique id from Cache (useful when altering entities included in lists)
 * @param query - cached query to update
 * @param fieldName - data field in cached query
 * @param entityId - unique id
 * @param queryVariables - variables of cached query
 */
export function deleteIdEntityFromCache<Query, Mutation, Variables, Fragment extends {readonly id: UUID}>(
  query: DocumentNode,
  fieldName: keyof Query,
  entityId: UUID,
  queryVariables?: Variables
) {
  return deleteEntityFromCache<Query, Mutation, Variables, Fragment>(
    query,
    fieldName,
    entity => entity.id !== entityId,
    queryVariables
  )
}
