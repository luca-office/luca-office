import {TocArticle} from "../../../models"
import {tocArticleContentMocks} from "./toc-article-content.mock"

export const tocArticlesMock: TocArticle[] = [
  {
    id: "9a90a1bd-9c85-4c8f-bc6b-695d3ee973c9",
    title: "Article 1",
    position: 1,
    contents: tocArticleContentMocks
  },
  {
    id: "cf188e1b-404b-4575-aec9-ec0e978a2b4e",
    title: "Article 2",
    position: 2,
    contents: tocArticleContentMocks
  },
  {
    id: "55968a35-e074-41fc-bda5-4d56d44bff14",
    title: "Article 3",
    position: 3,
    contents: tocArticleContentMocks
  }
]
