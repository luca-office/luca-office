import {css} from "@emotion/react"
import * as React from "react"
import {DetailedHTMLProps, HTMLAttributes} from "react"
import {HeadingLevel} from "../../enums"
import {Children, CustomStyle, fontColor, fontFamily, FontWeight, primaryColor, TextSize} from "../../styles"

interface HeadingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  readonly fontWeight?: FontWeight
  readonly level: HeadingLevel
  readonly color?: "primary"
  readonly className?: string
}

interface TextProps {
  readonly size?: TextSize
  readonly className?: string
  readonly title?: string
  readonly children: TextChildrenProps
}

export type TextChildrenProps = React.ReactElement | React.ReactElement[] | string | number | null | React.ReactNode

type CombinedTextProps = Pick<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "onClick"> &
  CustomStyle &
  TextProps

export const Text: React.FC<CombinedTextProps> = ({
  children,
  onClick,
  customStyles,
  size = TextSize.Smaller,
  className,
  title
}) => (
  <div className={className} css={[styles.text, {fontSize: size}, customStyles]} title={title} onClick={onClick}>
    {children}
  </div>
)

export const Heading: React.FC<HeadingProps & CustomStyle> = props => (
  <div css={[styles.heading(props), props.customStyles]} onClick={props.onClick} className={props.className}>
    {props.children}
  </div>
)

const getHeadingFontSize = (headingLevel: HeadingLevel) => {
  switch (headingLevel) {
    case HeadingLevel.h1:
      return TextSize.Larger
    case HeadingLevel.h2:
      return TextSize.Large
    case HeadingLevel.h3:
      return TextSize.Medium
    case HeadingLevel.h4:
      return TextSize.Small
    case HeadingLevel.h5:
      return TextSize.Smaller
  }
}

const styles = {
  text: css({
    color: fontColor,
    fontWeight: "normal",
    fontFamily: fontFamily,
    overflowWrap: "break-word"
  }),
  heading: (props: HeadingProps) =>
    css({
      fontWeight: props.fontWeight ? props.fontWeight : FontWeight.Regular,
      color: props.color ? primaryColor : fontColor,
      fontSize: getHeadingFontSize(props.level),
      fontFamily: fontFamily,
      userSelect: "none"
    })
}
