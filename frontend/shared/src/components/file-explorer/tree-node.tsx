import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import React, {Fragment} from "react"
import {IconName, NodeType} from "../../enums"
import {DirectoryNode, FileNode, TreeNodeType} from "../../models"
import {
  backgroundColorBright,
  buttonBackgroundColorDisabled,
  fileExplorerSelectedColor,
  Flex,
  fontColor,
  fontColorLight,
  fontFamily,
  spacing,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  textEllipsis,
  TextSize
} from "../../styles"
import {useLucaTranslation} from "../../translations"
import {countFileChildren, iconForBinaryType, Option} from "../../utils"
import {Icon, Text, Tooltip} from "../"
import {RenderDirectoryProps} from "./file-explorer"

export interface TreeNodeProps {
  readonly node: TreeNodeType
  readonly level: number
  readonly selectedNodeId: Option<UUID>
  readonly expandedDirectoryIds: string[]
  readonly onSelect?: (node: TreeNodeType) => void
  readonly onExpandDirectory: (directoryNodeId: string) => void
  readonly renderOnlyDirectories?: boolean
  readonly customNodeStyle?: CSSInterpolation
  readonly renderDirectoryNode?: (options: RenderDirectoryProps) => React.ReactNode
  readonly renderCustomDirectoryIcon?: (node: DirectoryNode) => IconName
  readonly renderCustomFileSuffix?: (node: FileNode) => string
  readonly shouldToggleDirectory?: boolean
  readonly countSubDirectoryFiles?: boolean
}

export const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  level,
  selectedNodeId,
  expandedDirectoryIds,
  onSelect,
  onExpandDirectory,
  renderDirectoryNode,
  renderOnlyDirectories,
  renderCustomDirectoryIcon,
  renderCustomFileSuffix,
  customNodeStyle,
  shouldToggleDirectory = true,
  countSubDirectoryFiles = true
}) => {
  const {t} = useLucaTranslation()
  const isSelected = selectedNodeId.contains(node.id)
  const handleClick = (node: TreeNodeType) => {
    if (onSelect && ((shouldToggleDirectory && node.type === NodeType.Directory) || !isSelected)) {
      onSelect(node)
    }
  }

  const isFileEnabled = node.type === NodeType.File && node.disabled === false

  const renderDirectory = (node: DirectoryNode) => {
    const isDirectoryExpanded = expandedDirectoryIds.includes(node.id)
    const fileCount = countFileChildren(node, countSubDirectoryFiles)
    const hasContent = fileCount > 0 || node.children.length > 0
    const iconColor = hasContent ? fontColor : buttonBackgroundColorDisabled

    const onClickChevron = (directoryNode: DirectoryNode, event: React.MouseEvent<HTMLDivElement>) => {
      if (hasContent) {
        event.stopPropagation()
        onExpandDirectory(directoryNode.id)
      }
    }

    return (
      <Fragment>
        {renderDirectoryNode ? (
          renderDirectoryNode({node, onClickChevron, isDirectoryExpanded, isDirectorySelected: isSelected, level})
        ) : (
          <div
            css={[styles.entry(level, isSelected), customNodeStyle]}
            className="tree-node"
            onClick={() => handleClick(node)}>
            <div css={styles.entryContent(false)}>
              <Tooltip title={!hasContent ? t("files_and_directories__tree__no_content") : ""}>
                <Icon
                  color={iconColor}
                  css={styles.chevronIcon}
                  width={spacingMedium}
                  name={isDirectoryExpanded ? IconName.ChevronFilledDown : IconName.ChevronFilledRight}
                  onClick={event => onClickChevron(node, event)}
                />
              </Tooltip>

              <Icon
                css={{marginRight: spacingSmall}}
                width={spacingMedium}
                name={renderCustomDirectoryIcon !== undefined ? renderCustomDirectoryIcon(node) : IconName.Folder}
              />
              <div className="tree-node-file-count" css={textEllipsis}>{`${node.name} (${fileCount})`}</div>
            </div>
          </div>
        )}

        {isDirectoryExpanded
          ? node.children.map((child, index) => (
              <TreeNode
                key={index}
                node={child}
                level={level + 1}
                customNodeStyle={customNodeStyle}
                renderOnlyDirectories={renderOnlyDirectories}
                renderDirectoryNode={renderDirectoryNode}
                renderCustomFileSuffix={renderCustomFileSuffix}
                selectedNodeId={selectedNodeId}
                expandedDirectoryIds={expandedDirectoryIds}
                onSelect={onSelect}
                onExpandDirectory={onExpandDirectory}
                countSubDirectoryFiles={countSubDirectoryFiles}
              />
            ))
          : null}
      </Fragment>
    )
  }

  const renderFile = (node: FileNode, isVisible: boolean) =>
    isVisible ? (
      <div
        css={[styles.entry(level, isSelected, true), customNodeStyle]}
        onClick={() => isFileEnabled && onSelect?.(node)}>
        <div css={styles.entryContent(!isFileEnabled)}>
          <Icon
            hasSpacing={true}
            color={isFileEnabled ? fontColor : buttonBackgroundColorDisabled}
            customSpacing={spacingSmall}
            name={iconForFileNode(node)}
            width={spacingMedium}
          />
          <div css={styles.fileName}>
            {node.name}
            {renderCustomFileSuffix && (
              <Text customStyles={styles.fileNameSuffix} size={TextSize.Small}>
                {renderCustomFileSuffix(node)}
              </Text>
            )}
          </div>

          {node.isLocked && (
            <Icon name={IconName.LockClosed} color={fontColorLight} customStyles={{marginLeft: spacingSmall}} />
          )}
        </div>
      </div>
    ) : null

  const renderNode = (node: TreeNodeType) => {
    switch (node.type) {
      case NodeType.Directory:
        return renderDirectory(node as DirectoryNode)
      case NodeType.File:
        return renderFile(node as FileNode, !renderOnlyDirectories)
      default:
        return null
    }
  }

  return renderNode(node)
}

const iconForFileNode = (node: FileNode) =>
  node.binaryType !== null ? iconForBinaryType(node.binaryType) : iconForNonBinaryType(node)

const iconForNonBinaryType = (node: FileNode) =>
  node.name.slice(-4) === ".txt" ? IconName.TextEditor : IconName.TableCalculation

const styles = {
  entry: (level: number, isSelected?: boolean, isFile?: boolean) =>
    css({
      cursor: !isSelected ? "pointer" : "default",
      paddingLeft: level * spacingMedium + (isFile ? spacingMedium + spacingTiny : 0),
      backgroundColor: isSelected ? fileExplorerSelectedColor : backgroundColorBright,
      borderRadius: spacingTiny,
      boxSizing: "border-box"
    }),
  entryContent: (isDisabled: boolean) =>
    css(Flex.row, {
      fontFamily: fontFamily,
      fontSize: TextSize.Small,
      lineHeight: spacing(spacingMedium),
      letterSpacing: 0.13,
      height: spacingLarge,
      cursor: isDisabled ? "not-allowed" : "pointer",
      color: isDisabled ? buttonBackgroundColorDisabled : fontColor,
      alignItems: "center"
    }),
  chevronIcon: css({
    marginRight: spacingTiny,
    cursor: "pointer"
  }),
  fileName: css(textEllipsis, Flex.row, {
    flex: "1 1 auto"
  }),
  fileNameSuffix: css(textEllipsis, {
    color: fontColorLight,
    marginLeft: "auto"
  })
}
