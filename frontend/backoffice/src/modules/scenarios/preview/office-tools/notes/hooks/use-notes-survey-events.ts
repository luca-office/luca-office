import {useDispatch} from "react-redux"
import {SurveyEventType} from "shared/graphql/generated/globalTypes"
import {NotesContainerSurveyEvents} from "shared/office-tools"
import {addSurveyEventAction} from "shared/redux/actions/data/survey-events-action"
import {createPreviewEvent} from "../../../utils"

export const useNotesSurveyEvents = (scenarioId: UUID): NotesContainerSurveyEvents => {
  const dispatch = useDispatch()

  const sendUpdateNotesTextEvent = (note: string) =>
    dispatch(
      addSurveyEventAction(createPreviewEvent(SurveyEventType.UpdateNotesText, {text: note, scenarioId: scenarioId}))
    )

  return {sendUpdateNotesTextEvent}
}
