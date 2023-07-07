import {QuestionnaireAnswer} from "../models"

export const answers: Array<QuestionnaireAnswer> = [
  {
    __typename: "QuestionnaireAnswer",
    createdAt: new Date(2021, 1, 1).toISOString(),
    modifiedAt: new Date(2021, 1, 1).toISOString(),
    id: "a1",
    questionId: "q1",
    text:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
    isCorrect: false,
    position: 0
  },
  {
    __typename: "QuestionnaireAnswer",
    createdAt: new Date(2021, 1, 1).toISOString(),
    modifiedAt: new Date(2021, 1, 1).toISOString(),
    id: "a2",
    questionId: "q1",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
    isCorrect: false,
    position: 0
  },
  {
    __typename: "QuestionnaireAnswer",
    createdAt: new Date(2021, 1, 1).toISOString(),
    modifiedAt: new Date(2021, 1, 1).toISOString(),
    id: "a3",
    questionId: "q1",
    text:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
    isCorrect: true,
    position: 0
  }
]
