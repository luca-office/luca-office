import {css} from "@emotion/react"
import * as React from "react"
import {InputType} from "../../../enums"
import {spacingMedium, spacingSmall} from "../../../styles"
import {useLucaTranslation} from "../../../translations"
import {emailRegexPattern} from "../../../utils"
import {TextInput} from "../../input"
import {Modal} from "../../modal/modal"
import {Overlay} from "../../overlay/overlay"
import {Text} from "../../typography/typography"
import {ResetPasswordForm, useRequestPasswordResetEmail} from "./hooks/use-request-password-reset-email-modal"

interface Props {
  readonly onDismiss: () => void
}

export const RequestPasswordResetEmailModal: React.FC<Props> = ({onDismiss}) => {
  const {t} = useLucaTranslation()
  const {formMethods, requestPasswordResetEmail, showSuccessModal} = useRequestPasswordResetEmail()
  const {register, handleSubmit, errors} = formMethods

  const onSubmit = (formValues: ResetPasswordForm) => {
    requestPasswordResetEmail(formValues.email).then(() => {
      showSuccessModal()
      onDismiss()
    })
  }
  return (
    <Overlay>
      <Modal
        confirmButtonKey={"password_reset__confirm_button"}
        customButtonStyles={styles.confirmButton}
        title={t("password_reset__title")}
        onDismiss={onDismiss}
        customStyles={styles.modal}
        onConfirm={handleSubmit(onSubmit)}>
        <Text>{t("auth__request_password_reset")}</Text>
        <div css={styles.inputWrapper}>
          <TextInput
            ref={register({
              required: true,
              pattern: emailRegexPattern
            })}
            placeholderKey="email"
            customStyles={styles.input}
            name="email"
            hasValidationError={!!errors?.email}
            type={InputType.text}
            labelKey={"email"}
          />
        </div>
      </Modal>
    </Overlay>
  )
}

const styles = {
  modal: css({width: 600}),
  input: css({
    width: "100%",
    marginBottom: spacingSmall
  }),
  inputWrapper: css({
    marginTop: spacingMedium
  }),
  confirmButton: css({
    paddingLeft: spacingMedium,
    paddingRight: spacingMedium
  })
}
