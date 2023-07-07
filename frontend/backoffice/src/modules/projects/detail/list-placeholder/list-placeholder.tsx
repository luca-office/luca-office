import {css} from "@emotion/react"
import * as React from "react"
import {Button, Text} from "shared/components"
import {IconName} from "shared/enums"
import {Flex, fontColorLight, spacing, spacingMedium, spacingTiny, TextSize} from "shared/styles"

export interface ListPlaceholderProps {
  readonly actionText: string
  readonly onClick: React.MouseEventHandler
  readonly text: string
  readonly title: string
  readonly actionIcon?: IconName
  readonly disabled?: boolean
}

export const ListPlaceholder: React.FunctionComponent<ListPlaceholderProps> = ({
  actionIcon,
  actionText,
  disabled = false,
  onClick,
  text,
  title
}) => {
  return (
    <div className="list-placeholder" css={[Flex.column, styles.wrapper]}>
      <Text size={TextSize.Medium}>{title}</Text>
      <Text size={TextSize.Medium} customStyles={styles.text}>
        {text}
      </Text>
      <Button
        icon={actionIcon || IconName.Add}
        onClick={onClick}
        disabled={disabled}
        customStyles={styles.button}
        className={"placeholder-button"}>
        {actionText}
      </Button>
    </div>
  )
}

const styles = {
  wrapper: css({
    padding: spacingMedium,
    alignItems: "center",
    alignContent: "center",
    flex: "0 0 50%"
  }),
  text: css({
    color: fontColorLight,
    margin: spacing(spacingTiny, 0, spacingMedium)
  }),
  button: css({
    width: "auto",
    padding: spacing(0, spacingMedium)
  })
}
