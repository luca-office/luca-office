import * as React from "react"
import {Button, Card, CardHeader, Heading, Icon} from "shared/components"
import {HeadingLevel, IconName, UploadFileType as FileType} from "shared/enums"
import {CustomStyle} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {getIconNameFromFileType} from "shared/utils"
import {uploadFileTypeCardStyle as styles} from "./upload-file-type-card.style"

export interface UploadFileTypeCardProps {
  readonly fileType: FileType
  readonly subTitle?: string
  readonly onCloseClick?: () => void
  readonly title: string
  readonly hasPreviewButton?: boolean
  readonly hasCloseButton?: boolean
  readonly openBinaryPreview?: () => void
}

export const UploadFileTypeCard: React.FC<UploadFileTypeCardProps & CustomStyle> = ({
  fileType,
  hasPreviewButton,
  customStyles,
  subTitle,
  hasCloseButton,
  onCloseClick,
  openBinaryPreview,
  title
}) => {
  const {t} = useLucaTranslation()
  return (
    <Card customStyles={customStyles} hasShadow>
      <CardHeader>
        <div css={styles.header}>
          <div css={styles.metadata}>
            <Icon customStyles={[styles.icon, styles.iconCursor]} name={getIconNameFromFileType(fileType)} />
            <Heading customStyles={styles.title} level={HeadingLevel.h3}>
              {title}
            </Heading>
            {subTitle !== undefined && (
              <Heading customStyles={styles.subTitle} level={HeadingLevel.h3}>
                {subTitle}
              </Heading>
            )}
          </div>
          <div css={styles.controls}>
            {hasPreviewButton && (
              <Button customStyles={styles.previewButton} onClick={openBinaryPreview}>
                {t("files_and_directories__upload_modal_show_preview")}
              </Button>
            )}
            {onCloseClick && hasCloseButton && (
              <Icon customStyles={styles.iconCursor} onClick={onCloseClick} name={IconName.Close} />
            )}
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
