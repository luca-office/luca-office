import {
  contains,
  every,
  exists,
  find,
  first,
  flatten,
  indexOf,
  isEmpty,
  last,
  range,
  removeDuplicates,
  reverse,
  some,
  sort,
  sortByCreatedAt,
  sortByTimestampDate,
  sortByTimestampString
} from "../array"

const defaultArray = [1, 2, 3, 4, 5]
const unsortedArray = [3, 5, 1, 4, 2]
const nestedArray = [[1, 2], [3, 4], [5]]

const sortedCreatedAtArray = [
  {createdAt: new Date(2018, 6, 10).toISOString()},
  {createdAt: new Date(2020, 6, 10).toISOString()},
  {createdAt: new Date(2021, 6, 10).toISOString()}
]
const unsortedCreatedAtArray = [sortedCreatedAtArray[2], sortedCreatedAtArray[0], sortedCreatedAtArray[1]]

const sortedTimestampDateArray = [
  {timestamp: new Date(2018, 6, 10)},
  {timestamp: new Date(2020, 6, 10)},
  {timestamp: new Date(2021, 6, 10)}
]
const unsortedTimestampDateArray = [
  sortedTimestampDateArray[2],
  sortedTimestampDateArray[0],
  sortedTimestampDateArray[1]
]

const sortedTimestampStringArray = [
  {timestamp: sortedTimestampDateArray[0].timestamp.toISOString()},
  {timestamp: sortedTimestampDateArray[1].timestamp.toISOString()},
  {timestamp: sortedTimestampDateArray[2].timestamp.toISOString()}
]
const unsortedTimestampStringArray = [
  sortedTimestampStringArray[2],
  sortedTimestampStringArray[0],
  sortedTimestampStringArray[1]
]

describe("array", () => {
  describe("sort", () => {
    it("correctly sorts array", () => {
      expect(sort(value => value, unsortedArray)).toEqual(defaultArray)
    })
  })
  describe("find", () => {
    it("returns Option of found element", () => {
      expect(find(value => value === defaultArray[2], defaultArray).orNull()).toEqual(defaultArray[2])
    })
    it("returns empty Option is element can't be found", () => {
      expect(find(value => value === 6, defaultArray).orNull()).toBeNull()
    })
  })
  describe("reverse", () => {
    it("correctly inverts array", () => {
      expect(reverse(defaultArray)).toEqual([...defaultArray].reverse())
    })
  })
  describe("first", () => {
    it("returns Option with first element", () => {
      expect(first(defaultArray).orNull()).toEqual(defaultArray[0])
    })
    it("returns empty Option if array is empty", () => {
      expect(first([]).orNull()).toBeNull()
    })
  })
  describe("last", () => {
    it("returns Option with last element", () => {
      expect(last(defaultArray).orNull()).toEqual(defaultArray[defaultArray.length - 1])
    })
    it("returns empty Option if array is empty", () => {
      expect(last([]).orNull()).toBeNull()
    })
  })
  describe("flatten", () => {
    it("returns flattened array", () => {
      expect(flatten(nestedArray)).toEqual(defaultArray)
    })
  })
  describe("exists", () => {
    it("returns true if element exists", () => {
      expect(exists(value => value === defaultArray[2], defaultArray)).toEqual(true)
    })
    it("returns false if element doesn't exist", () => {
      expect(exists(value => value === 6, defaultArray)).toEqual(false)
    })
  })
  describe("contains", () => {
    it("returns true if element exists", () => {
      expect(contains(defaultArray[2], defaultArray)).toEqual(true)
    })
    it("returns false if element doesn't exist", () => {
      expect(contains(6, defaultArray)).toEqual(false)
    })
  })
  describe("isEmpty", () => {
    it("returns true if array is empty", () => {
      expect(isEmpty([])).toEqual(true)
    })
    it("returns false if array isn't empty", () => {
      expect(isEmpty(defaultArray)).toEqual(false)
    })
  })
  describe("range", () => {
    it("correctly returns range", () => {
      expect(range(defaultArray.length)).toEqual(defaultArray.map(value => value - 1))
    })
    it("returns empty array if range is 0", () => {
      expect(range(0)).toEqual([])
    })
  })
  describe("some", () => {
    it("returns true if array contains at least one element", () => {
      expect(some(value => value === defaultArray[2], defaultArray)).toEqual(true)
    })
    it("returns false if array doesn't contain element", () => {
      expect(some(value => value === 6, defaultArray)).toEqual(false)
    })
  })
  describe("every", () => {
    it("returns true if every entry of an array fulfills the prediction", () => {
      expect(every(value => value > 0 && value <= 5, defaultArray)).toEqual(true)
    })
    it("returns false if at least one entry of the array doesn't fulfill the prediction", () => {
      expect(every(value => value > 0 && value < 5, defaultArray)).toEqual(false)
    })
  })
  describe("removeDuplicates", () => {
    it("returns array with all duplicates removed", () => {
      expect(removeDuplicates([...defaultArray, ...defaultArray])).toEqual(defaultArray)
    })
    it("returns original array if no duplicates are available", () => {
      expect(removeDuplicates(defaultArray)).toEqual(defaultArray)
    })
  })
  describe("indexOf", () => {
    it("returns index of element", () => {
      expect(indexOf(defaultArray[2], defaultArray)).toEqual(2)
    })
    it("returns -1 if no element was found", () => {
      expect(indexOf(6, defaultArray)).toEqual(-1)
    })
  })
  describe("sortByCreatedAt", () => {
    it("correctly sorts array", () => {
      expect(sortByCreatedAt(unsortedCreatedAtArray)).toEqual(sortedCreatedAtArray)
    })
    it("returns original array if array is already sorted", () => {
      expect(sortByCreatedAt(sortedCreatedAtArray)).toEqual(sortedCreatedAtArray)
    })
  })
  describe("sortByTimestampDate", () => {
    it("correctly sorts array", () => {
      expect(sortByTimestampDate(unsortedTimestampDateArray)).toEqual(sortedTimestampDateArray)
    })
    it("returns original array if array is already sorted", () => {
      expect(sortByTimestampDate(sortedTimestampDateArray)).toEqual(sortedTimestampDateArray)
    })
  })
  describe("sortByTimestampString", () => {
    it("correctly sorts array", () => {
      expect(sortByTimestampString(unsortedTimestampStringArray)).toEqual(sortedTimestampStringArray)
    })
    it("returns original array if array is already sorted", () => {
      expect(sortByTimestampString(sortedTimestampStringArray)).toEqual(sortedTimestampStringArray)
    })
  })
})
