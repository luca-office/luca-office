import * as React from "react"
import {OfficeTool, OfficeWindowType} from "../../enums"
import {NotesState} from "../../redux/state/data"
import {CustomStyle} from "../../styles"
import {Notes} from "./notes"

export interface NotesContainerStateActions {
  readonly updateNotes: (note: NotesState) => void
}

export interface NotesContainerState {
  readonly openWindows: OfficeWindowType[]
  readonly minimizedWindows: OfficeWindowType[]
  readonly note: NotesState
  readonly isReadOnly?: boolean
}

export interface NotesContainerSurveyEvents {
  readonly sendUpdateNotesTextEvent: (note: string) => void
}

export interface NotesContainerProps extends CustomStyle {
  readonly onClose: () => void
  readonly onMinimize: () => void
  readonly scenarioId: string
  readonly onOutsideClick?: () => void
  readonly useState: () => NotesContainerState
  readonly useStateActions: () => NotesContainerStateActions
  readonly useSurveyEvents: (scenarioId: UUID) => NotesContainerSurveyEvents
}

export const NotesContainer: React.FC<NotesContainerProps> = ({
  customStyles,
  onClose,
  onMinimize,
  scenarioId,
  onOutsideClick,
  useState,
  useStateActions,
  useSurveyEvents
}) => {
  const {openWindows, minimizedWindows, note, isReadOnly} = useState()
  const {updateNotes: updateNotesAction} = useStateActions()
  const {sendUpdateNotesTextEvent} = useSurveyEvents(scenarioId)

  const updateNotes = (text: NotesState) => {
    updateNotesAction(text)
    sendUpdateNotesTextEvent(text)
  }

  const handleOutsideClick = () => {
    if (openWindows.includes(OfficeTool.Notes) && !minimizedWindows.includes(OfficeTool.Notes)) {
      onOutsideClick?.()
    }
  }

  return (
    <Notes
      customStyles={customStyles}
      onClose={onClose}
      isReadOnly={isReadOnly}
      onMinimize={onMinimize}
      onOutsideClick={handleOutsideClick}
      text={note}
      updateNotes={updateNotes}
    />
  )
}
