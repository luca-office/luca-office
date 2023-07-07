import {css} from "@emotion/react"
import * as React from "react"
import {Button, Heading, Paper, Text, TextInput} from "shared/components"
import {HeadingLevel, IconName, InputType} from "shared/enums"
import {
  buttonHeight,
  CustomStyle,
  errorColor,
  FontWeight,
  spacingLarge,
  spacingMedium,
  spacingTiny,
  textEllipsis,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {useReportingLoginCard} from "./hooks/use-reporting-login-card"

export interface ReportingLoginCardProps extends CustomStyle {
  readonly surveyId: UUID
  readonly token?: string
}

export const ReportingLoginCard: React.FC<ReportingLoginCardProps> = ({customStyles, surveyId, token}) => {
  const {t} = useLucaTranslation()

  const isTokenAvailable = token !== undefined
  const {
    loading,
    tokenInput,
    errorMessage: errorMessageOption,
    description,
    subDescription: subDescriptionOption,
    onChange,
    navigateToReporting
  } = useReportingLoginCard(surveyId, isTokenAvailable)

  const hasError = errorMessageOption.isDefined()

  const button = (
    <Button
      customStyles={styles.button(isTokenAvailable)}
      icon={IconName.PaperComplete}
      onClick={() => navigateToReporting(token ?? tokenInput)}
      isLoading={loading}>
      {t("reporting__show_reporting")}
    </Button>
  )
  const errorMessage = errorMessageOption
    .map(message => <Text customStyles={styles.errorMessage}>{message}</Text>)
    .orNull()

  return (
    <div css={[styles.content, customStyles]}>
      <Heading customStyles={styles.heading} level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
        {t("reporting__show_reporting")}
      </Heading>
      <Paper customStyles={styles.paper}>
        <div css={styles.descriptionWrapper(subDescriptionOption.isDefined())}>
          <Text size={TextSize.Medium}>{description}</Text>
          {subDescriptionOption.map(subDescription => <Text size={TextSize.Medium}>{subDescription}</Text>).orNull()}
        </div>
        {isTokenAvailable ? (
          <div css={styles.inputWrapper(hasError)}>
            {button}
            {hasError && errorMessage}
          </div>
        ) : (
          <div css={styles.tokenInputWrapper}>
            <div css={styles.content}>
              <Heading
                customStyles={[styles.heading, styles.tokenInputLabel]}
                level={HeadingLevel.h3}
                fontWeight={FontWeight.Bold}>
                {t("auth__entry_code")}
              </Heading>
              <div css={styles.inputWrapper(hasError)}>
                <TextInput
                  type={InputType.text}
                  placeholderKey={"auth__entry_code"}
                  value={tokenInput}
                  onChange={onChange}
                />
                {hasError && errorMessage}
              </div>
            </div>
            {button}
          </div>
        )}
      </Paper>
    </div>
  )
}

const Size = {
  button: 276,
  tokenInputLabel: 20
}

const styles = {
  content: css({
    display: "grid",
    gridTemplateRows: "minmax(min-content, max-content) 1fr",
    gridRowGap: spacingTiny
  }),
  heading: css(textEllipsis, {
    letterSpacing: 0.15
  }),
  errorMessage: css({
    letterSpacing: 0,
    color: errorColor
  }),
  paper: css({
    display: "grid",
    gridTemplateRows: "repeat(2, minmax(min-content, max-content))",
    gridRowGap: spacingMedium,
    padding: spacingMedium
  }),
  descriptionWrapper: (hasSubDescription: boolean) =>
    css({
      display: "grid",
      gridTemplateRows: `repeat(${hasSubDescription ? 2 : 1}, minmax(min-content, max-content))`,
      gridRowGap: hasSubDescription ? spacingLarge : "initial"
    }),
  tokenInputWrapper: css({
    display: "grid",
    gridTemplateColumns: "1fr minmax(min-content, max-content)",
    gridColumnGap: spacingMedium
  }),
  tokenInputLabel: css({
    height: Size.tokenInputLabel
  }),
  inputWrapper: (hasErrorMessage: boolean) =>
    css({
      display: "grid",
      gridTemplateRows: `repeat(${hasErrorMessage ? 2 : 1}, minmax(min-content, max-content))`,
      gridRowGap: hasErrorMessage ? spacingTiny : "initial"
    }),
  button: (isTokenAvailable: boolean) =>
    css({
      height: buttonHeight,
      minWidth: Size.button,
      ...(isTokenAvailable
        ? {
            margin: "0 auto"
          }
        : {
            // token-input label height + spacing input/token-input label
            marginTop: Size.tokenInputLabel + spacingTiny
          })
    })
}
