import {css} from "@emotion/react"
import * as React from "react"
import {IconName} from "../../enums"
import {
  cardBottomColor,
  Children,
  CustomStyle,
  Flex,
  shadowTransparencyColor,
  spacing,
  spacingCard,
  spacingHuger,
  spacingTiny,
  zIndex1
} from "../../styles"
import {TabButton} from "./tab-button"

export interface TabButtonBarEntry {
  label: string
  onClick: () => void
  isDisabled?: boolean
  icon?: IconName
}

interface Props extends CustomStyle, Children {
  buttons: TabButtonBarEntry[]
  activeTabIndex: number
}

export const TabButtonBar: React.FC<Props> = ({buttons, activeTabIndex, children, customStyles}) => (
  <div css={[styles.container, customStyles]}>
    <div css={styles.buttonBar}>
      {buttons.map(({label, icon, onClick, isDisabled}, index) => {
        const isActive = index === activeTabIndex

        return (
          <TabButton
            key={index}
            isActive={isActive}
            label={label}
            icon={icon}
            onClick={onClick}
            isDisabled={isDisabled}
          />
        )
      })}
    </div>
    {children}
  </div>
)

const styles = {
  container: css(Flex.column, {flex: 1}),
  buttonBar: css({
    display: "inline-flex",
    height: spacingHuger,
    borderRadius: spacing(spacingTiny, spacingTiny, 0, 0),
    boxShadow: `${spacing(0, 2, 4, 0)} ${shadowTransparencyColor}`,
    padding: spacing(0, spacingCard / 2),
    backgroundColor: cardBottomColor,
    zIndex: zIndex1
  })
}
