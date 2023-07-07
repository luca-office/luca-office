import {useApolloClient} from "@apollo/client"
import {
  ReferenceBookChapterQuery,
  ReferenceBookChapterQueryVariables
} from "shared/graphql/generated/ReferenceBookChapterQuery"
import {referenceBookChapterQuery} from "shared/graphql/queries"
import {ReferenceBookArticleContent} from "shared/models"
import {Option} from "shared/utils"

export interface UseUpdateReferenceBookContentsHook {
  readonly updateContentsInCache: (articleId: UUID, contentsList: Option<ReferenceBookArticleContent>[]) => void
}

export const useUpdateReferenceBookContents = (referenceBookChapterId: UUID): UseUpdateReferenceBookContentsHook => {
  const client = useApolloClient()

  const getReferenceBook = () => {
    try {
      return Promise.resolve(
        client.readQuery<ReferenceBookChapterQuery>({
          query: referenceBookChapterQuery,
          variables: {id: referenceBookChapterId}
        })
      )
    } catch (err) {
      return client
        .query<ReferenceBookChapterQuery, ReferenceBookChapterQueryVariables>({
          query: referenceBookChapterQuery,
          variables: {id: referenceBookChapterId},
          fetchPolicy: "network-only"
        })
        .then(result => result.data)
    }
  }

  const updateContentsInCache = (articleId: UUID, contentsList: Option<ReferenceBookArticleContent>[]) => {
    const contents = contentsList.reduce(
      (accumulator, contentOption) => contentOption.map(content => [...accumulator, content]).getOrElse(accumulator),
      [] as ReferenceBookArticleContent[]
    )
    getReferenceBook().then(
      data =>
        data?.referenceBookChapter &&
        client.writeQuery<ReferenceBookChapterQuery, ReferenceBookChapterQueryVariables>({
          query: referenceBookChapterQuery,
          variables: {id: referenceBookChapterId},
          data: {
            referenceBookChapter: {
              ...data!.referenceBookChapter,
              articles: data!.referenceBookChapter!.articles.map(article =>
                article.id === articleId ? {...article, contents} : article
              )
            }
          }
        })
    )
  }

  return {updateContentsInCache}
}
