// Do not use nested keys to provide full type safety for
// translation keys!

// syntax: <module/area>__<function>__component, words separated by _

import {translations as enTranslationsBackoffice} from "./backoffice/en"
import {translations as enTranslationsPlayer} from "./player/en"
import {translations as enTranslationsShared} from "./shared/en"

export const translations = {
  ...enTranslationsPlayer,
  ...enTranslationsBackoffice,
  ...enTranslationsShared
}
