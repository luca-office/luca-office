import {css} from "@emotion/react"
import * as React from "react"
import {DisplayChatMessage} from "../../models/chat/chat-message"
import {Children, CustomStyle, Flex, flex1, spacingMedium, spacingSmall} from "../../styles"
import {MessageBox} from "./message-box"

export interface MessageListProps extends CustomStyle, Children {
  readonly messages: DisplayChatMessage[]
}

export const MessageList: React.FC<MessageListProps> = ({messages, children, customStyles}) => {
  const listRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    listRef.current?.scroll({top: listRef.current?.scrollHeight || 0, behavior: "smooth"})
  }, [messages])

  return (
    <div ref={listRef} css={[styles.list, customStyles]}>
      {children && React.Children.count(children) > 0 && <div css={styles.instruction}>{children}</div>}

      {messages.map(msg => (
        <MessageBox
          key={messages.indexOf(msg)}
          name={msg.name}
          date={msg.timestamp}
          text={msg.message}
          position={msg.self ? "right" : "left"}
        />
      ))}
    </div>
  )
}

const styles = {
  instruction: css(Flex.column, {
    flex: 1,
    width: "70%",
    alignItems: "center",
    margin: "auto",
    marginTop: spacingMedium
  }),
  list: css(Flex.column, {
    overflow: "auto",
    flex: flex1,
    marginLeft: spacingMedium,
    paddingRight: spacingSmall,

    ">div:last-child": {
      marginBottom: spacingMedium
    }
  })
}
