import {has, isObject} from "lodash-es"
import {CodingDimension} from "shared/models"

export const isCodingDimension = (value: unknown): value is CodingDimension =>
  isObject(value) && has(value, "__typename") && (value as {__typename: string}).__typename === "CodingDimension"
