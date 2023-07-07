import {css} from "@emotion/react"
import * as React from "react"
import {border, borderRadius, Children, CustomStyle, Flex, primaryColor} from "../../styles"

export interface CardProps
  extends Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "onClick">,
    Children {
  readonly isSelected?: boolean
  readonly animateOnHover?: boolean
  readonly hasShadow?: boolean
  readonly className?: string
}

export const Card: React.FC<CardProps & CustomStyle> = ({
  children,
  isSelected = false,
  hasShadow = false,
  customStyles,
  onClick,
  animateOnHover = false,
  className
}) => (
  <div className={className} onClick={onClick} css={[styles(isSelected, animateOnHover, hasShadow), customStyles]}>
    {children}
  </div>
)

const styles = (isSelected: boolean, animateOnHover: boolean, hasShadow: boolean) =>
  css(Flex.column, {
    boxShadow: hasShadow ? "0px 1px 2px 0px rgba(0, 0, 0, 0.24)" : "none",
    borderRadius: borderRadius,
    boxSizing: "border-box",
    background: isSelected ? "#fafcff" : "white",
    border: border(1, isSelected ? primaryColor : "transparent"),
    userSelect: "none",
    transition: animateOnHover ? "0.1s transform ease-in-out" : "none",

    "&:hover": {
      boxShadow:
        hasShadow && animateOnHover
          ? "0px 2px 4px 0px rgba(0, 0, 0, 0.16)"
          : hasShadow
          ? "0px 1px 2px 0px rgba(0, 0, 0, 0.24)"
          : "none",
      transform: animateOnHover ? "translate(0px, -2px)" : "none"
    }
  })
