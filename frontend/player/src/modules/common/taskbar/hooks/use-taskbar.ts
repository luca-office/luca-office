import {isEqual} from "lodash-es"
import {useEffect, useRef} from "react"
import {useDispatch, useSelector} from "react-redux"
import {binaryViewerWindows, officeToolWindows} from "shared/components/desktop/config"
import {findVisibleWindows} from "shared/components/desktop/utils"
import {OfficeTool, OfficeWindowType} from "shared/enums"
import {EmailDirectory, SurveyExecutionType} from "shared/graphql/generated/globalTypes"
import {ReferenceBookChapterFragment} from "shared/graphql/generated/ReferenceBookChapterFragment"
import {useScenarioReferenceBookChapters} from "shared/graphql/hooks/queries"
import {openWindow, updateAvailableWindows} from "shared/redux/actions/ui/window-manager-action"
import {EmailsState} from "shared/redux/state/data"
import {last, Option, sendOpenToolEvent, sendRestoreToolEvent, some} from "shared/utils"
import {useGetSurveyInvitationFromRedux} from "../../../../hooks/use-get-survey-invitation"
import {AppState} from "../../../../redux/state/app-state"

export interface UseTaskbarHook {
  readonly availableWindows: OfficeWindowType[]
  readonly dataLoading: boolean
  readonly openedWindows: OfficeWindowType[]
  readonly focussedWindow: Option<OfficeWindowType>
  readonly unreadEmailsCount: number
  readonly newEmailDownloadsCount: number
  readonly unreadSupervisorMessagesCount: number
  readonly onOpenTool: (tool: OfficeWindowType) => void
}

export const useTaskbar = (scenarioId: UUID): UseTaskbarHook => {
  const dispatch = useDispatch()
  const {invitationIdOption, surveyIdOption, executionTypeOption} = useGetSurveyInvitationFromRedux()
  const openedWindows = useSelector<AppState, OfficeWindowType[]>(s => s.ui.windowManager.openWindows)
  const availableWindows = useSelector<AppState, OfficeWindowType[]>(s => s.ui.windowManager.availableWindows)
  const minimizedWindows = useSelector<AppState, OfficeWindowType[]>(s => s.ui.windowManager.minimizedWindows)
  const showChat = executionTypeOption.exists(type => type !== SurveyExecutionType.AutomaticAsynchronous)
  const unreadSupervisorMessagesCount = useSelector<AppState, number>(s => s.data.chat.unreadSupervisorMessagesCount)
  const newEmailDownloadsCount = useSelector<AppState, number>(s => s.ui.filesAndDirectories.newEmailFilesCounter)
  const emails = useSelector<AppState, EmailsState>(s => s.data.emails)

  const unreadEmailsCount = emails.filter(
    email => !email.isRead && email.isVisible && email.directory === EmailDirectory.Inbox
  ).length

  const openToolWindow = (tool: OfficeWindowType) => dispatch(openWindow(tool))

  const scenarioReferenceBooksRef = useRef<ReferenceBookChapterFragment[]>([])
  const {scenarioReferenceBooks, scenarioReferenceBooksLoading} = useScenarioReferenceBookChapters(scenarioId)

  if (!isEqual(scenarioReferenceBooksRef.current, scenarioReferenceBooks.getOrElse([]))) {
    scenarioReferenceBooksRef.current = scenarioReferenceBooks.getOrElse([])
  }

  useEffect(() => {
    const showReferenceBooks = scenarioReferenceBooks
      .map(books => some(({articles}) => articles.length > 0, books))
      .getOrElse(false)

    const availWindows = officeToolWindows
      .concat(binaryViewerWindows)
      .filter(({tool}) => (showChat ? true : tool !== OfficeTool.Chat))
      .filter(({tool}) => (showReferenceBooks ? true : tool !== OfficeTool.ReferenceBookViewer))
      .map(window => window.tool)

    dispatch(updateAvailableWindows(availWindows))
  }, [scenarioReferenceBooksRef.current, showChat])

  const onOpenTool = (tool: OfficeWindowType) => {
    const isFocussed = last(openedWindows.filter(window => !minimizedWindows.includes(window)))
      .map(lastTool => lastTool === tool)
      .getOrElse(false)

    if (!isFocussed) {
      const isOpen = openedWindows.includes(tool)
      const handler = isOpen ? sendRestoreToolEvent : sendOpenToolEvent
      invitationIdOption.forEach(invitationId =>
        surveyIdOption.forEach(surveyId => handler(tool)(surveyId, invitationId, scenarioId))
      )
    }

    openToolWindow(tool)
  }

  return {
    availableWindows,
    dataLoading: scenarioReferenceBooksLoading,
    openedWindows: minimizedWindows.concat(openedWindows),
    focussedWindow: last(findVisibleWindows(openedWindows, minimizedWindows)),
    unreadEmailsCount,
    unreadSupervisorMessagesCount,
    newEmailDownloadsCount,
    onOpenTool
  }
}
