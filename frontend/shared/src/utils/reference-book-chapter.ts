import {BookArticleContentType} from "../enums"
import {ReferenceBookContentType} from "../graphql/generated/globalTypes"
import {
  ReferenceBookArticle,
  ReferenceBookArticleContent,
  ReferenceBookChapter,
  TocArticle,
  TocArticleContent,
  TocChapter
} from "../models"
import {LucaTFunction} from "../translations"

const getReferenceBookContentTitle = (t: LucaTFunction, content: ReferenceBookArticleContent): string => {
  switch (content.contentType) {
    case ReferenceBookContentType.ImageContent:
      return t("reference_books__article_content_type_label_graphic")
    case ReferenceBookContentType.VideoContent:
      return t("reference_books__article_content_type_label_video")
    case ReferenceBookContentType.PdfContent:
      return t("reference_books__article_content_type_label_pdf")
    default:
      return content.text ?? t("reference_books__article_content_type_label_text")
  }
}

const getReferenceBookContentType = (content: ReferenceBookArticleContent): BookArticleContentType => {
  switch (content.contentType) {
    case ReferenceBookContentType.ImageContent:
      return BookArticleContentType.Image
    case ReferenceBookContentType.VideoContent:
      return BookArticleContentType.Video
    case ReferenceBookContentType.PdfContent:
      return BookArticleContentType.Pdf
    default:
      return BookArticleContentType.Text
  }
}

const convertReferenceBookContents = (
  t: LucaTFunction,
  contents: ReferenceBookArticleContent[],
  scrollToContent = false
): TocArticleContent[] =>
  contents.map(content => ({
    id: content.id,
    title: getReferenceBookContentTitle(t, content),
    position: content.position,
    type: getReferenceBookContentType(content),
    isScrollable: scrollToContent
  }))

const convertReferenceBookArticles = (
  t: LucaTFunction,
  articles: ReferenceBookArticle[],
  scrollToContent?: boolean
): TocArticle[] =>
  articles.map(article => ({
    id: article.id,
    title: article.title,
    position: article.position,
    contents: convertReferenceBookContents(t, article.contents ?? [], scrollToContent)
  }))

export const convertReferenceBookChaptersToChapters = (
  t: LucaTFunction,
  referenceBookChapters: ReferenceBookChapter[],
  scrollToContent?: boolean
): TocChapter[] =>
  referenceBookChapters.map(book => ({
    id: book.id,
    title: book.title,
    articles: convertReferenceBookArticles(t, book.articles ?? [], scrollToContent)
  }))
