import {css} from "@emotion/react"
import {kebabCase} from "lodash-es"
import * as React from "react"
import {IconName} from "../../enums"
import {CustomStyle, iconDefaultColor, spacingTiny} from "../../styles"

interface IconProps {
  readonly className?: string
  readonly color?: string
  readonly hoverColor?: string
  readonly customSpacing?: number
  readonly fillColor?: string
  readonly hasSpacing?: boolean
  readonly height?: number
  readonly onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  readonly title?: string
  readonly width?: number
}

interface Props extends IconProps, CustomStyle {
  readonly name: IconName
}

export const Icon: React.FC<Props> = props => (
  <div
    onClick={props.onClick}
    title={props.title}
    className={props.className}
    css={[iconStyle(props), props.customStyles]}
    dangerouslySetInnerHTML={{__html: content(props.name)}}
  />
)

// Dynamic import to avoid huge switch case here
const content = (iconName: IconName) => {
  const name = kebabCase(iconName)
  return require(`../../assets/images/icons/${name}.svg`)
}

Icon.defaultProps = {
  width: 16,
  height: 16
}

const iconStyle = (props: Props) =>
  css({
    height: props.height,
    width: props.width,
    minWidth: props.width,
    color: props.color ?? iconDefaultColor,
    ...(props.hasSpacing ? {marginRight: props.customSpacing || spacingTiny} : {}),

    ...(!!props.hoverColor && {
      "&:hover": {
        color: props.hoverColor
      }
    })
  })
