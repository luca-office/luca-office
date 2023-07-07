import {css} from "@emotion/react"
import {partial} from "lodash-es"
import * as React from "react"
import {useForm} from "react-hook-form"
import {
  Button,
  Column,
  Columns,
  Heading,
  InfoColumnContainer,
  ResetPasswordLink,
  Text,
  TextInput
} from "shared/components"
import {ButtonVariant, HeadingLevel, InputType} from "shared/enums"
import {spacingSmall, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {emailRegexPattern} from "shared/utils"
import {applicationVersion} from "../../../constants"
import {Route} from "../../../routes"
import {authStyles as styles} from "../auth.style"

interface Props {
  readonly login: (email: string, password: string) => void
  readonly loginLoading: boolean
  readonly navigate: (route: Route) => void
}

interface FormData {
  readonly email: string
  readonly password: string
}

export const Login: React.FC<Props> = ({login, navigate, loginLoading}) => {
  const {register, handleSubmit, errors} = useForm<FormData>()
  const {t} = useLucaTranslation()

  const onSubmit = handleSubmit(({email, password}) => {
    login(email, password)
  })

  return (
    <>
      <Columns customStyles={styles.content}>
        <InfoColumnContainer footerText={applicationVersion} />
        <Column flexGrow={4}>
          <form css={styles.formWrapper} onSubmit={onSubmit}>
            <Heading customStyles={styles.formHeader} level={HeadingLevel.h1}>
              {t("login")}
            </Heading>
            <Text customStyles={styles.formText} size={TextSize.Medium}>
              {t("login_hint")}
            </Text>
            <TextInput
              ref={register({
                required: true,
                pattern: emailRegexPattern
              })}
              type={InputType.text}
              name="email"
              customStyles={textInputStyles}
              labelKey="email"
              placeholderKey="email"
              hasValidationError={errors.email !== undefined}
            />

            <TextInput
              ref={register({required: true})}
              type={InputType.password}
              name="password"
              labelKey="password"
              placeholderKey="password"
              hasValidationError={errors.password !== undefined}
            />

            <ResetPasswordLink customStyles={styles.passwordForgottenText} />

            <Button customStyles={[styles.button, styles.buttonFirst]} isLoading={loginLoading} disabled={loginLoading}>
              {t(loginLoading ? "loading" : "login_button")}
            </Button>

            <Button
              variant={ButtonVariant.Ghost}
              onClick={partial(navigate, Route.Register)}
              customStyles={styles.button}>
              {t("to_register")}
            </Button>
          </form>
        </Column>
      </Columns>
    </>
  )
}

const textInputStyles = css({
  width: "100%",
  marginBottom: spacingSmall
})
