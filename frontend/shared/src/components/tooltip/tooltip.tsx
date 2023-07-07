import * as React from "react"
import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import {Tooltip as ReactTooltip} from "react-tooltip"
import {HeadingLevel, IconName} from "../../enums"
import {
  boxSizeLarge,
  Children,
  CustomStyle,
  Flex,
  fontColor,
  fontColorDark,
  fontColorLight,
  fontFamily,
  spacing,
  spacingSmall,
  spacingTinier
} from "../../styles"
import {createUUID} from "../../utils/uuid"
import {Icon} from "../icon/icon"
import {ReactPortal} from "../react-portal/react-portal"
import {Heading, Text} from "../typography/typography"

export interface TooltipHintProps extends Children {
  readonly title: string
  readonly delayShow?: number
  readonly text?: string
  readonly icon?: IconName
  readonly iconColor?: string
  readonly renderCustomContent?: () => JSX.Element
  readonly backgroundColor?: string
  readonly placement?: "top" | "right" | "bottom" | "left" | undefined
  readonly inactive?: boolean
  readonly withPortal?: boolean
  readonly onWrapperClick?: () => void
  readonly customTooltipStyles?: CSSInterpolation
}

export const Tooltip: React.FC<TooltipHintProps & CustomStyle> = ({
  children,
  title,
  text,
  icon,
  delayShow,
  iconColor,
  placement = "bottom",
  inactive,
  backgroundColor,
  renderCustomContent,
  customStyles,
  withPortal,
  onWrapperClick,
  customTooltipStyles
}) => {
  const uuid = `tooltip_${createUUID()}`

  if (inactive) {
    return <React.Fragment>{children}</React.Fragment>
  }

  const renderTooltipContent = () => (
    <div css={[contentStyles.wrapper, icon && contentStyles.wrapperWithIcon]}>
      <div css={contentStyles.textWrapper}>
        <Heading level={HeadingLevel.h3} customStyles={contentStyles.text}>
          {title}
        </Heading>
        <Text customStyles={contentStyles.text}>{text}</Text>
      </div>
      {icon && (
        <div css={contentStyles.iconWrapper}>
          <Icon name={icon} color={iconColor ?? fontColorLight} width={Sizes.iconSize} height={Sizes.iconSize} />
        </div>
      )}
    </div>
  )

  const tooltip = (
    <ReactTooltip
      anchorId={uuid}
      place={placement}
      delayShow={delayShow}
      style={{zIndex: 1, backgroundColor: backgroundColor ?? fontColor}}
      css={[styles.tooltip, customTooltipStyles]}
      content={title}
      children={text ? renderTooltipContent() : renderCustomContent ? renderCustomContent() : undefined}
    />
  )

  return (
    <React.Fragment>
      <div css={customStyles} id={uuid} onClick={onWrapperClick}>
        {children}
      </div>

      {withPortal ? <ReactPortal>{tooltip}</ReactPortal> : tooltip}
    </React.Fragment>
  )
}

// !important needed to override tooltip default padding to fit requirement
const styles = {
  tooltip: css`
    padding: 2px 8px !important;
    font-family: ${fontFamily};
  `
}

const Sizes = {
  tipSize: 288,
  iconSize: 48
}

const contentStyles = {
  wrapper: css({
    display: "grid",
    margin: spacing(-spacingTinier, -spacingSmall),
    width: Sizes.tipSize
  }),
  wrapperWithIcon: css({
    gridTemplateColumns: `1fr ${boxSizeLarge}px`
  }),
  textWrapper: css({
    // bottom padding accounts for text spacer
    padding: spacing(spacingSmall, spacingSmall, spacingSmall - spacingTinier),
    textAlign: "left",
    boxSizing: "border-box",
    overflow: "hidden"
  }),
  text: css({
    color: "white",
    marginBottom: spacingTinier,
    whiteSpace: "initial"
  }),
  iconWrapper: css(Flex.row, {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: fontColorDark
  })
}
