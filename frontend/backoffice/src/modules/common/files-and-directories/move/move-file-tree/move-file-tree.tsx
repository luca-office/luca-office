import {css} from "@emotion/react"
import * as React from "react"
import {FileExplorer, Heading, Icon, RenderDirectoryProps, Text, Tooltip} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {Directory, DirectoryNode, File} from "shared/models"
import {
  backgroundColorLight,
  borderRadius,
  fileExplorerSelectedColor,
  Flex,
  FontWeight,
  primaryColor,
  spacing,
  spacingCard,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {createTree, findPathToNode, Option} from "shared/utils"
import {CustomDirectoryNode} from "../custom-directory-node/custom-directory-node"
import {ROOT} from "../hooks/use-move-overlay"
import {useMoveFileTree} from "./hooks/use-move-file-tree"

export interface MoveFileTreeProps {
  readonly isFile: boolean
  readonly currentParentDirectory: Option<DirectoryNode>
  readonly currentDirectoryId: Option<UUID>
  readonly selectedTargetDirectory: Option<UUID>
  readonly setSelectedTargetDirectory: React.Dispatch<React.SetStateAction<Option<string>>>
  readonly dataLoading: boolean
  readonly directories: Directory[]
  readonly files: File[]
}

export const MoveFileTree: React.FC<MoveFileTreeProps> = ({
  isFile,
  currentParentDirectory,
  selectedTargetDirectory,
  setSelectedTargetDirectory,
  currentDirectoryId,
  dataLoading: isLoading,
  directories,
  files
}) => {
  const {expandedDirectories, toggleExpandedDirectory} = useMoveFileTree()

  const tree = createTree(directories, files)

  const {t} = useLucaTranslation()

  const renderDirectoryNode = (options: RenderDirectoryProps) => (
    <CustomDirectoryNode
      currentDirectoryId={currentDirectoryId}
      currentParentDirectory={currentParentDirectory}
      isChildOfOrigin={isChildOfOrigin(
        currentDirectoryId,
        options.node.id,
        directories,
        currentParentDirectory.map(directory => directory.id)
      )}
      selectedTargetDirectory={selectedTargetDirectory}
      setSelectedTargetDirectory={setSelectedTargetDirectory}
      node={options.node}
      onClickChevron={options.onClickChevron}
      isDirectoryExpanded={options.isDirectoryExpanded}
      isDirectorySelected={options.isDirectorySelected}
      level={options.level}
    />
  )

  const renderCustomMoveToRootEntry = () => {
    const isSelected = selectedTargetDirectory.exists(target => target === ROOT)

    return (
      <div
        className="custom-move-to-root"
        css={moveFileTreeStyles.moveToRootEntry.container(isSelected)}
        onClick={isSelected ? undefined : () => setSelectedTargetDirectory(Option.of(ROOT))}>
        <Icon customStyles={moveFileTreeStyles.moveToRootEntry.icon} name={IconName.HardDrive} />
        <Text size={TextSize.Small}>{t("files_and_directories__move_modal_define_as_root_directory")}</Text>
        {isSelected && (
          <Tooltip title={t("files_and_directories__move_modal_tooltip_revert_selection")}>
            <Icon
              className="custom-move-to-root-close-button"
              customStyles={moveFileTreeStyles.moveToRootEntry.closeButton(isSelected)}
              name={IconName.Close}
              onClick={() => setSelectedTargetDirectory(Option.none())}
            />
          </Tooltip>
        )}
      </div>
    )
  }

  return (
    <div css={[Flex.column, {flex: 1}]}>
      <Heading customStyles={moveFileTreeStyles.title} level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
        {t("files_and_directories__move_modal_select_directory")}
      </Heading>
      <FileExplorer
        customStyles={{
          card: [moveFileTreeStyles.card, Flex.column],
          cardContent: {boxShadow: "inset 0px 0px 4px 0px rgba(0, 0, 0, 0.16)"}
        }}
        tree={tree}
        expandedDirectoryIds={expandedDirectories}
        isLoading={isLoading}
        onExpandDirectory={toggleExpandedDirectory}
        selectedNodeId={Option.none()}
        renderOnlyDirectories
        renderDirectoryNode={renderDirectoryNode}
        isCreateDirectoryButtonVisible={false}
        renderCustomTopEntry={!isFile && currentParentDirectory.isDefined() ? renderCustomMoveToRootEntry : undefined}
      />
    </div>
  )
}

const moveFileTreeStyles = {
  card: css({
    width: "100%",
    boxSizing: "border-box",
    flex: "1 1 0",
    overflow: "auto"
  }),
  content: css({
    boxShadow: "inset 0px 0px 4px 0px rgba(0, 0, 0, 0.16)"
  }),
  title: css({
    marginTop: spacingMedium,
    marginBottom: spacingTiny
  }),
  moveToRootEntry: {
    container: (isSelected: boolean) =>
      css(Flex.row, {
        boxSizing: "border-box",
        boxShadow: isSelected ? `${spacing(0, 1, 2, 0)} rgba(0, 0, 0, 0.24)` : "none",
        cursor: isSelected ? "default" : "pointer",
        padding: spacing(spacingTiny, spacingCard, spacingTiny, spacingMedium + spacingTiny),
        borderRadius: borderRadius,
        height: spacingLarge,
        border: `1px solid ${isSelected ? primaryColor : backgroundColorLight}`,
        marginBottom: spacingCard,

        ":hover": {
          backgroundColor: fileExplorerSelectedColor
        }
      }),
    closeButton: (isSelected: boolean) =>
      css({
        cursor: isSelected ? "pointer" : "inherit",
        marginLeft: "auto"
      }),
    icon: css({marginRight: spacingSmall})
  }
}

const isChildOfOrigin = (
  currentDirectoryId: Option<string>,
  selectedNode: string,
  directories: Directory[],
  currentParentDirectoryId: Option<string>
) =>
  currentDirectoryId.exists(directoryId =>
    findPathToNode(selectedNode, directories, [], currentParentDirectoryId.orUndefined()).includes(directoryId)
  )
