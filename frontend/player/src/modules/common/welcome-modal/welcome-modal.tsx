import {css} from "@emotion/react"
import React from "react"
import {Modal, Text} from "shared/components"
import {flex0, flex1, spacingHuge, spacingMedium, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"

export interface WelcomeModalProps {
  onStartClicked: () => void
  title: string
  welcomeText?: string
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({title, onStartClicked, welcomeText}) => {
  const {t} = useLucaTranslation()

  return (
    <Modal
      onConfirm={onStartClicked}
      customStyles={styles.modal}
      confirmButtonKey={"continue_button"}
      title={title}
      customOverlayStyles={styles.overlayOutsideClickContainer}
      customHeaderStyles={styles.heading}
      customContentStyles={styles.modalContent}
      customFooterStyles={styles.footer}>
      <Text customStyles={styles.content}>{welcomeText || t("project__welcome_dialog_success_wishes")}</Text>
    </Modal>
  )
}

const styles = {
  overlayOutsideClickContainer: css({
    "> div": css({
      display: "flex",
      height: "95%"
    })
  }),
  modal: css({
    width: "50vw",
    margin: "auto",
    maxHeight: "95%"
  }),
  modalContent: css({
    flex: flex1,
    overflow: "auto",
    marginBottom: spacingMedium
  }),
  heading: css({
    flex: flex0,
    fontSize: TextSize.Medium
  }),
  content: css({
    marginBottom: spacingHuge,
    whiteSpace: "pre-line"
  }),
  footer: css({
    flex: flex0
  })
}
