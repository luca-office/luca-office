import {v4} from "uuid"

export const createUUID = v4

export const uuidRegexPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export const isUUID = (value: string): boolean => uuidRegexPattern.test(value)
