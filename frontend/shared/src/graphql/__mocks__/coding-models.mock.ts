import {CodingModel, ScenarioExtendedWithCodingModel} from "../../models"
import {codingModelScenarioMock} from "./coding-model-scenario.mock"

export const codingModelsMock: CodingModel[] = [
  {
    __typename: "CodingModel",
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    description: "description",
    title: "Kodieranweisung 1",
    id: "18de306c-a8f8-4311-9a2f-dfdf",
    dimensionsCount: 3,
    scenarioId: codingModelScenarioMock.id,
    scenario: {
      ...codingModelScenarioMock,
      maxDurationInSeconds: 100
    }
  },
  {
    __typename: "CodingModel",
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    description: "description",
    title: "Kodieranweisung 2",
    id: "18de306c-a8f8-4311-9a2f-awrs",
    dimensionsCount: 2,
    scenarioId: codingModelScenarioMock.id,
    scenario: {
      ...codingModelScenarioMock,
      maxDurationInSeconds: 100
    }
  },
  {
    __typename: "CodingModel",
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    description: "description",
    title: "Kodieranweisung 3",
    dimensionsCount: 3,
    id: "18de306c-a8f8-4311-9a2f-segv",
    scenarioId: codingModelScenarioMock.id,
    scenario: {
      ...codingModelScenarioMock,
      maxDurationInSeconds: 100
    }
  },
  {
    __typename: "CodingModel",
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    description: "description",
    title: "Kodieranweisung 4",
    dimensionsCount: 0,
    id: "18de306c-a8f8-4311-9a2f-dfsdfsdf",
    scenarioId: codingModelScenarioMock.id,
    scenario: {
      ...codingModelScenarioMock,
      maxDurationInSeconds: 100
    }
  }
]

export const scenarioWithCodingModelsMock: ScenarioExtendedWithCodingModel[] = [
  {
    createdAt: "2020-08-03 15:16:28.504000 +00:00",
    description: "description",
    name: "Kodieranweisung 1",
    id: "18de306c-a8f8-4311-9a2f-dfdf",
    author: {
      id: "fsfoksf",
      lastName: "Mustermann"
    },
    finalizedAt: null,
    publishedAt: null,
    maxDurationInSeconds: 100,
    codingModel: codingModelsMock[0]
  },
  {
    createdAt: "2020-08-03 15:16:28.504000 +00:00",
    publishedAt: null,
    description: "description",
    name: "Kodieranweisung 1",
    id: "18de306c-a8f8-4311-9a2f-dfd2",
    author: {
      id: "fsfoksf",
      lastName: "Mustermann"
    },
    finalizedAt: "2020-08-03 15:16:28.504000 +00:00",
    maxDurationInSeconds: 100,
    codingModel: codingModelsMock[1]
  }
]
