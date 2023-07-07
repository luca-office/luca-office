import {EmailDirectory, ErpTableType, InterventionType, Relevance} from "../graphql/generated/globalTypes"
import {
  EmailOpeningIntervention,
  ErpRowOpeningIntervention,
  Intervention,
  RuntimeSurveyAnswerSelectionIntervention
} from "../models"

export const interventionsMock: Intervention[] = [
  {
    id: "10af71f9-5a8c-4538-ac7f-921472caf37a",
    __typename: "FileOpeningIntervention",
    interventionEmail: {
      __typename: "Email",
      directory: EmailDirectory.Inbox,
      isInitiallyRead: false,
      message: "Intervention",
      createdAt: "2020-10-22T11:16:01.973Z",
      modifiedAt: "2020-10-22T11:16:01.973Z",
      receptionDelayInSeconds: 600,
      recipient: "test@†est.de",
      relevance: Relevance.Irrelevant,
      scenarioId: "79515a0c-7227-4c1f-a61c-0e6d9f1332a5",
      subject: "Betreff",
      ccRecipients: [],
      id: "6daab570-8d5c-4631-967a-96ad09e9815f",
      sender: "max.mustermann@mail.de"
    },
    interventionEmailId: "6daab570-8d5c-4631-967a-96ad09e9815f",
    file: {
      __typename: "File",
      name: "test-file.png"
    },
    fileId: "eb6eb76f-fe77-4f2d-8962-76a73768b0e8",
    interventionType: InterventionType.FileOpening,
    scenarioId: "79515a0c-7227-4c1f-a61c-0e6d9f1332a5",
    timeOffsetInSeconds: 600,
    title: "Intervention Nr.1"
  },
  {
    id: "858b60e3-c9d5-4c54-8948-9f2c5053640e",
    __typename: "FileOpeningIntervention",
    interventionEmail: {
      __typename: "Email",
      directory: EmailDirectory.Inbox,
      isInitiallyRead: false,
      message: "Intervention 2",
      createdAt: "2020-10-22T11:16:01.973Z",
      modifiedAt: "2020-10-22T11:16:01.973Z",
      receptionDelayInSeconds: 50,
      recipient: "test@†est.de",
      relevance: Relevance.Irrelevant,
      scenarioId: "79515a0c-7227-4c1f-a61c-0e6d9f1332a5",
      subject: "Betreff",
      ccRecipients: [],
      id: "887c6ee6-b784-433f-9fe8-a06f141438c5",
      sender: "max.mustermann@mail.de"
    },
    interventionEmailId: "887c6ee6-b784-433f-9fe8-a06f141438c5",
    file: {
      __typename: "File",
      name: "test-file2.png"
    },
    fileId: "55bd9e5d-0dfa-4c47-9ea8-c241bcdb8816",
    interventionType: InterventionType.FileOpening,
    scenarioId: "941025ea-ab04-41a2-830e-bc148cb90342",
    timeOffsetInSeconds: 50,
    title: "Intervention Nr.2"
  },
  {
    id: "2645ba06-755d-4b70-b12b-dda8b576c1d4",
    __typename: "FileOpeningIntervention",
    interventionEmail: {
      __typename: "Email",
      directory: EmailDirectory.Inbox,
      isInitiallyRead: false,
      message: "Intervention",
      createdAt: "2020-10-22T11:16:01.973Z",
      modifiedAt: "2020-10-22T11:16:01.973Z",
      receptionDelayInSeconds: 500,
      recipient: "test@†est.de",
      relevance: Relevance.Irrelevant,
      scenarioId: "79515a0c-7227-4c1f-a61c-0e6d9f1332a5",
      subject: "Betreff",
      ccRecipients: [],
      id: "f9825c18-d6ad-44a9-83c2-0adbd1c94c16",
      sender: "max.mustermann@mail.de"
    },
    interventionEmailId: "f9825c18-d6ad-44a9-83c2-0adbd1c94c16",
    file: {
      __typename: "File",
      name: "test-file2.png"
    },
    fileId: "55bd9e5d-0dfa-4c47-9ea8-c241bcdb8816",
    interventionType: InterventionType.FileOpening,
    scenarioId: "941025ea-ab04-41a2-830e-bc148cb90342",
    timeOffsetInSeconds: 500,
    title: "Intervention Nr.3 gleiches file"
  }
]

