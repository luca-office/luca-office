import * as React from "react"
import {Button, ColumnProps, DeleteOrArchiveEntityButton, Heading, Icon, UploadFileModal} from "shared/components"
import {HeadingLevel, IconName, UploadFileType} from "shared/enums"
import {Email} from "shared/models"
import {AddEmailFiles, EmailBodyFile} from "shared/office-tools/email-client/email-details/email-files"
import {CustomStyle, FontWeight, iconDefaultColor} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {iconForFile} from "shared/utils"
import {Option} from "shared/utils/option"
import {emailStyle as styles} from "./email-body-files.style"
import {useEmailFiles} from "./hooks/use-email-files"

export interface EmailBodyFilesProps extends CustomStyle {
  readonly email: Email
  readonly disabled?: boolean
}

export const EmailBodyFiles: React.FC<EmailBodyFilesProps> = ({disabled = false, customStyles, email}) => {
  const {t} = useLucaTranslation()
  const {uploadVisible, showUpload, hideUpload, uploadBinaries, files, deleteFileHook, createTextDocumentFile} =
    useEmailFiles(email)

  const fileEntities: EmailBodyFile[] = files.map(file => ({
    id: file.id,
    title: file.name,
    relevance: Option.of(file.relevance),
    iconName: iconForFile(file)
  }))

  const columns: ColumnProps<EmailBodyFile>[] = [
    {
      key: "icon-title",
      customStyles: styles.iconTitleColumn,
      header: (
        <Heading fontWeight={FontWeight.Bold} level={HeadingLevel.h3}>
          {t("email__files_table_column_file")}
        </Heading>
      ),
      content: entity => (
        <div css={styles.nameColumnContent}>
          <Icon name={entity.iconName} />
          {entity.title}
        </div>
      )
    },
    {
      key: "create-file",
      customStyles: [styles.deleteColumn],
      header: (
        <Button
          disabled={disabled}
          icon={IconName.Add}
          title={t("email__files_table_column_file")}
          customStyles={styles.addButton}
          customIconStyles={styles.addButtonIcon}
          onClick={showUpload}
        />
      ),
      content: entity => (
        <DeleteOrArchiveEntityButton
          customStyles={styles.deleteButton}
          customButtonStyles={styles.deleteButtonInner}
          disabled={disabled}
          iconColor={iconDefaultColor}
          entityId={entity.id}
          useDeleteHook={deleteFileHook}
        />
      )
    }
  ]

  return (
    <>
      <AddEmailFiles files={fileEntities} columns={columns} customStyles={customStyles} />

      {uploadVisible && (
        <UploadFileModal
          acceptedFileTypes={[
            UploadFileType.Graphic,
            UploadFileType.Video,
            UploadFileType.PDF,
            UploadFileType.TableCalculation
          ]}
          onBinariesSuccessfullyUploaded={uploadBinaries}
          onDismiss={hideUpload}
          isLimitedToSingleItem={false}
          createTextDocument={createTextDocumentFile}
        />
      )}
    </>
  )
}
