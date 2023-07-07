import {css} from "@emotion/react"
import {StringMap, TOptions} from "i18next"
import * as React from "react"
import {LucaI18nLangKey, useLucaTranslation} from "../../translations"
import {convertSecondsToMinutes} from "../../utils"
import {Modal, Text} from ".."

interface Props {
  readonly title: string
  readonly textKey: LucaI18nLangKey
  readonly textKeyOptions: TOptions<StringMap>
  readonly onConfirm: () => void
}

export const ProjectModuleTimeElapsedModal: React.FC<Props> = ({title, textKey, textKeyOptions, onConfirm}) => {
  const {t} = useLucaTranslation()
  return (
    <Modal
      onConfirm={onConfirm}
      customStyles={styles}
      confirmButtonKey={"continue_button"}
      title={t("scenario_time_up_title", {title})}>
      <Text>{t(textKey, textKeyOptions)}</Text>
    </Modal>
  )
}

const styles = css({
  width: "30%",
  margin: "0 auto"
})
