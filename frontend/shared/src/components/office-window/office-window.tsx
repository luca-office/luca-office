import {css} from "@emotion/react"
import * as React from "react"
import Draggable from "react-draggable"
import OutsideClickHandler from "react-outside-click-handler"
import {IconName, ViewerToolsType} from "../../enums"
import {
  backgroundColorDarker,
  borderRadius,
  buttonBackgroundPrimary,
  cardBottomColor,
  Children,
  CustomStyle,
  fontColorBright,
  fontFamily,
  FontWeight,
  spacing,
  spacingCard,
  TextSize
} from "../../styles"
import {ToolsHeader} from "../viewer-tools"

interface Props extends CustomStyle, Children {
  readonly draggableBoundsSelector?: string
  readonly icon?: IconName
  readonly isDraggable?: boolean
  readonly isFooterVisible?: boolean
  readonly label?: string
  readonly closeButtonLabel?: string
  readonly onClose?: () => void
  readonly onMinimize?: () => void
  readonly onMouseDown?: () => void
  readonly onOutsideClick?: () => void
  readonly toolType?: ViewerToolsType
}

export const OfficeWindow: React.FC<Props> = ({
  children,
  customStyles,
  draggableBoundsSelector = "parent",
  icon,
  isDraggable = false,
  isFooterVisible = true,
  label,
  closeButtonLabel,
  onClose,
  onMinimize,
  onMouseDown,
  onOutsideClick,
  toolType = ViewerToolsType.File
}) => {
  const content = (
    <div css={[styles.container, customStyles]}>
      <div css={styles.header(isDraggable)} className="header">
        <ToolsHeader
          toolType={toolType}
          icon={icon}
          label={label}
          closeButtonLabel={closeButtonLabel}
          onClose={onClose}
          onMinimizeTool={onMinimize}
        />
      </div>
      {children}
      {isFooterVisible && <div css={styles.footer} />}
    </div>
  )
  const draggableContent = isDraggable ? (
    <Draggable bounds={draggableBoundsSelector} handle=".header" onMouseDown={onMouseDown}>
      {content}
    </Draggable>
  ) : (
    content
  )

  return onOutsideClick ? (
    <OutsideClickHandler onOutsideClick={onOutsideClick}>{draggableContent}</OutsideClickHandler>
  ) : (
    draggableContent
  )
}

const styles = {
  container: css({
    borderRadius: borderRadius,
    backgroundColor: backgroundColorDarker
  }),
  header: (isDragHandle: boolean) =>
    css({
      height: 32,
      background: buttonBackgroundPrimary,
      borderRadius: spacing(borderRadius, borderRadius, 0, 0),
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      boxSizing: "border-box",
      cursor: isDragHandle ? "pointer" : undefined
    }),
  label: css({
    fontFamily,
    color: fontColorBright,
    fontSize: TextSize.Medium,
    fontWeight: FontWeight.Regular,
    lineHeight: 1.25,
    marginLeft: spacingCard,
    userSelect: "none"
  }),
  closeButton: css({
    cursor: "pointer"
  }),
  footer: css({
    height: 16,
    backgroundColor: cardBottomColor,
    borderRadius: spacing(0, 0, borderRadius, borderRadius)
  })
}
