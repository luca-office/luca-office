import {css} from "@emotion/react"
import * as i18next from "i18next"
import * as React from "react"
import {HeadingLevel} from "../../enums"
import {FontWeight, spacingTiny} from "../../styles"
import {LucaI18nLangKey} from "../../translations/luca-i18n-lang"
import {WithLucaTranslation, withLucaTranslation} from "../../translations/luca-translation"
import {Heading} from ".."

interface Props extends WithLucaTranslation {
  readonly textKey: LucaI18nLangKey
  readonly textKeyOptions?: i18next.TOptions | string
}

const FormFieldLabelComponent: React.FC<Props> = ({textKey, textKeyOptions, t}) => {
  return (
    <Heading customStyles={styles} fontWeight={FontWeight.Bold} level={HeadingLevel.h3}>
      {t(textKey, textKeyOptions)}
    </Heading>
  )
}

const styles = css({
  marginBottom: spacingTiny
})

export const FormFieldLabel = withLucaTranslation()(FormFieldLabelComponent)
