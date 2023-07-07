import {css} from "@emotion/react"
import React from "react"
import {Modal, Text} from "shared/components"
import {spacingSmall} from "shared/styles"
import {useLucaTranslation} from "shared/translations"

interface Props {
  readonly onConfirm: () => void
  readonly onDismiss: () => void
}

export const StartNextModuleModal: React.FC<Props> = ({onConfirm, onDismiss}) => {
  const {t} = useLucaTranslation()
  return (
    <Modal
      customStyles={styles.modal}
      onDismiss={onDismiss}
      confirmButtonKey="projects__surveys_details_dashboard_next_module_modal_confirm_button"
      onConfirm={onConfirm}
      title={t("projects__surveys_details_dashboard_next_module_modal_title")}>
      <Text>{t("projects__surveys_details_dashboard_next_module_modal_text_1")}</Text>
      <Text customStyles={styles.text}>{t("projects__surveys_details_dashboard_next_module_modal_text_2")}</Text>
    </Modal>
  )
}

const styles = {
  modal: css({
    width: "50vw"
  }),
  text: css({
    marginTop: spacingSmall
  })
}
