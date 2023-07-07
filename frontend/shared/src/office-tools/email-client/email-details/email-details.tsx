import {throttle} from "lodash-es"
import * as React from "react"
import {Controller, useForm} from "react-hook-form"
import {AutoCompleteInput, Icon, Overlay, SelectionInPreviewFooter, TextInput} from "../../../components"
import {IconName, InputType} from "../../../enums"
import {EmailDirectory, Salutation} from "../../../graphql/generated/globalTypes"
import {File, LocalEmail, ParticipantDataWithToken, SampleCompany} from "../../../models"
import {Flex} from "../../../styles"
import {useLucaTranslation} from "../../../translations"
import {
  emailRegexPattern,
  getEmailMessageWithTemplateValues,
  getSenderAndRecipient,
  Option,
  validateCcRecipients
} from "../../../utils"
import {ParticipantDataAndToken} from ".."
import {getEmailFilesColumns} from "../config/email-files-columns"
import {getEmailDirectoryIcon, getEmailDirectoryLabel} from "../utils"
import {styles} from "./email-details.style"
import {AddEmailFiles, EmailBodyFile, EmailFiles} from "./email-files"
import {
  EmailFilesAndDirectoriesConfig,
  EmailFilesAndDirectoriesContainer
} from "./email-files-and-directories/email-files-and-directories-container"
import {EmailHeader} from "./email-header"
import {EmailInfo} from "./email-info"

export interface EmailFiles {
  readonly downloadableEmailsFiles: EmailBodyFile[]
  readonly availableEmailDownloadIds: UUID[]
  readonly availableEmailUploadFiles: EmailBodyFile[]
  readonly filesAndDirectoriesConfig?: EmailFilesAndDirectoriesConfig
  readonly addEmailFileToDownloads: (emailId: UUID, fileId: UUID) => void
  readonly addEmailFileToUploads: (emailId: UUID, file: File) => void
  readonly removeEmailFileFromUploads: (emailId: UUID, fileId: UUID) => void
}

export interface EmailDetailsProps {
  readonly createEmail: (sender?: string, answeredEmail?: LocalEmail) => void
  readonly deleteEmail: (id: string) => void
  readonly email: LocalEmail | undefined
  readonly introductionEmailId: Option<UUID>
  readonly moveEmailToDirectory: (id: string, dir: EmailDirectory) => void
  readonly sendEmail: (email: LocalEmail) => void
  readonly scenarioStartedAt: Option<Date>
  readonly scenarioFictiveDate: Option<Date>
  readonly isReadOnly?: boolean
  readonly onEmailSelectionForDocumentViewCriterion?: (emailId: UUID) => void
  readonly autoCompleteEmailAddresses: string[]
  readonly updateEmailText: (email: LocalEmail) => void
  readonly updateEmailMetadata: (email: LocalEmail) => void
  readonly updateEmail: (email: LocalEmail) => void
  readonly participantDataAndToken: ParticipantDataAndToken
  readonly emailFiles: EmailFiles
  readonly sampleCompany: Option<SampleCompany>
}

