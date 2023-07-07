import {css} from "@emotion/react"
import * as React from "react"
import {Text} from "../../components"
import {
  backgroundColorBright,
  borderRadius,
  CustomStyle,
  deepShadow,
  Flex,
  FontWeight,
  spacingHuge,
  spacingSmall,
  TextSize
} from "../../styles"

export interface InfoTagProps extends CustomStyle {
  readonly label: string
  readonly content: React.ReactNode
}

export const InfoTag: React.FC<InfoTagProps> = ({label, content, customStyles}) => (
  <div css={[styles.tag, customStyles]}>
    <Text size={TextSize.Medium} css={styles.label}>
      {label}
    </Text>
    <div css={styles.content}>{content}</div>
  </div>
)

const styles = {
  tag: css(Flex.row, {
    height: spacingHuge,
    backgroundColor: backgroundColorBright,
    borderRadius,
    boxShadow: deepShadow,
    alignItems: "center",
    padding: spacingSmall,
    boxSizing: "border-box"
  }),
  label: css({
    fontWeight: FontWeight.Bold,
    marginRight: spacingSmall
  }),
  content: css({
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  })
}
