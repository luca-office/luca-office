import {max, round} from "lodash-es"

/**
 * Number.EPSILON represents the difference between 1 and the smallest floating point number greater than 1.
 * It is used here to ensure that numbers are rounded correctly.
 */
export const roundNumber = (value: number): number => Math.round((value + Number.EPSILON) * 100) / 100

export const convertCentsToEuro = (cents: number): number => roundNumber(cents / 100)

export const convertEuroToCents = (euro: number): number => roundNumber(euro * 100)

export const getHighestNumber = (numbers: number[]): number => max(numbers) ?? -1

export const formatPercent = (value: number): string => round(value, 2) + " %"
