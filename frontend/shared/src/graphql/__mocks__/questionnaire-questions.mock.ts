import {QuestionnaireQuestion} from "../../models"
import {QuestionScoringType, QuestionType} from "../generated/globalTypes"

export const questionnaireQuestionsMock: QuestionnaireQuestion[] = [
  {
    id: "123",
    createdAt: new Date(2020, 12, 1).toISOString(),
    modifiedAt: new Date(2020, 12, 1).toISOString(),
    binaryFile: null,
    binaryFileId: null,
    text: "My new question",
    questionType: QuestionType.FreeText,
    position: 1,
    questionnaireId: "23425",
    isAdditionalFreeTextAnswerEnabled: false,
    answers: [],
    scoringType: QuestionScoringType.None,
    score: 2,
    __typename: "QuestionnaireQuestion",
    freetextQuestionCodingCriteria: [
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a3",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 2
      },
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a31",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 1
      }
    ]
  },
  {
    id: "1236",
    createdAt: new Date(2020, 12, 1).toISOString(),
    modifiedAt: new Date(2020, 12, 1).toISOString(),
    binaryFile: null,
    binaryFileId: null,
    text: "My new question",
    questionType: QuestionType.FreeText,
    position: 2,
    score: 2,
    questionnaireId: "23425",
    isAdditionalFreeTextAnswerEnabled: true,
    answers: [
      {
        __typename: "QuestionnaireAnswer",
        id: "0711",
        createdAt: new Date(2020, 12, 1).toISOString(),
        modifiedAt: new Date(2020, 12, 1).toISOString(),
        text: "Test Answer",
        questionId: "1236",
        isCorrect: false,
        position: 1
      },
      {
        __typename: "QuestionnaireAnswer",
        id: "0712",
        createdAt: new Date(2020, 12, 1).toISOString(),
        modifiedAt: new Date(2020, 12, 1).toISOString(),
        text: "Test Answer 2",
        questionId: "1236",
        isCorrect: true,
        position: 3
      }
    ],
    scoringType: QuestionScoringType.None,
    __typename: "QuestionnaireQuestion",
    freetextQuestionCodingCriteria: [
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a3",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 2
      },
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a31",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 1
      }
    ]
  },
  {
    id: "1123",
    createdAt: new Date(2020, 12, 1).toISOString(),
    modifiedAt: new Date(2020, 12, 1).toISOString(),
    binaryFile: null,
    binaryFileId: null,
    text: "My new question",
    questionType: QuestionType.MultipleChoice,
    questionnaireId: "23425",
    isAdditionalFreeTextAnswerEnabled: false,
    position: 3,
    answers: [],
    score: 2,
    scoringType: QuestionScoringType.None,
    __typename: "QuestionnaireQuestion",
    freetextQuestionCodingCriteria: [
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a3",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 2
      },
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a31",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 1
      }
    ]
  },
  {
    id: "1223",
    createdAt: new Date(2020, 12, 1).toISOString(),
    modifiedAt: new Date(2020, 12, 1).toISOString(),
    binaryFile: null,
    binaryFileId: null,
    text: "My new question",
    questionType: QuestionType.SingleChoice,
    questionnaireId: "23425",
    position: 4,
    score: 2,
    isAdditionalFreeTextAnswerEnabled: false,
    answers: [],
    scoringType: QuestionScoringType.None,
    __typename: "QuestionnaireQuestion",
    freetextQuestionCodingCriteria: [
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a3",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 2
      },
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a31",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 1
      }
    ]
  },
  {
    id: "1233",
    createdAt: new Date(2020, 12, 1).toISOString(),
    modifiedAt: new Date(2020, 12, 1).toISOString(),
    binaryFile: null,
    binaryFileId: null,
    text: "My new question",
    questionType: QuestionType.SingleChoice,
    questionnaireId: "23425",
    position: 5,
    isAdditionalFreeTextAnswerEnabled: true,
    answers: [],
    score: 2,
    scoringType: QuestionScoringType.None,
    __typename: "QuestionnaireQuestion",
    freetextQuestionCodingCriteria: [
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a3",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 2
      },
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a31",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 1
      }
    ]
  }
]

