import * as React from "react"
import {EmailDirectory} from "../../../graphql/generated/globalTypes"
import {LocalEmail, ParticipantData, SampleCompany} from "../../../models"
import {useLucaTranslation} from "../../../translations"
import {getSenderAndRecipient, Option} from "../../../utils"
import {getArrivalTimeLabel} from "../utils"
import {styles} from "./email-details.style"

export interface EmailInfoProps {
  readonly localEmail: LocalEmail
  readonly scenarioStartedAt: Option<Date>
  readonly scenarioFictiveDate: Option<Date>
  readonly sampleCompany: Option<SampleCompany>
  readonly participantData: Option<ParticipantData>
}

export const EmailInfo: React.FC<EmailInfoProps> = ({
  localEmail,
  scenarioStartedAt,
  scenarioFictiveDate,
  sampleCompany,
  participantData
}) => {
  const {t} = useLucaTranslation()
  const isCcVisible = localEmail.ccRecipients.length > 0 && localEmail.directory === EmailDirectory.Sent

  const emailWithCorrectSenderAndRecipient = {
    ...localEmail,
    ...getSenderAndRecipient(localEmail, participantData, sampleCompany)
  }

  return (
    <div css={styles.info}>
      <div css={styles.infoSenderRow}>
        <span css={styles.infoSenderLabel}>{emailWithCorrectSenderAndRecipient.sender}</span>
        <span>
          {getArrivalTimeLabel({
            email: emailWithCorrectSenderAndRecipient,
            t,
            isLabeledWithDay: true,
            scenarioStartedAt,
            scenarioFictiveDate
          })}
        </span>
      </div>
      <div css={styles.infoSubject}>
        <span>{emailWithCorrectSenderAndRecipient.subject}</span>
      </div>

      <div css={styles.infoRecipient}>
        {isCcVisible && (
          <div css={styles.infoCc}>{`${t("email__cc")}: ${emailWithCorrectSenderAndRecipient.ccRecipients}`}</div>
        )}
        <div>{`${t("email__to")}: ${emailWithCorrectSenderAndRecipient.recipient}`}</div>
      </div>
    </div>
  )
}
