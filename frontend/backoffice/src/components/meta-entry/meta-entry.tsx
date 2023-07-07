import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {ReadonlyActionField} from "shared/components"
import {ButtonConfig} from "shared/models"
import {CustomStyle} from "shared/styles"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"
import {MetaEntryOverlayConfig} from "../../models"
import {OverlayEditField} from "../overlay-edit-field/overlay-edit-field"

export interface MetaEntryProps<T> extends CustomStyle {
  readonly labelKey?: LucaI18nLangKey
  readonly buttonConfig?: ButtonConfig
  readonly overlayConfig?: MetaEntryOverlayConfig<T>
  readonly disabled?: boolean
  readonly customModalStyles?: CSSInterpolation
}

export const MetaEntry = <T,>({
  customStyles,
  labelKey,
  buttonConfig,
  overlayConfig,
  disabled,
  customModalStyles,
  children
}: React.PropsWithChildren<MetaEntryProps<T>>) => {
  const {t} = useLucaTranslation()
  return buttonConfig ? (
    <ReadonlyActionField
      customStyles={customStyles}
      buttonLabel={t(buttonConfig.labelKey)}
      label={labelKey ? t(labelKey) : undefined}
      disabled={disabled || buttonConfig.disabled}
      onClick={buttonConfig.onClick}
      renderValue={() => children}
    />
  ) : overlayConfig ? (
    <OverlayEditField
      {...{
        customStyles,
        customModalStyles,
        disabled,
        fieldLabelKey: labelKey,
        dialogTitleKey: overlayConfig.dialogTitleKey,
        dialogDescriptionKey: overlayConfig.dialogDescriptionKey,
        updateLoading: overlayConfig.updateLoading,
        formFields: overlayConfig.formFields,
        onUpdate: overlayConfig.onConfirm,
        renderValue: () => children
      }}
    />
  ) : null
}
