import {css} from "@emotion/react"
import * as React from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  ContentImage,
  ContentVideo,
  Icon,
  LoadingIndicator,
  MarkdownText,
  Text
} from "../../../components"
import {IconName, ReferenceBookContentType} from "../../../enums"
import {ReferenceBookArticle as ReferenceBookArticleModel, ReferenceBookArticleContent} from "../../../models"
import {AutomatedCriterionReferenceBooksConfig} from "../../../office-tools"
import {
  backgroundColor,
  buttonHeight,
  CustomStyle,
  spacing,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  TextSize,
  tocFooterHeight
} from "../../../styles"
import {useLucaTranslation} from "../../../translations"
import {Option} from "../../../utils"
import {ContentPdf} from "../../content-pdf/content-pdf"
import {SelectionInPreviewFooter} from "../../selection-in-preview-footer/selection-in-preview-footer"

export interface ReferenceBookArticleProps extends CustomStyle {
  readonly article: Option<ReferenceBookArticleModel>
  readonly chapterTitle?: string
  readonly dataLoading: boolean
  readonly selectImage?: (id: UUID, url: string, title?: string) => void
  readonly selectVideo?: (id: UUID, url: string, title?: string) => void
  readonly openPdf?: (id: UUID, url: string, title?: string) => void
  readonly automatedCriterionConfig?: AutomatedCriterionReferenceBooksConfig
}

export const ReferenceBookArticle: React.FunctionComponent<ReferenceBookArticleProps> = ({
  article: articleOption,
  chapterTitle,
  customStyles,
  dataLoading,
  selectImage,
  selectVideo,
  openPdf,
  automatedCriterionConfig
}) => {
  const {t} = useLucaTranslation()
  const renderContent = (
    article: ReferenceBookArticleModel,
    content: ReferenceBookArticleContent,
    contentIndex: number
  ) => {
    switch (content.contentType) {
      case ReferenceBookContentType.ImageContent:
        return content.imageUrl ? (
          <ContentImage
            key={content.id}
            imageUrl={content.imageUrl}
            onClick={() =>
              content.imageBinaryFileId !== null &&
              content.imageUrl !== null &&
              selectImage?.(content.imageBinaryFileId, content.imageUrl, `${contentIndex + 1} - ${article.title}`)
            }
          />
        ) : null
      case ReferenceBookContentType.VideoContent:
        return content.videoUrl ? (
          <ContentVideo
            key={content.id}
            videoUrl={content.videoUrl}
            onClick={() =>
              content.videoBinaryFileId !== null &&
              content.videoUrl !== null &&
              selectVideo?.(content.videoBinaryFileId, content.videoUrl, `${contentIndex + 1} - ${article.title}`)
            }
          />
        ) : null
      case ReferenceBookContentType.PdfContent:
        return content?.pdfBinaryFile ? (
          <ContentPdf
            key={content.id}
            openPdf={pdf => pdf.forEach(pdf => openPdf?.(pdf.id, pdf.url, pdf.filename))}
            title={content.pdfBinaryFile.filename}
            pdfFile={Option.of(content.pdfBinaryFile)}
          />
        ) : null
      case ReferenceBookContentType.TextContent:
        return content.text ? <MarkdownText key={content.id} markdown={content.text} /> : null
      default:
        return null
    }
  }
  return (
    <Card customStyles={[styles.card(automatedCriterionConfig !== undefined), customStyles]}>
      <CardHeader hasShadow hasGreyBackground>
        <Icon name={IconName.Book} hasSpacing />
        {articleOption.map(article => article.title).orNull()}
        <Text customStyles={styles.chapterTitle} size={TextSize.Medium}>
          {chapterTitle}
        </Text>
      </CardHeader>
      <CardContent customStyles={styles.scrollable}>
        <div css={styles.content(!selectImage)}>
          <Text customStyles={styles.title}>{articleOption.map(article => article.title).orNull()}</Text>
          {dataLoading ? (
            <LoadingIndicator customStyles={styles.loader} />
          ) : (
            articleOption
              .map(article => (
                <div>{article.contents.map((content, index) => renderContent(article, content, index))}</div>
              ))
              .orNull()
          )}
        </div>
      </CardContent>
      {automatedCriterionConfig !== undefined &&
        articleOption
          .map(article => (
            <SelectionInPreviewFooter
              textKey="coding_models__automated_item_document_view_reference_books_selection_footer"
              headingKey="coding_models__automated_item_document_view_column_header"
              icon={IconName.Book}
              customLabelStyles={styles.selectionFooter}
              onConfirm={() => automatedCriterionConfig?.onArticleClick?.(article.id)}
              title={t("reference_book__title_article")}
            />
          ))
          .orNull()}

      <CardFooter customStyles={automatedCriterionConfig !== undefined ? styles.footer : undefined} />
    </Card>
  )
}

const styles = {
  title: css({
    fontSize: TextSize.Larger
  }),
  footer: css({
    height: "auto"
  }),
  card: (hasSelectionFooter: boolean) =>
    css({
      borderColor: backgroundColor,
      overflow: "hidden",
      height: hasSelectionFooter ? undefined : `calc(100vh - ${buttonHeight}px - ${tocFooterHeight}px)`
    }),
  content: (readonly: boolean) =>
    css({
      padding: spacing(spacingMedium, spacingMedium, spacingMedium, spacingLarge),

      ".image": {
        cursor: readonly ? "default" : "pointer"
      }
    }),
  chapterTitle: css({
    opacity: 0.5,
    marginLeft: "auto"
  }),
  loader: css({
    margin: `${spacingLarge}px auto`
  }),
  scrollable: css({
    overflowY: "auto"
  }),
  selectionFooter: css({
    marginLeft: spacingSmall
  })
}
