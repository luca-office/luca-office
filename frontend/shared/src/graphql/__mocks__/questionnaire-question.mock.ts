import {imageBinariesMock} from "../../components/binary-viewer/__mocks__/binaries.mock"
import {Questionnaire, QuestionnaireQuestion} from "../../models"
import {MimeType, QuestionnaireType, QuestionScoringType, QuestionType} from "../generated/globalTypes"
import {userAccountMock} from "./user-account.mock"

export const singleChoiceQuestionMock: QuestionnaireQuestion = {
  __typename: "QuestionnaireQuestion",
  createdAt: new Date(2021, 1, 1).toISOString(),
  modifiedAt: new Date(2021, 1, 1).toISOString(),
  id: "083c154e-2914-494e-936c-0086a1d8d988",
  questionType: QuestionType.SingleChoice,
  text:
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
  isAdditionalFreeTextAnswerEnabled: false,
  questionnaireId: "questionnaire1",
  binaryFile: null,
  binaryFileId: null,
  position: 1,
  score: 2,
  answers: [
    {
      __typename: "QuestionnaireAnswer",
      id: "dafd6c47-2b6b-4f7a-9d12-807cc6c82511",
      createdAt: new Date(2021, 1, 1).toISOString(),
      modifiedAt: new Date(2021, 1, 1).toISOString(),
      questionId: "083c154e-2914-494e-936c-0086a1d8d988",
      text:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
      isCorrect: false,
      position: 3
    },
    {
      __typename: "QuestionnaireAnswer",
      createdAt: new Date(2021, 1, 1).toISOString(),
      modifiedAt: new Date(2021, 1, 1).toISOString(),
      id: "e0570c1c-5847-4c1b-ae2c-13d3961a6b9f",
      questionId: "083c154e-2914-494e-936c-0086a1d8d988",
      text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
      isCorrect: true,
      position: 2
    },
    {
      __typename: "QuestionnaireAnswer",
      createdAt: new Date(2021, 1, 1).toISOString(),
      modifiedAt: new Date(2021, 1, 1).toISOString(),
      id: "d43a1b5e-4616-4e61-9ca3-ede2cd7e74ad",
      questionId: "083c154e-2914-494e-936c-0086a1d8d988",
      text:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
      isCorrect: false,
      position: 1
    }
  ],
  scoringType: QuestionScoringType.Holistic,
  freetextQuestionCodingCriteria: [
    {
      __typename: "FreetextQuestionCodingCriterion",
      createdAt: new Date(2021, 1, 1).toISOString(),
      modifiedAt: new Date(2021, 1, 1).toISOString(),
      id: "b44d6db6-c18e-4e7a-90ec-d63116eac23c",
      questionId: "083c154e-2914-494e-936c-0086a1d8d988",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
      score: 2
    },
    {
      __typename: "FreetextQuestionCodingCriterion",
      createdAt: new Date(2021, 1, 1).toISOString(),
      modifiedAt: new Date(2021, 1, 1).toISOString(),
      id: "5d7a251e-cbe0-47c6-a55e-545f2283be4c",
      questionId: "083c154e-2914-494e-936c-0086a1d8d988",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
      score: 1
    }
  ]
}

