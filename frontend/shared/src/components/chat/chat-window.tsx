import {css} from "@emotion/react"
import * as React from "react"
import {ViewerToolsType} from "../../enums"
import {DisplayChatMessage} from "../../models/chat/chat-message"
import {CustomStyle, Flex, FontWeight, primaryKeyColor} from "../../styles"
import {OfficeWindow} from ".."
import {Label} from "../label/label"
import {ChatFooter} from "./chat-footer"
import {ChatHeader, ChatHeaderButtonConfig} from "./chat-header"
import {MessageList} from "./message-list"

export interface PlayerWindowConfig {
  readonly isDraggable: boolean
  readonly draggableBoundsSelector: string
  readonly onOutsideClick: () => void
  readonly onMinimize: () => void
}

export interface ChatWindowProps extends CustomStyle {
  readonly messages: DisplayChatMessage[]
  readonly isTopmostWindow?: boolean
  readonly chatTitle?: string
  readonly attendeeView?: boolean
  readonly isChatAccessible?: boolean
  readonly instructionTitle?: string
  readonly instructionText?: string
  readonly headerButtonConfig?: ChatHeaderButtonConfig
  readonly windowConfig?: PlayerWindowConfig
  readonly onMessageSend: (message: string) => void
  readonly onClose: () => void
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  chatTitle,
  messages,
  onClose,
  onMessageSend,
  customStyles,
  instructionTitle,
  instructionText,
  headerButtonConfig,
  windowConfig,
  isTopmostWindow = true,
  attendeeView = false,
  isChatAccessible = false
}) => (
  <OfficeWindow
    customStyles={[styles.chatWindow, customStyles]}
    toolType={ViewerToolsType.Chat}
    onClose={onClose}
    onMinimize={windowConfig?.onMinimize}
    onOutsideClick={windowConfig?.onOutsideClick}
    isDraggable={windowConfig?.isDraggable}
    draggableBoundsSelector={windowConfig?.draggableBoundsSelector}
    isFooterVisible={false}>
    <ChatHeader title={chatTitle} attendeeView={attendeeView} buttonConfig={headerButtonConfig} />
    <MessageList messages={messages}>
      {instructionTitle && <Label label={instructionTitle} />}
      {instructionText && <div css={styles.instructionText}>{instructionText}</div>}
    </MessageList>
    <ChatFooter onMessageSend={onMessageSend} isReadOnly={!isChatAccessible} isTopmostWindow={isTopmostWindow} />
  </OfficeWindow>
)

const styles = {
  chatWindow: css(Flex.column, {
    width: "90%",
    maxWidth: 723,
    height: "90%",
    background: primaryKeyColor
  }),
  instructionText: css({
    textAlign: "center",
    fontWeight: FontWeight.Regular
  })
}
