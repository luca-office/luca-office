import * as React from "react"
import {Column, Columns, FormErrorText, InfoColumnContainer} from "shared/components"
import {useLucaTranslation} from "shared/translations"
import {isDefined, Option} from "shared/utils"
import {applicationVersion} from "../../../constants"
import {ReportingLoginCard} from "../../reporting"
import {AuthWelcome} from "../auth-welcome/auth-welcome"
import {styles} from "../styles"

interface Props {
  readonly isLoading: boolean
  readonly surveyId: Option<string>
  readonly errorCode: Option<string>
}

export const OpenParticipation: React.FC<Props> = ({surveyId: surveyIdOption, errorCode}) => {
  const {t} = useLucaTranslation()

  const hasSurveyEnded = errorCode.map(code => code === "SurveyAlreadyEnded").getOrElse(false)
  const errorText = errorCode
    .map(_ => {
      switch (_) {
        case "EntityNotFound":
          return t("auth__open_participation_error_not_found")
        case "OpenParticipationIsDisabled":
          return t("auth__open_participation_error_not_qualified")
        case "SurveyAlreadyEnded":
          return t("auth__open_participation_error_not_ongoing")
        default:
          return t("error_general")
      }
    })
    .orNull()

  return (
    <div css={styles.contentWrapper}>
      <Columns customStyles={styles.content}>
        <InfoColumnContainer footerText={applicationVersion} />
        <Column customStyles={styles.loginColumn} flexGrow={4}>
          <AuthWelcome />

          {hasSurveyEnded
            ? surveyIdOption.map(surveyId => <ReportingLoginCard surveyId={surveyId} />).orNull()
            : isDefined(errorText) && <FormErrorText>{errorText}</FormErrorText>}
        </Column>
      </Columns>
    </div>
  )
}
