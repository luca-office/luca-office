import {has, isObject} from "lodash-es"
import {CodingItem} from "../models"

export const isCodingItem = (value: unknown): value is CodingItem => {
  if (!isObject(value) || !has(value, "__typename")) {
    return false
  }

  const typename = (value as {__typename: string}).__typename
  return typename === "ManualCodingItem" || typename === "AutomatedCodingItem"
}
