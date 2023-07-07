/* eslint-disable max-lines */
/* eslint-disable import/max-dependencies */
import {compact, union} from "lodash-es"
import React from "react"
import {EmailDirectory} from "../../graphql/generated/globalTypes"
import {File, Intervention, InterventionWithTimeOffset, LocalEmail, ParticipantData, Scenario} from "../../models"
import {CustomStyle} from "../../styles"
import {useLucaTranslation} from "../../translations"
import {
  createEmailDraft,
  createUUID,
  find,
  getUserEmail,
  iconForFile,
  isDefined,
  Option,
  parseDateString
} from "../../utils"
import {
  FilesAndDirectoriesRemoteState,
  FilesAndDirectoriesState,
  FilesAndDirectoriesStateActions,
  FilesAndDirectoriesSurveyEvents
} from "../files-and-directories"
import {EmailClient, EmailClientProps} from "."
import {EmailClientRemoteStateHookProps} from "./hook/use-email-client-remote-state"

export interface EmailClientState {
  readonly emails: Array<LocalEmail>
  readonly token: Option<string>
  readonly participantData: Option<ParticipantData>
  readonly scenarioStartedAt: Option<Date>
  readonly availableEmailDownloadIds: UUID[]
  readonly availableEmailUploadFiles: Record<UUID, UUID[]>
  readonly isReadOnly?: boolean
}

export interface EmailClientRemoteState {
  readonly scenarioOption: Option<Scenario>
  readonly filesOption: Option<Array<File>>
  readonly isLoading: boolean
}

export interface EmailClientStateActions {
  readonly updateEmail: (email: LocalEmail) => void
  readonly createEmail: (email: LocalEmail) => void
  readonly deleteEmail: (id: UUID) => void
  readonly moveEmailToDirectory: (id: UUID, directory: EmailDirectory) => void
  readonly setEmails: (emails: Array<LocalEmail>) => void
  readonly delayEmail: (email: LocalEmail) => void
  readonly delayInterventionEmail: (intervention: InterventionWithTimeOffset) => void
  readonly addEmailFileToDownloads: (fileId: UUID) => void
  readonly addEmailFileUploads: (emailId: UUID, fileId: UUID) => void
  readonly removeEmailFileFromUploads: (emailId: UUID, fileId: UUID) => void
  readonly removeEmailFilesFromUploads: (emailId: UUID) => void
}

export interface EmailClientSurveyEvents {
  readonly sendCreateEmailEvent: (id: UUID) => void
  readonly sendShowEmailEvent: (id: UUID, scenarioId: UUID) => void
  readonly sendDeleteEmailEvent: (id: UUID) => void
  readonly sendMoveEmailToDirectoryEvent: (id: UUID, directory: EmailDirectory) => void
  readonly sendSendEmailEvent: (id: UUID, isCompletionEmail: boolean, text: string) => void
  readonly sendSelectEmailDirectoryEvent: (directory: EmailDirectory) => void
  readonly sendSearchEmailsEvent: (query: string) => void
  readonly sendUpdateEmailEvent: (id: UUID, to: string, cc: Array<string>, subject: string) => void
  readonly sendUpdateEmailTextEvent: (id: UUID, text: string) => void
  readonly sendAnswerEmailEvent: (scenarioId: UUID, id: UUID, answeredEmailId: UUID) => void
  readonly sendDownloadEmailAttachmentEvent: (scenarioId: UUID, emailId: UUID, fileId: UUID) => void
  readonly sendAddEmailAttachmentEvent: (scenarioId: UUID, emailId: UUID, fileId: UUID) => void
  readonly sendDeleteEmailAttachmentEvent: (scenarioId: UUID, emailId: UUID, fileId: UUID) => void
}

interface EmailClientContainerProps extends CustomStyle {
  readonly scenarioId: UUID
  readonly onClose: () => void
  readonly scenarioCompletionEmailAddress: string
  readonly interventions: Intervention[]
  readonly onCompletionMailSent: () => void
  readonly onMinimize?: () => void
  readonly useState: (scenarioId: UUID) => EmailClientState
  readonly useRemoteState: (props: EmailClientRemoteStateHookProps) => EmailClientRemoteState
  readonly useStateActions: () => EmailClientStateActions
  readonly useSurveyEvents: () => EmailClientSurveyEvents
  readonly resetFinishMail?: boolean
  readonly sampleCompanyId: Option<UUID>
  readonly sampleCompanyTitle: Option<string>
  readonly useFilesAndDirectoriesState: () => FilesAndDirectoriesState
  readonly useFilesAndDirectoriesStateActions: () => FilesAndDirectoriesStateActions
  readonly useFilesAndDirectoriesRemoteState: (
    scenarioId: UUID,
    sampleCompanyIdOption: Option<UUID>
  ) => FilesAndDirectoriesRemoteState
  readonly useFilesAndDirectoriesSurveyEvents: (scenarioId: UUID) => FilesAndDirectoriesSurveyEvents
}

