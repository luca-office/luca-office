import findLastIndex from "lodash-es/findLastIndex"
import {OfficeTool, OfficeWindowType} from "../../../enums"
import {Option} from "../../../utils/option"

export const findVisibleWindows = (openedWindows: OfficeWindowType[], minimizedWindows: OfficeWindowType[]) => {
  const visibleWindows = openedWindows.filter(window => !minimizedWindows.includes(window))

  return Option.of(findLastIndex(visibleWindows, isFullScreenWindow))
    .map(lastFullScreenToolIndex => visibleWindows.slice(lastFullScreenToolIndex))
    .getOrElse(visibleWindows)
}

const isFullScreenWindow = (window: OfficeWindowType) => {
  switch (window) {
    case OfficeTool.Notes:
    case OfficeTool.Calculator:
    case OfficeTool.Chat:
      return false
    default:
      return true
  }
}
