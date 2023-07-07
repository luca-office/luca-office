import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {ButtonHTMLAttributes, DetailedHTMLProps} from "react"
import {ButtonVariant, IconName} from "../../enums"
import {CustomStyle, iconBrightColor} from "../../styles"
import {Icon} from ".."
import {LoadingIndicator} from "../loading-indicator/loading-indicator"
import {buttonStyle} from "./button.styles"

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  readonly customIconStyles?: CSSInterpolation
  readonly icon?: IconName
  readonly iconColor?: string
  readonly stopEventPropagation?: boolean
  readonly variant?: ButtonVariant
  readonly isLoading?: boolean
}

export const Button: React.FC<Props & CustomStyle> = ({
  children,
  className,
  customIconStyles,
  customStyles,
  disabled,
  icon,
  isLoading = false,
  iconColor,
  onClick,
  stopEventPropagation = false,
  title,
  variant
}) => {
  const styles = buttonStyle(variant)

  const handleClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (stopEventPropagation) {
      evt.stopPropagation()
    }

    if (onClick) {
      onClick(evt)
    }
  }

  return (
    <button
      disabled={disabled || isLoading}
      css={[styles.button, customStyles]}
      className={className}
      title={title}
      onClick={handleClick}>
      <div css={styles.buttonContent}>
        {isLoading && <LoadingIndicator customStyles={styles.loadingIndicator} />}
        {icon !== undefined && !isLoading ? (
          <Icon color={iconColor ?? iconBrightColor} customStyles={[styles.icon, customIconStyles]} name={icon} />
        ) : null}
        {variant !== ButtonVariant.IconOnly ? children : null}
      </div>
    </button>
  )
}

Button.defaultProps = {
  variant: ButtonVariant.Primary
}
