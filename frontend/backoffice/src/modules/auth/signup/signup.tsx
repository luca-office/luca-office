import {css} from "@emotion/react"
import * as React from "react"
import {useState} from "react"
import {Controller, useForm} from "react-hook-form"
import {Button, Column, Columns, CustomSelect, Heading, InfoColumnContainer, Text, TextInput} from "shared/components"
import {ButtonVariant, HeadingLevel, InputType} from "shared/enums"
import {Salutation, UserAccountCreation} from "shared/graphql/generated/globalTypes"
import {spacingMedium, spacingSmall, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {applicationVersion} from "../../../constants"
import {authStyles as styles} from "../auth.style"
import {BackofficeTermsAndConditionsConfirmation} from "../privacy-policy/backoffice-terms-and-conditions-confirmation"

interface Props {
  readonly onSubmit: (creation: UserAccountCreation) => void
  readonly navigateToLogin: () => void
  readonly registerLoading: boolean
}

interface FormData {
  readonly email: string
  readonly password: string
  readonly firstName: string
  readonly lastName: string
  readonly organization: string
  readonly salutation: Salutation
}

export const Signup: React.FC<Props> = ({registerLoading, ...props}) => {
  const {t} = useLucaTranslation()
  const {register, handleSubmit, errors, control} = useForm<FormData>()
  const [
    hasConfirmedBackofficeTermsAndConditionsChecked,
    setHasConfirmedBackofficeTermsAndConditionsChecked
  ] = useState(false)

  const onSubmit = handleSubmit(data => {
    props.onSubmit({...data, hasConfirmedBackofficeTermsAndConditions: hasConfirmedBackofficeTermsAndConditionsChecked})
  })

  return (
    <>
      <Columns customStyles={styles.content}>
        <InfoColumnContainer footerText={applicationVersion} />
        <Column flexGrow={4}>
          <form onSubmit={onSubmit} css={styles.formWrapper}>
            <Heading customStyles={styles.formHeader} level={HeadingLevel.h1}>
              {t("register")}
            </Heading>
            <Text customStyles={styles.formText} size={TextSize.Medium}>
              {t("register_hint")}
            </Text>
            <Controller
              render={({onChange, value}) => (
                <CustomSelect
                  customStyles={selectInputStyles}
                  onChange={onChange}
                  value={value}
                  labelKey="salutation_long"
                  name="salutation"
                  optionList={[
                    {value: Salutation.Mrs, label: t("mrs")},
                    {value: Salutation.Mr, label: t("mr")},
                    {value: Salutation.NonBinary, label: t("non_binary")}
                  ]}
                />
              )}
              control={control}
              name="salutation"
              rules={{required: true}}
              defaultValue={Salutation.Mrs}
            />
            <TextInput
              type={InputType.text}
              customStyles={textInputStyles}
              labelKey="email"
              name="email"
              ref={register({required: true})}
              placeholderKey="email"
              hasValidationError={errors.email !== undefined}
            />
            <TextInput
              type={InputType.password}
              customStyles={textInputStyles}
              name="password"
              labelKey="password"
              ref={register({required: true})}
              placeholderKey="password"
              hasValidationError={errors.password !== undefined}
            />

            <TextInput
              type={InputType.text}
              customStyles={textInputStyles}
              name="firstName"
              labelKey="first_name"
              ref={register({required: true})}
              placeholderKey="first_name"
              hasValidationError={errors.firstName !== undefined}
            />
            <TextInput
              name="lastName"
              type={InputType.text}
              customStyles={textInputStyles}
              labelKey="last_name"
              ref={register({required: true})}
              placeholderKey="last_name"
              hasValidationError={errors.lastName !== undefined}
            />

            <TextInput
              name="organization"
              type={InputType.text}
              customStyles={textInputStyles}
              labelKey="organization"
              ref={register({required: true})}
              placeholderKey="organization"
              hasValidationError={errors.organization !== undefined}
            />

            <BackofficeTermsAndConditionsConfirmation
              hasConfirmedBackofficeTermsAndConditions={hasConfirmedBackofficeTermsAndConditionsChecked}
              onHasConfirmedBackofficeTermsAndConditionsChanged={setHasConfirmedBackofficeTermsAndConditionsChecked}
            />

            <Button
              customStyles={[styles.button, styles.buttonFirst]}
              isLoading={registerLoading}
              disabled={registerLoading || !hasConfirmedBackofficeTermsAndConditionsChecked}>
              {t(registerLoading ? "loading" : "signup_button")}
            </Button>
            <Button variant={ButtonVariant.Ghost} onClick={props.navigateToLogin} customStyles={styles.button}>
              {t("to_login")}
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

const selectInputStyles = css({
  width: "100%",
  marginBottom: spacingMedium
})