export const questionnaireQuestionsMockWithEmptyText: QuestionnaireQuestion[] = [
  {
    id: "123",
    createdAt: new Date(2020, 12, 1).toISOString(),
    modifiedAt: new Date(2020, 12, 1).toISOString(),
    binaryFile: null,
    binaryFileId: null,
    text: "",
    questionType: QuestionType.FreeText,
    position: 1,
    questionnaireId: "23425",
    isAdditionalFreeTextAnswerEnabled: false,
    answers: [],
    scoringType: QuestionScoringType.None,
    score: 2,
    __typename: "QuestionnaireQuestion",
    freetextQuestionCodingCriteria: [
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a3",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 2
      },
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a31",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 1
      }
    ]
  },
  {
    id: "1236",
    createdAt: new Date(2020, 12, 1).toISOString(),
    modifiedAt: new Date(2020, 12, 1).toISOString(),
    binaryFile: null,
    binaryFileId: null,
    text: "",
    questionType: QuestionType.FreeText,
    position: 2,
    score: 2,
    questionnaireId: "23425",
    isAdditionalFreeTextAnswerEnabled: true,
    answers: [
      {
        __typename: "QuestionnaireAnswer",
        id: "0711",
        createdAt: new Date(2020, 12, 1).toISOString(),
        modifiedAt: new Date(2020, 12, 1).toISOString(),
        text: "Test Answer",
        questionId: "1236",
        isCorrect: false,
        position: 1
      },
      {
        __typename: "QuestionnaireAnswer",
        id: "0712",
        createdAt: new Date(2020, 12, 1).toISOString(),
        modifiedAt: new Date(2020, 12, 1).toISOString(),
        text: "Test Answer 2",
        questionId: "1236",
        isCorrect: true,
        position: 3
      }
    ],
    scoringType: QuestionScoringType.None,
    __typename: "QuestionnaireQuestion",
    freetextQuestionCodingCriteria: [
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a3",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 2
      },
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a31",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 1
      }
    ]
  },
  {
    id: "1123",
    createdAt: new Date(2020, 12, 1).toISOString(),
    modifiedAt: new Date(2020, 12, 1).toISOString(),
    binaryFile: null,
    binaryFileId: null,
    text: "",
    questionType: QuestionType.MultipleChoice,
    questionnaireId: "23425",
    isAdditionalFreeTextAnswerEnabled: false,
    position: 3,
    answers: [],
    score: 2,
    scoringType: QuestionScoringType.None,
    __typename: "QuestionnaireQuestion",
    freetextQuestionCodingCriteria: [
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a3",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 2
      },
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a31",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 1
      }
    ]
  }
]

export const questionnaireQuestionsMockWithEmptyCodingCriteria: QuestionnaireQuestion[] = [
  {
    id: "123",
    createdAt: new Date(2020, 12, 1).toISOString(),
    modifiedAt: new Date(2020, 12, 1).toISOString(),
    binaryFile: null,
    binaryFileId: null,
    text: "My new question",
    questionType: QuestionType.FreeText,
    position: 1,
    questionnaireId: "23425",
    isAdditionalFreeTextAnswerEnabled: false,
    answers: [],
    scoringType: QuestionScoringType.Holistic,
    score: 2,
    __typename: "QuestionnaireQuestion",
    freetextQuestionCodingCriteria: [
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a3",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 2
      },
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a31",
        questionId: "q1",
        description: "",
        score: 1
      }
    ]
  },
  {
    id: "1236",
    createdAt: new Date(2020, 12, 1).toISOString(),
    modifiedAt: new Date(2020, 12, 1).toISOString(),
    binaryFile: null,
    binaryFileId: null,
    text: "My new question",
    questionType: QuestionType.FreeText,
    position: 2,
    score: 2,
    questionnaireId: "23425",
    isAdditionalFreeTextAnswerEnabled: true,
    answers: [
      {
        __typename: "QuestionnaireAnswer",
        id: "0711",
        createdAt: new Date(2020, 12, 1).toISOString(),
        modifiedAt: new Date(2020, 12, 1).toISOString(),
        text: "Test Answer",
        questionId: "1236",
        isCorrect: false,
        position: 1
      },
      {
        __typename: "QuestionnaireAnswer",
        id: "0712",
        createdAt: new Date(2020, 12, 1).toISOString(),
        modifiedAt: new Date(2020, 12, 1).toISOString(),
        text: "Test Answer 2",
        questionId: "1236",
        isCorrect: true,
        position: 3
      }
    ],
    scoringType: QuestionScoringType.None,
    __typename: "QuestionnaireQuestion",
    freetextQuestionCodingCriteria: [
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a3",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 2
      },
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a31",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 1
      }
    ]
  },
  {
    id: "1123",
    createdAt: new Date(2020, 12, 1).toISOString(),
    modifiedAt: new Date(2020, 12, 1).toISOString(),
    binaryFile: null,
    binaryFileId: null,
    text: "My new question",
    questionType: QuestionType.MultipleChoice,
    questionnaireId: "23425",
    isAdditionalFreeTextAnswerEnabled: false,
    position: 3,
    answers: [],
    score: 2,
    scoringType: QuestionScoringType.None,
    __typename: "QuestionnaireQuestion",
    freetextQuestionCodingCriteria: [
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a3",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 2
      },
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a31",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 1
      }
    ]
  }
]

