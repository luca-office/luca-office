import {css} from "@emotion/react"
import * as React from "react"
import {CustomStyle, textEllipsis} from "../../styles"
import {useLucaTranslation} from "../../translations"
import {Text} from "../typography/typography"
import {useResetPasswordLink} from "./hooks/use-reset-password-link"
import {RequestPasswordResetEmailModal} from "./request-password-reset-email-modal"

export const ResetPasswordLink: React.FC<CustomStyle> = ({customStyles}) => {
  const {t} = useLucaTranslation()

  const {isResetOverlayVisible, showResetOverlay, hideResetOverlay} = useResetPasswordLink()

  return (
    <React.Fragment>
      <Text customStyles={[styles.label, customStyles]} onClick={showResetOverlay}>
        {t("password__reset")}
      </Text>
      {isResetOverlayVisible && <RequestPasswordResetEmailModal onDismiss={hideResetOverlay} />}
    </React.Fragment>
  )
}

const styles = {
  label: css(textEllipsis, {
    cursor: "pointer",
    "&:hover": {
      opacity: 0.8
    }
  })
}