export const emailOpeningInterventionsMock: EmailOpeningIntervention[] = [
  {
    id: "b5f956c9-08fd-4a29-a7be-f65c59948536",
    __typename: "EmailOpeningIntervention",
    interventionEmail: {
      __typename: "Email",
      directory: EmailDirectory.Inbox,
      isInitiallyRead: false,
      message: "Intervention 2",
      createdAt: "2020-10-22T11:16:01.973Z",
      modifiedAt: "2020-10-22T11:16:01.973Z",
      receptionDelayInSeconds: 50,
      recipient: "test@†est.de",
      relevance: Relevance.Irrelevant,
      scenarioId: "79515a0c-7227-4c1f-a61c-0e6d9f1332a5",
      subject: "Betreff",
      ccRecipients: [],
      id: "51aa6017-6675-4250-aea5-ae8f2afa6bd7",
      sender: "max.mustermann@mail.de"
    },
    interventionEmailId: "51aa6017-6675-4250-aea5-ae8f2afa6bd7",
    email: {
      receptionDelayInSeconds: 50,
      __typename: "Email",
      directory: EmailDirectory.Inbox,
      subject: "Subject",
      sender: "test@test.de"
    },
    emailId: "1bc33b5f-6b9b-434b-91bf-c854f091236e",
    interventionType: InterventionType.EmailOpening,
    scenarioId: "79515a0c-7227-4c1f-a61c-0e6d9f1332a5",
    timeOffsetInSeconds: 600,
    title: "Intervention Nr.2"
  },
  {
    id: "63bdbdd8-dfe5-4fb0-9c13-dd41997ac1ac",
    __typename: "EmailOpeningIntervention",
    interventionEmail: {
      __typename: "Email",
      directory: EmailDirectory.Inbox,
      isInitiallyRead: false,
      message: "Intervention 2",
      createdAt: "2020-10-22T11:16:01.973Z",
      modifiedAt: "2020-10-22T11:16:01.973Z",
      receptionDelayInSeconds: 50,
      recipient: "test@†est.de",
      relevance: Relevance.Irrelevant,
      scenarioId: "79515a0c-7227-4c1f-a61c-0e6d9f1332a5",
      subject: "Betreff",
      ccRecipients: [],
      id: "51aa6017-6675-4250-aea5-ae8f2afa6bd7",
      sender: "max.mustermann@mail.de"
    },
    interventionEmailId: "3f518208-7b64-406e-997a-a42ae5acd7b8",
    email: {
      receptionDelayInSeconds: 50,
      __typename: "Email",
      directory: EmailDirectory.Inbox,
      subject: "Subject 2",
      sender: "test@test.de"
    },
    emailId: "c5030011-eece-4298-bdab-2cddc3f99c20",
    interventionType: InterventionType.EmailOpening,
    scenarioId: "79515a0c-7227-4c1f-a61c-0e6d9f1332a5",
    timeOffsetInSeconds: 600,
    title: "Intervention Nr.3"
  }
]

