import {css} from "@emotion/react"
import React from "react"
import {Icon, Text} from "../../../components"
import {IconName} from "../../../enums"
import {Flex, fontColorBright, iconDefaultColor, iconDisabledColor, spacingTiny, TextSize} from "../../../styles"

export interface QuestionnaireChatButtonProps {
  readonly isDisabled: boolean
  readonly onClick: () => void
  readonly newMessagesCount?: number
}

export const QuestionnaireChatButton: React.FC<QuestionnaireChatButtonProps> = ({
  isDisabled,
  onClick,
  newMessagesCount
}) => {
  return (
    <div css={styles.chatButton(isDisabled)} onClick={isDisabled ? undefined : onClick}>
      {newMessagesCount !== undefined && newMessagesCount > 0 && (
        <div css={styles.chatButtonPin}>
          <Text size={TextSize.Medium} customStyles={styles.pinLabel}>
            !
          </Text>
        </div>
      )}
      <Icon
        width={Sizes.chatButtonIcon}
        height={Sizes.chatButtonIcon}
        name={IconName.SpeechBubble}
        color={isDisabled ? iconDisabledColor : iconDefaultColor}
      />
    </div>
  )
}

const Sizes = {
  chatButton: 56,
  chatButtonPin: 24,
  chatButtonIcon: 32
}

const styles = {
  chatButton: (isDisabled: boolean) =>
    css(Flex.row, {
      position: "relative",
      padding: spacingTiny,
      width: Sizes.chatButton,
      height: Sizes.chatButton,
      justifyContent: "center",
      alignItems: "center",
      cursor: isDisabled ? "not-allowed" : "pointer"
    }),
  chatButtonPin: css(Flex.row, {
    position: "absolute",
    top: spacingTiny,
    right: spacingTiny,
    background: "linear-gradient(-180deg, rgb(231, 112, 112) 0%, rgb(207, 79, 127) 100%);",
    width: Sizes.chatButtonPin,
    height: Sizes.chatButtonPin,
    borderRadius: "50%",
    justifyContent: "center"
  }),
  pinLabel: css({
    color: fontColorBright,
    lineHeight: Sizes.chatButtonPin,
    userSelect: "none"
  })
}
