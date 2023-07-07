import {css} from "@emotion/react"
import * as React from "react"
import {
  borderRadius,
  cardBottomColor,
  Children,
  CustomStyle,
  Flex,
  headerBoxShadow,
  infoColor,
  inputHeight,
  spacingSmall,
  zIndex1
} from "shared/styles"

export interface EmailContentProps extends CustomStyle, Children {
  readonly header: React.ReactNode
  readonly useCustomHeaderWrapper?: boolean
}

export const EmailContent: React.FC<EmailContentProps> = ({header, customStyles, useCustomHeaderWrapper, children}) => {
  return (
    <div css={[Flex.column, styles.wrapper, customStyles]}>
      {useCustomHeaderWrapper ? (
        header
      ) : (
        <div css={[Flex.column, styles.header]} className={"email-content-header"}>
          {header}
        </div>
      )}

      <div css={styles.content} className={"email-content-content"}>
        {children}
      </div>
    </div>
  )
}

const Color = {
  white: "#FFFFFF"
}

const styles = {
  wrapper: css({
    height: "100%"
  }),
  header: css({
    justifyContent: "center",
    backgroundColor: cardBottomColor,
    boxShadow: headerBoxShadow,
    zIndex: zIndex1,
    height: inputHeight,
    padding: spacingSmall,
    color: infoColor,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius
  }),
  content: css({
    backgroundColor: Color.white,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    height: "100%"
  })
}
