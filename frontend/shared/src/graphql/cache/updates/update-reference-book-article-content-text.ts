import {handleApolloCacheUpdate} from "../../../utils"
import {ReferenceBookChapterQuery, ReferenceBookChapterQueryVariables} from "../../generated/ReferenceBookChapterQuery"
import {UpdateReferenceBookContentMutation} from "../../generated/UpdateReferenceBookContentMutation"
import {referenceBookChapterQuery} from "../../queries"

export const updateReferenceBookArticleContentText = (referenceBookChapterId: UUID, selectedArticleId: UUID) =>
  handleApolloCacheUpdate<
    ReferenceBookChapterQuery,
    UpdateReferenceBookContentMutation,
    ReferenceBookChapterQueryVariables
  >(
    referenceBookChapterQuery,
    ({referenceBookChapter}, {updateReferenceBookContent: {id, text}}) =>
      referenceBookChapter
        ? {
            referenceBookChapter: {
              ...referenceBookChapter,
              articles:
                referenceBookChapter?.articles.map(article =>
                  article.id === selectedArticleId
                    ? {
                        ...article,
                        contents: article.contents.map(content => (content.id === id ? {...content, text} : content))
                      }
                    : article
                ) || []
            }
          }
        : undefined,
    "referenceBookChapter",
    {
      id: referenceBookChapterId
    }
  )
