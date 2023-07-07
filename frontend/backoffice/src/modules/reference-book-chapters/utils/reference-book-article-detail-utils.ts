import {BinaryType, IconName, ReferenceBookContentType} from "shared/enums"
import {ReferenceBookArticle, ReferenceBookArticleContent} from "shared/models"
import {errorColor} from "shared/styles"
import {LucaTFunction} from "shared/translations"
import {Option} from "shared/utils"
import {ResortableEntity} from "../../../models"

const getSortableArticleContentIcon = (content: ReferenceBookArticleContent): IconName => {
  switch (content.contentType) {
    case ReferenceBookContentType.ImageContent:
      return IconName.Image
    case ReferenceBookContentType.VideoContent:
      return IconName.Film
    case ReferenceBookContentType.TextContent:
      return IconName.AlignmentLeft
    case ReferenceBookContentType.PdfContent:
      return IconName.PDF
    default:
      return IconName.PaperSheet
  }
}

const getSortableArticleContentTitle = (content: ReferenceBookArticleContent, t: LucaTFunction): string => {
  switch (content.contentType) {
    case ReferenceBookContentType.ImageContent:
      return content.imageBinaryFile?.filename ?? t("reference_books__sort_article_content_image_bock_label")
    case ReferenceBookContentType.VideoContent:
      return content.videoBinaryFile?.filename ?? t("reference_books__sort_article_content_video_bock_label")
    case ReferenceBookContentType.PdfContent:
      return content.pdfBinaryFile?.filename ?? t("reference_books__sort_article_content_pdf_bock_label")
    case ReferenceBookContentType.TextContent:
      return content.text || t("reference_books__placeholder_text")
    default:
      return t("reference_books__placeholder")
  }
}

const getSortableArticleContentBinary = (
  content: ReferenceBookArticleContent
): Pick<ResortableEntity, "binarySrc" | "binaryType"> => {
  let binarySrc
  let binaryType

  if (content.contentType === ReferenceBookContentType.ImageContent && !!content.imageUrl) {
    binarySrc = content.imageUrl
    binaryType = BinaryType.Image
  }

  if (content.contentType === ReferenceBookContentType.VideoContent && !!content.videoUrl) {
    binarySrc = content.videoUrl
    binaryType = BinaryType.Video
  }

  return {binarySrc, binaryType}
}

const getSortableArticleContentColor = (content: ReferenceBookArticleContent): Pick<ResortableEntity, "color"> => {
  let color
  if (content.contentType === ReferenceBookContentType.TextContent && !content.text) {
    color = errorColor
  }
  return {color}
}

export const convertArticleToSortableArticleContents = (
  article: Option<ReferenceBookArticle>,
  t: LucaTFunction
): Option<ResortableEntity[]> =>
  article.map<ResortableEntity[]>(a =>
    a.contents.map(content => ({
      id: content.id,
      position: content.position,
      icon: getSortableArticleContentIcon(content),
      title: getSortableArticleContentTitle(content, t),
      ...getSortableArticleContentBinary(content),
      ...getSortableArticleContentColor(content)
    }))
  )
