import {css} from "@emotion/react"
import {noop} from "lodash-es"
import React from "react"
import {EmailClient, EmailClientProps} from "shared/office-tools"
import {Option} from "shared/utils"
import {
  useFilesAndDirectoriesState,
  useFilesAndDirectoriesStateActions
} from "../../scenarios/preview/office-tools/files-and-directories"
import {useFilesAndDirectoriesSnapshotSurveyEvents} from "../../scenarios/snapshot/hooks/files-and-directories/use-files-and-directories-snapshot-survey-events"
import {useEmailsPreview} from "./hooks/use-emails-preview"

interface Props {
  readonly scenarioId: UUID
  readonly onClose: () => void
  readonly onEmailSelectionForDocumentViewCriterion?: (emailId: UUID) => void
}

export const ScenarioEmailsPreview: React.FC<Props> = ({
  scenarioId,
  onClose,
  onEmailSelectionForDocumentViewCriterion
}) => {
  const {
    emailsLoading,
    visibleEmails,
    selectEmail,
    selectedEmail,
    filesForSelectedEmail,
    setSearchValue,
    setCurrentDirectory,
    currentDirectory,
    introductionEmailId,
    participantData,
    sampleCompany,
    scenarioFictiveDate
  } = useEmailsPreview(scenarioId)

  const emailClientComponentProps: EmailClientProps = {
    emailsLoading,
    selectedEmail,
    selectedEmailId: selectedEmail?.id,
    introductionEmailId: Option.of(introductionEmailId),
    visibleEmails,
    onClose,
    onChangeSearchValue: setSearchValue,
    onSelectEmail: selectEmail,
    onChangeEmailDirectory: setCurrentDirectory,
    activeEmailDirectory: currentDirectory,
    createEmail: noop,
    deleteEmail: noop,
    sendEmail: noop,
    moveEmailToDirectory: noop,
    scenarioStartedAt: Option.of(new Date()),
    scenarioFictiveDate,
    isReadOnly: true,
    customStyles: css({width: "90%", height: "90%"}),
    onEmailSelectionForDocumentViewCriterion,
    autoCompleteEmailAddresses: [],
    updateEmailText: noop,
    updateEmailMetadata: noop,
    updateEmail: noop,
    participantDataAndToken: {
      participantData: Option.of(participantData),
      token: Option.none()
    },
    sampleCompany,
    emailFiles: {
      availableEmailDownloadIds: [],
      availableEmailUploadFiles: [],
      downloadableEmailsFiles: filesForSelectedEmail,
      addEmailFileToDownloads: noop,
      addEmailFileToUploads: noop,
      removeEmailFileFromUploads: noop,
      filesAndDirectoriesConfig: {
        useFilesAndDirectoriesState,
        useFilesAndDirectoriesRemoteState: () => ({
          directories: [],
          files: [],
          sampleCompanyFiles: [],
          dataLoading: false
        }),
        scenarioId: "",
        useSurveyEvents: useFilesAndDirectoriesSnapshotSurveyEvents,
        useFilesAndDirectoriesStateActions,
        sampleCompanyTitle: Option.none()
      }
    }
  }

  return <EmailClient {...emailClientComponentProps} />
}
