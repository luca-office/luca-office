import {LucaI18nLangKey} from "shared/translations"
import {OverlayEditCompositeFieldConfig} from "../components"

export interface MetaEntryOverlayConfig<T> {
  readonly dialogTitleKey: LucaI18nLangKey
  readonly onConfirm: (update: T) => void
  readonly updateLoading: boolean
  readonly formFields: OverlayEditCompositeFieldConfig[]
  readonly dialogDescriptionKey?: LucaI18nLangKey
}
