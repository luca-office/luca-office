import {css} from "@emotion/react"
import * as React from "react"
import {useState} from "react"
import {Modal, SelectableCard} from "shared/components"
import {IconName} from "shared/enums"
import {ReferenceBookContentType} from "shared/graphql/generated/globalTypes"
import {spacing, spacingCard, spacingHuge, spacingLarge, spacingMedium} from "shared/styles"
import {useLucaTranslation} from "shared/translations"

export interface ContentTypeDialogProps {
  readonly onDismiss: () => void
  readonly onConfirm: (contentType: ReferenceBookContentType) => void
}

export const ContentTypeDialog: React.FC<ContentTypeDialogProps> = ({onDismiss, onConfirm}) => {
  const [selectedContentType, setSelectedContentType] = useState<ReferenceBookContentType>(
    ReferenceBookContentType.TextContent
  )

  const {t} = useLucaTranslation()

  return (
    <Modal
      dismissOnOutsideClick
      onConfirm={() => onConfirm(selectedContentType)}
      confirmButtonKey={"continue_button"}
      title={t("reference_books__add_new_article_dialog_title")}
      onDismiss={onDismiss}>
      <div css={styles.wrapper}>
        <SelectableCard
          onClick={() => setSelectedContentType(ReferenceBookContentType.TextContent)}
          selected={selectedContentType === ReferenceBookContentType.TextContent}
          title={t("reference_books__article_content_type_text")}
          text={t("reference_books__article_content_type_text_description")}
          iconName={IconName.AlignmentLeft}
        />
        <SelectableCard
          title={t("reference_books__article_content_type_graphic")}
          text={t("reference_books__article_content_type_graphic_description")}
          onClick={() => setSelectedContentType(ReferenceBookContentType.ImageContent)}
          selected={selectedContentType === ReferenceBookContentType.ImageContent}
          iconName={IconName.Images}
        />
        <SelectableCard
          title={t("reference_books__article_content_type_video")}
          text={t("reference_books__article_content_type_video_description")}
          onClick={() => setSelectedContentType(ReferenceBookContentType.VideoContent)}
          selected={selectedContentType === ReferenceBookContentType.VideoContent}
          iconName={IconName.Play}
        />
        <SelectableCard
          title={t("reference_books__article_content_type_pdf")}
          text={t("reference_books__article_content_type_pdf_description")}
          onClick={() => setSelectedContentType(ReferenceBookContentType.PdfContent)}
          selected={selectedContentType === ReferenceBookContentType.PdfContent}
          iconName={IconName.PDF}
        />
      </div>
    </Modal>
  )
}

const styles = {
  wrapper: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: spacingMedium,
    width: "100%",
    margin: spacing(spacingLarge, 0, spacingHuge, 0)
  }),
  header: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  }),
  brand: css({
    display: "flex",
    alignItems: "center"
  }),
  text: css({
    padding: spacingCard
  })
}
