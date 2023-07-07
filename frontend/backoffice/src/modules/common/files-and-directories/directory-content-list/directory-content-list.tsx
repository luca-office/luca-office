import * as React from "react"
import {
  Button,
  Column,
  ColumnProps,
  Columns,
  deleteEntityButtonStyles,
  DeleteOrArchiveEntityButton,
  Heading,
  Icon,
  TableContainer,
  Tooltip
} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {Relevance} from "shared/graphql/generated/globalTypes"
import {DeleteEntityHook, File} from "shared/models"
import {CustomStyle, fontColor, FontWeight, textEllipsis} from "shared/styles"
import {LucaTFunction, useLucaTranslation} from "shared/translations"
import {iconForFile, Option, sort} from "shared/utils"
import {Directory} from "../../../../models"
import {translationKeyForRelevance} from "../../../../utils"
import {contentListStyle} from "./directory-content-list.style"

interface Props extends CustomStyle {
  readonly directories: Directory[]
  readonly files: File[]
  readonly onClickDirectory: (id: UUID) => void
  readonly onClickFile: (id: UUID) => void
  readonly onCreateFile: () => void
  readonly onCreateSubdirectory: () => void
  readonly disabled: boolean
  readonly deleteDirectoryHook: () => DeleteEntityHook
  readonly deleteFileHook: () => DeleteEntityHook
  readonly isCreateSubDirectoryDisabled?: boolean
  readonly isTableEntityDisabled?: (entityId: UUID) => boolean
  readonly showRelevance?: boolean
  readonly tooltipLabel?: string
}

interface TableEntity {
  readonly id: UUID
  readonly title: string
  readonly relevance: Option<Relevance>
  readonly iconName: IconName
  readonly isDirectory: boolean
}

export const DirectoryContentList: React.FC<Props> = ({
  customStyles,
  directories,
  files,
  onClickDirectory,
  onClickFile,
  onCreateFile,
  onCreateSubdirectory,
  disabled,
  deleteDirectoryHook,
  deleteFileHook,
  isCreateSubDirectoryDisabled = false,
  isTableEntityDisabled,
  showRelevance = true,
  tooltipLabel
}) => {
  const {t} = useLucaTranslation()

  const columns = createColumns(
    t,
    onCreateFile,
    onCreateSubdirectory,
    disabled,
    isCreateSubDirectoryDisabled,
    showRelevance,
    tooltipLabel ?? t("files_and_directories__disabled_tooltip"),
    deleteDirectoryHook,
    deleteFileHook,
    isTableEntityDisabled
  )
  const entities = createEntities(directories, files)

  const onClick = (entity: TableEntity) => {
    if (entity.isDirectory) {
      onClickDirectory(entity.id)
    } else {
      onClickFile(entity.id)
    }
  }

  return (
    <TableContainer
      customStyles={[contentListStyle.contentList, customStyles]}
      customRowStyles={() => contentListStyle.tableRowHeight}
      entities={entities}
      customHeaderRowStyles={contentListStyle.tableHeaderRow}
      entityKey={entity => entity.id}
      columns={columns}
      onClick={onClick}
      placeHolderText={t("files_and_directories__directory_content_list_placeholder")}
    />
  )
}

const createColumns = (
  t: LucaTFunction,
  onCreateFile: () => void,
  onCreateSubdirectory: () => void,
  disabled: boolean,
  isCreateSubDirectoryDisabled: boolean,
  showRelevance: boolean,
  tooltipLabel: string,
  deleteDirectoryHook: () => DeleteEntityHook,
  deleteFileHook: () => DeleteEntityHook,
  isEntityDisabled?: (entityId: UUID) => boolean
): ColumnProps<TableEntity>[] => [
  {
    key: "title",
    header: (
      <Heading fontWeight={FontWeight.Bold} level={HeadingLevel.h3}>
        {t("files_and_directories__directory_detail__column_header_title")}
      </Heading>
    ),
    customStyles: contentListStyle.headerTitle,
    content: entity => (
      <Columns>
        <Column flexGrow={0} flexShrink={0}>
          <Icon name={entity.iconName} />
        </Column>
        <Column customStyles={textEllipsis}>{entity.title}</Column>
      </Columns>
    )
  },
  ...(showRelevance
    ? [
        {
          key: "relevance",
          header: (
            <Heading fontWeight={FontWeight.Bold} level={HeadingLevel.h3}>
              {t("files_and_directories__directory_detail__column_header_relevance")}
            </Heading>
          ),
          customStyles: contentListStyle.headerRelevance,
          content: (entity: TableEntity) =>
            entity.relevance.map(relevance => t(translationKeyForRelevance(relevance))).getOrElse("–")
        }
      ]
    : []),
  {
    key: "create-directory",
    header: (
      <Tooltip title={disabled ? tooltipLabel : t("files_and_directories__create_subdirectory_tooltip")}>
        <Button
          disabled={disabled || isCreateSubDirectoryDisabled}
          customStyles={contentListStyle.operationButton}
          icon={IconName.Add}
          onClick={onCreateSubdirectory}>
          {t("files_and_directories__directory_detail_sub_directory")}
        </Button>
      </Tooltip>
    ),
    content: () => null,
    customStyles: contentListStyle.operationColumn,
    customHeaderStyles: [contentListStyle.operationColumn, contentListStyle.operationHeaderColumn]
  },
  {
    key: "create-file",
    header: (
      <Tooltip
        customStyles={contentListStyle.addFileTooltip}
        title={disabled ? tooltipLabel : t("files_and_directories__create_file_tooltip")}>
        <Button
          disabled={disabled}
          customStyles={contentListStyle.operationButton}
          icon={IconName.Add}
          onClick={onCreateFile}>
          {t("files_and_directories__files")}
        </Button>
      </Tooltip>
    ),
    content: entity => (
      <DeleteOrArchiveEntityButton
        useDeleteHook={entity.isDirectory ? deleteDirectoryHook : deleteFileHook}
        entityId={entity.id}
        disabled={disabled || isEntityDisabled?.(entity.id)}
        stopEventPropagation={true}
        stopEventPropagationOnOverlayClick={true}
        customButtonStyles={deleteEntityButtonStyles.iconOnlyButton}
        iconColor={fontColor}
      />
    ),
    customHeaderStyles: [contentListStyle.operationColumn, contentListStyle.operationHeaderColumn],
    customStyles: [contentListStyle.operationColumn, contentListStyle.lastOperationColumn]
  }
]

const createEntities = (directories: Directory[], files: File[]) => {
  const directoryEntities: TableEntity[] = directories.map(directory => ({
    id: directory.id,
    title: directory.name,
    relevance: Option.none(),
    iconName: IconName.Folder,
    isDirectory: true
  }))

  const fileEntities: TableEntity[] = files.map(file => ({
    id: file.id,
    title: file.name,
    relevance: Option.of(file.relevance),
    iconName: iconForFile(file),
    isDirectory: false
  }))

  const sortedDirectoryEntities = sort(entity => entity.title, directoryEntities)
  const sortedFileEntities = sort(entity => entity.title, fileEntities)

  return sortedDirectoryEntities.concat(sortedFileEntities)
}
