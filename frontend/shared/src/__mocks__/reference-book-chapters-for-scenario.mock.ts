import {ReferenceBookChapter} from "../models"

export const referenceBookChaptersForScenarioMock: ReferenceBookChapter[] = [
  {
    __typename: "ReferenceBookChapter",
    articles: [
      {
        id: "sdaf",
        title: "Artikel",
        contents: [],
        position: 1,
        referenceBookChapterId: "fdfg-sdfsdf-sdfwe",
        __typename: "ReferenceBookArticle"
      }
    ],
    title: "Description",
    createdAt: new Date(2020, 10, 5).toISOString(),
    description: "sfsd sfsdfsd",
    id: "fdfg-sdfsdf-sdfwe",
    author: {
      __typename: "UserAccount",
      firstName: "Max",
      lastName: "Mustermann",
      id: "fspidjf-sdfpojsd"
    },
    publishedAt: null
  }
]
