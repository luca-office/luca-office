import * as React from "react"
import * as ReactDOM from "react-dom"
import {Children} from "../../styles"

interface Props extends Children {
  target?: Node
}

export const ReactPortal: React.FC<Props> = props => {
  const modalRoot = props.target || document.getElementById("portal-root")

  return modalRoot ? ReactDOM.createPortal(props.children, modalRoot as Element) : null
}
