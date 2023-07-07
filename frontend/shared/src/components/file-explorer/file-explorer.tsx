import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import {compact, sortBy, uniq} from "lodash-es"
import * as React from "react"
import {IconName, NodeType} from "../../enums"
import {ButtonConfig, DirectoryNode, FileNode, RootNode, TreeNodeType} from "../../models"
import {useLucaTranslation} from "../../translations"
import {Option} from "../../utils"
import {ContentLoadingIndicator} from ".."
import {TableOfContentsContainer} from "../table-of-content"
import {TreeNode} from "./tree-node"

export interface RenderDirectoryProps {
  node: DirectoryNode
  onClickChevron: (directoryNode: DirectoryNode, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  isDirectoryExpanded: boolean
  isDirectorySelected: boolean
  level: number
}

export interface FileExplorerCustomStyles {
  readonly card?: CSSInterpolation
  readonly cardContent?: CSSInterpolation
}

export interface FileExplorerProps {
  readonly tree: RootNode
  readonly isLoading: boolean
  readonly expandedDirectoryIds: UUID[]
  readonly selectedNodeId: Option<UUID>
  readonly onSelectNode?: (node: TreeNodeType) => void
  readonly onExpandDirectory: (directoryNodeId: string) => void
  readonly isCreateDirectoryButtonVisible?: boolean
  readonly onCreateDirectory?: () => void
  readonly renderOnlyDirectories?: boolean
  readonly renderDirectoryNode?: (options: RenderDirectoryProps) => React.ReactNode
  readonly renderCustomTopEntry?: () => React.ReactNode
  readonly renderCustomDirectoryIcon?: (node: DirectoryNode) => IconName
  readonly renderCustomFileSuffix?: (node: FileNode) => string
  readonly customStyles?: FileExplorerCustomStyles
  readonly prependSort?: UUID[]
  readonly appendSort?: UUID[]
  readonly shouldToggleDirectory?: boolean
  readonly countSubDirectoryFiles?: boolean
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  tree,
  isLoading,
  expandedDirectoryIds,
  onSelectNode,
  onExpandDirectory,
  selectedNodeId,
  isCreateDirectoryButtonVisible,
  onCreateDirectory,
  renderOnlyDirectories,
  renderDirectoryNode,
  renderCustomTopEntry,
  renderCustomDirectoryIcon,
  renderCustomFileSuffix,
  customStyles,
  shouldToggleDirectory,
  prependSort,
  appendSort,
  countSubDirectoryFiles = true
}) => {
  const {t} = useLucaTranslation()

  const sortedTree = React.useMemo<RootNode>(
    () => ({
      ...tree,
      children: getSortedTreeNodes(tree.children, prependSort, appendSort)
    }),
    [tree]
  )

  const renderTree = ({children}: RootNode) =>
    children.map((child, index) => (
      <TreeNode
        key={index}
        node={child}
        level={0}
        renderCustomDirectoryIcon={renderCustomDirectoryIcon}
        renderCustomFileSuffix={renderCustomFileSuffix}
        renderOnlyDirectories={renderOnlyDirectories}
        renderDirectoryNode={renderDirectoryNode}
        selectedNodeId={selectedNodeId}
        expandedDirectoryIds={expandedDirectoryIds}
        onSelect={onSelectNode}
        onExpandDirectory={onExpandDirectory}
        shouldToggleDirectory={shouldToggleDirectory}
        countSubDirectoryFiles={countSubDirectoryFiles}
      />
    ))

  const isTreeEmpty = sortedTree.children.length === 0
  const actionButtonConfig: ButtonConfig = {
    labelKey: "file_explorer__create_new_main_directories",
    icon: IconName.Add,
    onClick: () => onCreateDirectory && onCreateDirectory()
  }

  return (
    <TableOfContentsContainer
      title={t("file_explorer__title")}
      customCardStyles={customStyles?.card}
      customCardContentStyles={customStyles?.cardContent}
      customTocBodyChildrenStyles={isLoading ? styles.tocBodyChildren : undefined}
      headerIcon={IconName.HardDrive}
      addButtonConfig={isCreateDirectoryButtonVisible ? actionButtonConfig : undefined}
      showPlaceHolder={isTreeEmpty}
      placeholderHeadline={t("file_explorer__no_directories_title")}
      placeholderHint={t("file_explorer__no_directories_message")}>
      {isLoading ? (
        <ContentLoadingIndicator customStyles={styles.loadingIndicator} />
      ) : (
        <>
          {renderCustomTopEntry?.()}
          {renderTree(sortedTree)}
        </>
      )}
    </TableOfContentsContainer>
  )
}

export const getSortedTreeNodes = (
  treeNodes: TreeNodeType[],
  prependSort?: UUID[],
  appendSort?: UUID[]
): TreeNodeType[] => {
  const sortedNodes: TreeNodeType[] = sortBy(
    treeNodes.map(treeNode =>
      treeNode.type === NodeType.Directory ? {...treeNode, children: getSortedTreeNodes(treeNode.children)} : treeNode
    ),
    treeNode => treeNode.name.toLowerCase()
  )

  const idsToPrepend = prependSort || []
  const idsToAppend = appendSort || []

  return compact([
    ...idsToPrepend.map(id => sortedNodes.find(n => n.id === id)),
    ...sortedNodes.filter(n => !uniq([...idsToPrepend, ...idsToAppend]).includes(n.id)),
    ...idsToAppend.map(id => sortedNodes.find(n => n.id === id))
  ])
}

const styles = {
  tocBodyChildren: css({
    marginTop: 0,
    width: "100%",
    height: "100%"
  }),
  loadingIndicator: css({
    width: "100%",
    height: "100%",
    boxSizing: "border-box"
  })
}
