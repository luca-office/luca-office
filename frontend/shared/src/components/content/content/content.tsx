import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {PropsWithChildren} from "react"
import {CustomStyle, Flex, headerHeight, spacing, spacingHuge, spacingMedium} from "../../../styles"
import {ContentLoadingIndicator} from "../../content-loading-indicator/content-loading-indicator"
import {ContentBottomActionbar, ContentMissingIndicator} from "../index"

interface Props extends CustomStyle {
  readonly actionBar?: React.ReactNode
  readonly customContentContainerStyles?: CSSInterpolation
  readonly customFooterStyles?: CSSInterpolation
  readonly customLoadingIndicatorStyles?: CSSInterpolation
  readonly isContentMissing?: boolean
  readonly loading?: boolean
  readonly subHeader?: React.ReactNode
}

export const Content: React.FunctionComponent<PropsWithChildren<Props>> = ({
  actionBar,
  children,
  customContentContainerStyles,
  customFooterStyles,
  customLoadingIndicatorStyles,
  customStyles,
  isContentMissing,
  loading,
  subHeader
}) => {
  return (
    <div className="content" css={[styles.contentWrapper, customStyles]}>
      {subHeader}
      {loading && <ContentLoadingIndicator customStyles={customLoadingIndicatorStyles} />}
      {!loading && isContentMissing && (
        <ContentMissingIndicator customLabelledCardStyles={styles.contentMissingIndicator} />
      )}
      {!loading && !isContentMissing && (
        <React.Fragment>
          <div className="content-container" css={[styles.content, customContentContainerStyles]}>
            {children}
          </div>
          {actionBar && <ContentBottomActionbar customStyles={customFooterStyles}>{actionBar}</ContentBottomActionbar>}
        </React.Fragment>
      )}
    </div>
  )
}

const styles = {
  contentWrapper: css(Flex.column, {
    flexGrow: 1,
    minHeight: `calc(100vh - ${headerHeight}px)`
  }),
  content: css({
    flex: 1,
    padding: spacing(spacingMedium, spacingHuge)
  }),
  contentMissingIndicator: css(Flex.column, {
    justifyContent: "center",
    alignItems: "center"
  })
}
