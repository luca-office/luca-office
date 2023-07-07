import {CodingModelScenario} from "../../models"
import {userAccountMock} from "./user-account.mock"

export const codingModelScenarioMock: CodingModelScenario = {
  __typename: "Scenario",
  id: "76261efc-17db-42ab-ba00-8db31cf2663b",
  createdAt: new Date(2020, 10, 5).toISOString(),
  modifiedAt: new Date(2020, 10, 15).toISOString(),
  date: null,
  name: "coding-model-scenario-name",
  description: "coding-model-scenario-description",
  maxDurationInSeconds: null,
  introductionEmailId: null,
  authorId: userAccountMock.id,
  shouldDisplayTime: false,
  finalizedAt: null,
  publishedAt: null,
  tags: [],
  completionEmailAddress: null,
  shouldHideReferenceBookChapters: false,
  sampleCompanyId: null,
  archivedAt: null,
  author: userAccountMock,
  introductionEmail: null,
  sampleCompany: null
}
