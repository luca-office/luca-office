import {css} from "@emotion/react"
import * as React from "react"
import {HeadingLevel} from "../../../enums"
import {
  backgroundColorLight,
  borderRadius,
  Children,
  CustomStyle,
  FontWeight,
  spacingMedium,
  spacingTiny
} from "../../../styles"
import {Heading} from "../../typography/typography"

export interface UploadSectionProps extends Children {
  readonly heading: string
}

export const UploadSection: React.FC<UploadSectionProps & CustomStyle> = ({heading, children, customStyles}) => (
  <div className="upload-section" css={customStyles}>
    <Heading fontWeight={FontWeight.Bold} customStyles={styles.heading} level={HeadingLevel.h3}>
      {heading}
    </Heading>
    <div css={styles.roundInnerShadow}>{children}</div>
  </div>
)

const styles = {
  heading: css({
    marginBottom: spacingTiny
  }),
  roundInnerShadow: css({
    boxShadow: "inset 0px 0px 4px 0px rgba(0, 0, 0, 0.16)",
    padding: spacingMedium,
    borderRadius: borderRadius,
    backgroundColor: backgroundColorLight
  })
}
