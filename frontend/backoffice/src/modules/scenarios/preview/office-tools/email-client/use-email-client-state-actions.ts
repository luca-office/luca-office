import {useDispatch, useSelector} from "react-redux"
import {EmailDirectory} from "shared/graphql/generated/globalTypes"
import {InterventionWithTimeOffset, LocalEmail} from "shared/models"
import {SurveyEventCreationWithoutIndex} from "shared/models/survey-event-creation-without-index"
import {EmailClientStateActions} from "shared/office-tools/email-client"
import {
  addEmailAction,
  createEmailAction,
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
import {checkIfInterventionConditionIsFulfilled, getUserEmail, Option, remoteToLocalEmail} from "shared/utils"
import {addTimeoutId} from "../../../../../redux/actions/player-preview-actions"
import {AppState} from "../../../../../redux/state/app-state"

export const useEmailClientStateActions = (): EmailClientStateActions => {
  const dispatch = useDispatch()
  const interventionSurveyEvents = useSelector<AppState, Array<SurveyEventCreationWithoutIndex>>(
    state => state.playerPreview.player.data.surveyEvents.surveyEventsForInterventions
  )

  const delayEmailInternal = (email: LocalEmail) => {
    const timeoutId = window.setTimeout(() => {
      dispatch(addEmailAction(email))
    }, email.receptionDelayInSeconds * 1000)

    dispatch(addTimeoutId(timeoutId))
  }

  const delayInterventionEmailInternal = (intervention: InterventionWithTimeOffset) => {
    const timeoutId = window.setTimeout(() => {
      const isInterventionConditionFulfilled = checkIfInterventionConditionIsFulfilled(
        intervention,
        interventionSurveyEvents
      )

      if (isInterventionConditionFulfilled) {
        dispatch(
          addEmailAction({
            ...remoteToLocalEmail(intervention.interventionEmail),
            recipient: getUserEmail(Option.none(), Option.none()),
            receptionDelayInSeconds: intervention.timeOffsetInSeconds,
            isVisible: true
          })
        )
      }
    }, intervention.timeOffsetInSeconds * 1000)

    dispatch(addTimeoutId(timeoutId))
  }

  return {
    updateEmail: (email: LocalEmail) => dispatch(updateEmailAction(email)),
    createEmail: (email: LocalEmail) => dispatch(createEmailAction(email)),
    deleteEmail: (id: UUID) => dispatch(deleteEmailAction(id)),
    moveEmailToDirectory: (id: UUID, directory: EmailDirectory) => dispatch(moveEmailToDirectoryAction(id, directory)),
    setEmails: (emails: Array<LocalEmail>) => dispatch(setEmailsAction(emails)),
    delayEmail: delayEmailInternal,
    delayInterventionEmail: delayInterventionEmailInternal,
    addEmailFileToDownloads: (fileId: UUID) => dispatch(addEmailFileToDownloadsAction(fileId)),
    addEmailFileUploads: (emailId: UUID, fileId: UUID) => dispatch(addEmailFileToUploadsAction(emailId, fileId)),
    removeEmailFileFromUploads: (emailId: UUID, fileId: UUID) =>
      dispatch(removeEmailFileFromUploadsAction(emailId, fileId)),
    removeEmailFilesFromUploads: (emailId: UUID) => dispatch(removeEmailFilesFromUploadsAction(emailId))
  }
}
