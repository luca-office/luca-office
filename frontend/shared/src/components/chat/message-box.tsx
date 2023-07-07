import {css} from "@emotion/react"
import * as React from "react"
import {
  borderRadiusLarge,
  CustomStyle,
  deepShadow,
  Flex,
  spacing,
  spacingMedium,
  spacingTiny,
  wordBreak
} from "../../styles"
import {formatTime} from "../../utils"
import {Label} from "../label/label"

export type MessagePosition = "left" | "right"

export interface MessageBoxProps extends CustomStyle {
  readonly name: string
  readonly text: string
  readonly date?: Date
  readonly position?: MessagePosition
  readonly headerAddition?: string
}

export const MessageBox: React.FC<MessageBoxProps> = ({
  name,
  date,
  text,
  position = "left",
  headerAddition,
  customStyles
}) => (
  <div css={[styles.message(position), customStyles]}>
    <span css={styles.notch(position)}>&nbsp;</span>

    <div css={styles.messageHead(position)}>
      <div css={styles.messageHeadMain}>
        <Label label={`${name}`} customStyles={styles.messageHeadName} />
        <div>{date !== undefined ? `(${formatTime(date)})` : "*"}</div>
      </div>
      {headerAddition && <div css={wordBreak}>{headerAddition}</div>}
    </div>

    <div css={wordBreak}>{text}</div>
  </div>
)

const Props = {
  notchWrapper: 18,
  notch: 12,
  nbsp: "'\\00a0'",
  shadowBlur: 2
}

const styles = {
  message: (position: MessagePosition) =>
    css(
      Flex.column,
      {
        position: "relative",
        maxWidth: "85%",
        borderRadius: borderRadiusLarge,
        background: "white",
        marginTop: spacingMedium,
        boxShadow: deepShadow,
        padding: spacing(4, 8, 8, 8),
        marginBottom: Props.shadowBlur
      },
      position === "left" && {alignSelf: "flex-start", marginLeft: Props.notchWrapper, borderBottomLeftRadius: 0},
      position === "right" && {alignSelf: "flex-end", marginRight: Props.notchWrapper, borderBottomRightRadius: 0}
    ),
  messageHead: (position: MessagePosition) =>
    css(Flex.row, {
      alignItems: "center",
      alignSelf: position === "left" ? "flex-start" : "flex-end",
      justifyContent: "space-between"
    }),
  messageHeadMain: css(Flex.row),
  messageHeadName: css({
    maxWidth: 250,
    marginRight: spacingTiny,
    marginBottom: 0
  }),
  notch: (position: MessagePosition) =>
    css({
      position: "absolute",
      overflow: "hidden",
      width: Props.notchWrapper,
      height: 14,
      bottom: -Props.shadowBlur,

      ...(position === "left" && {left: -Props.notchWrapper}),
      ...(position === "right" && {right: -Props.notchWrapper}),

      ":before": {
        display: "block",
        position: "absolute",
        backgroundColor: "white",
        boxShadow: `0px 1px ${Props.shadowBlur}px 0px rgb(0 0 0 / 24%)`,
        content: `${Props.nbsp}`,
        width: Props.notch,
        height: Props.notch,

        ...(position === "left" && {left: Props.notch, transform: "skew(-45deg)"}),
        ...(position === "right" && {right: Props.notch, transform: "skew(45deg)"})
      }
    })
}
