import {FilterSortCompatibleEntity} from "../../models"

export const entityFilterMock: (FilterSortCompatibleEntity & any)[] = [
  {
    id: "18de306c-a8f8-4311-9a2f-ca5418a245ac",
    title: "Venture-Capital",
    createdAt: "2020-07-21T12:15:48.373Z",
    publishedAt: "2020-07-21T12:15:48.373Z",
    description: "test description",
    author: {
      id: "18de306c-a8f8-4311-9a2f-ca5418a245a3",
      lastName: "Last"
    },
    articles: []
  },
  {
    id: "18de306c-a8f8-4311-9a2f-ca5418a245af",
    title: "01 Venture-Capital",
    createdAt: "2020-07-21T12:15:48.373Z",
    publishedAt: "2020-07-20T12:15:48.373Z",
    description: "test description",
    author: {
      id: "18de306c-a8f8-4311-9a2f-ca5418a245ac",
      firstName: "First",
      lastName: "Last"
    }
  },
  {
    id: "18de306c-a8f8-4311-9a2f-ca5418a245ae",
    title: "A first test book",
    createdAt: "2020-07-01T12:15:48.373Z",
    publishedAt: "2020-07-20T12:15:48.373Z",
    description: "a test searchable",
    author: {
      id: "18de306c-a8f8-4311-9a2f-ca5418a245ac",
      firstName: "First",
      lastName: "Author Lastname"
    }
  },
  {
    id: "18de306c-a8f8-4311-9a2f-ca5418a245az",
    title: "A first test book",
    createdAt: "2020-07-01T12:15:48.373Z",
    publishedAt: null,
    description: "a test searchable",
    author: {
      id: "18de306c-a8f8-4311-9a2f-ca5418a245ac",
      firstName: "First",
      lastName: "Author Lastname"
    }
  },
  {
    id: "18de306c-a8f8-4311-9a2f-ca5418a24534",
    title: "Venture-Capital",
    createdAt: "2020-07-21T12:15:48.373Z",
    publishedAt: "2020-07-21T12:15:48.373Z",
    description: "test description",
    author: {
      id: "18de306c-a8f8-4311-9a2f-ca5418a245a3",
      lastName: "CustomLast",
      firstName: "CustomFirst"
    },
    articles: []
  }
]
