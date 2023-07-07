import {SurveyEventType} from "../../../graphql/generated/globalTypes"
import {SurveyEvent} from "../../../models"
import {SharedAppState} from "../../../redux/state"
import {NotesState} from "../../../redux/state/data"

export const notesSnapshotReducer = (state: SharedAppState, surveyEvent: SurveyEvent): NotesState => {
  const notes = state.data.notes

  switch (surveyEvent.eventType) {
    case SurveyEventType.UpdateNotesText: {
      const data = surveyEvent.data as {scenarioId: UUID; text: string}
      return data.text
    }
    default:
      return notes
  }
}
