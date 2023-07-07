import {css} from "@emotion/react"
import partial from "lodash-es/partial"
import * as React from "react"
import {Card, CardHeader, DeleteOrArchiveEntityButton, Heading, Icon, Overlay, PdfViewer, Text} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {useDeleteReferenceBookContent} from "shared/graphql/hooks"
import {BinaryFile} from "shared/models"
import {
  borderRadius,
  cardBottomColor,
  Flex,
  FontWeight,
  primaryColor,
  spacing,
  spacingSmall,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"

export interface PdfBarProps {
  readonly viewerModalVisible: boolean
  readonly deleteOrlyVisible: boolean
  readonly setViewerModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  readonly setDeleteOrlyVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export interface PdfBarContainerProps {
  readonly readonly: boolean
  readonly title: string
  readonly pdfFile: Option<BinaryFile>
  readonly referenceBookChapterId: UUID
  readonly contentId: UUID
}

export const PdfBar: React.FC<PdfBarProps & PdfBarContainerProps> = ({
  readonly,
  title,
  pdfFile,
  referenceBookChapterId,
  contentId,
  setDeleteOrlyVisible,
  setViewerModalVisible,
  deleteOrlyVisible,
  viewerModalVisible
}) => {
  const {t} = useLucaTranslation()

  return (
    <React.Fragment>
      <Card onClick={() => setViewerModalVisible(true)} customStyles={styles.wrapper(readonly)} hasShadow>
        <CardHeader customStyles={styles.bar}>
          <div css={styles.title}>
            <Icon customStyles={styles.icon} name={IconName.PDF} />
            <Heading level={HeadingLevel.h3}>{title}</Heading>
          </div>
          <div css={Flex.row}>
            <Text customStyles={styles.openPdf}>{t("reference_books__article_content_view_pdf")}</Text>
            <div css={styles.delete} className={"delete"}>
              <DeleteOrArchiveEntityButton
                disabled={readonly}
                stopEventPropagation={true}
                entityId={contentId}
                useDeleteHook={partial(useDeleteReferenceBookContent, referenceBookChapterId)}
                modalTitleKey={"reference_books__delete_dialog_title_pdf"}
                modalTextKey={"reference_books__delete_dialog_text_pdf"}
                isConfirmDialogVisible={deleteOrlyVisible}
                stopEventPropagationOnOverlayClick={true}
              />
            </div>
          </div>
        </CardHeader>
      </Card>
      {viewerModalVisible &&
        pdfFile
          .map(pdf => (
            <Overlay>
              <PdfViewer
                customStyles={styles.binaryViewer}
                binaries={[{id: pdf.id, title: pdf.filename, path: pdf.url}]}
                onClose={() => setViewerModalVisible(false)}
                selectedBinaryId={Option.of(pdf.id)}
              />
            </Overlay>
          ))
          .orNull()}
    </React.Fragment>
  )
}

export const PdfBarContainer: React.FC<PdfBarContainerProps> = props => {
  const [viewerModalVisible, setViewerModalVisible] = React.useState<boolean>(false)
  const [isDeleteOrlyVisible, setIsDeleteOrlyVisible] = React.useState<boolean>(false)
  return (
    <PdfBar
      viewerModalVisible={viewerModalVisible}
      deleteOrlyVisible={isDeleteOrlyVisible}
      setViewerModalVisible={setViewerModalVisible}
      setDeleteOrlyVisible={setIsDeleteOrlyVisible}
      {...props}
    />
  )
}

const styles = {
  wrapper: (disabled: boolean) =>
    css({
      width: "100%",
      margin: spacing(0, spacingSmall, spacingSmall, 0),
      cursor: "pointer",
      "&:hover": {
        backgroundColor: cardBottomColor,
        borderRadius: borderRadius,
        ...(!disabled && {
          ".delete": {
            opacity: 1
          }
        })
      }
    }),
  title: css({
    display: "flex",
    alignItems: "center"
  }),
  bar: css({
    display: "flex",
    justifyContent: "space-between"
  }),
  icon: css({
    marginRight: spacingSmall
  }),
  openPdf: css({
    fontSize: TextSize.Medium,
    color: primaryColor,
    fontWeight: FontWeight.Bold,
    paddingRight: spacingSmall
  }),
  binaryViewer: css({
    height: "80vh",
    width: "80vh"
  }),
  delete: css({
    opacity: 0
  })
}
