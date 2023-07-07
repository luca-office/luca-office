import {ReferenceBookArticle, ReferenceBookChapter} from "../models"
import {find, flatten, Option} from "../utils"

export const findSelectedReferenceBookChapter = (
  referenceBookChapters: Option<ReferenceBookChapter[]>,
  selectedChapterId: Option<UUID> | undefined
): Option<ReferenceBookChapter> =>
  find(
    (chapter: ReferenceBookChapter) => chapter.id === selectedChapterId?.orUndefined(),
    referenceBookChapters.getOrElse([])
  )

export const findSelectedReferenceBookArticle = (
  referenceBookChapters: Option<ReferenceBookChapter[]>,
  selectedArticleId: Option<UUID>
): Option<ReferenceBookArticle> =>
  find(
    (article: ReferenceBookArticle) => article?.id === selectedArticleId.orUndefined(),
    flatten(
      referenceBookChapters
        .getOrElse([])
        .map((chapter: ReferenceBookChapter) => chapter.articles as ReferenceBookArticle[])
    )
  )

export const getSelectedReferenceBookChapterTitle = (
  referenceBookChapters: Option<ReferenceBookChapter[]>,
  selectedChapter: Option<ReferenceBookChapter>,
  selectedArticle: Option<ReferenceBookArticle>
): Option<string> => {
  const selectedChapterId = selectedChapter.isDefined()
    ? selectedChapter.map(chapter => chapter.id)
    : selectedArticle.map(article => article.referenceBookChapterId)
  return findSelectedReferenceBookChapter(referenceBookChapters, selectedChapterId).map(chapter => chapter.title)
}

export const searchReferenceBookChapters = (
  chapters: ReferenceBookChapter[],
  searchPhrase: string,
  hideChapters: boolean
): ReferenceBookChapter[] => {
  const search = searchPhrase?.toLowerCase()

  if (search === "") {
    return chapters
  }

  return chapters.reduce((foundChapters: ReferenceBookChapter[], chapter: ReferenceBookChapter) => {
    const filteredArticles = chapter.articles.filter(
      article =>
        article.contents.some(content => content.text?.toLowerCase().includes(search)) ||
        article.title.toLowerCase().includes(search)
    )

    if (
      filteredArticles.length > 0 ||
      (!hideChapters &&
        (chapter.title.toLowerCase().includes(search) || chapter.description.toLowerCase().includes(search)))
    ) {
      return [...foundChapters, {...chapter, articles: filteredArticles}]
    }

    return foundChapters
  }, [])
}
