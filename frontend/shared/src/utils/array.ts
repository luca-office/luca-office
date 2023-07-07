import {compareAsc} from "date-fns"
import _find from "lodash-es/find"
import _flatten from "lodash-es/flatten"
import _includes from "lodash-es/includes"
import _indexOf from "lodash-es/indexOf"
import _last from "lodash-es/last"
import _range from "lodash-es/range"
import _some from "lodash-es/some"
import _sortBy from "lodash-es/sortBy"
import {parseDateString} from "./date"
import {Option} from "./option"

export const sort = <T>(selector: (element: T) => string | number, array: T[]): T[] => _sortBy(array, selector)

export const find = <T>(selector: (element: T) => boolean, array: T[]): Option<T> => Option.of(_find(array, selector))

export const reverse = <T>(array: T[]): T[] => [...array].reverse()

export const first = <T>(array: T[]): Option<T> => Option.of(array[0])

export const last = <T>(array: T[]): Option<T> => Option.of(_last(array))

export const flatten = <T>(array: T[][]): T[] => _flatten(array)

export const exists = <T>(selector: (element: T) => boolean, array: T[]): boolean => find(selector, array).isDefined()

export const contains = <T>(element: T, array: T[]): boolean => _includes(array, element)

export const isEmpty = <T>(array: T[]): boolean => array.length <= 0

export const range = (size: number): number[] => _range(size)

export const some = <T>(func: (element: T) => boolean, array: T[]): boolean => _some(array.map(func))

export const every = <T>(func: (element: T) => boolean, array: T[]): boolean => array.every(func)

export const removeDuplicates = <T>(array: T[]) => Array.from(new Set(array))

export const indexOf = <T>(selector: T, array: T[]): number => _indexOf(array, selector)

export const indexOfBy = <T>(selector: (element: T) => boolean, array: T[]): number => array.findIndex(selector)

export const sortByCreatedAt = <T extends {createdAt: string}>(array: T[]): T[] =>
  [...array].sort((entityA: T, entityB: T) =>
    compareAsc(parseDateString(entityA.createdAt), parseDateString(entityB.createdAt))
  )

export const sortByTimestampDate = <T extends {timestamp: Date}>(array: T[]): T[] =>
  [...array].sort((entityA: T, entityB: T) => compareAsc(entityA.timestamp, entityB.timestamp))

export const sortByTimestampString = <T extends {timestamp: string}>(array: T[]): T[] =>
  [...array].sort((entityA: T, entityB: T) =>
    compareAsc(parseDateString(entityA.timestamp), parseDateString(entityB.timestamp))
  )
