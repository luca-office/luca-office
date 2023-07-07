import React from "react"
import {Text} from "shared/components"
import {TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations/luca-translation"
import {styles} from "../styles"

export const AuthWelcome: React.FC = () => {
  const {t} = useLucaTranslation()

  return (
    <>
      <Text customStyles={styles.textHeading} size={TextSize.Medium}>
        {t("welcome_office")}
      </Text>
      <Text customStyles={styles.textHeading} size={TextSize.Medium}>
        {t("welcome_office_text")}
      </Text>
    </>
  )
}
