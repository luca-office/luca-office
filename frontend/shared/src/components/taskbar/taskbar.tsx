import * as React from "react"
import {BinaryViewerTool, OfficeTool, OfficeWindowType} from "../../enums"
import {CustomStyle} from "../../styles"
import {LucaTFunction, useLucaTranslation} from "../../translations"
import {contains, Option} from "../../utils"
import {Icon, Tooltip} from ".."
import {binaryViewerWindows, officeToolWindows, TaskbarItem} from "../desktop/config"
import {taskbarStyles as styles} from "./taskbar.style"

export interface TaskbarProps extends CustomStyle {
  readonly openedWindows: Array<OfficeWindowType>
  readonly focussedWindow: Option<OfficeWindowType>
  readonly availableWindows: Array<OfficeWindowType>
  readonly unreadEmailsCount: number
  readonly newEmailDownloadsCount: number
  readonly unreadMessageCount: number
  readonly isHidden?: boolean
  readonly isDisabled?: boolean
  readonly onOpenWindow: (window: OfficeWindowType) => void
  readonly usePortalForTooltips?: boolean
}

export const Taskbar: React.FC<TaskbarProps> = ({
  openedWindows,
  focussedWindow,
  onOpenWindow,
  availableWindows,
  unreadEmailsCount,
  newEmailDownloadsCount,
  unreadMessageCount,
  isDisabled = false,
  isHidden = false,
  customStyles,
  usePortalForTooltips = false
}) => {
  const {t} = useLucaTranslation()

  return (
    <div css={[styles.taskbar, !isHidden ? styles.taskbarVisible : styles.taskbarInvisible, customStyles]}>
      <div css={styles.container}>
        {renderItems(
          availableWindows,
          openedWindows,
          focussedWindow,
          isDisabled,
          unreadEmailsCount,
          newEmailDownloadsCount,
          unreadMessageCount,
          t,
          usePortalForTooltips,
          onOpenWindow
        )}
      </div>
    </div>
  )
}

const renderItems = (
  availableWindows: OfficeWindowType[],
  openedTools: OfficeWindowType[],
  focussedTool: Option<OfficeWindowType>,
  disabled: boolean,
  unreadEmails: number,
  newEmailDownloads: number,
  unreadMessageCount: number,
  t: LucaTFunction,
  usePortalForTooltips: boolean,
  onClickItem?: (tool: OfficeWindowType) => void
) => {
  const binaryViewers = binaryViewerWindows.filter(
    item => availableWindows.includes(item.tool) && openedTools.includes(item.tool)
  )
  const availableTools = officeToolWindows.filter(item => availableWindows.includes(item.tool))

  const renderNotification = (count: number) =>
    count > 0 ? (
      <div css={styles.notification}>
        <div css={styles.notificationNumber(count)}>{count}</div>
      </div>
    ) : null

  const renderItem = (item: TaskbarItem) => {
    const isActive = focussedTool.exists(tool => tool === item.tool)
    return (
      <Tooltip
        placement="top"
        delayShow={300}
        title={t(getLabelForOfficeTool(item.tool))}
        key={item.tool}
        withPortal={usePortalForTooltips}>
        <div css={styles.item}>
          {item.tool === OfficeTool.EmailClient && renderNotification(unreadEmails)}
          {item.tool === OfficeTool.FileBrowser && renderNotification(newEmailDownloads)}
          {item.tool === OfficeTool.Chat && renderNotification(unreadMessageCount)}
          <Icon
            key={item.iconName.toString()}
            name={item.iconName}
            width={32}
            height={32}
            customStyles={[styles.icon(disabled, isActive), isActive ? styles.activeIcon : undefined]}
            onClick={!disabled && !!onClickItem ? () => onClickItem(item.tool) : undefined}
          />
          <div css={[styles.circle, contains(item.tool, openedTools) ? null : styles.invisible]} />
        </div>
      </Tooltip>
    )
  }

  return (
    <div css={styles.items}>
      {binaryViewers.length > 0 && (
        <React.Fragment>
          {binaryViewers.map(renderItem)}
          <div css={styles.separator} />
        </React.Fragment>
      )}
      {availableTools.map(item => (
        <React.Fragment key={item.tool}>
          {item.tool === OfficeTool.Chat && <div css={styles.separator} />}
          {renderItem(item)}
        </React.Fragment>
      ))}
    </div>
  )
}

const getLabelForOfficeTool = (officeTool: OfficeWindowType) => {
  switch (officeTool) {
    case OfficeTool.Calculator:
      return "calculator__label"
    case OfficeTool.EmailClient:
      return "email__title"
    case OfficeTool.Erp:
      return "erp__title_full"
    case OfficeTool.FileBrowser:
      return "files_and_directories__title"
    case OfficeTool.Notes:
      return "notes__label"
    case OfficeTool.SpreadsheetEditor:
      return "viewer_tools__calc_type_label"
    case OfficeTool.ReferenceBookViewer:
      return "reference_book__title"
    case OfficeTool.Chat:
      return "chat__title"
    case BinaryViewerTool.ImageViewer:
      return "viewer_tools__image_type_label"
    case BinaryViewerTool.PDFViewer:
      return "viewer_tools__pdf_type_label"
    case BinaryViewerTool.VideoPlayer:
      return "viewer_tools__video_type_label"
    case BinaryViewerTool.TextEditor:
      return "viewer_tools__text_type_label"
    case BinaryViewerTool.SpreadsheetEditor:
      return "viewer_tools__calc_type_label"
  }
}
