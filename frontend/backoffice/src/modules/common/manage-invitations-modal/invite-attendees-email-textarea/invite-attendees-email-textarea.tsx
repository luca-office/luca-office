import * as React from "react"
import {Heading, Paper, Text, TextArea} from "shared/components"
import {HeadingLevel} from "shared/enums"
import {TextSize} from "shared/styles"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"
import {EmailAddressesMetadata} from "../models/email-addresses-metadata"
import {styles} from "./invite-attendees-email-textarea.style"

export interface InviteAttendeesEmailTextareaProps {
  readonly onTextAreaChange: (text: string) => void
  readonly textAreaValue: string
  readonly emailAddresseesMetadata: EmailAddressesMetadata
  readonly customInfoTextKey?: LucaI18nLangKey
  readonly disabled?: boolean
}

export const InviteAttendeesEmailTextarea: React.FC<InviteAttendeesEmailTextareaProps> = ({
  onTextAreaChange,
  textAreaValue,
  emailAddresseesMetadata,
  customInfoTextKey,
  disabled
}) => {
  const {t} = useLucaTranslation()

  const containsAlreadyInvitedAddress = !!emailAddresseesMetadata.alreadyInvitedAddresses.length
  const hasDuplicatedAddress = !!emailAddresseesMetadata.duplicatedAddresses.length

  const getHelperText = (): string => {
    if (containsAlreadyInvitedAddress) {
      return t("projects__survey_details_invite_emails_already_invited")
    } else if (hasDuplicatedAddress) {
      return t("projects__survey_details_invite_emails_duplications")
    } else if (emailAddresseesMetadata.hasInvalidAddress) {
      return t("projects__survey_details_invite_emails_invalid")
    } else {
      return t("projects__survey_details_invite_emails_number_of_valid_addresses", {
        number: emailAddresseesMetadata.uniqueAddresses.length
      })
    }
  }

  const hasValidationError =
    hasDuplicatedAddress || containsAlreadyInvitedAddress || emailAddresseesMetadata.hasInvalidAddress

  return (
    <Paper customStyles={styles.wrapper}>
      <Heading customStyles={styles.heading} level={HeadingLevel.h3}>
        {t("projects__survey_details_invite_emails_heading")}
      </Heading>
      <Text customStyles={styles.helpText} size={TextSize.Smaller}>
        {t(customInfoTextKey ?? "projects__survey_details_invite_emails_help_text")}
      </Text>
      <TextArea
        customStyles={styles.textarea}
        disabled={disabled}
        placeholder={t("projects__survey_details_invite_emails_placeholder")}
        onChange={evt => onTextAreaChange(evt.currentTarget.value)}
        value={textAreaValue}
        rows={7}
        hasValidationError={hasValidationError}
      />
      <Text customStyles={styles.validityCheck(!hasValidationError)}>{getHelperText()}</Text>
    </Paper>
  )
}
