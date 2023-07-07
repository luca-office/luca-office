import React from "react"
import {Taskbar} from "shared/components"
import {useTaskbar} from "./hooks/use-taskbar"

export interface TaskbarContainerProps {
  readonly scenarioId: UUID
  readonly isHidden?: boolean
}

export const TaskbarContainer: React.FC<TaskbarContainerProps> = ({scenarioId, isHidden = false}) => {
  const {
    openedWindows,
    focussedWindow,
    onOpenTool,
    availableWindows,
    dataLoading,
    unreadEmailsCount,
    unreadSupervisorMessagesCount,
    newEmailDownloadsCount
  } = useTaskbar(scenarioId)

  const isTaskbarHidden = !availableWindows.length || isHidden || dataLoading

  return (
    <Taskbar
      availableWindows={availableWindows}
      openedWindows={openedWindows}
      focussedWindow={focussedWindow}
      onOpenWindow={onOpenTool}
      unreadEmailsCount={unreadEmailsCount}
      isHidden={isTaskbarHidden}
      newEmailDownloadsCount={newEmailDownloadsCount}
      unreadMessageCount={unreadSupervisorMessagesCount}
    />
  )
}
