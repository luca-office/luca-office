import {css} from "@emotion/react"
import * as React from "react"
import {Button, Card, CardContent, Icon, Text, Tooltip} from "../../../../components"
import {IconName} from "../../../../enums"
import {
  Flex,
  flex1,
  FontWeight,
  iconDefaultColor,
  spacing,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingSmaller,
  TextSize
} from "../../../../styles"
import {useLucaTranslation} from "../../../../translations"
import {EmailBodyFile} from "./add-email-files"

export interface EmailFilesProps {
  readonly files: EmailBodyFile[]
  readonly availableEmailDownloadIds: UUID[]
  readonly isPreview: boolean
  readonly addEmailFileToDownloads: (fileId: UUID) => void
}

export const EmailFiles: React.FC<EmailFilesProps> = ({
  files,
  availableEmailDownloadIds,
  isPreview,
  addEmailFileToDownloads
}) => {
  const {t} = useLucaTranslation()

  if (files.length === 0) {
    return null
  }

  return (
    <div css={styles.files}>
      <Text size={TextSize.Medium} customStyles={styles.title}>
        {t("email__files_label")} ({files.length})
      </Text>
      <div css={styles.fileCardWrapper}>
        {files.map(file => {
          const alreadyAvailable = availableEmailDownloadIds.includes(file.id)
          return (
            <Card hasShadow={true} customStyles={styles.fileCard} key={file.id}>
              <CardContent customStyles={Flex.row}>
                <div css={styles.fileCardNameColumn}>
                  <Icon name={file.iconName} css={{marginRight: spacingSmall}} />
                  {file.title}
                </div>
                <div>
                  <Tooltip
                    title={
                      alreadyAvailable
                        ? t("email__files_download_disabled_tooltip")
                        : t("email__files_download_tooltip")
                    }>
                    <Button
                      disabled={alreadyAvailable || isPreview}
                      iconColor={iconDefaultColor}
                      customStyles={styles.fileDownloadButton}
                      icon={alreadyAvailable ? IconName.Check : IconName.Download}
                      onClick={() => addEmailFileToDownloads(file.id)}
                    />
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

const styles = {
  title: css({
    fontWeight: FontWeight.Bold
  }),
  files: css(Flex.column, {
    padding: spacing(spacingMedium, spacingLarge),
    maxHeight: 135
  }),
  fileCardWrapper: css({
    flex: flex1,
    overflowY: "auto"
  }),
  fileCard: css(Flex.row, {
    marginBottom: spacingSmaller,
    padding: spacing(0, spacingSmall)
  }),
  fileCardNameColumn: css(Flex.row, {
    flexGrow: 1
  }),
  fileDownloadButton: css({
    background: "none",
    paddingRight: 0,
    width: 20,

    "&:disabled": css({
      background: "none"
    })
  })
}
