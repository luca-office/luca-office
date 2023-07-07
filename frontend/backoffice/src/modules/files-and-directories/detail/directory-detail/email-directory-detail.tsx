import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {
  Card,
  CardContent,
  Column,
  Columns,
  FormFieldLabel,
  Heading,
  Icon,
  Label,
  TableContainer
} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {DirectoryNode, File} from "shared/models"
import {CustomStyle, Flex, FontWeight, spacingSmall, spacingSmaller, textEllipsis} from "shared/styles"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"
import {getReceptionDelayLabel, Option} from "shared/utils"
import {InlineEditableHeaderContainer} from "../../../../components"
import {HintText} from "../../../../components/hint-text/hint-text"
import {Directory} from "../../../../models"
import {DetailHeader} from "../../../common/files-and-directories/file-detail/detail-header/detail-header"
import {detailViewStyles} from "../detail-styles"
import {directoryDetailStyles as dirStyles} from "./directory-detail-styles"
import {useFileEmails} from "./hooks/use-file-emails"

interface Props extends CustomStyle {
  readonly customContentStyles?: CSSInterpolation
  readonly directory: Directory
  readonly files: File[]
  readonly parentDirectory: Option<DirectoryNode>
  readonly scenarioId: UUID
  readonly tooltipTitleKey?: LucaI18nLangKey
}

export const EmailFilesDirectoryDetail: React.FC<Props> = ({
  scenarioId,
  customContentStyles,
  customStyles,
  directory,
  files
}) => {
  const {t} = useLucaTranslation()
  const {selectFile, fileEntities} = useFileEmails(scenarioId, files)

  return (
    <React.Fragment>
      <Card customStyles={customStyles}>
        <DetailHeader entityId={directory.id} title={directory.name} icon={IconName.Folder} disabled={true} />

        <CardContent customStyles={[styles.cardContent, detailViewStyles.content, customContentStyles]}>
          <HintText text={t("files_and_directories__downloads_hint")} customStyles={dirStyles.hintText} />
          <div css={[detailViewStyles.nameAndDirectoryWrapper]}>
            <div>
              <div css={Flex.row}>
                <FormFieldLabel textKey="files_and_directories__rename_directory_label" />
                <Icon name={IconName.LockClosed} customStyles={styles.icon} />
              </div>
              <InlineEditableHeaderContainer
                disabled={true}
                onConfirm={() => undefined}
                customStyles={detailViewStyles.directoryNameInput}
                text={directory.name}
              />
            </div>
          </div>

          <Heading
            level={HeadingLevel.h3}
            fontWeight={FontWeight.Bold}
            customStyles={detailViewStyles.contentListHeading}>
            {t("files_and_directories__downloads_mail_files")} ({files.length})
          </Heading>
          <TableContainer
            entities={fileEntities}
            customStyles={styles.table}
            customHeaderRowStyles={dirStyles.header}
            entityKey={mail => mail.id}
            onClick={mail => selectFile(mail.id)}
            columns={[
              {
                key: "icon-title",
                header: (
                  <Heading fontWeight={FontWeight.Bold} level={HeadingLevel.h3}>
                    {t("email__files_table_column_file")}
                  </Heading>
                ),
                content: mail => (
                  <Columns>
                    <Column flexGrow={0} flexShrink={0}>
                      <Icon name={mail.fileIcon} />
                    </Column>
                    <Column flexGrow={1} customStyles={textEllipsis}>
                      {mail.title}
                    </Column>
                  </Columns>
                )
              },
              {
                key: "dispatch-time",
                header: (
                  <Heading fontWeight={FontWeight.Bold} level={HeadingLevel.h3}>
                    {t("files_and_directories__downloads_mail_dispatch_time")}
                  </Heading>
                ),
                content: mail => <Label label={getReceptionDelayLabel(t, mail.receptionDelayInSeconds)} />
              },
              {
                key: "icon-mail",
                customStyles: [dirStyles.emailColumn],
                header: (
                  <Heading fontWeight={FontWeight.Bold} level={HeadingLevel.h3}>
                    {t("email_short")}
                  </Heading>
                ),
                content: mail => (
                  <Columns>
                    <Column flexGrow={0} flexShrink={0}>
                      <Icon name={mail.mailIcon} />
                    </Column>
                    <Column flexGrow={1} customStyles={textEllipsis}>
                      {mail.recipient}
                    </Column>
                  </Columns>
                )
              }
            ]}
          />
        </CardContent>
      </Card>
    </React.Fragment>
  )
}

const styles = {
  cardContent: css({
    flex: "1 1 0"
  }),
  table: css({overflowY: "auto"}),
  icon: css({
    marginLeft: spacingSmall,
    marginBottom: spacingSmaller
  })
}
