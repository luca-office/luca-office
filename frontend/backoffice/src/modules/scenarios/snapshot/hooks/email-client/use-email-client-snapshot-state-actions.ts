import {noop} from "lodash-es"
import {EmailClientStateActions} from "shared/office-tools/email-client"

export const useEmailClientSnapshotStateActions = (): EmailClientStateActions => {
  return {
    updateEmail: noop,
    createEmail: noop,
    deleteEmail: noop,
    moveEmailToDirectory: noop,
    setEmails: noop,
    delayEmail: noop,
    delayInterventionEmail: noop,
    addEmailFileToDownloads: noop,
    addEmailFileUploads: noop,
    removeEmailFileFromUploads: noop,
    removeEmailFilesFromUploads: noop
  }
}
