import {sampleCompanyIdMock} from "../../../tests/__mocks__"
import {FeatureType, OfficeTool} from "../generated/globalTypes"
import {ScenarioCodingAutomatedCriteriaQuery_scenarioCodingAutomatedCriteria} from "../generated/ScenarioCodingAutomatedCriteriaQuery"
import {codingItemMock} from "./coding-item.mock"
import {rScriptMock} from "./r-script.mock"
import {scenarioSampleCompanyFilesMock} from "./scenario-sample-company-files.mock"

export const scenarioCodingAutomatedCriteriaMock: ScenarioCodingAutomatedCriteriaQuery_scenarioCodingAutomatedCriteria[] = [
  {
    __typename: "ToolUsageScenarioCodingAutomatedCriterion",
    id: "f4b7bb1d-c507-4d8b-9636-3336bd5ca94a",
    score: 12,
    itemId: codingItemMock.id,
    officeTool: OfficeTool.EmailClient
  },
  {
    __typename: "InputValueScenarioCodingAutomatedCriterion",
    id: "36ee97de-0ff5-4b1f-b503-3851d0b4de37",
    score: 6,
    itemId: codingItemMock.id,
    officeTool: OfficeTool.EmailClient,
    fileId: null,
    spreadsheetRowIndex: null,
    spreadsheetColumnIndex: null,
    value: "mock"
  },
  {
    __typename: "DocumentViewScenarioCodingAutomatedCriterion",
    id: "5bc7cbb0-f755-4e96-873b-b7f0bd235253",
    score: 8,
    itemId: codingItemMock.id,
    fileId: scenarioSampleCompanyFilesMock[0].fileId,
    emailId: null,
    erpRowId: null,
    erpTableType: null,
    referenceBookArticleId: null,
    sampleCompanyId: sampleCompanyIdMock
  },
  {
    __typename: "FeatureUsageScenarioCodingAutomatedCriterion",
    id: "d30f5047-c7e6-4104-af7f-f20611b67f96",
    score: 4,
    itemId: codingItemMock.id,
    officeTool: OfficeTool.EmailClient,
    featureType: FeatureType.AnswerEmail
  },
  {
    __typename: "RScriptScenarioCodingAutomatedCriterion",
    id: "8aad68c5-9bf5-49e4-955b-d00e258cc87b",
    score: 20,
    itemId: codingItemMock.id,
    rScriptId: rScriptMock.id
  }
]
