import * as React from "react"
import {UseFormMethods} from "react-hook-form"
import {
  Button,
  Column,
  Columns,
  FormErrorText,
  Heading,
  InfoColumn,
  InfoColumnContainer,
  Paper,
  Text,
  TextInput
} from "shared/components"
import {HeadingLevel, InputType} from "shared/enums"
import {FontWeight, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {isDefined, Option} from "shared/utils"
import {applicationVersion} from "../../../constants"
import {styles} from "../styles"

export interface LoginProps {
  readonly errorCode: Option<string>
  readonly surveyInvitationHasBeenCalled: boolean
  readonly surveyInvitationLoading: boolean
  readonly verifyEntryToken: (token: string) => void
  readonly formData: UseFormMethods<VerifyTokenFormData>
  readonly isLoading?: boolean
}

export interface VerifyTokenFormData {
  readonly token: string
}

export const VerifyToken: React.FC<LoginProps> = ({
  errorCode,
  surveyInvitationHasBeenCalled,
  surveyInvitationLoading,
  verifyEntryToken,
  formData,
  isLoading = false
}) => {
  const {t} = useLucaTranslation()

  const [isFormErrorVisible, setIsFormErrorVisible] = React.useState(true)

  const {handleSubmit, errors, register} = formData

  const onSubmit = handleSubmit(({token}) => {
    verifyEntryToken(token)
    setIsFormErrorVisible(true)
  })

  const getFormErrorText = () => {
    if (isDefined(errors.token)) {
      return <FormErrorText>{errors.token?.message}</FormErrorText>
    }

    if (surveyInvitationHasBeenCalled && !surveyInvitationLoading && isFormErrorVisible) {
      return errorCode
        .map((error: string) => {
          switch (error) {
            case "SurveyNotStartedYet":
              return <FormErrorText>{t("auth__enter_code_error_survey_not_started")}</FormErrorText>
            case "TokenAlreadyUsed":
              return <FormErrorText>{t("auth__enter_code_error_survey_already_completed")}</FormErrorText>
            case "SurveyAlreadyEnded":
              return <FormErrorText>{t("auth__enter_code_error_survey_ended")}</FormErrorText>
            default:
              return <FormErrorText>{t("auth__enter_code_error_no_project")}</FormErrorText>
          }
        })
        .getOrElse(<FormErrorText>{t("auth__enter_code_error_no_project")}</FormErrorText>)
    }

    return null
  }

  return (
    <div css={styles.contentWrapper}>
      <Columns customStyles={styles.content}>
        <InfoColumnContainer footerText={applicationVersion} />
        <Column customStyles={styles.loginColumn} flexGrow={4}>
          <form onSubmit={onSubmit}>
            <Text customStyles={styles.textHeading} size={TextSize.Medium}>
              {t("welcome_office")}
            </Text>
            <Text customStyles={styles.textHeading} size={TextSize.Medium}>
              {t("welcome_office_text")}
            </Text>

            <Heading level={HeadingLevel.h3} customStyles={styles.label} fontWeight={FontWeight.Bold}>
              {t("project")}
            </Heading>

            <Paper>
              <Text customStyles={styles.textHeading} size={TextSize.Medium}>
                {t("auth__enter_code_help_text")}
              </Text>
              <div css={styles.entryCodeWrapper}>
                <TextInput
                  ref={register({
                    required: t("auth__entry_code_mandatory"),
                    minLength: {value: 6, message: t("auth__entry_code_length_of_six")},
                    maxLength: {value: 6, message: t("auth__entry_code_length_of_six")}
                  })}
                  type={InputType.text}
                  customStyles={styles.entryCodeInput}
                  name="token"
                  labelKey="auth__entry_code"
                  placeholderKey="auth__entry_code_placeholder"
                  hasValidationError={errors.token !== undefined}
                  onChange={() => isFormErrorVisible && setIsFormErrorVisible(false)}
                />

                <Button customStyles={styles.button} isLoading={isLoading}>
                  {t("auth__entry_code_verify")}
                </Button>
              </div>
              {getFormErrorText()}
            </Paper>
          </form>
        </Column>
      </Columns>
    </div>
  )
}