export const questionnaireQuestionsMockWithEmptyCodingCriteriaAndNoScoring: QuestionnaireQuestion[] = [
  {
    id: "123",
    createdAt: new Date(2020, 12, 1).toISOString(),
    modifiedAt: new Date(2020, 12, 1).toISOString(),
    binaryFile: null,
    binaryFileId: null,
    text: "My new question",
    questionType: QuestionType.FreeText,
    position: 1,
    questionnaireId: "23425",
    isAdditionalFreeTextAnswerEnabled: false,
    answers: [],
    scoringType: QuestionScoringType.None,
    score: 2,
    __typename: "QuestionnaireQuestion",
    freetextQuestionCodingCriteria: [
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a3",
        questionId: "q1",
        description: "",
        score: 2
      },
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a31",
        questionId: "q1",
        description: "asdasdasd",
        score: 1
      }
    ]
  },
  {
    id: "1236",
    createdAt: new Date(2020, 12, 1).toISOString(),
    modifiedAt: new Date(2020, 12, 1).toISOString(),
    binaryFile: null,
    binaryFileId: null,
    text: "My new question",
    questionType: QuestionType.FreeText,
    position: 2,
    score: 2,
    questionnaireId: "23425",
    isAdditionalFreeTextAnswerEnabled: true,
    answers: [
      {
        __typename: "QuestionnaireAnswer",
        id: "0711",
        createdAt: new Date(2020, 12, 1).toISOString(),
        modifiedAt: new Date(2020, 12, 1).toISOString(),
        text: "Test Answer",
        questionId: "1236",
        isCorrect: false,
        position: 1
      },
      {
        __typename: "QuestionnaireAnswer",
        id: "0712",
        createdAt: new Date(2020, 12, 1).toISOString(),
        modifiedAt: new Date(2020, 12, 1).toISOString(),
        text: "Test Answer 2",
        questionId: "1236",
        isCorrect: true,
        position: 3
      }
    ],
    scoringType: QuestionScoringType.None,
    __typename: "QuestionnaireQuestion",
    freetextQuestionCodingCriteria: [
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a3",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 2
      },
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a31",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 1
      }
    ]
  },
  {
    id: "1123",
    createdAt: new Date(2020, 12, 1).toISOString(),
    modifiedAt: new Date(2020, 12, 1).toISOString(),
    binaryFile: null,
    binaryFileId: null,
    text: "My new question",
    questionType: QuestionType.MultipleChoice,
    questionnaireId: "23425",
    isAdditionalFreeTextAnswerEnabled: false,
    position: 3,
    answers: [],
    score: 2,
    scoringType: QuestionScoringType.None,
    __typename: "QuestionnaireQuestion",
    freetextQuestionCodingCriteria: [
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a3",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 2
      },
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a31",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 1
      }
    ]
  }
]

