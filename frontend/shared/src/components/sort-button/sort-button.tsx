import {css} from "@emotion/react"
import * as React from "react"
import {IconName} from "../../enums"
import {CustomStyle} from "../../styles"
import {Option} from "../../utils"
import {Icon, Tooltip} from ".."
import {TableSortState} from "../table/sort-utils"

interface Props extends CustomStyle {
  readonly tableSortState: Option<TableSortState>
  readonly onClick: () => void
  readonly toolTipText?: string
}

export const SortButton: React.FC<Props> = ({onClick, tableSortState, toolTipText, customStyles}) => (
  <Tooltip inactive={toolTipText === undefined} title={toolTipText ?? ""}>
    <Icon
      customStyles={[styles.icon, customStyles]}
      onClick={onClick}
      name={tableSortState.map(sortState => iconForSortState(sortState)).getOrElse(IconName.TriangleRight)}
    />
  </Tooltip>
)

const iconForSortState = (sortState: TableSortState): IconName => {
  switch (sortState) {
    case TableSortState.ASCENDING:
      return IconName.TriangleDown
    case TableSortState.DESCENDING:
      return IconName.TriangleUp
    default:
      return IconName.TriangleRight
  }
}

const styles = {
  icon: css({
    cursor: "pointer"
  })
}
