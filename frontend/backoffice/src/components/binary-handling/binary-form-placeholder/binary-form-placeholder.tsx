import {css} from "@emotion/react"
import * as React from "react"
import {Heading} from "shared/components"
import {HeadingLevel} from "shared/enums"
import {Flex, fontColorLight, FontWeight, primaryColor, TextSize} from "shared/styles"

export interface BinaryFormPlaceholderProps {
  readonly createText: string
  readonly onClick: () => void
  readonly placeholderText: string
  readonly readonly?: boolean
}

export const BinaryFormPlaceholder: React.FunctionComponent<BinaryFormPlaceholderProps> = ({
  onClick,
  createText,
  placeholderText,
  readonly = false
}) => (
  <div css={styles.container} className="binary-form-placeholder">
    <div className="logo-placeholder" css={[Flex.column, styles.wrapper, readonly && styles.wrapperReadonly]}>
      <div css={styles.metaBinaryImagePlaceholder}>{placeholderText}</div>
      {!readonly && (
        <Heading
          customStyles={styles.createText}
          fontWeight={FontWeight.Bold}
          onClick={onClick}
          level={HeadingLevel.h3}>
          {createText}
        </Heading>
      )}
    </div>
  </div>
)

const styles = {
  container: css({
    width: "100%",
    height: "100%"
  }),
  wrapper: css({
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between"
  }),
  wrapperReadonly: css({
    justifyContent: "center"
  }),
  createText: css({alignSelf: "flex-end", color: primaryColor, cursor: "pointer"}),
  metaBinaryImagePlaceholder: css(Flex.column, {
    justifyContent: "center",
    height: "100%",
    fontSize: TextSize.Medium,
    fontWeight: "normal",
    color: fontColorLight,
    letterSpacing: 0.15
  })
}
