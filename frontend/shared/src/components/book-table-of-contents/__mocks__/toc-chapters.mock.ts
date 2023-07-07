import {TocChapter} from "../../../models"
import {tocArticlesMock} from "./toc-articles.mock"

export const tocChaptersMock: TocChapter[] = [
  {
    id: "c8afeff3-4848-405c-923e-abd756d1c1ef",
    title: "Chapter 1",
    articles: tocArticlesMock,
    position: 1
  },
  {
    id: "449799c6-7394-4908-8a23-39a783fa3cac",
    title: "Chapter 2",
    articles: tocArticlesMock,
    position: 2
  },
  {
    id: "89a7fd57-754e-4c7d-8a3b-3a345ccab9e0",
    title: "Chapter 3",
    articles: tocArticlesMock,
    position: 3
  }
]
