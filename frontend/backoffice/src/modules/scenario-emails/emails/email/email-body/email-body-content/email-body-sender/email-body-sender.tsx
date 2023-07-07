import {css} from "@emotion/react"
import * as React from "react"
import {IconName} from "shared/enums"
import {EmailUpdate} from "shared/graphql/generated/globalTypes"
import {Email} from "shared/models"
import {CustomStyle, spacingMedium} from "shared/styles"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"
import {emailRegexPattern} from "shared/utils"
import {EmailBodyMetaEntry, OverlayEditFieldType} from "../../../../../../../components"
import {EmailUpdateKey} from "../../../../../../../enums"
import {MetaEntryOverlayConfig} from "../../../../../../../models"
import {isOutgoingEmail} from "../../../../../utils/directory"
import {useEmailUpdate} from "../../../hooks/use-email-update"

type CcRecipientsUpdate = Record<keyof Pick<EmailUpdate, EmailUpdateKey.CcRecipients>, string>

export interface EmailBodySenderProps extends CustomStyle {
  readonly email: Email
  readonly disabled?: boolean
}

export const EmailBodySender: React.FC<EmailBodySenderProps> = ({disabled, email, customStyles}) => {
  const {t} = useLucaTranslation()
  const {updateEmail, updateEmailLoading} = useEmailUpdate(email)
  const isOutgoing = isOutgoingEmail(email.directory)

  const handleCCUpdate = ({ccRecipients}: CcRecipientsUpdate) =>
    updateEmail({
      ccRecipients: ccRecipients.split(";").reduce<string[]>((accumulator, ccRecipient) => {
        const value = ccRecipient.trim()
        return !value || !emailRegexPattern.test(value) ? accumulator : [...accumulator, value]
      }, [])
    })

  const handleSenderOrRecipientUpdate = ({senderOrRecipient}: {senderOrRecipient: string}) =>
    senderOrRecipient && emailRegexPattern.test(senderOrRecipient)
      ? updateEmail({
          sender: isOutgoing ? null : senderOrRecipient,
          recipient: isOutgoing ? senderOrRecipient : null
        })
      : Promise.reject()

  const senderOrRecipientLabelKey: LucaI18nLangKey = isOutgoing
    ? "email__directory_recipient"
    : "email__directory_sender"
  const senderDialogTitleKey: LucaI18nLangKey = isOutgoing
    ? "email__directory_recipient_edit"
    : "email__directory_sender_edit"
  const senderOrRecipientConfig: MetaEntryOverlayConfig<{senderOrRecipient: string}> = {
    dialogTitleKey: senderDialogTitleKey,
    onConfirm: handleSenderOrRecipientUpdate,
    updateLoading: updateEmailLoading,
    formFields: [
      {
        labelKey: senderOrRecipientLabelKey,
        value: email.sender ?? email.recipient ?? "",
        updateId: "senderOrRecipient",
        type: OverlayEditFieldType.EMAIL,
        placeholderKey: senderOrRecipientLabelKey,
        validationRules: {
          required: true,
          pattern: {
            value: emailRegexPattern,
            message: 't("validation__email_format")'
          }
        }
      }
    ]
  }

  const ccConfig: MetaEntryOverlayConfig<CcRecipientsUpdate> = {
    dialogTitleKey: "email__cc_label_edit",
    dialogDescriptionKey: "email__cc_edit_description",
    onConfirm: handleCCUpdate,
    updateLoading: updateEmailLoading,
    formFields: [
      {
        value: email.ccRecipients.join("; "),
        updateId: EmailUpdateKey.CcRecipients,
        type: OverlayEditFieldType.TEXTAREA,
        placeholderKey: "email__cc_placeholder_example"
      }
    ]
  }

  return (
    <div css={[styles.sender, customStyles]}>
      <EmailBodyMetaEntry
        headerLabelKey={senderOrRecipientLabelKey}
        label={email.sender ?? email.recipient ?? ""}
        icon={IconName.Email}
        overlayConfig={senderOrRecipientConfig}
        disabled={disabled}
      />
      <EmailBodyMetaEntry
        customModalStyles={styles.ccModal}
        disabled={disabled}
        headerLabelKey={"email__cc_label"}
        label={email.ccRecipients.join(", ") || t("email__cc_recipients_placeholder")}
        icon={IconName.Email}
        overlayConfig={ccConfig}
        isPlaceholder={!email.ccRecipients.length}
      />
    </div>
  )
}

const Size = {
  textArea: 128
}

const styles = {
  sender: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: spacingMedium
  }),
  ccModal: css({
    width: "50vw",

    ".fields > div": {
      "&, > textarea": {
        marginBottom: 0
      },
      "> textarea": {
        minHeight: Size.textArea,
        resize: "vertical"
      }
    }
  })
}
