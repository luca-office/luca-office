import {css} from "@emotion/react"
import * as React from "react"
import {HeadingLevel, IconName} from "../../enums"
import {CustomStyle, spacingCard, spacingSmall} from "../../styles"
import {Card, CardHeader} from "../card"
import {Icon} from "../icon/icon"
import {RadioButton} from "../radio-button/radio-button"
import {Heading, Text} from "../typography/typography"

export interface SelectableCardProps extends CustomStyle {
  readonly title: string
  readonly iconName?: IconName
  readonly onClick?: () => void
  readonly disabled?: boolean
  readonly selected?: boolean
  readonly selectionIconType?: SelectionIconType
  readonly customContent?: JSX.Element
  readonly text?: string
}

export enum SelectionIconType {
  CHECK = "check",
  RADIO = "radio"
}

export const SelectableCard: React.FC<SelectableCardProps> = ({
  disabled = false,
  selected,
  title,
  text,
  onClick,
  iconName,
  selectionIconType = SelectionIconType.CHECK,
  customContent,
  customStyles
}) => (
  <Card
    customStyles={[styles.card, customStyles, disabled && styles.cardDisabled]}
    onClick={!disabled ? onClick : undefined}
    isSelected={selected}
    hasShadow>
    <CardHeader>
      <div css={styles.header}>
        <div css={styles.brand}>
          {iconName && <Icon customStyles={styles.icon} name={iconName} />}
          <Heading level={HeadingLevel.h3}>{title}</Heading>
        </div>
        {selectionIconType === SelectionIconType.RADIO && <RadioButton selected={!!selected} disabled={disabled} />}
        {selected && selectionIconType === SelectionIconType.CHECK ? <Icon name={IconName.Check} /> : null}
      </div>
    </CardHeader>
    {text && <Text customStyles={styles.text}>{text}</Text>}
    {customContent}
  </Card>
)

const styles = {
  card: css({
    cursor: "pointer"
  }),
  cardDisabled: css({
    cursor: "not-allowed"
  }),
  header: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  }),
  brand: css({
    display: "flex",
    alignItems: "center"
  }),
  icon: css({marginRight: spacingSmall}),
  text: css({
    padding: spacingCard,
    paddingTop: 0
  })
}
