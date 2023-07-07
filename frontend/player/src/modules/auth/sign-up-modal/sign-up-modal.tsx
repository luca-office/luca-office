import {css} from "@emotion/react"
import * as React from "react"
import {useForm} from "react-hook-form"
import {Modal, Overlay} from "shared/components"
import {useLucaTranslation} from "shared/translations"
import {useSignUpModal} from "./hooks/use-sign-up-modal"
import {SignUpForm, SignUpFormData} from "./sign-up-form/sign-up-form"

interface Props {
  readonly onDismiss: () => void
}

export const SignUpModal: React.FC<Props> = ({onDismiss}) => {
  const {t} = useLucaTranslation()
  const {signUp, signUpLoading} = useSignUpModal()
  const formMethods = useForm<SignUpFormData>()

  const onSubmit = (formValues: SignUpFormData) => {
    signUp({
      email: formValues.email,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      organization: "",
      salutation: formValues.salutation,
      password: formValues.password,
      hasConfirmedBackofficeTermsAndConditions: false
    }).then(onDismiss)
  }

  return (
    <Overlay>
      <Modal
        confirmButtonKey={signUpLoading ? "loading" : "confirm_button"}
        title={t("auth__sign_up_now_alt")}
        onDismiss={onDismiss}
        customStyles={styles.modal}
        confirmButtonDisabled={signUpLoading}
        isConfirmButtonLoading={signUpLoading}
        onConfirm={formMethods.handleSubmit(onSubmit)}>
        <SignUpForm formMethods={formMethods} />
      </Modal>
    </Overlay>
  )
}

const styles = {
  modal: css({width: 600})
}