export const runtimeSurveyAnswerSelectionInterventionsMock: RuntimeSurveyAnswerSelectionIntervention[] = [
  {
    id: "154e727c-375f-499d-8051-e9cbe3ac3ae0",
    answerId: "0f0a0cc4-e49c-4e93-8c8c-c3daf17ba75b",
    isNegated: false,
    answer: {
      __typename: "QuestionnaireAnswer",
      id: "e8f4f71c-71b1-4031-a328-eba81a108658",
      isCorrect: false,
      position: 1,
      questionId: "4d1a5742-f9e3-47f3-b858-07a38ea869b6",
      text: "Text 1"
    },
    __typename: "RuntimeSurveyAnswerSelectionIntervention",
    interventionEmail: {
      __typename: "Email",
      directory: EmailDirectory.Inbox,
      isInitiallyRead: false,
      message: "Intervention 2",
      createdAt: "2020-10-22T11:16:01.973Z",
      modifiedAt: "2020-10-22T11:16:01.973Z",
      receptionDelayInSeconds: 50,
      recipient: "test@†est.de",
      relevance: Relevance.Irrelevant,
      scenarioId: "79515a0c-7227-4c1f-a61c-0e6d9f1332a5",
      subject: "Betreff",
      ccRecipients: [],
      id: "51aa6017-6675-4250-aea5-ae8f2afa6bd7",
      sender: "max.mustermann@mail.de"
    },
    interventionEmailId: "51aa6017-6675-4250-aea5-ae8f2afa6bd7",
    interventionType: InterventionType.RuntimeSurveyAnswerSelection,
    scenarioId: "79515a0c-7227-4c1f-a61c-0e6d9f1332a5",
    title: "Intervention Nr.1"
  },
  {
    id: "22e8f849-32e2-4ea7-9946-c6320073cf9e",
    answerId: "0bc88637-f65d-42d3-993d-961b22e4d2ff",
    isNegated: false,
    answer: {
      __typename: "QuestionnaireAnswer",
      id: "e8f4f71c-71b1-4031-a328-eba81a108659",
      isCorrect: false,
      position: 1,
      questionId: "4d1a5742-f9e3-47f3-b858-07a38ea869b7",
      text: "Text 2"
    },
    __typename: "RuntimeSurveyAnswerSelectionIntervention",
    interventionEmail: {
      __typename: "Email",
      directory: EmailDirectory.Inbox,
      isInitiallyRead: false,
      message: "Intervention 2",
      createdAt: "2020-10-22T11:16:01.973Z",
      modifiedAt: "2020-10-22T11:16:01.973Z",
      receptionDelayInSeconds: 50,
      recipient: "test@†est.de",
      relevance: Relevance.Irrelevant,
      scenarioId: "79515a0c-7227-4c1f-a61c-0e6d9f1332a5",
      subject: "Betreff",
      ccRecipients: [],
      id: "51aa6017-6675-4250-aea5-ae8f2afa6bd7",
      sender: "max.mustermann@mail.de"
    },
    interventionEmailId: "51aa6017-6675-4250-aea5-ae8f2afa6bd2",
    interventionType: InterventionType.RuntimeSurveyAnswerSelection,
    scenarioId: "79515a0c-7227-4c1f-a61c-0e6d9f1332a5",
    title: "Intervention Nr.2"
  },
  {
    id: "154e727c-375f-499d-8051-e9cbe3ac3ae1",
    answerId: "551cc36b-e042-43ff-8090-0847fb85bb56",
    isNegated: false,
    answer: {
      __typename: "QuestionnaireAnswer",
      id: "551cc36b-e042-43ff-8090-0847fb85bb56",
      isCorrect: false,
      position: 3,
      questionId: "4d1a5742-f9e3-47f3-b858-07a38ea869b6",
      text: "Text 3"
    },
    __typename: "RuntimeSurveyAnswerSelectionIntervention",
    interventionEmail: {
      __typename: "Email",
      directory: EmailDirectory.Inbox,
      isInitiallyRead: false,
      message: "Intervention 2",
      createdAt: "2020-10-22T11:16:01.973Z",
      modifiedAt: "2020-10-22T11:16:01.973Z",
      receptionDelayInSeconds: 50,
      recipient: "test@†est.de",
      relevance: Relevance.Irrelevant,
      scenarioId: "79515a0c-7227-4c1f-a61c-0e6d9f1332a5",
      subject: "Betreff",
      ccRecipients: [],
      id: "51aa6017-6675-4250-aea5-ae8f2afa6bd7",
      sender: "max.mustermann@mail.de"
    },
    interventionEmailId: "51aa6017-6675-4250-aea5-ae8f2afa6bd7",
    interventionType: InterventionType.RuntimeSurveyAnswerSelection,
    scenarioId: "79515a0c-7227-4c1f-a61c-0e6d9f1332a5",
    title: "Intervention Nr.3"
  }
]

