import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {
  backgroundColorBright,
  borderRadius,
  cardBottomColor,
  CustomStyle,
  Flex,
  headerBoxShadow,
  spacing,
  spacingLarge,
  spacingMedium
} from "../../styles"

export interface HeaderFooterContainerProps {
  readonly customContentContainerStyles?: CSSInterpolation
}

export const HeaderFooterContainer: React.FC<React.PropsWithChildren<HeaderFooterContainerProps & CustomStyle>> = ({
  children,
  customStyles,
  customContentContainerStyles
}) => {
  return (
    <div css={[styles.headerContainer, customStyles]}>
      <div css={styles.headerContainerHeader} className={"header-bar"} />
      <div css={[styles.containerContent, customContentContainerStyles]} className={"content-container"}>
        {children}
      </div>
      <div css={styles.headerContainerFooter} className={"footer-bar"} />
    </div>
  )
}
const styles = {
  headerContainer: css({
    backgroundColor: backgroundColorBright
  }),
  headerContainerHeader: css({
    height: spacingMedium,
    borderRadius: spacing(borderRadius, 0),
    backgroundColor: cardBottomColor,
    boxShadow: headerBoxShadow
  }),
  headerContainerFooter: css({
    height: spacingMedium,
    backgroundColor: cardBottomColor
  }),
  containerContent: css(Flex.column, {
    padding: spacingLarge
  })
}
