import {css} from "@emotion/react"
import * as React from "react"
import {Children, CustomStyle, zIndexModal} from "../../styles"

interface OverlayProps extends CustomStyle, Children {
  readonly stopEventPropagation?: boolean
}

export const Overlay: React.FC<OverlayProps> = ({children, stopEventPropagation, customStyles}) => {
  const css = customStyles ? [styles, customStyles] : styles
  return (
    <div css={css} onClick={stopEventPropagation ? evt => evt.stopPropagation() : undefined}>
      {children}
    </div>
  )
}

const styles = css({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0, 0, 0, 0.40)",
  zIndex: zIndexModal
})
