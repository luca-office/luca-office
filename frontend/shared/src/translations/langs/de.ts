// Do not use nested keys to provide full type safety for
// translation keys!

// syntax: <module/area>__<function>__component, words separated by _

import {translations as deTranslationsBackoffice} from "./backoffice/de"
import {translations as deTranslationsPlayer} from "./player/de"
import {translations as deTranslationsShared} from "./shared/de"

export const translations = {
  ...deTranslationsShared,
  ...deTranslationsBackoffice,
  ...deTranslationsPlayer
}
