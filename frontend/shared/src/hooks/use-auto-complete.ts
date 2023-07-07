import {debounce} from "lodash-es"
import * as React from "react"
import {isEmpty} from "../utils"

export const SEARCH_WAIT_INTERVAL = 500

export interface UseAutoCompleteHook {
  readonly setSearchQuery: (searchQuery: string) => void
  readonly results: string[]
}

export const useAutoComplete = (items: string[], showAllResultsForEmptySearch = false): UseAutoCompleteHook => {
  const timer = React.useRef<ReturnType<typeof setTimeout>>()
  const isMounted = React.useRef<boolean>(false)

  const [results, setResults] = React.useState<string[]>([])
  const [search, setSearch] = React.useState<string>("")

  const normalizedItems = React.useMemo(() => {
    return items.map(item => item.trim().toLowerCase())
  }, [items])

  const setSearchQuery = (searchQuery: string) => setSearch(searchQuery)

  const getSearchResults = debounce((query: string, resolve: (results: string[]) => void) => {
    if (!query) {
      resolve([])
      return
    }

    const indices = normalizedItems.reduce(
      (accumulator, item, index) => (item.includes(query) ? [...accumulator, index] : accumulator),
      [] as number[]
    )
    const searchResults = indices.map(index => items[index])
    resolve(searchResults)
  }, 0)

  React.useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    getSearchResults.cancel()
    timer.current = setTimeout(() => {
      if (!isMounted.current) {
        return
      }

      const query = search.trim().toLowerCase()
      getSearchResults(query, searchResults => isMounted.current && setResults(searchResults))
    }, SEARCH_WAIT_INTERVAL)
  }, [search])

  React.useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return {setSearchQuery, results: isEmpty(results) && showAllResultsForEmptySearch ? items : results}
}