export const EmailDetails: React.FC<EmailDetailsProps> = ({
  createEmail,
  deleteEmail,
  email,
  introductionEmailId,
  moveEmailToDirectory,
  sendEmail,
  scenarioStartedAt,
  scenarioFictiveDate,
  autoCompleteEmailAddresses,
  onEmailSelectionForDocumentViewCriterion,
  isReadOnly = false,
  updateEmailText,
  updateEmailMetadata,
  updateEmail,
  participantDataAndToken,
  emailFiles,
  sampleCompany
}) => {
  const {t} = useLucaTranslation()
  const {register, errors, trigger, control} = useForm()
  const isEditMode = email?.directory === EmailDirectory.Draft
  const isIntroductionEmail = introductionEmailId.map(id => id === email?.id).getOrElse(false)
  const [isOverlayVisible, setIsOverlayVisible] = React.useState(false)

  const throttledEmailTextHandler = React.useCallback(
    (email: LocalEmail) =>
      throttle((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateEmailText({...email, message: event.target.value})
      }, 1000),
    []
  )

  const participantDataWithToken = participantDataAndToken.participantData
    .map<ParticipantDataWithToken>(data => ({...data}))
    .getOrElse({
      token: participantDataAndToken.token.getOrElse(""),
      salutation: Salutation.NonBinary
    })

  const emailMessage =
    email !== undefined ? getEmailMessageWithTemplateValues(t, email.message, participantDataWithToken) : ""

  const triggerEmailValidation = async (email: LocalEmail) => {
    const isValid = await trigger()
    if (isValid) {
      sendEmail(email)
    }
  }

  const onSelectFileForUpload = (file: File) => {
    if (email) {
      setIsOverlayVisible(false)
      emailFiles.addEmailFileToUploads(email.id, file)
    }
  }

  const infoEdit = (email: LocalEmail) => (
    <div css={styles.info}>
      <div css={styles.infoSenderRowEdit}>
        <div css={[Flex.row, {flex: 1}]}>
          <span css={styles.infoSenderLabelEdit}>{t("email__recipient")}:</span>
          <Controller
            control={control}
            name="recipient"
            rules={{
              required: true,
              pattern: emailRegexPattern
            }}
            defaultValue={email.recipient}
            shouldUnregister={true}
            render={({onChange}) => (
              <AutoCompleteInput
                name={"recipient"}
                hasValidationError={!!errors.recipient}
                customStyles={[styles.editTextInput, styles.editRecipientTextInput]}
                customResultListStyle={styles.recipientAutocompleteList}
                defaultValue={email.recipient ?? ""}
                onChange={recipient => {
                  onChange(recipient)
                  updateEmailMetadata({...email, recipient})
                }}
                onBlur={({target}) => updateEmail({...email, recipient: target.value})}
                disabled={isReadOnly}
                items={autoCompleteEmailAddresses.filter(address => address !== email.recipient)}
              />
            )}
          />
        </div>
        <div css={[Flex.row, {flex: 1}]}>
          <span css={styles.infoSenderLabelEdit}>{t("email__sender")}:</span>
          <span>{`${
            getSenderAndRecipient(email, participantDataAndToken.participantData, sampleCompany).sender
          }`}</span>
        </div>
      </div>
      <div css={styles.infoSenderRowEdit}>
        <span css={styles.infoSenderLabelEdit}>{t("email__cc")}:</span>
        <TextInput
          ref={register({
            validate: ccRecipients => validateCcRecipients(ccRecipients)
          })}
          name={"ccRecipients"}
          type={InputType.text}
          value={email.ccRecipients.join(",")}
          customStyles={styles.editTextInput}
          hasValidationError={!!errors.ccRecipients}
          onChange={ccString =>
            updateEmailMetadata({...email, ccRecipients: ccString === "" ? [] : ccString.split(",")})
          }
          onBlur={({target}) =>
            updateEmail({...email, ccRecipients: target.value === "" ? [] : target.value.split(",")})
          }
          disabled={isReadOnly}
        />
      </div>
      <div css={styles.infoSenderRowEdit}>
        <span css={styles.infoSenderLabelEdit}>{t("email__subject")}:</span>
        <TextInput
          ref={register({required: true})}
          name={"subject"}
          type={InputType.text}
          value={email.subject}
          customStyles={styles.editTextInput}
          hasValidationError={!!errors.subject}
          onChange={subject => updateEmailMetadata({...email, subject})}
          onBlur={({target}) => updateEmail({...email, subject: target.value})}
          disabled={isReadOnly}
        />
      </div>
    </div>
  )

  return (
    <div css={styles.container}>
      <div css={styles.content}>
        <div css={styles.header}>
          <div css={styles.headerSlot}>
            <Icon name={email ? getEmailDirectoryIcon(email.directory) : IconName.Email} />
            <span css={styles.sender}>
              {email
                ? getEmailDirectoryLabel({
                    email,
                    sampleCompany,
                    participantData: participantDataAndToken.participantData,
                    t,
                    scenarioFictiveDate,
                    scenarioStartedAt
                  })
                : t("email__no_email_selected")}
            </span>
          </div>
          <div css={styles.headerSlot}>
            {email && (
              <EmailHeader
                email={email}
                isPreview={isReadOnly}
                isIntroductionEmail={isIntroductionEmail}
                createEmail={createEmail}
                deleteEmail={deleteEmail}
                moveEmailToDirectory={moveEmailToDirectory}
                validate={triggerEmailValidation}
              />
            )}
          </div>
        </div>
        {email ? (
          <>
            {isEditMode ? (
              <>
                {infoEdit(email)}
                <div css={styles.message}>
                  <textarea
                    key={email.id}
                    css={styles.textArea}
                    onChange={throttledEmailTextHandler(email)}
                    onBlur={({target}) => updateEmail({...email, message: target.value})}
                    defaultValue={emailMessage}
                    disabled={isReadOnly}
                  />
                </div>
                <AddEmailFiles
                  customStyles={styles.addFiles}
                  files={emailFiles.availableEmailUploadFiles}
                  showFooter={false}
                  tooltipText="files_and_directories__email__upload__tooltip"
                  columns={getEmailFilesColumns(
                    t,
                    isReadOnly,
                    () => setIsOverlayVisible(true),
                    file => emailFiles.removeEmailFileFromUploads(email.id, file.id)
                  )}
                />
              </>
            ) : (
              <>
                <EmailInfo
                  participantData={participantDataAndToken.participantData}
                  sampleCompany={sampleCompany}
                  localEmail={email}
                  scenarioStartedAt={scenarioStartedAt}
                  scenarioFictiveDate={scenarioFictiveDate}
                />
                <div css={styles.message}>{emailMessage}</div>
                <EmailFiles
                  files={emailFiles.downloadableEmailsFiles.concat(emailFiles.availableEmailUploadFiles)}
                  availableEmailDownloadIds={emailFiles.availableEmailDownloadIds}
                  isPreview={isReadOnly}
                  addEmailFileToDownloads={fileId => emailFiles.addEmailFileToDownloads(email.id, fileId)}
                />
              </>
            )}
            {isOverlayVisible && emailFiles.filesAndDirectoriesConfig && (
              <Overlay>
                <EmailFilesAndDirectoriesContainer
                  filesAndDirectoriesConfig={emailFiles.filesAndDirectoriesConfig}
                  onSelectFileForUpload={onSelectFileForUpload}
                  onClose={() => setIsOverlayVisible(false)}
                />
              </Overlay>
            )}
          </>
        ) : (
          <div css={styles.noEmailPlaceholder}>
            <span>{t("email__no_email_selected")}</span>
          </div>
        )}
      </div>
      <div css={styles.footer} />
      {onEmailSelectionForDocumentViewCriterion !== undefined && email && (
        <SelectionInPreviewFooter
          customLabelStyles={styles.selectionFooter}
          icon={IconName.Email}
          onConfirm={() => onEmailSelectionForDocumentViewCriterion(email.id)}
          textKey="coding_models__automated_item_document_view_email_preview_selection_footer"
          title={t("email")}
          headingKey="coding_models__automated_item_document_view_column_header"
        />
      )}
    </div>
  )
}
