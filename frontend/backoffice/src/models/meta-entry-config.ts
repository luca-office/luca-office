import * as React from "react"
import {ButtonConfig} from "shared/models"
import {LucaI18nLangKey} from "shared/translations"

export interface MetaEntryConfig {
  readonly labelKey: LucaI18nLangKey
  readonly content: React.ReactNode
  readonly buttonConfig: ButtonConfig
}
