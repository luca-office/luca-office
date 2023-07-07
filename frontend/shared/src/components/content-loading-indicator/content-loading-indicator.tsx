import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {CustomStyle, Flex, spacingMedium} from "../../styles"
import {LoadingIndicator} from "../loading-indicator/loading-indicator"

export interface ContentLoadingIndicatorProps extends CustomStyle {
  readonly customLoadingIndicatorStyles?: CSSInterpolation
}

export const ContentLoadingIndicator: React.FC<ContentLoadingIndicatorProps> = ({
  customStyles,
  customLoadingIndicatorStyles
}) => (
  <div css={[styles.placeholderGeneral, customStyles]}>
    <LoadingIndicator {...{...(!!customLoadingIndicatorStyles && {customStyles: customLoadingIndicatorStyles})}} />
  </div>
)

const styles = {
  placeholderGeneral: css(Flex.row, {
    padding: spacingMedium,
    justifyContent: "center"
  })
}
