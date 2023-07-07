import React, {useContext} from "react"
import {Checkbox, CheckboxLabelPosition, Tooltip} from "../../../components"
import {FontWeight} from "../../../styles"
import {useLucaTranslation} from "../../../translations"
import {ErpContext} from "./erp-table"

export interface RowSelectorProps {
  readonly entityId: number
  readonly rowIndex: number
  readonly isSelectAllSelector: boolean
}

export const RowSelector: React.FC<RowSelectorProps> = ({entityId, rowIndex, isSelectAllSelector}) => {
  const {entitiesCount, selectedEntityIds, selectEntity, deselectEntity, selectAllEntities, deselectAllEntities} =
    useContext(ErpContext)
  const {t} = useLucaTranslation()
  const rowDigitLength = `${Object.keys(entitiesCount).length}`.length
  const isRowSelected = selectedEntityIds[entityId] === true
  const isAnyEntitySelected = Object.values(selectedEntityIds).includes(true)

  const onToggleRowSelection = () => {
    if (isSelectAllSelector) {
      if (isAnyEntitySelected) {
        deselectAllEntities?.()
      } else {
        selectAllEntities?.()
      }
    } else {
      if (isRowSelected) {
        deselectEntity?.(entityId, rowIndex)
      } else {
        selectEntity?.(entityId, rowIndex)
      }
    }
  }

  return (
    <Tooltip
      withPortal={true}
      title={isSelectAllSelector ? t(isAnyEntitySelected ? "erp__table_deselect_all" : "erp__table_select_all") : ""}>
      <Checkbox
        customStyles={[isSelectAllSelector ? styles.selectorCheckbox : undefined]}
        label={`${isSelectAllSelector ? 0 : rowIndex + 1}`.padStart(rowDigitLength < 3 ? 3 : rowDigitLength, "0")}
        labelPosition={CheckboxLabelPosition.Left}
        checked={isRowSelected || (isSelectAllSelector && isAnyEntitySelected)}
        onChange={onToggleRowSelection}
      />
    </Tooltip>
  )
}

const styles = {
  selectorCheckbox: {
    ".checkbox-label": {
      fontWeight: FontWeight.Bold
    }
  }
}
