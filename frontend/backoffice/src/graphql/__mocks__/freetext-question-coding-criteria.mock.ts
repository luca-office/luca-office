import {freeTextQuestionMock} from "shared/graphql/__mocks__"
import {FreetextQuestionCodingCriterion} from "shared/models"

export const freetextQuestionCodingCriteriaMock: FreetextQuestionCodingCriterion[] = [
  {
    __typename: "FreetextQuestionCodingCriterion",
    id: "6a3d3cd5-90b3-4560-9bd8-e114faae78ce",
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    description: "FreetextQuestionCodingCriterion Description 1",
    score: 2,
    questionId: freeTextQuestionMock.id
  },
  {
    __typename: "FreetextQuestionCodingCriterion",
    id: "582f4771-ce29-49e5-ab82-6804b318fcf5",
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    description: "FreetextQuestionCodingCriterion Description 2",
    score: 4,
    questionId: freeTextQuestionMock.id
  },
  {
    __typename: "FreetextQuestionCodingCriterion",
    id: "c2060a23-8607-49c7-8f26-20f37c43a412",
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    description: "FreetextQuestionCodingCriterion Description 3",
    score: 8,
    questionId: freeTextQuestionMock.id
  },
  {
    __typename: "FreetextQuestionCodingCriterion",
    id: "337eecec-b496-4108-8f35-c48c809ec068",
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    description: "FreetextQuestionCodingCriterion Description 4",
    score: 16,
    questionId: freeTextQuestionMock.id
  }
]
