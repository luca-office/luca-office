import {css} from "@emotion/react"
import * as React from "react"
import {Icon} from "shared/components"
import {IconName} from "shared/enums"
import {Children, CustomStyle, Flex, fontColor, FontWeight, spacingTiny, TextSize} from "shared/styles"

export interface InformationEntryProps extends CustomStyle, Children {
  readonly label?: string
  readonly iconName?: IconName
}

export const InformationEntry: React.FC<InformationEntryProps> = ({customStyles, label, iconName, children}) => (
  <div css={[Flex.column, styles.entry, customStyles]}>
    <div css={Flex.row}>
      {!!label && <div css={styles.label}>{label}</div>}
      {!!iconName && <Icon customStyles={styles.icon} name={iconName} />}
    </div>
    <div css={styles.content}>{children}</div>
  </div>
)

const Size = {
  label: 20
}

const styles = {
  entry: css({
    color: fontColor
  }),
  label: css({
    fontSize: TextSize.Medium,
    fontWeight: FontWeight.Bold,
    height: Size.label,
    lineHeight: `${Size.label}px`,
    letterSpacing: 0.15,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    marginBottom: spacingTiny,
    marginRight: spacingTiny
  }),
  icon: css({paddingBottom: spacingTiny}),
  content: css({
    flex: 1
  })
}
