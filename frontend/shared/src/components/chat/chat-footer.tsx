import {css} from "@emotion/react"
import useEvent from "@react-hook/event"
import {isEmpty} from "lodash-es"
import * as React from "react"
import {ButtonVariant, IconName} from "../../enums"
import {cardBottomColor, CustomStyle, Flex, spacingHuge, spacingMedium} from "../../styles"
import {Button} from "../button/button"
import {TextArea} from "../textarea/textarea"

export interface ChatFooterProps extends CustomStyle {
  readonly isTopmostWindow: boolean
  readonly isReadOnly?: boolean
  readonly onMessageSend: (message: string) => void
}

export const ChatFooter: React.FC<ChatFooterProps> = ({isTopmostWindow, onMessageSend, isReadOnly, customStyles}) => {
  const [message, setMessage] = React.useState("")
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null)
  const chatFooterRef = React.useRef<HTMLDivElement>(null)
  const disabled = isEmpty(message) || isReadOnly

  useEvent(chatFooterRef.current, "keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault()
      event.stopPropagation()

      onSendClick()
    }
  })

  React.useEffect(() => {
    if (isTopmostWindow) {
      textAreaRef.current?.focus()
    }
  }, [isTopmostWindow])

  const onSendClick = () => {
    if (disabled) {
      return
    }

    onMessageSend(message)
    setMessage("")
  }

  return (
    <div css={[styles.footer, customStyles]} ref={chatFooterRef}>
      <TextArea
        ref={textAreaRef}
        value={message}
        onChange={event => setMessage(event.currentTarget.value)}
        customStyles={styles.input}
        customStyleOnlyTextArea={styles.inputTextArea}
      />
      <Button
        css={styles.sendButton}
        variant={ButtonVariant.IconOnly}
        onClick={onSendClick}
        icon={IconName.ArrowUp}
        disabled={disabled}
      />
    </div>
  )
}

const styles = {
  footer: css(Flex.row, {
    maxHeight: 100,
    padding: spacingMedium,
    background: cardBottomColor,
    alignItems: "flex-start"
  }),
  input: css({
    flexGrow: 1,
    height: "100%"
  }),
  inputTextArea: css({
    resize: "vertical",
    minHeight: 30,
    maxHeight: "100%"
  }),
  sendButton: css({
    width: spacingHuge,
    marginLeft: spacingMedium
  })
}
