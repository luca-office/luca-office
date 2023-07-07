import * as React from "react"
import {ReactPortal} from "./react-portal"

export function withPortal<TProps>(
  WrappedComponent: React.ComponentType<TProps>,
  targetSelector?: string
): React.ComponentType<TProps> {
  return (props: TProps) => {
    const targetElement = targetSelector ? document.querySelector(targetSelector) || undefined : undefined

    return <ReactPortal target={targetElement}>{React.createElement(WrappedComponent, props)}</ReactPortal>
  }
}
