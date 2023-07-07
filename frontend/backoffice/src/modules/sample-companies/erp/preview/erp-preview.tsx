import {css} from "@emotion/react"
import React from "react"
import {OfficeWindow} from "shared/components"
import {ViewerToolsType} from "shared/enums"
import {AutomatedCriterionErpConfig, ErpView} from "shared/office-tools"
import {CustomStyle, Flex, headerHeight, spacingMedium} from "shared/styles"
import {Option} from "shared/utils"

export interface ErpPreviewProps extends CustomStyle {
  readonly onClose: () => void
  readonly sampleCompanyId: UUID
  readonly sampleCompanyName: string
  readonly automatedCriterionConfig?: AutomatedCriterionErpConfig
}

export const ErpPreview: React.FC<ErpPreviewProps> = ({
  sampleCompanyId,
  sampleCompanyName,
  onClose,
  customStyles,
  automatedCriterionConfig
}) => {
  return (
    <OfficeWindow toolType={ViewerToolsType.Erp} onClose={onClose} customStyles={[styles.window, customStyles]}>
      <div css={styles.container}>
        <ErpView
          automatedCriterionConfig={automatedCriterionConfig}
          selectedErpNode={Option.none()}
          selectedEntityId={Option.none()}
          readOnly={true}
          sampleCompanyName={sampleCompanyName}
          sampleCompanyId={sampleCompanyId}
        />
      </div>
    </OfficeWindow>
  )
}

const styles = {
  window: css(Flex.column),
  container: css({
    padding: spacingMedium,
    height: `calc(100% - ${headerHeight}px - ${spacingMedium}px)`,
    boxSizing: "border-box"
  })
}
