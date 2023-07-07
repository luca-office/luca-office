import {referenceBookChaptersMock} from "shared/__mocks__"
import {scenariosMock} from "shared/graphql/__mocks__"
import {ReferenceBookChapterScenario} from "shared/models"

const referenceBookChapterId = referenceBookChaptersMock[0].id

export const referenceBookChapterScenarioMock: ReferenceBookChapterScenario[] = [
  {
    __typename: "ReferenceBookChapterScenario",
    referenceBookChapterId,
    scenarioId: scenariosMock[0].id,
    position: 1
  },
  {
    __typename: "ReferenceBookChapterScenario",
    referenceBookChapterId,
    scenarioId: scenariosMock[1].id,
    position: 2
  }
]
