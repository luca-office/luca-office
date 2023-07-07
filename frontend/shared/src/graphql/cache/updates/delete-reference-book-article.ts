import {handleApolloCacheUpdate} from "../../../utils"
import {DeleteReferenceBookArticleMutation} from "../../generated/DeleteReferenceBookArticleMutation"
import {ReferenceBookChapterQuery, ReferenceBookChapterQueryVariables} from "../../generated/ReferenceBookChapterQuery"
import {referenceBookChapterQuery} from "../../queries"

export const deleteReferenceBookArticles = (referenceBookChapterId: UUID, articleId: UUID) =>
  handleApolloCacheUpdate<
    ReferenceBookChapterQuery,
    DeleteReferenceBookArticleMutation,
    ReferenceBookChapterQueryVariables
  >(
    referenceBookChapterQuery,
    ({referenceBookChapter}) =>
      referenceBookChapter
        ? {
            referenceBookChapter: {
              ...referenceBookChapter,
              articles: referenceBookChapter?.articles.filter(article => article.id !== articleId) || []
            }
          }
        : undefined,
    "referenceBookChapter",
    {
      id: referenceBookChapterId
    }
  )