export const singleChoiceQuestionWithImageMock: QuestionnaireQuestion = {
  __typename: "QuestionnaireQuestion",
  id: "271056ff-66bc-475d-bfd0-9d5707e17cf7",
  createdAt: new Date(2021, 1, 1).toISOString(),
  modifiedAt: new Date(2021, 1, 1).toISOString(),
  questionType: QuestionType.SingleChoice,
  text:
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
  isAdditionalFreeTextAnswerEnabled: false,
  questionnaireId: "questionnaire1",
  position: 1,
  binaryFileId: "bf01",
  binaryFile: {
    __typename: "BinaryFile",
    filename: "file1.jpeg",
    fileSize: 0,
    createdAt: new Date(2021, 1, 1).toISOString(),
    modifiedAt: new Date(2021, 1, 1).toISOString(),
    id: "2af6deab-4888-422a-9516-4fe40479d5e3",
    mimeType: MimeType.ImageJpeg,
    url: imageBinariesMock[0].path
  },
  answers: [
    {
      __typename: "QuestionnaireAnswer",
      createdAt: new Date(2021, 1, 1).toISOString(),
      modifiedAt: new Date(2021, 1, 1).toISOString(),
      id: "aaa740f7-7f12-41e9-bdf1-17e618e00e13",
      questionId: "271056ff-66bc-475d-bfd0-9d5707e17cf7",
      text:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
      isCorrect: false,
      position: 3
    },
    {
      __typename: "QuestionnaireAnswer",
      createdAt: new Date(2021, 1, 1).toISOString(),
      modifiedAt: new Date(2021, 1, 1).toISOString(),
      id: "abf35b07-652f-45eb-a226-b9590dc48526",
      questionId: "271056ff-66bc-475d-bfd0-9d5707e17cf7",
      text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
      isCorrect: false,
      position: 12
    },
    {
      __typename: "QuestionnaireAnswer",
      createdAt: new Date(2021, 1, 1).toISOString(),
      modifiedAt: new Date(2021, 1, 1).toISOString(),
      id: "7c61a75e-d762-4546-a7ff-db1f132cdb55",
      questionId: "271056ff-66bc-475d-bfd0-9d5707e17cf7",
      text:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
      isCorrect: true,
      position: 1
    }
  ],
  scoringType: QuestionScoringType.Holistic,
  score: 2,
  freetextQuestionCodingCriteria: [
    {
      __typename: "FreetextQuestionCodingCriterion",
      createdAt: new Date(2021, 1, 1).toISOString(),
      modifiedAt: new Date(2021, 1, 1).toISOString(),
      id: "6580e4d2-7053-4649-80c6-1e2324eeb1dc",
      questionId: "271056ff-66bc-475d-bfd0-9d5707e17cf7",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
      score: 2
    },
    {
      __typename: "FreetextQuestionCodingCriterion",
      createdAt: new Date(2021, 1, 1).toISOString(),
      modifiedAt: new Date(2021, 1, 1).toISOString(),
      id: "bed15f78-7b7c-47d8-902c-f7fd274afd61",
      questionId: "271056ff-66bc-475d-bfd0-9d5707e17cf7",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
      score: 1
    }
  ]
}

export const multipleChoiceQuestionMock: QuestionnaireQuestion = {
  __typename: "QuestionnaireQuestion",
  createdAt: new Date(2021, 1, 1).toISOString(),
  modifiedAt: new Date(2021, 1, 1).toISOString(),
  id: "44e9c09d-9f51-400f-983f-68d052cd8b51",
  position: 1,
  questionType: QuestionType.MultipleChoice,
  text:
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
  isAdditionalFreeTextAnswerEnabled: false,
  questionnaireId: "questionnaire1",
  binaryFile: null,
  score: 2,
  binaryFileId: null,
  answers: [
    {
      __typename: "QuestionnaireAnswer",
      createdAt: new Date(2021, 1, 1).toISOString(),
      modifiedAt: new Date(2021, 1, 1).toISOString(),
      id: "fa03edbd-24f6-4dd9-9ece-0589e98b1d3a",
      questionId: "44e9c09d-9f51-400f-983f-68d052cd8b51",
      text:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
      isCorrect: false,
      position: 4
    },
    {
      __typename: "QuestionnaireAnswer",
      createdAt: new Date(2021, 1, 1).toISOString(),
      modifiedAt: new Date(2021, 1, 1).toISOString(),
      id: "76f41795-bd02-41ab-bd22-e83cfab9630f",
      questionId: "44e9c09d-9f51-400f-983f-68d052cd8b51",
      text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
      isCorrect: true,
      position: 2
    },
    {
      __typename: "QuestionnaireAnswer",
      createdAt: new Date(2021, 1, 1).toISOString(),
      modifiedAt: new Date(2021, 1, 1).toISOString(),
      id: "24f75c0a-0b9b-4c80-a9df-52ce79820e26",
      questionId: "44e9c09d-9f51-400f-983f-68d052cd8b51",
      text:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
      isCorrect: true,
      position: 1
    }
  ],
  scoringType: QuestionScoringType.Analytical,
  freetextQuestionCodingCriteria: [
    {
      __typename: "FreetextQuestionCodingCriterion",
      createdAt: new Date(2021, 1, 1).toISOString(),
      modifiedAt: new Date(2021, 1, 1).toISOString(),
      id: "e16e70fa-d31a-4863-97e0-e82f4e897f5b",
      questionId: "44e9c09d-9f51-400f-983f-68d052cd8b51",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
      score: 2
    },
    {
      __typename: "FreetextQuestionCodingCriterion",
      createdAt: new Date(2021, 1, 1).toISOString(),
      modifiedAt: new Date(2021, 1, 1).toISOString(),
      id: "87864300-c487-45fb-adcd-d7b537dc952f",
      questionId: "44e9c09d-9f51-400f-983f-68d052cd8b51",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
      score: 1
    }
  ]
}

