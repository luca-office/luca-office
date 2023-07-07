import {css} from "@emotion/react"
import * as React from "react"
import {ButtonVariant, IconName, ViewerToolsType} from "../../../enums"
import {
  borderRadius,
  buttonBackgroundPrimary,
  Flex,
  fontColorBright,
  fontFamily,
  FontWeight,
  headerHeight,
  spacing,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  TextSize
} from "../../../styles"
import {useLucaTranslation} from "../../../translations"
import {Button, Icon, Text} from "../.."
import {getToolTypeMapping} from "./tools-type-mapping"

export interface ToolsHeaderProps {
  readonly toolType: ViewerToolsType
  readonly icon?: IconName
  readonly label?: string
  readonly closeButtonLabel?: string
  readonly onClose?: () => void
  readonly onMinimizeTool?: () => void
  readonly customCenterContent?: React.ReactNode
}

export const ToolsHeader: React.FC<ToolsHeaderProps> = ({
  toolType,
  icon,
  label,
  closeButtonLabel,
  onClose,
  onMinimizeTool,
  customCenterContent
}) => {
  const {t} = useLucaTranslation()
  const toolTypeValues = getToolTypeMapping(toolType)

  return (
    <div css={styles.headerBar}>
      <div css={[Flex.row, customCenterContent && rowWithCenteredContent]}>
        <Icon customStyles={styles.fileTypeIcon} name={icon || toolTypeValues.icon} color={fontColorBright} />
        <Text size={TextSize.Small} customStyles={styles.headerTitle}>
          {label || t(toolTypeValues.label)}
        </Text>
      </div>
      {customCenterContent}
      <div css={[Flex.row, customCenterContent && styles.closeButtonCenteredContent]}>
        {onMinimizeTool && (
          <Button
            onClick={onMinimizeTool}
            variant={ButtonVariant.IconOnly}
            title={t("viewer_tools__minimize_tool_label")}
            icon={IconName.Minimize}
            customStyles={styles.transparentButton}
            customIconStyles={styles.exitIcon}
          />
        )}
        {onClose && (
          <Button
            onClick={onClose}
            variant={closeButtonLabel ? ButtonVariant.Primary : ButtonVariant.IconOnly}
            title={t("viewer_tools__close_tool_label")}
            icon={closeButtonLabel ? undefined : IconName.Close}
            customStyles={styles.transparentButton}
            customIconStyles={styles.exitIcon}>
            {closeButtonLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

const Size = {
  fileTypeIcon: TextSize.Large,
  exitIcon: TextSize.Medium
}

const rowWithCenteredContent = css({
  flexGrow: 1,
  flexBasis: 0
})

const styles = {
  headerBar: css({
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    borderRadius: spacing(borderRadius, borderRadius, 0, 0),
    background: buttonBackgroundPrimary,
    height: headerHeight,
    padding: spacing(spacingTiny, spacingSmall, spacingTiny, spacingMedium),
    color: fontColorBright,
    fontFamily: fontFamily,
    boxSizing: "border-box"
  }),

  closeButtonCenteredContent: css([
    rowWithCenteredContent,
    {
      justifyContent: "flex-end",
      display: "flex"
    }
  ]),
  fileTypeIcon: css({
    width: Size.fileTypeIcon,
    height: Size.fileTypeIcon,
    minWidth: Size.fileTypeIcon,
    marginRight: spacingSmall
  }),
  exitIcon: css({
    width: Size.exitIcon,
    height: Size.exitIcon,
    minWidth: Size.exitIcon
  }),
  transparentButton: css({
    fontWeight: FontWeight.Regular,
    backgroundColor: "transparent",
    border: "none",
    width: "auto"
  }),
  headerTitle: css({
    color: fontColorBright,
    fontWeight: FontWeight.Light
  })
}
