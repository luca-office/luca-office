import i18next from "i18next"
import * as React from "react"
import {IconName} from "../../enums"
import {useLucaTranslation} from "../../translations"
import {InfoColumn, SelectOptionCustomized} from ".."

interface Props {
  readonly footerText: string
}

export const InfoColumnContainer: React.FC<Props> = ({footerText}) => {
  const {t} = useLucaTranslation()

  const languageOptions: SelectOptionCustomized[] = [
    {
      label: t("lang_de"),
      value: "de-DE",
      iconName: IconName.German
    },
    {
      label: t("lang_en"),
      value: "en",
      iconName: IconName.English
    },
    {
      label: t("lang_es"),
      value: "es",
      iconName: IconName.Spanish
    }
  ]
  const handleSetStoredSelectedLanguage = (language: string) => i18next.changeLanguage(language)

  const activeLanguage = i18next.language

  return (
    <InfoColumn
      selectedLanguage={activeLanguage}
      optionList={languageOptions}
      onLanguageChange={handleSetStoredSelectedLanguage}
      t={t}
      footerText={footerText}
    />
  )
}
