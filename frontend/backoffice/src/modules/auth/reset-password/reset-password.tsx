import {css} from "@emotion/react"
import * as React from "react"
import {Button, Column, Columns, Heading, InfoColumnContainer, Text, TextInput} from "shared/components"
import {HeadingLevel, InputType} from "shared/enums"
import {FontWeight, spacingHuger, spacingMedium, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {applicationVersion} from "../../../constants"
import {authStyles as styles} from "../auth.style"
import {useResetPassword} from "./hooks/useResetPassword"

interface Props {
  readonly token: string
  readonly email: string
}

export const ResetPassword: React.FC<Props> = ({token, email}) => {
  const {t} = useLucaTranslation()
  const {resetPassword, formMethods} = useResetPassword()
  const {register, trigger, handleSubmit, errors, getValues} = formMethods

  const onSubmit = handleSubmit(({passwordConfirm}) => {
    if (token !== "" && email !== "") {
      resetPassword(email, passwordConfirm, token)
    }
  })

  return (
    <>
      <Columns customStyles={styles.content}>
        <InfoColumnContainer footerText={applicationVersion} />
        <Column customStyles={resetPasswordStyles.column} flexGrow={4}>
          <form css={[styles.formWrapper]} onSubmit={onSubmit}>
            <Heading customStyles={styles.formHeader} level={HeadingLevel.h1}>
              {t("password_reset__new_password_title")}
            </Heading>
            <Text customStyles={styles.formHeader} size={TextSize.Medium}>
              {t("auth__reset_password")}
            </Text>
            <Heading
              customStyles={resetPasswordStyles.emailAddress}
              level={HeadingLevel.h3}
              fontWeight={FontWeight.Bold}>
              {email}
            </Heading>
            <TextInput
              ref={register({
                required: true
              })}
              type={InputType.password}
              name="password"
              customStyles={resetPasswordStyles.textInput}
              labelKey="password_reset__new_password"
              placeholderKey="password"
              hasValidationError={errors.password !== undefined}
            />

            <TextInput
              ref={register({
                validate: {
                  passwordEqual: value => value === getValues().password
                }
              })}
              onChange={() => trigger("passwordConfirm")}
              type={InputType.password}
              customStyles={resetPasswordStyles.textInput}
              name="passwordConfirm"
              labelKey="password_reset__new_password_repeat"
              placeholderKey="password"
              hasValidationError={errors.passwordConfirm !== undefined}
            />

            <Button customStyles={styles.button} disabled={errors.passwordConfirm !== undefined}>
              {t("password_reset__reset_confirm_button")}
            </Button>
          </form>
        </Column>
      </Columns>
    </>
  )
}

const resetPasswordStyles = {
  column: css({
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }),
  textInput: css({
    width: "100%",
    marginBottom: spacingMedium
  }),
  emailAddress: css({
    marginBottom: spacingHuger
  })
}
