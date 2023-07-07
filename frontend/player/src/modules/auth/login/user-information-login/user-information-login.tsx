import * as React from "react"
import {useForm} from "react-hook-form"
import {Button, ResetPasswordLink, Text, TextInput} from "shared/components"
import {InputType} from "shared/enums"
import {TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {emailRegexPattern} from "shared/utils"
import {styles} from "../styles"

interface Props {
  readonly login: (email: string, password: string) => void
  readonly loginLoading: boolean
  readonly onSignUpClicked: () => void
}

interface FormData {
  readonly email: string
  readonly password: string
}

export const UserInformationLogin: React.FC<Props> = ({login, onSignUpClicked, loginLoading}) => {
  const {register, handleSubmit, errors} = useForm<FormData>()
  const {t} = useLucaTranslation()

  const onSubmit = handleSubmit(({email, password}) => {
    login(email, password)
  })

  return (
    <div css={styles.formWrapper}>
      <form onSubmit={onSubmit}>
        <TextInput
          ref={register({
            required: true,
            pattern: emailRegexPattern
          })}
          type={InputType.text}
          name="email"
          customStyles={styles.input}
          labelKey="email"
          placeholderKey="email"
          hasValidationError={errors.email !== undefined}
        />

        <TextInput
          ref={register({required: true})}
          type={InputType.password}
          customStyles={styles.passwordInput}
          name="password"
          labelKey="password"
          placeholderKey="password"
          hasValidationError={errors.password !== undefined}
        />

        <ResetPasswordLink customStyles={styles.passwordForgottenText} />

        <Button customStyles={styles.button} isLoading={loginLoading} disabled={loginLoading}>
          {t(loginLoading ? "loading" : "login_button")}
        </Button>
      </form>

      <Text customStyles={styles.missingAccountText} size={TextSize.Medium}>
        {t("auth__no_account_existing")}
      </Text>
      <Text customStyles={[styles.registerNowText]} onClick={onSignUpClicked} size={TextSize.Medium}>
        {t("auth__sign_up_now")}
      </Text>
    </div>
  )
}
