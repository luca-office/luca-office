import {TocArticle, TocChapter} from "../../../models"

export const tocArticlesMock: TocArticle[] = [
  {id: "18de306c-a8f8-4311-9a2f-ca5418a245ac", position: 1, title: "cat treatment"},
  {id: "18de306c-a8f8-4311-9a2f-ca5418a245ad", position: 3, title: "dog treatment"},
  {id: "18de306c-a8f8-4311-9a2f-ca5418a245ab", position: 2, title: "puppy treatment"}
]
export const tocArticlesMock2: TocArticle[] = [
  {id: "18de306c-a8f8-4311-9a2f-ca5418a245as", position: 1, title: "Colepiocephale"},
  {id: "18de306c-a8f8-4311-9a2f-ca5418a245av", position: 5, title: "Titanophoneus"},
  {id: "18de306c-a8f8-4311-9a2f-ca5418a245ax", position: 2, title: "Micropachycephalosaurus"},
  {id: "18de306c-a8f8-4311-9a2f-ca5418a245aj", position: 2, title: "Yamaceratops"}
]

export const tocBookMock: TocChapter[] = [
  {id: "18de306c-a8f8-4311-9a2f-ca5418a245al", title: "animal treatments", articles: tocArticlesMock, position: 1},
  {id: "18de306c-a8f8-4311-9a2f-ca5418a245af", title: "dinosaur breeds", articles: tocArticlesMock2, position: 2}
]
