import {useDispatch} from "react-redux"
import {EmailDirectory} from "shared/graphql/generated/globalTypes"
import {File, InterventionWithTimeOffset, LocalEmail} from "shared/models"
import {EmailClientStateActions} from "shared/office-tools/email-client"
import {
  createEmailAction,
  delayEmailAction,
  delayInterventionEmailAction,
  deleteEmailAction,
  moveEmailToDirectoryAction,
  setEmailsAction,
  updateEmailAction
} from "shared/redux/actions/data-action"
import {
  addEmailFileToDownloadsAction,
  addEmailFileToUploadsAction,
  removeEmailFileFromUploadsAction,
  removeEmailFilesFromUploadsAction
} from "shared/redux/actions/ui/files-and-directories-action"

export const useEmailClientStateActions = (): EmailClientStateActions => {
  const dispatch = useDispatch()

  return {
    updateEmail: (email: LocalEmail) => dispatch(updateEmailAction(email)),
    createEmail: (email: LocalEmail) => dispatch(createEmailAction(email)),
    deleteEmail: (id: UUID) => dispatch(deleteEmailAction(id)),
    moveEmailToDirectory: (id: UUID, directory: EmailDirectory) => dispatch(moveEmailToDirectoryAction(id, directory)),
    setEmails: (emails: Array<LocalEmail>) => dispatch(setEmailsAction(emails)),
    delayEmail: (email: LocalEmail) => dispatch(delayEmailAction(email)),
    delayInterventionEmail: (intervention: InterventionWithTimeOffset) =>
      dispatch(delayInterventionEmailAction(intervention)),
    addEmailFileToDownloads: (fileId: UUID) => dispatch(addEmailFileToDownloadsAction(fileId)),
    addEmailFileUploads: (emailId: UUID, fileId: UUID) => dispatch(addEmailFileToUploadsAction(emailId, fileId)),
    removeEmailFileFromUploads: (emailId: UUID, fileId: UUID) =>
      dispatch(removeEmailFileFromUploadsAction(emailId, fileId)),
    removeEmailFilesFromUploads: (emailId: UUID) => dispatch(removeEmailFilesFromUploadsAction(emailId))
  }
}
