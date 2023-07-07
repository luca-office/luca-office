import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {Icon} from "shared/components"
import {IconName} from "shared/enums"
import {ButtonConfig} from "shared/models"
import {CustomStyle, Flex, fontColorLight, spacingSmall, textEllipsis} from "shared/styles"
import {LucaI18nLangKey} from "shared/translations"
import {MetaEntryOverlayConfig} from "../../../models"
import {MetaEntry} from "../../meta-entry/meta-entry"

export interface EmailBodyMetaEntryProps<T> extends CustomStyle {
  readonly headerLabelKey?: LucaI18nLangKey
  readonly label: string
  readonly icon: IconName
  readonly isPlaceholder?: boolean
  readonly buttonConfig?: ButtonConfig
  readonly overlayConfig?: MetaEntryOverlayConfig<T>
  readonly disabled?: boolean
  readonly customModalStyles?: CSSInterpolation
}

export const EmailBodyMetaEntry = <T,>({
  headerLabelKey,
  label,
  icon,
  isPlaceholder,
  buttonConfig,
  overlayConfig,
  disabled,
  customModalStyles,
  customStyles
}: EmailBodyMetaEntryProps<T>) => (
  <MetaEntry
    customStyles={[styles.metaEntry, customStyles]}
    labelKey={headerLabelKey}
    buttonConfig={buttonConfig}
    overlayConfig={overlayConfig}
    disabled={disabled}
    customModalStyles={customModalStyles}>
    <div css={Flex.row}>
      <Icon {...{name: icon, ...(isPlaceholder && {customStyles: styles.placeholderIcon})}} />
      <div css={[textEllipsis, styles.label, isPlaceholder && styles.placeholderText]}>{label}</div>
    </div>
  </MetaEntry>
)

const styles = {
  metaEntry: css({
    "> div:last-of-type > div:first-of-type": {
      overflow: "hidden"
    }
  }),
  label: css({
    marginLeft: spacingSmall
  }),
  placeholderIcon: css({
    "> svg > g > g": {
      stroke: fontColorLight
    }
  }),
  placeholderText: css({
    color: fontColorLight
  })
}
