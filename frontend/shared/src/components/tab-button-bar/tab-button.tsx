import {css} from "@emotion/react"
import * as React from "react"
import {Icon} from "../../components"
import {IconName} from "../../enums"
import {
  cardBottomColor,
  fontColor,
  fontFamily,
  iconDefaultColor,
  primaryColor,
  spacing,
  spacingCard,
  spacingHuger,
  spacingLarge,
  spacingSmall,
  spacingTiny,
  TextSize
} from "../../styles"

interface TabButtonProps {
  onClick: () => void
  isActive: boolean
  label: string
  icon?: IconName
  isDisabled?: boolean
}

export const TabButton = ({onClick, isActive, icon, label, isDisabled = false}: TabButtonProps) => (
  <div css={styles.button(isDisabled)} onClick={!isDisabled ? onClick : undefined}>
    <div css={styles.labelContainer}>
      {icon && (
        <Icon
          css={styles.icon(isDisabled)}
          color={isActive && !isDisabled ? primaryColor : iconDefaultColor}
          name={icon}
        />
      )}
      <span css={styles.label({isActive, isDisabled})}>{label}</span>
    </div>
    <div css={styles.border({isActive, isDisabled})} />
  </div>
)

interface DynamicStyleProps {
  isActive: boolean
  isDisabled: boolean
}

const styles = {
  labelContainer: css({
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  }),
  button: (isDisabled: boolean) =>
    css({
      display: "inline-flex",
      flexDirection: "column",
      margin: spacing(0, spacingCard / 2),
      cursor: isDisabled ? "auto" : "pointer",
      backgroundColor: cardBottomColor,
      height: spacing(spacingHuger)
    }),
  label: ({isActive, isDisabled}: DynamicStyleProps) =>
    css({
      fontFamily,
      color: isActive && !isDisabled ? primaryColor : fontColor,
      fontSize: spacing(TextSize.Smaller),
      lineHeight: spacing(spacingLarge),
      marginLeft: spacingSmall,
      marginRight: spacingTiny,
      opacity: isDisabled ? 0.32 : 1,
      userSelect: "none",
      whiteSpace: "nowrap"
    }),
  border: ({isActive, isDisabled}: DynamicStyleProps) =>
    css({
      display: "inline-block",
      height: spacing(2),
      backgroundColor: isActive && !isDisabled ? primaryColor : cardBottomColor,
      transition: "all 0.3s",
      borderRadius: spacing(2, 2, 0, 0)
    }),
  icon: (isDisabled: boolean) =>
    css({
      opacity: isDisabled ? 0.32 : 1
    })
}
