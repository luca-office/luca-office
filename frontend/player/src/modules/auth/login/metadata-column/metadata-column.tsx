import {css} from "@emotion/react"
import * as React from "react"
import {Column, Heading, Text} from "shared/components"
import {HeadingLevel} from "shared/enums"
import {spacingSmall, TextSize} from "shared/styles"

interface Props {
  readonly heading: string
  readonly value: string
}

export const MetadataColumn: React.FC<Props> = ({heading, value}) => (
  <Column>
    <Heading level={HeadingLevel.h2}>{heading}</Heading>
    <Text customStyles={styles.text} size={TextSize.Medium}>
      {value}
    </Text>
  </Column>
)

const styles = {
  text: css({marginTop: spacingSmall})
}