export const questionnaireQuestionsMockWithEmptyAnswer: QuestionnaireQuestion[] = [
  {
    id: "123",
    createdAt: new Date(2020, 12, 1).toISOString(),
    modifiedAt: new Date(2020, 12, 1).toISOString(),
    binaryFile: null,
    binaryFileId: null,
    text: "My new question",
    questionType: QuestionType.FreeText,
    position: 1,
    questionnaireId: "23425",
    isAdditionalFreeTextAnswerEnabled: false,
    answers: [],
    scoringType: QuestionScoringType.None,
    score: 2,
    __typename: "QuestionnaireQuestion",
    freetextQuestionCodingCriteria: [
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a3",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 2
      },
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a31",
        questionId: "q1",
        description: "fgkfsfsäpdö",
        score: 1
      }
    ]
  },
  {
    id: "1236",
    createdAt: new Date(2020, 12, 1).toISOString(),
    modifiedAt: new Date(2020, 12, 1).toISOString(),
    binaryFile: null,
    binaryFileId: null,
    text: "My new question",
    questionType: QuestionType.FreeText,
    position: 2,
    score: 2,
    questionnaireId: "23425",
    isAdditionalFreeTextAnswerEnabled: true,
    answers: [
      {
        __typename: "QuestionnaireAnswer",
        id: "0711",
        createdAt: new Date(2020, 12, 1).toISOString(),
        modifiedAt: new Date(2020, 12, 1).toISOString(),
        text: "",
        questionId: "1236",
        isCorrect: false,
        position: 1
      },
      {
        __typename: "QuestionnaireAnswer",
        id: "0712",
        createdAt: new Date(2020, 12, 1).toISOString(),
        modifiedAt: new Date(2020, 12, 1).toISOString(),
        text: "Test Answer 2",
        questionId: "1236",
        isCorrect: true,
        position: 3
      }
    ],
    scoringType: QuestionScoringType.None,
    __typename: "QuestionnaireQuestion",
    freetextQuestionCodingCriteria: [
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a3",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 2
      },
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a31",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 1
      }
    ]
  },
  {
    id: "1123",
    createdAt: new Date(2020, 12, 1).toISOString(),
    modifiedAt: new Date(2020, 12, 1).toISOString(),
    binaryFile: null,
    binaryFileId: null,
    text: "My new question",
    questionType: QuestionType.MultipleChoice,
    questionnaireId: "23425",
    isAdditionalFreeTextAnswerEnabled: false,
    position: 3,
    answers: [],
    score: 2,
    scoringType: QuestionScoringType.None,
    __typename: "QuestionnaireQuestion",
    freetextQuestionCodingCriteria: [
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a3",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 2
      },
      {
        __typename: "FreetextQuestionCodingCriterion",
        createdAt: new Date(2021, 1, 1).toISOString(),
        modifiedAt: new Date(2021, 1, 1).toISOString(),
        id: "a31",
        questionId: "q1",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
        score: 1
      }
    ]
  }
]

export const questionnaireQuestionMockWithAnswers: QuestionnaireQuestion = {
  __typename: "QuestionnaireQuestion",
  id: "d30c35bb-f06f-4ace-8251-0d25b5c38bcb",
  createdAt: new Date(2020, 12, 1).toISOString(),
  modifiedAt: new Date(2020, 12, 1).toISOString(),
  binaryFile: null,
  binaryFileId: null,
  text: "My new question",
  questionType: QuestionType.MultipleChoice,
  questionnaireId: "df797944-d164-486a-bffd-d156e1ef089c",
  isAdditionalFreeTextAnswerEnabled: false,
  position: 3,
  answers: [
    {
      __typename: "QuestionnaireAnswer",
      createdAt: new Date(2020, 12, 1).toISOString(),
      modifiedAt: new Date(2020, 12, 1).toISOString(),
      id: "68e59682-2237-413c-ab52-8af46d901d46",
      questionId: "d30c35bb-f06f-4ace-8251-0d25b5c38bcb",
      text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.",
      isCorrect: false,
      position: 1
    },
    {
      __typename: "QuestionnaireAnswer",
      createdAt: new Date(2020, 12, 1).toISOString(),
      modifiedAt: new Date(2020, 12, 1).toISOString(),
      id: "924c3fa2-b77b-49f4-8bc2-53c799864328",
      questionId: "d30c35bb-f06f-4ace-8251-0d25b5c38bcb",
      text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.",
      isCorrect: true,
      position: 2
    },
    {
      __typename: "QuestionnaireAnswer",
      createdAt: new Date(2020, 12, 1).toISOString(),
      modifiedAt: new Date(2020, 12, 1).toISOString(),
      id: "ad4cb16a-96a5-4b3f-8fd5-6d40d2bff82c",
      questionId: "d30c35bb-f06f-4ace-8251-0d25b5c38bcb",
      text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.",
      isCorrect: false,
      position: 3
    }
  ],
  score: 2,
  scoringType: QuestionScoringType.Analytical,
  freetextQuestionCodingCriteria: []
}
