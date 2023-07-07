import {css} from "@emotion/react"
import * as React from "react"
import {IconName} from "../../../../enums"
import {Binary} from "../../../../models"
import {
  borderRadius,
  contentWidth,
  CustomStyle,
  Flex,
  listEntrySelectedColor,
  selectedBorderColor,
  spacing,
  spacingSmall,
  spacingTiny,
  textEllipsis,
  TextSize
} from "../../../../styles"
import {Icon, Text} from "../../.."

export interface SubheaderTabProps extends CustomStyle {
  readonly binary: Binary
  readonly selected: boolean
  readonly onClose?: (id: UUID) => void
  readonly onSelect?: (id: UUID) => void
}

export const SubheaderTab: React.FunctionComponent<SubheaderTabProps> = ({
  binary,
  customStyles,
  onClose,
  onSelect,
  selected
}) => {
  const handleSelect = onSelect ? () => onSelect(binary.id) : undefined
  const handleClose = (e: React.MouseEvent) => {
    if (onClose) {
      e?.stopPropagation()
      onClose(binary.id)
    }
  }

  return (
    <div
      className="subheader-tab"
      data-testid="subheader-tab"
      data-scroll={`subheader-tab_${binary.id}`}
      css={[styles.tab, selected && styles.tabSelected, customStyles]}
      onClick={handleSelect}>
      <Text size={TextSize.Medium} customStyles={styles.text}>
        {binary.title || binary.path}
      </Text>
      {onClose && <Icon name={IconName.Close} onClick={handleClose} customStyles={styles.close} />}
    </div>
  )
}

const styles = {
  tab: css(Flex.row, {
    cursor: "pointer",
    borderRadius,
    background: "white",
    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.16)",
    border: "1px solid white",
    height: 32,
    minWidth: contentWidth / 2,
    maxWidth: contentWidth,
    alignItems: "center",
    padding: spacing(spacingTiny, spacingSmall),
    boxSizing: "border-box"
  }),
  tabSelected: css({
    background: listEntrySelectedColor,
    borderColor: selectedBorderColor,
    boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.24)"
  }),
  text: css(textEllipsis),
  close: css({
    marginLeft: "auto"
  })
}
