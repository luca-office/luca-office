import {css} from "@emotion/react"
import * as React from "react"
import {
  Column,
  ColumnProps,
  Columns,
  FilesAndDirectoriesDetailView,
  Heading,
  Icon,
  TableContainer
} from "../../../components"
import {FileType, HeadingLevel, IconName} from "../../../enums"
import {Directory, File} from "../../../models"
import {
  contentListMinHeightSmall,
  contentListPlaceholderHeightSmall,
  FontWeight,
  spacingMedium,
  spacingTiny,
  textEllipsis
} from "../../../styles"
import {LucaTFunction} from "../../../translations"
import {getLanguageKeyFromMimeType, iconForFile, sort} from "../../../utils"

export interface DirectoryDetailProps {
  readonly t: LucaTFunction
  readonly directory: Directory
  readonly subdirectories: Directory[]
  readonly files: File[]
  readonly onSelectDirectory: (id: UUID) => void
  readonly onSelectFile: (id: UUID) => void
}

interface TableEntity {
  readonly id: UUID
  readonly title: string
  readonly iconName: IconName
  readonly type: string
  readonly onClick: () => void
}

export const DirectoryDetail: React.FC<DirectoryDetailProps> = ({
  t,
  directory,
  subdirectories,
  files,
  onSelectDirectory,
  onSelectFile
}) => (
  <FilesAndDirectoriesDetailView
    headerIcon={IconName.Folder}
    headerTitle={directory.name}
    customCardContentStyles={styles.cardContent}>
    <div css={styles.content}>
      <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
        {t("directories_and_files__directory_detail__heading")} ({subdirectories.length + files.length})
      </Heading>
      <TableContainer
        customStyles={styles.table}
        columns={columns(t)}
        entities={createEntities(t, onSelectDirectory, onSelectFile, subdirectories, files)}
        entityKey={entity => entity.id}
        showFooter
        onClick={entity => entity.onClick()}
        placeHolderText={t("directories_and_files__directory_detail__placeholder")}
      />
    </div>
  </FilesAndDirectoriesDetailView>
)

const columns = (t: LucaTFunction): ColumnProps<TableEntity>[] => [
  {
    key: "title",
    header: t("directories_and_files__directory_detail__column_header_title"),
    content: entity => (
      <Columns>
        <Column flexGrow={0} flexShrink={0}>
          <Icon name={entity.iconName} />
        </Column>
        <Column customStyles={styles.columnTitle}>{entity.title}</Column>
      </Columns>
    )
  },
  {
    key: "type",
    header: t("directories_and_files__directory_detail__column_header_type"),
    content: entity => entity.type
  }
]

const createEntities = (
  t: LucaTFunction,
  onSelectDirectory: (id: UUID) => void,
  onSelectFile: (id: UUID) => void,
  directories: Directory[],
  files: File[]
) => {
  const directoryEntities: TableEntity[] = directories.map(directory => ({
    id: directory.id,
    title: directory.name,
    iconName: IconName.Folder,
    type: t("directories_and_files__type_directory"),
    onClick: () => onSelectDirectory(directory.id)
  }))

  const fileEntities: TableEntity[] = files.map(file => ({
    id: file.id,
    title: file.name,
    iconName: iconForFile(file),
    type:
      file.fileType === FileType.Media
        ? t(getLanguageKeyFromMimeType(file.binaryFile.mimeType))
        : file.fileType === FileType.Spreadsheet
        ? t("directories_and_files__type_file_spreadsheet")
        : t("directories_and_files__type_file_text_document"),
    onClick: () => onSelectFile(file.id)
  }))

  const sortedDirectoryEntities = sort(entity => entity.title, directoryEntities)
  const sortedFileEntities = sort(entity => entity.title, fileEntities)

  return sortedDirectoryEntities.concat(sortedFileEntities)
}

const styles = {
  cardContent: css({
    overflow: "auto"
  }),
  content: css({
    flex: "1 1 auto",
    padding: spacingMedium,
    display: "flex",
    flexDirection: "column"
  }),
  table: css({
    marginTop: spacingTiny,
    minHeight: contentListMinHeightSmall,
    overflow: "auto",

    ".table-placeholder": {
      minHeight: contentListPlaceholderHeightSmall
    }
  }),
  columnTitle: css(textEllipsis)
}
