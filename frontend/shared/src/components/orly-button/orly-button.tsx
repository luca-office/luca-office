import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {Button, Orly, Tooltip} from "../../components"
import {ButtonVariant, IconName} from "../../enums"
import {CustomStyle, fontColorBright} from "../../styles"
import {LucaI18nLangKey, LucaTFunction, useLucaTranslation} from "../../translations"
import {WarningTooltip, WarningTooltipConfig} from "../warning-tooltip/warning-tooltip"

export interface OrlyButtonContainerProps {
  readonly showConfirmDialog: boolean
  readonly toggleConfirmDialog: () => void
}

export interface TooltipConfig {
  readonly labelKey?: LucaI18nLangKey
  readonly textKey?: LucaI18nLangKey
  readonly iconName?: IconName
  readonly warningConfig?: WarningTooltipConfig[]
}

export interface OrlyButtonProps {
  readonly onConfirm: () => void
  readonly confirmButtonKey?: LucaI18nLangKey
  readonly customButtonStyles?: CSSInterpolation
  readonly customModalStyles?: CSSInterpolation
  readonly dismissOnConfirm?: boolean
  readonly disabled?: boolean
  readonly iconColor?: string
  readonly isConfirmButtonLoading?: boolean
  readonly iconName?: IconName
  readonly modalTextKey?: LucaI18nLangKey
  readonly modalTitleKey?: LucaI18nLangKey
  readonly stopEventPropagation?: boolean
  readonly stopEventPropagationOnOverlayClick?: boolean
  readonly t?: LucaTFunction
  readonly textKey?: LucaI18nLangKey
  readonly titleKey?: LucaI18nLangKey
  readonly tooltipConfig?: TooltipConfig
}

export const OrlyButton: React.FC<OrlyButtonContainerProps & OrlyButtonProps & CustomStyle> = ({
  confirmButtonKey = "delete_button",
  customButtonStyles,
  customStyles,
  customModalStyles,
  disabled,
  iconColor = fontColorBright,
  iconName = IconName.Trash,
  isConfirmButtonLoading,
  modalTextKey,
  modalTitleKey,
  onConfirm,
  showConfirmDialog,
  stopEventPropagation = false,
  stopEventPropagationOnOverlayClick,
  t,
  textKey,
  titleKey,
  toggleConfirmDialog,
  tooltipConfig
}) => {
  const orlyButton = (
    <Button
      customStyles={customButtonStyles}
      disabled={disabled}
      icon={iconName}
      iconColor={iconColor}
      variant={textKey ? ButtonVariant.Primary : ButtonVariant.IconOnly}
      onClick={toggleConfirmDialog}
      title={titleKey && t ? t(titleKey) : undefined}
      stopEventPropagation={stopEventPropagation}>
      {textKey && t ? t(textKey) : undefined}
    </Button>
  )

  return (
    <div css={customStyles}>
      {tooltipConfig?.warningConfig !== undefined ? (
        <WarningTooltip
          inactive={tooltipConfig.warningConfig === undefined}
          warningConfig={tooltipConfig.warningConfig}>
          {orlyButton}
        </WarningTooltip>
      ) : (
        <Tooltip
          inactive={tooltipConfig === undefined}
          title={tooltipConfig?.labelKey && t ? t(tooltipConfig.labelKey) : ""}>
          {orlyButton}
        </Tooltip>
      )}

      {showConfirmDialog && (
        <Orly
          customStyles={customModalStyles}
          onConfirm={onConfirm}
          onDismiss={toggleConfirmDialog}
          isConfirmButtonLoading={isConfirmButtonLoading}
          confirmButtonKey={confirmButtonKey}
          titleKey={modalTitleKey}
          textKey={modalTextKey}
          stopEventPropagationOnOverlayClick={stopEventPropagationOnOverlayClick}
        />
      )}
    </div>
  )
}

export const OrlyButtonContainer: React.FC<OrlyButtonProps & CustomStyle> = ({isConfirmButtonLoading, ...rest}) => {
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false)
  const [isConfirmClicked, setIsConfirmClicked] = React.useState(false)
  const {t} = useLucaTranslation()

  React.useEffect(() => {
    if (isConfirmClicked && !isConfirmButtonLoading) {
      setShowConfirmDialog(false)
    }
  }, [isConfirmClicked, isConfirmButtonLoading])

  const handleConfirm = () => {
    rest.onConfirm()
    setIsConfirmClicked(true)

    if (rest.dismissOnConfirm) {
      setShowConfirmDialog(false)
    }
  }

  return (
    <OrlyButton
      t={t}
      toggleConfirmDialog={() => setShowConfirmDialog(!showConfirmDialog)}
      showConfirmDialog={showConfirmDialog}
      isConfirmButtonLoading={isConfirmButtonLoading}
      {...rest}
      onConfirm={handleConfirm}
    />
  )
}
