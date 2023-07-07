import {DocumentNode} from "graphql"
import {handleApolloCacheUpdate} from "../../../utils"

/**
 * Updates an entity in the Cache (useful when altering entities included in lists)
 * @param query - cached query to update
 * @param fieldName - data field in cached query
 * @param selector - gets target entity
 * @param mutationFieldName - data field in mutation
 * @param queryVariables - variables of cached query
 */
export const updateEntityInCache = <Query, Mutation, Fragment, Variables = void>(
  query: DocumentNode,
  fieldName: keyof Query,
  selector: (entity: Fragment) => boolean,
  mutationFieldName: keyof Mutation,
  queryVariables?: Variables
) =>
  handleApolloCacheUpdate<Query, Mutation, Variables>(
    query,
    (cache, data) => {
      const update = (data[mutationFieldName] as unknown) as Fragment
      return {
        ...cache,
        ...(cache[fieldName]
          ? {
              [fieldName]: [
                ...((cache[fieldName] as unknown) as Fragment[]).filter(entity => !selector(entity)),
                update
              ]
            }
          : {})
      }
    },
    fieldName,
    queryVariables
  )

/**
 * Updates an entity with unique id in the Cache (useful when altering entities included in lists)
 * @param query - cached query to update
 * @param fieldName - data field in cached query
 * @param entityId - unique id
 * @param mutationFieldName - data field in mutation
 * @param queryVariables - variables of cached query
 */
export const updateIdEntityInCache = <Query, Mutation, Fragment extends {id: UUID}, Variables = void>(
  query: DocumentNode,
  fieldName: keyof Query,
  entityId: UUID,
  mutationFieldName: keyof Mutation,
  queryVariables?: Variables
) =>
  updateEntityInCache<Query, Mutation, Fragment, Variables>(
    query,
    fieldName,
    entity => entity.id === entityId,
    mutationFieldName,
    queryVariables
  )