export const EmailClientContainer: React.FC<EmailClientContainerProps> = ({
  scenarioId,
  onClose,
  scenarioCompletionEmailAddress,
  onCompletionMailSent,
  onMinimize,
  customStyles,
  interventions,
  useState,
  useRemoteState,
  useStateActions,
  useSurveyEvents,
  resetFinishMail,
  sampleCompanyId,
  sampleCompanyTitle,
  useFilesAndDirectoriesRemoteState: filesAndDirsRemoteState,
  useFilesAndDirectoriesState,
  useFilesAndDirectoriesStateActions,
  useFilesAndDirectoriesSurveyEvents
}) => {
  const {t} = useLucaTranslation()

  const {
    emails,
    participantData,
    token,
    scenarioStartedAt,
    availableEmailDownloadIds,
    availableEmailUploadFiles,
    isReadOnly
  } = useState(scenarioId)

  const {
    createEmail,
    delayEmail,
    delayInterventionEmail,
    deleteEmail,
    moveEmailToDirectory,
    setEmails,
    updateEmail,
    addEmailFileToDownloads,
    addEmailFileUploads,
    removeEmailFileFromUploads,
    removeEmailFilesFromUploads
  } = useStateActions()

  const {scenarioOption, filesOption, isLoading} = useRemoteState({
    scenarioId,
    interventions,
    setEmails,
    delayEmail,
    delayInterventionEmail,
    emails
  })

  const {
    sendCreateEmailEvent,
    sendDeleteEmailEvent,
    sendMoveEmailToDirectoryEvent,
    sendSearchEmailsEvent,
    sendSelectEmailDirectoryEvent,
    sendSendEmailEvent,
    sendShowEmailEvent,
    sendUpdateEmailEvent,
    sendUpdateEmailTextEvent,
    sendAnswerEmailEvent,
    sendDownloadEmailAttachmentEvent,
    sendAddEmailAttachmentEvent,
    sendDeleteEmailAttachmentEvent
  } = useSurveyEvents()

  const [selectedEmailId, setSelectedEmailId] = React.useState<string | undefined>()
  const [activeEmailDirectory, setActiveEmailDirectory] = React.useState(EmailDirectory.Inbox)
  const [searchQuery, setSearchQuery] = React.useState("")

  const emailAddresses = union(
    compact([...emails.flatMap(email => [email.recipient, email.sender, ...email.ccRecipients])])
  )

  const introductionEmailId = scenarioOption.map(scenario => scenario.introductionEmailId as UUID)

  const sampleCompany = scenarioOption.flatMap(scenario => Option.of(scenario.sampleCompany))
  const scenarioFictiveDate = scenarioOption.flatMap(scenario =>
    Option.of(scenario.date !== null ? parseDateString(scenario.date) : null)
  )

  const visibleEmails = emails
    .filter(
      email =>
        (email.sender ?? "").toLowerCase().includes(searchQuery) || email.message.toLowerCase().includes(searchQuery)
    )
    .filter(email => email.isVisible === true)

  const visibleSelectedEmail = visibleEmails.find(
    email => email.id === selectedEmailId && email.directory === activeEmailDirectory
  )

  const updateEmailMetadata = (updatedEmail: LocalEmail) => {
    sendUpdateEmailEvent(updatedEmail.id, updatedEmail.recipient || "", updatedEmail.ccRecipients, updatedEmail.subject)
    updateEmail(updatedEmail)
  }

  const sendUpdateEmailMetadataEvent = ({id, recipient, ccRecipients, subject}: LocalEmail) => {
    sendUpdateEmailEvent(id, recipient ?? "", ccRecipients, subject)
  }

  const updateEmailText = ({id, message}: LocalEmail) => {
    sendUpdateEmailTextEvent(id, message)
  }

  const handleUpdateEmail = (updatedEmail: LocalEmail) => {
    updateEmail(updatedEmail)
  }

  const onChangeSearchValue = (value: string) => {
    sendSearchEmailsEvent(value)
    setSearchQuery(value.toLowerCase())
  }

  const onSelectEmail = (email: LocalEmail | undefined) => {
    if (email !== undefined) {
      sendShowEmailEvent(email.id, scenarioId)

      if (!email.isRead) {
        updateEmailMetadata({...email, isRead: true})
      }
    }

    setSelectedEmailId(email?.id)
  }

  const onChangeEmailDirectory = (directory: EmailDirectory) => {
    sendSelectEmailDirectoryEvent(directory)
    setActiveEmailDirectory(directory)
  }

  const selectEmail = (emailId: UUID, directory: EmailDirectory) => {
    onChangeEmailDirectory(directory)
    setSelectedEmailId(emailId)
  }

  const sendEmail = (email: LocalEmail) => {
    sendSendEmailEvent(email.id, email.recipient === scenarioCompletionEmailAddress, email.message)
    updateEmail({...email, directory: EmailDirectory.Sent, isRead: true})

    selectEmail(email.id, EmailDirectory.Sent)

    if (email.recipient?.toLowerCase() === scenarioCompletionEmailAddress.toLowerCase()) {
      onCompletionMailSent()
    }
  }

  const onCreateEmail = (sender?: string, answeredEmail?: LocalEmail) => {
    const id = createUUID()
    const isAnswerEmpty = answeredEmail?.message.trim().length === 0
    const splitAnswers = answeredEmail?.message.split("\n")
    const citedAnswer = `>${splitAnswers?.join("\n >")} \n \n`

    answeredEmail ? sendAnswerEmailEvent(scenarioId, id, answeredEmail.id) : sendCreateEmailEvent(id)
    const emailDraft = createEmailDraft(
      scenarioId,
      getUserEmail(participantData, sampleCompany),
      id,
      sender,
      answeredEmail !== undefined && !isAnswerEmpty ? citedAnswer : undefined,
      answeredEmail?.subject ? t("email__subject_answer_mail", {subject: answeredEmail.subject}) : undefined
    )
    createEmail(emailDraft)
    updateEmailMetadata(emailDraft)

    selectEmail(id, EmailDirectory.Draft)
  }

  const onDeleteEmail = (id: string) => {
    sendDeleteEmailEvent(id)
    deleteEmail(id)
    removeEmailFilesFromUploads(id)
    setSelectedEmailId(undefined)
  }

  const onMoveEmailToDirectory = (emailId: UUID, destDir: EmailDirectory) => {
    sendMoveEmailToDirectoryEvent(emailId, destDir)
    moveEmailToDirectory(emailId, destDir)
    setSelectedEmailId(undefined)
  }

  const onAddEmailFileToDownloads = (emailId: UUID, fileId: UUID) => {
    addEmailFileToDownloads(fileId)
    sendDownloadEmailAttachmentEvent(scenarioId, emailId, fileId)
  }

  const onAddEmailFileToUploads = (emailId: UUID, file: File) => {
    addEmailFileUploads(emailId, file.id)
    sendAddEmailAttachmentEvent(scenarioId, emailId, file.id)
  }

  const onRemoveEmailFileFromUploads = (emailId: UUID, fileId: UUID) => {
    removeEmailFileFromUploads(emailId, fileId)
    sendDeleteEmailAttachmentEvent(scenarioId, emailId, fileId)
  }

  React.useEffect(() => {
    const finishMail = emails.find(email => email.recipient === scenarioCompletionEmailAddress)
    if (resetFinishMail && finishMail) {
      onMoveEmailToDirectory(finishMail.id, EmailDirectory.Draft)
      selectEmail(finishMail.id, EmailDirectory.Draft)
    }
  }, [resetFinishMail])

  const useFilesAndDirectoriesRemoteState = () => filesAndDirsRemoteState(scenarioId, sampleCompanyId)
  const filesAndDirs = useFilesAndDirectoriesRemoteState()

  const emailComponentProps: EmailClientProps = {
    emailsLoading: isLoading,
    onClose,
    onMinimize,
    visibleEmails,
    onChangeSearchValue,
    onSelectEmail,
    activeEmailDirectory,
    onChangeEmailDirectory,
    selectedEmail: visibleSelectedEmail,
    selectedEmailId,
    introductionEmailId,
    createEmail: onCreateEmail,
    deleteEmail: onDeleteEmail,
    moveEmailToDirectory: onMoveEmailToDirectory,
    sendEmail,
    scenarioStartedAt,
    scenarioFictiveDate,
    customStyles,
    autoCompleteEmailAddresses: emailAddresses,
    updateEmailText,
    updateEmailMetadata: sendUpdateEmailMetadataEvent,
    updateEmail: handleUpdateEmail,
    sampleCompany,
    participantDataAndToken: {
      participantData,
      token
    },
    emailFiles: {
      addEmailFileToDownloads: onAddEmailFileToDownloads,
      addEmailFileToUploads: onAddEmailFileToUploads,
      removeEmailFileFromUploads: onRemoveEmailFileFromUploads,
      availableEmailDownloadIds: availableEmailDownloadIds,
      downloadableEmailsFiles: filesOption
        .getOrElse([])
        .filter(f => f.emailId === selectedEmailId)
        .map(file => ({
          id: file.id,
          title: file.name,
          relevance: Option.of(file.relevance),
          iconName: iconForFile(file)
        })),
      availableEmailUploadFiles: (availableEmailUploadFiles[selectedEmailId || ""] || [])
        .map(fileId =>
          find(f => f.id === fileId, filesAndDirs.files.concat(filesAndDirs.sampleCompanyFiles))
            .map(file => ({
              id: file.id,
              title: file.name,
              relevance: Option.of(file.relevance),
              iconName: iconForFile(file)
            }))
            .orNull()
        )
        .filter(isDefined),
      filesAndDirectoriesConfig: {
        useFilesAndDirectoriesRemoteState,
        useFilesAndDirectoriesState,
        useFilesAndDirectoriesStateActions,
        sampleCompanyTitle,
        scenarioId,
        useSurveyEvents: useFilesAndDirectoriesSurveyEvents
      }
    },
    isReadOnly: isReadOnly
  }

  return <EmailClient {...emailComponentProps} />
}
