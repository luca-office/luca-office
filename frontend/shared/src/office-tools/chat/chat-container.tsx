import * as React from "react"
import {OfficeTool, OfficeWindowType} from "../../enums"
import {DisplayChatMessage} from "../../models"
import {CustomStyle} from "../../styles"
import {useLucaTranslation} from "../../translations"
import {Chat} from "./chat"

export interface ChatComposer {
  readonly openWindows: Array<OfficeWindowType>
  readonly minimizedWindows: Array<OfficeWindowType>
  readonly title: string
  readonly messages: DisplayChatMessage[]
  readonly isChatAccessible: boolean
  readonly sendMessage: (msg: string) => void
  readonly isTopmostWindow?: boolean
  readonly isManualAsynchronousSurvey: boolean
}

export interface ChatContainerProps extends CustomStyle {
  readonly onClose: () => void
  readonly onMinimize: () => void
  readonly useChatComposer: () => ChatComposer
  readonly onOutsideClick?: () => void
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  useChatComposer,
  onClose,
  onMinimize,
  onOutsideClick,
  customStyles
}) => {
  const {
    sendMessage,
    messages,
    isChatAccessible,
    title,
    minimizedWindows,
    openWindows,
    isTopmostWindow,
    isManualAsynchronousSurvey
  } = useChatComposer()

  const {t} = useLucaTranslation()

  const handleOutsideClick = () => {
    if (openWindows.includes(OfficeTool.Chat) && !minimizedWindows.includes(OfficeTool.Chat)) {
      onOutsideClick?.()
    }
  }

  return (
    <Chat
      onOutsideClick={handleOutsideClick}
      onClose={onClose}
      onMinimize={onMinimize}
      onMessageSend={sendMessage}
      messages={messages}
      instructionTitle={isManualAsynchronousSurvey ? t("chat__supervisor_unapproachable") : undefined}
      instructionText={isManualAsynchronousSurvey ? t("chat__supervisor_unapproachable_text") : undefined}
      isChatAccessible={isChatAccessible}
      title={title}
      isTopmostWindow={isTopmostWindow}
      customStyles={customStyles}
    />
  )
}
