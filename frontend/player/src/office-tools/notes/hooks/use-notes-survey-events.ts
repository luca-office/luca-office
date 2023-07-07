import {useDispatch} from "react-redux"
import {SurveyEventType} from "shared/graphql/generated/globalTypes"
import {NotesContainerSurveyEvents} from "shared/office-tools"
import {sendScenarioSurveyEvent} from "shared/utils"
import {useGetSurveyInvitationFromRedux} from "../../../hooks/use-get-survey-invitation"

export const useNotesSurveyEvents = (scenarioId: UUID): NotesContainerSurveyEvents => {
  const dispatch = useDispatch()
  const {invitationIdOption, surveyIdOption} = useGetSurveyInvitationFromRedux()

  const sendUpdateNotesTextEvent = (note: string) =>
    invitationIdOption.forEach(invitationId =>
      surveyIdOption.forEach(surveyId =>
        sendScenarioSurveyEvent({
          surveyId,
          invitationId,
          scenarioId,
          eventType: SurveyEventType.UpdateNotesText,
          data: {text: note, scenarioId: scenarioId},
          dispatch
        })
      )
    )

  return {sendUpdateNotesTextEvent}
}
