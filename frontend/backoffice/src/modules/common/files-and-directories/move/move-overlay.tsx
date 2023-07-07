import {css} from "@emotion/react"
import * as React from "react"
import {Heading, Icon, Modal, Paper, Text} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {Directory, DirectoryNode, File} from "shared/models"
import {Flex, FontWeight, spacingMedium, spacingTiny, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {iconForFile, Option} from "shared/utils"
import {useMoveOverlay} from "./hooks/use-move-overlay"
import {MoveFileTree} from "./move-file-tree/move-file-tree"

export interface MoveOverlayProps {
  readonly file: Option<File>
  readonly directory: Option<Directory>
  readonly onFilesSuccessfullyMoved: (targetDirectoryIdWithParents: UUID[]) => void
  readonly onDismiss: () => void
  readonly name: string
  readonly parentDirectory: Option<DirectoryNode>
  readonly dataLoading: boolean
  readonly directories: Directory[]
  readonly files: File[]
}

export const MoveOverlay: React.FC<MoveOverlayProps> = ({
  onFilesSuccessfullyMoved,
  onDismiss,
  file: fileOption,
  directory: directoryOption,
  name,
  parentDirectory,
  directories,
  files,
  dataLoading
}) => {
  const {t} = useLucaTranslation()
  const {selectedTargetDirectory, setSelectedTargetDirectory, changeDirectory} = useMoveOverlay(
    directoryOption,
    fileOption,
    onFilesSuccessfullyMoved,
    directories,
    files
  )

  const isFile = fileOption.isDefined()

  return (
    <Modal
      customStyles={styles.modal}
      customFooterStyles={{marginTop: spacingMedium}}
      confirmButtonKey={"files_and_directories__move_directory"}
      confirmButtonDisabled={selectedTargetDirectory.isEmpty()}
      title={t("files_and_directories__move_modal_title", {
        entity: isFile
          ? t("files_and_directories__move_modal_entity_file")
          : t("files_and_directories__move_modal_entity_directory")
      })}
      onDismiss={onDismiss}
      onConfirm={changeDirectory}>
      <div css={[Flex.column, {height: "100%"}]}>
        <Text>
          {t(
            isFile
              ? "files_and_directories__move_modal_info_text_file"
              : "files_and_directories__move_modal_info_text_directory"
          )}
        </Text>

        <div>
          <Heading customStyles={styles.nameInfoTitle} level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
            {t(
              isFile
                ? "files_and_directories__move_modal_file_name_label"
                : "files_and_directories__move_modal_directory_name_label"
            )}
          </Heading>
          <Paper customStyles={Flex.row}>
            <Icon
              customStyles={{marginRight: spacingTiny}}
              name={fileOption.map(iconForFile).getOrElse(IconName.Folder)}
            />
            <Text customStyles={{marginLeft: spacingTiny}} size={TextSize.Medium}>
              {name}
            </Text>
          </Paper>
        </div>

        <MoveFileTree
          isFile={isFile}
          currentDirectoryId={directoryOption.map(directory => directory.id)}
          selectedTargetDirectory={selectedTargetDirectory}
          setSelectedTargetDirectory={setSelectedTargetDirectory}
          currentParentDirectory={parentDirectory}
          directories={directories}
          files={files}
          dataLoading={dataLoading}
        />
      </div>
    </Modal>
  )
}

const styles = {
  modal: css({
    width: "60vw",
    height: "50vh"
  }),
  nameInfoTitle: css({
    marginTop: spacingMedium,
    marginBottom: spacingTiny
  })
}
