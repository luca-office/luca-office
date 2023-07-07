import {css} from "@emotion/react"
import * as React from "react"
import {ChatWindow} from "../../components"
import {DisplayChatMessage} from "../../models"
import {CustomStyle, floatingWindowShadow, zIndex3} from "../../styles"

export interface ChatProps extends CustomStyle {
  readonly messages: DisplayChatMessage[]
  readonly isChatAccessible: boolean
  readonly isTopmostWindow?: boolean
  readonly title?: string
  readonly instructionTitle?: string
  readonly instructionText?: string
  readonly isFocussed?: boolean
  readonly onClose: () => void
  readonly onMessageSend: (msg: string) => void
  readonly onMinimize: () => void
  readonly onOutsideClick: () => void
}

export const Chat: React.FC<ChatProps> = ({
  title,
  isChatAccessible,
  customStyles,
  messages,
  onClose,
  onMinimize,
  onOutsideClick,
  onMessageSend,
  isTopmostWindow,
  instructionText,
  instructionTitle
}) => {
  return (
    <ChatWindow
      chatTitle={title}
      attendeeView={true}
      messages={messages}
      onMessageSend={onMessageSend}
      onClose={onClose}
      instructionText={instructionText}
      instructionTitle={instructionTitle}
      isChatAccessible={isChatAccessible}
      isTopmostWindow={isTopmostWindow}
      windowConfig={{
        draggableBoundsSelector: ".desktop-content",
        isDraggable: true,
        onMinimize,
        onOutsideClick
      }}
      customStyles={[styles.window, customStyles]}
    />
  )
}

export const ChatSizes = {
  window: {width: 720, height: 600}
}

const styles = {
  window: css({
    width: ChatSizes.window.width,
    height: ChatSizes.window.height,
    boxShadow: floatingWindowShadow,
    zIndex: zIndex3
  })
}
