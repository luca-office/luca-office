import {MutationUpdaterFn} from "@apollo/client"
import {DocumentNode} from "graphql"
import omit from "lodash-es/omit"
import {ErpType} from "../enums"
import {ErpEntity, ErpEntityByType} from "../models"

/**
 * Handle Cache update
 * @param query to read and write from cache
 * @param writeQueryOptions function how the cache should be updated
 * @param fieldName query data field to avoid cache updater warnings
 * @param variables for query to read and write from cache
 * @param evict is needed when deleting objects from cache and writing array back to it
 */
export const handleApolloCacheUpdate = <TQuery, TMutation, TVariables = void>(
  query: DocumentNode,
  writeQueryOptions: (existingData: TQuery, newData: TMutation) => TQuery | undefined,
  fieldName: keyof TQuery,
  variables?: TVariables,
  evict?: boolean
): MutationUpdaterFn<TMutation> => (cache, {data}) => {
  try {
    const existingDataInCache = cache.readQuery<TQuery, TVariables>({
      query,
      variables
    })

    if (data && existingDataInCache) {
      const updateData = writeQueryOptions(existingDataInCache, data)
      if (updateData) {
        if (evict) {
          cache.evict({
            // Often cache.evict will take an options.id property, but that's not necessary
            // when evicting from the ROOT_QUERY object, as we're doing here.
            fieldName: fieldName as string,
            // No need to trigger a broadcast here, since writeQuery will take care of that.
            broadcast: false
          })
        }
        cache.writeQuery<TQuery>({
          query,
          data: updateData,
          variables
        })
      }
    }
  } catch (error) {
    console.log("could not update cache", error)
  }
}

/**
 * Removes the __typename field from the given type
 * @param value
 */
export const removeTypename = <T extends {readonly __typename: string}>(value: T): Omit<T, "__typename"> =>
  omit(value, "__typename")

/**
 * Adds the __typename field to the given type
 * @param value
 * @param typename
 */
export const addTypename = <T>(value: T, typename: string): T & {__typename: string} => ({
  ...value,
  __typename: typename
})

export const addErpType = <T extends Omit<ErpEntity, "type">, V extends ErpType>(type: V) => (
  value: T
): ErpEntityByType<V> =>
  (({
    ...value,
    type
  } as unknown) as ErpEntityByType<V>)