export const multipleChoiceQuestionWithVideoMock: QuestionnaireQuestion = {
  __typename: "QuestionnaireQuestion",
  id: "8012f711-dc85-4aae-bd11-c2740a7cd67a",
  score: 2,
  createdAt: new Date(2021, 1, 1).toISOString(),
  modifiedAt: new Date(2021, 1, 1).toISOString(),
  questionType: QuestionType.MultipleChoice,
  position: 1,
  text:
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
  isAdditionalFreeTextAnswerEnabled: false,
  questionnaireId: "questionnaire1",
  binaryFileId: "bf02",
  binaryFile: {
    __typename: "BinaryFile",
    createdAt: new Date(2021, 1, 1).toISOString(),
    modifiedAt: new Date(2021, 1, 1).toISOString(),
    id: "v1",
    filename: "v1.webm",
    fileSize: 0,
    mimeType: MimeType.VideoMp4,
    url: "http://dl5.webmfiles.org/big-buck-bunny_trailer.webm"
  },
  answers: [
    {
      __typename: "QuestionnaireAnswer",
      createdAt: new Date(2021, 1, 1).toISOString(),
      modifiedAt: new Date(2021, 1, 1).toISOString(),
      id: "60f957b5-20f4-412f-906d-239449cdadf7",
      questionId: "8012f711-dc85-4aae-bd11-c2740a7cd67a",
      text:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
      isCorrect: false,
      position: 3
    },
    {
      __typename: "QuestionnaireAnswer",
      createdAt: new Date(2021, 1, 1).toISOString(),
      modifiedAt: new Date(2021, 1, 1).toISOString(),
      id: "9fe81f64-f95d-4a9f-bba8-b2712af12296",
      questionId: "8012f711-dc85-4aae-bd11-c2740a7cd67a",
      text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
      isCorrect: false,
      position: 2
    },
    {
      __typename: "QuestionnaireAnswer",
      createdAt: new Date(2021, 1, 1).toISOString(),
      modifiedAt: new Date(2021, 1, 1).toISOString(),
      id: "c38712b6-53f7-458a-b827-a8dfe75d5d39",
      questionId: "8012f711-dc85-4aae-bd11-c2740a7cd67a",
      text:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
      isCorrect: true,
      position: 1
    }
  ],
  scoringType: QuestionScoringType.Analytical,
  freetextQuestionCodingCriteria: [
    {
      __typename: "FreetextQuestionCodingCriterion",
      createdAt: new Date(2021, 1, 1).toISOString(),
      modifiedAt: new Date(2021, 1, 1).toISOString(),
      id: "cfeb9265-63ec-4fd4-9957-11464a991ab5",
      questionId: "8012f711-dc85-4aae-bd11-c2740a7cd67a",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
      score: 2
    },
    {
      __typename: "FreetextQuestionCodingCriterion",
      createdAt: new Date(2021, 1, 1).toISOString(),
      modifiedAt: new Date(2021, 1, 1).toISOString(),
      id: "9991c0fe-d16e-4a1b-b117-108f7601ac39",
      questionId: "8012f711-dc85-4aae-bd11-c2740a7cd67a",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
      score: 1
    }
  ]
}

