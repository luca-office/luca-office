import {css} from "@emotion/react"
import * as React from "react"
import {HeadingLevel, IconName, NodeType} from "../../../enums"
import {CustomStyle, errorColor, Flex, spacingSmall} from "../../../styles"
import {LucaTFunction, useLucaTranslation} from "../../../translations"
import {Heading, Icon} from "../.."

export interface TocEntryPlaceholder {
  readonly nodeType?: NodeType
}

export const TocEntryPlaceholder: React.FC<TocEntryPlaceholder & CustomStyle> = ({customStyles, nodeType}) => {
  const {t} = useLucaTranslation()
  const placeholder = mapNodeTypeToPlaceholder(nodeType, t)
  return (
    <div css={[styles.placeholder, customStyles]} className="toc-entry-placeholder">
      <Icon
        customStyles={styles.icon}
        name={placeholder.iconName}
        color={errorColor}
        className="toc-entry-placeholder-icon"
      />
      <Heading customStyles={styles.text} level={HeadingLevel.h3} className="toc-entry-placeholder-heading">
        {placeholder.placeholderText}
      </Heading>
    </div>
  )
}

interface PlaceHolderItem {
  readonly placeholderText: string
  readonly iconName: IconName
}

const mapNodeTypeToPlaceholder = (nodeType: NodeType | undefined, t: LucaTFunction): PlaceHolderItem => {
  switch (nodeType) {
    default:
      return {
        placeholderText: t("reference_books__placeholder_text"),
        iconName: IconName.AlignmentLeft
      }
  }
}

const styles = {
  placeholder: css(Flex.row),
  icon: css({
    marginRight: spacingSmall
  }),
  text: css({
    color: errorColor
  })
}
