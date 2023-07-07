import {CodingDimension, CodingNode} from "../../models"
import {buildCodingModelTree} from "../../utils/scenario-coding-model"
import {ScoringType} from "../generated/globalTypes"
import {codingModelsMock} from "./coding-models.mock"
import {ratingsMock} from "./ratings.mock"
import {scenarioManualCodingItemRatingsMock} from "./scenario-coding-item-ratings.mock"

const codingModel = codingModelsMock[0]

export const codingDimensionsMock: CodingDimension[] = [
  {
    __typename: "CodingDimension",
    codingModelId: codingModel.id,
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    id: "daad-adasd-asd",
    description: "dsfsdf",
    position: 1,
    parentDimensionId: null,
    title: "Argumentation (inhaltlich)",
    items: [
      {
        __typename: "ManualCodingItem",
        scoringType: ScoringType.Analytical,
        id: "sflöksfsdf",
        position: 1,
        title: "Item 1",
        maximumScore: 11,
        dimensionId: "daad-adasd-asd",
        createdAt: new Date(2020, 10, 5).toISOString(),
        modifiedAt: new Date(2020, 10, 15).toISOString(),
        description: "Item 1",
        criteriaCount: 0
      }
    ]
  },
  {
    __typename: "CodingDimension",
    codingModelId: codingModel.id,
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    id: "daad-adasd-asd-sdfsipjfs",
    description: "dsfsdf",
    position: 2,
    parentDimensionId: null,
    title: "Argumentation (sprachlich)",
    items: []
  },
  {
    __typename: "CodingDimension",
    codingModelId: codingModel.id,
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    id: "daad-adasd-ölmxcvor",
    parentDimensionId: "daad-adasd-asd-sdfsipjfs",
    description: "dsfsdf",
    position: 3,
    title: "Werkzeuge verwenden",
    items: [
      {
        __typename: "ManualCodingItem",
        id: "sflöksfsdf-sdfsd",
        title: "Item 1",
        maximumScore: 4,
        scoringType: ScoringType.Analytical,
        dimensionId: "daad-adasd-ölmxcvor",
        createdAt: new Date(2020, 10, 5).toISOString(),
        modifiedAt: new Date(2020, 10, 15).toISOString(),
        description: "item beschreibung 1",
        position: 2,
        criteriaCount: 3
      },
      {
        __typename: "ManualCodingItem",
        id: "sflöksfsdf-sdfsd-üpoerw",
        title: "Item 2",
        position: 3,
        maximumScore: 10,
        scoringType: ScoringType.Analytical,
        dimensionId: "daad-adasd-ölmxcvor",
        createdAt: new Date(2020, 10, 5).toISOString(),
        modifiedAt: new Date(2020, 10, 15).toISOString(),
        description: "item beschreibung 2",
        criteriaCount: 3
      },
      {
        __typename: "ManualCodingItem",
        id: "sflöksfsdf-sdfsd-fsfsdf",
        title: "Item 3",
        position: 4,
        maximumScore: 18,
        scoringType: ScoringType.Analytical,
        dimensionId: "daad-adasd-ölmxcvor",
        createdAt: new Date(2020, 10, 5).toISOString(),
        modifiedAt: new Date(2020, 10, 15).toISOString(),
        description: "item beschreibung 3",
        criteriaCount: 3
      }
    ]
  },
  {
    __typename: "CodingDimension",
    codingModelId: codingModel.id,
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    id: "daad-adaas-ürpotepr",
    description: "dsfsdf",
    position: 4,
    parentDimensionId: "daad-adasd-asd-sdfsipjfs",
    title: "Wortwahl / Fachtermini",
    items: []
  },
  {
    __typename: "CodingDimension",
    codingModelId: codingModel.id,
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    id: "2f0eb77b-9165-465d-9a13-a812bcf4ec55",
    description: "dsfsdf",
    position: 5,
    parentDimensionId: null,
    title: "Zusätzliches",
    items: []
  }
]

export const codingDimensionNodesMock: CodingNode[] = codingDimensionsMock
  .filter(dimension => dimension.parentDimensionId === null)
  .map((parentDimension, index) =>
    buildCodingModelTree({
      parentDimension,
      allDimensions: codingDimensionsMock,
      mainDimensionIndex: index,
      scenarioCodingItemRatings: scenarioManualCodingItemRatingsMock,
      ratings: ratingsMock
    })
  )