export const multipleChoiceQuestionWithExtraFreeTextMock: QuestionnaireQuestion = {
  __typename: "QuestionnaireQuestion",
  createdAt: new Date(2021, 1, 1).toISOString(),
  modifiedAt: new Date(2021, 1, 1).toISOString(),
  id: "dfbe4ec8-4b86-44b8-82e8-274b72746a1c",
  questionType: QuestionType.MultipleChoice,
  position: 1,
  text:
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
  isAdditionalFreeTextAnswerEnabled: true,
  questionnaireId: "questionnaire1",
  binaryFile: null,
  binaryFileId: null,
  score: 2,
  answers: [
    {
      __typename: "QuestionnaireAnswer",
      createdAt: new Date(2021, 1, 1).toISOString(),
      modifiedAt: new Date(2021, 1, 1).toISOString(),
      id: "f51f6877-be6d-496e-bbe6-679a42b603f0",
      questionId: "dfbe4ec8-4b86-44b8-82e8-274b72746a1c",
      text:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
      isCorrect: false,
      position: 1
    },
    {
      __typename: "QuestionnaireAnswer",
      createdAt: new Date(2021, 1, 1).toISOString(),
      modifiedAt: new Date(2021, 1, 1).toISOString(),
      id: "053454f8-9b2b-4cd6-8a80-a9ec27f1ee83",
      questionId: "dfbe4ec8-4b86-44b8-82e8-274b72746a1c",
      text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
      isCorrect: false,
      position: 2
    },
    {
      __typename: "QuestionnaireAnswer",
      createdAt: new Date(2021, 1, 1).toISOString(),
      modifiedAt: new Date(2021, 1, 1).toISOString(),
      id: "8ecb07a6-8f2a-4de4-a0ea-8541607aa8ec",
      questionId: "dfbe4ec8-4b86-44b8-82e8-274b72746a1c",
      text:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
      isCorrect: false,
      position: 3
    }
  ],
  scoringType: QuestionScoringType.Analytical,
  freetextQuestionCodingCriteria: [
    {
      __typename: "FreetextQuestionCodingCriterion",
      createdAt: new Date(2021, 1, 1).toISOString(),
      modifiedAt: new Date(2021, 1, 1).toISOString(),
      id: "9dca67df-3d4b-43a2-a940-0b64bf4bb74b",
      questionId: "dfbe4ec8-4b86-44b8-82e8-274b72746a1c",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
      score: 2
    },
    {
      __typename: "FreetextQuestionCodingCriterion",
      createdAt: new Date(2021, 1, 1).toISOString(),
      modifiedAt: new Date(2021, 1, 1).toISOString(),
      id: "70e6973c-54dd-4794-874a-61fb60b70251",
      questionId: "dfbe4ec8-4b86-44b8-82e8-274b72746a1c",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
      score: 1
    }
  ]
}

export const freeTextQuestionMock: QuestionnaireQuestion = {
  __typename: "QuestionnaireQuestion",
  id: "0a8e5e19-dbc6-4dd5-900c-d4743266b169",
  createdAt: new Date(2021, 1, 1).toISOString(),
  modifiedAt: new Date(2021, 1, 1).toISOString(),
  position: 1,
  score: 0,
  questionType: QuestionType.FreeText,
  text:
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
  isAdditionalFreeTextAnswerEnabled: false,
  questionnaireId: "questionnaire1",
  binaryFile: null,
  binaryFileId: null,
  answers: [],
  scoringType: QuestionScoringType.Analytical,
  freetextQuestionCodingCriteria: [
    {
      __typename: "FreetextQuestionCodingCriterion",
      createdAt: new Date(2021, 1, 1).toISOString(),
      modifiedAt: new Date(2021, 1, 1).toISOString(),
      id: "f31ebeab-6195-415a-bb0b-77e285bac0e8",
      questionId: "0a8e5e19-dbc6-4dd5-900c-d4743266b169",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
      score: 2
    },
    {
      __typename: "FreetextQuestionCodingCriterion",
      createdAt: new Date(2021, 1, 1).toISOString(),
      modifiedAt: new Date(2021, 1, 1).toISOString(),
      id: "43b18cfa-eaa6-42dd-8f8d-1fe382e63828",
      questionId: "0a8e5e19-dbc6-4dd5-900c-d4743266b169",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
      score: 1
    }
  ]
}

export const questionnaireMock: Questionnaire = {
  __typename: "Questionnaire",
  id: "48903fb2-72b4-4d5c-aba2-191423a637be",
  description:
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
  binaryFileId: null,
  binaryFile: null,
  author: userAccountMock,
  authorId: userAccountMock.id,
  maxDurationInSeconds: 320,
  questionnaireType: QuestionnaireType.RuntimeSurvey,
  questionsCount: 6,
  createdAt: new Date(2021, 1, 1).toISOString(),
  modifiedAt: new Date(2021, 1, 1).toISOString(),
  finalizedAt: new Date(2021, 1, 1).toISOString(),
  publishedAt: new Date(2021, 1, 1).toISOString(),
  questions: [
    singleChoiceQuestionMock,
    singleChoiceQuestionWithImageMock,
    multipleChoiceQuestionMock,
    multipleChoiceQuestionWithExtraFreeTextMock,
    multipleChoiceQuestionWithVideoMock,
    freeTextQuestionMock
  ],
  title: "Lorem ipsum dolor sit amet, consetetur sadipscing"
}
