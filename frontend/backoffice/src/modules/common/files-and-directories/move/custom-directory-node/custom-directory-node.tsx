import * as React from "react"
import {Icon, Text, Tooltip} from "shared/components"
import {IconName} from "shared/enums"
import {DirectoryNode} from "shared/models"
import {
  buttonBackgroundColorDisabled,
  Flex,
  fontColor,
  fontColorLight,
  primaryColor,
  spacingSmall,
  textEllipsis,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {countDirectoryChildren, countFileChildren, Option} from "shared/utils"
import {nodeStyles} from "./custom-directory-node.style"

export interface CustomDirectoryNodeProps {
  readonly node: DirectoryNode
  readonly onClickChevron: (directoryNode: DirectoryNode, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  readonly isDirectoryExpanded: boolean
  readonly isDirectorySelected: boolean
  readonly isChildOfOrigin: boolean
  readonly level: number
  readonly currentParentDirectory: Option<DirectoryNode>
  readonly currentDirectoryId: Option<UUID>
  readonly selectedTargetDirectory: Option<UUID>
  readonly setSelectedTargetDirectory: React.Dispatch<React.SetStateAction<Option<string>>>
}

export const CustomDirectoryNode: React.FC<CustomDirectoryNodeProps> = ({
  node,
  onClickChevron,
  isDirectoryExpanded,
  isDirectorySelected,
  level,
  currentParentDirectory,
  selectedTargetDirectory,
  setSelectedTargetDirectory,
  currentDirectoryId,
  isChildOfOrigin
}) => {
  const {t} = useLucaTranslation()

  const isParentOrigin = currentParentDirectory.map(directory => directory.id).contains(node.id)
  const isSameOrigin = currentDirectoryId.contains(node.id)
  const isSelectedTargetDirectory = selectedTargetDirectory.contains(node.id)
  const shouldHandleMove = !isParentOrigin && !isSameOrigin && !isChildOfOrigin

  const handleChevronClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation()
    onClickChevron(node, evt)
  }

  const handleMove = () => setSelectedTargetDirectory(Option.of(node.id))

  const handleClose = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation()
    setSelectedTargetDirectory(Option.none())
  }

  const renderCloseIcon = () => (
    <div data-testid="close-icon" className="close-icon" onClick={handleClose} css={[Flex.row]}>
      <Tooltip title={t("files_and_directories__move_modal_tooltip_revert_selection")}>
        <Icon customStyles={[nodeStyles.moveIcon, {cursor: "pointer"}]} name={IconName.Close} />
      </Tooltip>
    </div>
  )

  const renderMoveIconWithText = () => (
    <div className="move-text" css={[Flex.row, {visibility: "hidden"}]}>
      <Text size={TextSize.Small}>{t("files_and_directories__move_modal_target_directory")}</Text>
      <Icon customStyles={nodeStyles.moveIcon} name={IconName.Move} />
    </div>
  )

  const directoryText = `${node.name} (${countFileChildren(node)})`
  const hasDirectoryChildren = countDirectoryChildren(node) > 0
  const iconColor = hasDirectoryChildren ? fontColor : buttonBackgroundColorDisabled

  return (
    <div
      data-testid="custom-directory-move"
      css={[nodeStyles.entry(level, isDirectorySelected)]}
      onClick={shouldHandleMove ? handleMove : undefined}>
      <div
        css={nodeStyles.entryContent({
          isCurrentPosition: isParentOrigin || isSameOrigin,
          isChildOfOrigin,
          isSelectedTargetPosition: isSelectedTargetDirectory,
          handleMove: shouldHandleMove
        })}>
        <Tooltip inactive={!isChildOfOrigin} title={t("files_and_directories__move_modal_tooltip_move_not_possible")}>
          <div css={Flex.row}>
            <Tooltip title={!hasDirectoryChildren ? t("files_and_directories__move_modal_no_subfolders") : ""}>
              <Icon
                color={iconColor}
                css={nodeStyles.chevronIcon}
                name={isDirectoryExpanded ? IconName.ChevronFilledDown : IconName.ChevronFilledRight}
                onClick={handleChevronClick}
              />
            </Tooltip>

            <Icon
              css={{marginRight: spacingSmall}}
              name={IconName.Folder}
              color={isChildOfOrigin ? fontColorLight : fontColor}
            />
            <Text size={TextSize.Small} customStyles={[textEllipsis, nodeStyles.nodeName(isChildOfOrigin)]}>
              {directoryText}
            </Text>
          </div>
        </Tooltip>

        {isParentOrigin || isSameOrigin ? (
          <Text customStyles={{color: primaryColor}} size={TextSize.Small}>
            {t("files_and_directories__move_modal_current_position")}
          </Text>
        ) : (
          !isSelectedTargetDirectory && !isChildOfOrigin && renderMoveIconWithText()
        )}

        {isSelectedTargetDirectory && renderCloseIcon()}
      </div>
    </div>
  )
}
