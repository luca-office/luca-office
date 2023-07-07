import {css} from "@emotion/react"
import * as React from "react"
import {Controller, UseFormMethods} from "react-hook-form"
import {Column, Columns, CustomSelect, Heading, Paper, Text, TextInput} from "shared/components"
import {HeadingLevel, InputType} from "shared/enums"
import {FontWeight, spacingHuge, spacingLarge, spacingMedium, spacingSmall, spacingTiny, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {emailRegexPattern} from "shared/utils"
import {Salutation} from "../../../../graphql/generated/globalTypes"

interface Props {
  readonly formMethods: UseFormMethods<SignUpFormData>
}

export interface SignUpFormData {
  readonly salutation: Salutation
  readonly firstName: string
  readonly lastName: string
  readonly email: string
  readonly password: string
  readonly passwordRepeat: string
}

export const SignUpForm: React.FC<Props> = ({formMethods}) => {
  const {register, errors, getValues, control} = formMethods

  const {t} = useLucaTranslation()

  return (
    <div css={styles.userInformation}>
      <Heading level={HeadingLevel.h3} customStyles={styles.heading} fontWeight={FontWeight.Bold}>
        {t("auth__user_information")}
      </Heading>

      <Paper>
        <Text customStyles={styles.infoText} size={TextSize.Smaller}>
          {t("auth__user_information_help_text")}
        </Text>
        <Controller
          render={({onChange, value}) => (
            <CustomSelect
              optionList={[
                {label: `${t("mr")}`, value: Salutation.Mr},
                {label: `${t("mrs")}`, value: Salutation.Mrs},
                {label: `${t("non_binary")}`, value: Salutation.NonBinary}
              ]}
              onChange={onChange}
              value={value}
              labelKey="auth__salutation_label"
              customStyles={styles.input}
              name="salutation"
            />
          )}
          control={control}
          name="salutation"
          rules={{required: true}}
          defaultValue={Salutation.Mrs}
        />
        <Columns>
          <Column>
            <TextInput
              ref={register({
                required: true
              })}
              type={InputType.text}
              name="firstName"
              customStyles={styles.input}
              labelKey="first_name"
              placeholderKey="first_name"
              hasValidationError={errors.firstName !== undefined}
            />
          </Column>
          <Column>
            <TextInput
              ref={register({
                required: true
              })}
              type={InputType.text}
              name="lastName"
              customStyles={styles.input}
              labelKey="last_name"
              placeholderKey="last_name"
              hasValidationError={errors.lastName !== undefined}
            />
          </Column>
        </Columns>
      </Paper>

      <div css={styles.registerData}>
        <Heading level={HeadingLevel.h3} customStyles={styles.heading} fontWeight={FontWeight.Bold}>
          {t("auth__user_signup_data")}
        </Heading>

        <Paper>
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
          <Columns>
            <Column>
              <TextInput
                ref={register({required: true})}
                type={InputType.password}
                customStyles={styles.input}
                name="password"
                labelKey="password"
                placeholderKey="password"
                hasValidationError={errors.password !== undefined}
              />
            </Column>
            <Column>
              <TextInput
                ref={register({
                  required: true,
                  validate: {
                    passwordEqual: value => value === getValues().password
                  }
                })}
                type={InputType.password}
                customStyles={styles.input}
                name="password_repeat"
                labelKey="password_repeat"
                placeholderKey="password_repeat"
                hasValidationError={errors.password !== undefined}
              />
            </Column>
          </Columns>
        </Paper>
      </div>
    </div>
  )
}

const styles = {
  userInformation: css({
    marginTop: spacingLarge,
    marginBottom: spacingHuge
  }),
  registerData: css({marginTop: spacingHuge}),
  label: css({
    marginBottom: spacingSmall
  }),
  heading: css({
    marginBottom: spacingTiny
  }),
  infoText: css({
    marginBottom: spacingMedium
  }),
  text: css({marginTop: spacingSmall}),
  input: css({
    width: "100%",
    marginBottom: spacingSmall
  })
}
