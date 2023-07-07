import {translations as esTranslationsBackoffice} from "./backoffice/es"
import {translations as esTranslationsPlayer} from "./player/es"
import {translations as esTranslationsShared} from "./shared/es"

export const translations = {
  ...esTranslationsPlayer,
  ...esTranslationsBackoffice,
  ...esTranslationsShared
}
