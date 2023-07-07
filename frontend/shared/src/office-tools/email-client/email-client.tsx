import * as React from "react"
import {OfficeWindow, WindowActionBar} from "../../components"
import {IconName, ViewerToolsType} from "../../enums"
import {EmailDirectory} from "../../graphql/generated/globalTypes"
import {LocalEmail, ParticipantData, SampleCompany} from "../../models"
import {CustomStyle} from "../../styles"
import {useLucaTranslation} from "../../translations"
import {Option} from "../../utils"
import {emailClientStyle as styles} from "./email-client.style"
import {EmailDetails, EmailFiles} from "./email-details/email-details"
import {EmailListContainer} from "./email-list/email-list-container"

export interface ParticipantDataAndToken {
  readonly participantData: Option<ParticipantData>
  readonly token: Option<string>
}

export interface EmailClientProps extends CustomStyle {
  readonly emailsLoading: boolean
  readonly selectedEmail: LocalEmail | undefined
  readonly selectedEmailId: string | undefined
  readonly introductionEmailId: Option<UUID>
  readonly visibleEmails: LocalEmail[]
  readonly onClose: () => void
  readonly onChangeSearchValue: (value: string) => void
  readonly onSelectEmail: (email: LocalEmail | undefined) => void
  readonly onChangeEmailDirectory: (directory: EmailDirectory) => void
  readonly activeEmailDirectory: EmailDirectory
  readonly createEmail: (sender?: string, answeredEmail?: LocalEmail) => void
  readonly deleteEmail: (id: string) => void
  readonly moveEmailToDirectory: (id: string, dir: EmailDirectory) => void
  readonly sendEmail: (email: LocalEmail) => void
  readonly onMinimize?: () => void
  readonly scenarioStartedAt: Option<Date>
  readonly scenarioFictiveDate: Option<Date>
  readonly sampleCompany: Option<SampleCompany>
  readonly isReadOnly?: boolean
  readonly autoCompleteEmailAddresses: string[]
  readonly onEmailSelectionForDocumentViewCriterion?: (emailId: UUID) => void
  readonly updateEmailText: (email: LocalEmail) => void
  readonly updateEmailMetadata: (email: LocalEmail) => void
  readonly updateEmail: (email: LocalEmail) => void
  readonly participantDataAndToken: ParticipantDataAndToken
  readonly emailFiles: EmailFiles
}

export const EmailClient: React.FC<EmailClientProps> = ({
  emailsLoading,
  selectedEmail,
  selectedEmailId,
  introductionEmailId,
  visibleEmails,
  onClose,
  onMinimize,
  onChangeSearchValue,
  onSelectEmail,
  onChangeEmailDirectory,
  activeEmailDirectory,
  createEmail,
  deleteEmail,
  moveEmailToDirectory,
  sendEmail,
  scenarioStartedAt,
  scenarioFictiveDate,
  autoCompleteEmailAddresses,
  isReadOnly = false,
  customStyles,
  onEmailSelectionForDocumentViewCriterion,
  updateEmailText,
  updateEmailMetadata,
  updateEmail,
  participantDataAndToken,
  emailFiles,
  sampleCompany
}) => {
  const {t} = useLucaTranslation()
  return (
    <OfficeWindow
      customStyles={[styles.window, customStyles]}
      toolType={ViewerToolsType.Email}
      onClose={onClose}
      onMinimize={onMinimize}>
      <div css={styles.bar}>
        <WindowActionBar
          onSearchChange={onChangeSearchValue}
          actionButtonConfig={{
            onClick: createEmail,
            label: t("email__create_new_email"),
            icon: IconName.EditBordered,
            isDisabled: isReadOnly
          }}
        />
      </div>
      <div css={styles.content}>
        <div css={styles.list}>
          <EmailListContainer
            isLoading={emailsLoading}
            emails={visibleEmails}
            introductionEmailId={introductionEmailId}
            selectedEmailId={selectedEmailId}
            onEmailSelected={onSelectEmail}
            onChangeEmailDirectory={onChangeEmailDirectory}
            activeEmailDirectory={activeEmailDirectory}
            scenarioStartedAt={scenarioStartedAt}
            scenarioFictiveDate={scenarioFictiveDate}
          />
        </div>
        <div css={styles.details}>
          <EmailDetails
            isReadOnly={isReadOnly}
            email={selectedEmail}
            introductionEmailId={introductionEmailId}
            createEmail={createEmail}
            deleteEmail={deleteEmail}
            moveEmailToDirectory={moveEmailToDirectory}
            sendEmail={sendEmail}
            scenarioStartedAt={scenarioStartedAt}
            scenarioFictiveDate={scenarioFictiveDate}
            onEmailSelectionForDocumentViewCriterion={onEmailSelectionForDocumentViewCriterion}
            autoCompleteEmailAddresses={autoCompleteEmailAddresses}
            updateEmailText={updateEmailText}
            updateEmailMetadata={updateEmailMetadata}
            updateEmail={updateEmail}
            participantDataAndToken={participantDataAndToken}
            emailFiles={emailFiles}
            sampleCompany={sampleCompany}
          />
        </div>
      </div>
    </OfficeWindow>
  )
}
