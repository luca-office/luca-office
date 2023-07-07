import {css} from "@emotion/react"
import * as React from "react"
import {SelectionInPreviewFooter} from "shared/components/selection-in-preview-footer/selection-in-preview-footer"
import {spacingSmall} from "shared/styles"
import {InterventionSettingsCard} from "../../../../components/intervention-setting-card/intervention-setting-card"

export interface SpreadsheetInputValueFooterProps {
  readonly onCreateClick: () => void
  readonly interventionsCount: number
  readonly disabled: boolean
}

export const CellInterventionSpreadsheetFooter: React.FC<SpreadsheetInputValueFooterProps> = ({
  onCreateClick,
  interventionsCount,
  disabled
}) => {
  const footerContent = (
    <InterventionSettingsCard
      interventionsCount={interventionsCount}
      disabled={disabled}
      customTextKey="interventions__interventions_check_spreadsheet_cell_content_short_text"
      customTextStyles={{minHeight: 0}}
      onCreateClick={onCreateClick}
    />
  )
  return (
    <SelectionInPreviewFooter
      customContent={footerContent}
      customLabelStyles={styles.selectionFooter}
      headingKey="scenario_setting__header_label"
    />
  )
}

const styles = {
  selectionFooter: css({
    marginLeft: spacingSmall
  })
}