export const erpRowOpeningInterventionsMock: ErpRowOpeningIntervention[] = [
  {
    __typename: "ErpRowOpeningIntervention",
    erpRowId: 2,
    erpTableType: ErpTableType.Product,
    id: "d273743f-e1a0-4833-ad3b-e3d701165c72",
    interventionEmail: {
      __typename: "Email",
      directory: EmailDirectory.Inbox,
      isInitiallyRead: false,
      message: "Intervention 2",
      createdAt: "2020-10-22T11:16:01.973Z",
      modifiedAt: "2020-10-22T11:16:01.973Z",
      receptionDelayInSeconds: 50,
      recipient: "test@†est.de",
      relevance: Relevance.Irrelevant,
      scenarioId: "79515a0c-7227-4c1f-a61c-0e6d9f1332a5",
      subject: "Betreff",
      ccRecipients: [],
      id: "51aa6017-6675-4250-aea5-ae8f2afa6bd7",
      sender: "max.mustermann@mail.de"
    },
    interventionEmailId: "5b9a4c4e-d1b9-409e-8573-4380ce70fefb",
    interventionType: InterventionType.ErpRowOpening,
    sampleCompanyId: "4b555d90-4a81-474f-b8a4-c0a4246c489b",
    scenarioId: "2d99dba5-eda9-4cf1-85d6-efe1bdd34501",
    timeOffsetInSeconds: 600,
    title: "Intervention 1"
  },
  {
    __typename: "ErpRowOpeningIntervention",
    erpRowId: 2,
    erpTableType: ErpTableType.Product,
    id: "39bf85fa-3146-4d4d-9775-430202dbc676",
    interventionEmail: {
      __typename: "Email",
      directory: EmailDirectory.Inbox,
      isInitiallyRead: false,
      message: "Intervention 2",
      createdAt: "2020-10-22T11:16:01.973Z",
      modifiedAt: "2020-10-22T11:16:01.973Z",
      receptionDelayInSeconds: 50,
      recipient: "test@†est.de",
      relevance: Relevance.Irrelevant,
      scenarioId: "79515a0c-7227-4c1f-a61c-0e6d9f1332a5",
      subject: "Betreff",
      ccRecipients: [],
      id: "51aa6017-6675-4250-aea5-ae8f2afa6bd7",
      sender: "max.mustermann@mail.de"
    },
    interventionEmailId: "5b9a4c4e-d1b9-409e-8573-4380ce70fefb",
    interventionType: InterventionType.ErpRowOpening,
    sampleCompanyId: "4b555d90-4a81-474f-b8a4-c0a4246c489b",
    scenarioId: "2d99dba5-eda9-4cf1-85d6-efe1bdd34501",
    timeOffsetInSeconds: 600,
    title: "Intervention 2"
  },
  {
    __typename: "ErpRowOpeningIntervention",
    erpRowId: 2,
    erpTableType: ErpTableType.Product,
    id: "12916ee5-bba1-4a9d-be09-9ec8d286c1bf",
    interventionEmail: {
      __typename: "Email",
      directory: EmailDirectory.Inbox,
      isInitiallyRead: false,
      message: "Intervention 2",
      createdAt: "2020-10-22T11:16:01.973Z",
      modifiedAt: "2020-10-22T11:16:01.973Z",
      receptionDelayInSeconds: 50,
      recipient: "test@†est.de",
      relevance: Relevance.Irrelevant,
      scenarioId: "79515a0c-7227-4c1f-a61c-0e6d9f1332a5",
      subject: "Betreff",
      ccRecipients: [],
      id: "51aa6017-6675-4250-aea5-ae8f2afa6bd7",
      sender: "max.mustermann@mail.de"
    },
    interventionEmailId: "5b9a4c4e-d1b9-409e-8573-4380ce70fefb",
    interventionType: InterventionType.ErpRowOpening,
    sampleCompanyId: "4b555d90-4a81-474f-b8a4-c0a4246c489b",
    scenarioId: "2d99dba5-eda9-4cf1-85d6-efe1bdd34501",
    timeOffsetInSeconds: 600,
    title: "Intervention 3"
  }
]
