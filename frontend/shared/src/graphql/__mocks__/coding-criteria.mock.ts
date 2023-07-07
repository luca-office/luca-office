import {
  AutomatedCodingCriterion,
  CodingCriterion,
  DocumentViewScenarioCodingAutomatedCriterion,
  FeatureUsageScenarioCodingAutomatedCriterion,
  InputValueScenarioCodingAutomatedCriterion,
  ToolUsageScenarioCodingAutomatedCriterion
} from "../../models"
import {FeatureType, OfficeTool} from "../generated/globalTypes"

export const codingCriteriaMock: CodingCriterion[] = [
  {
    __typename: "CodingCriterion",
    createdAt: "2020-08-05 15:16:28.504000 +00:00",
    description: "Beschreibung Kodieranweisung 1",
    id: "fsdfpow+ycx piwsdkfj",
    itemId: "sdfopi-spofksd",
    score: 12
  },
  {
    __typename: "CodingCriterion",
    createdAt: "2020-08-05 15:16:28.504000 +00:00",
    description: "Beschreibung Kodieranweisung 2",
    id: "fsdfpow+ycx fsfwefsfdf",
    itemId: "sdfopi-spofksd",
    score: 19
  },
  {
    __typename: "CodingCriterion",
    createdAt: "2020-08-05 15:16:28.504000 +00:00",
    description: "Beschreibung Kodieranweisung 3",
    id: "fsdfpow+ycx-wopeksdf sdfwefsdf",
    itemId: "sdfopi-spofksd",
    score: 8
  },
  {
    __typename: "CodingCriterion",
    createdAt: "2020-08-05 15:16:28.504000 +00:00",
    description: "Beschreibung Kodieranweisung 4",
    id: "fsdfpow+ycx-wopeksdf sdfwefsdwrwf",
    itemId: "sdfopi-spofksd",
    score: 1
  },
  {
    __typename: "CodingCriterion",
    createdAt: "2020-08-05 15:16:28.504000 +00:00",
    description: "",
    id: "fsdfpow+ycx-wopeksdfew809",
    itemId: "sdfopi-spofksd",
    score: 0
  }
]
export const automatedCodingCriteriaMock: AutomatedCodingCriterion[] = [
  {
    __typename: "DocumentViewScenarioCodingAutomatedCriterion",
    id: "bbff8b72-9efb-471b-a9a9-4395b3ec2757",
    itemId: "9dbc11c4-4964-4558-9442-f0138ee50f08",
    score: 34,
    emailId: "f94eb570-53f2-4e3f-927b-205571638e25",
    erpRowId: null,
    erpTableType: null,
    fileId: null,
    referenceBookArticleId: null,
    sampleCompanyId: null
  },
  {
    __typename: "ToolUsageScenarioCodingAutomatedCriterion",
    id: "c0858e7c-9a9e-45ee-8c63-65b34cfa6b89",
    itemId: "9dbc11c4-4964-4558-9442-f0138ee50f08",
    score: 34,
    officeTool: OfficeTool.Calculator
  },
  {
    __typename: "ToolUsageScenarioCodingAutomatedCriterion",
    id: "f4796336-daeb-4766-a03c-5f7c1eb6a13c",
    itemId: "9dbc11c4-4964-4558-9442-f0138ee50f08",
    score: 34,
    officeTool: OfficeTool.Calculator
  }
]

export const automatedToolUsageCodingCriterionMock: ToolUsageScenarioCodingAutomatedCriterion = {
  __typename: "ToolUsageScenarioCodingAutomatedCriterion",
  id: "89867a6b-281b-417c-8ac0-e38b7c6c510b",
  itemId: "e9addac2-628b-44aa-ae10-ad42d0c7a304",
  officeTool: OfficeTool.Calculator,
  score: 50
}

export const automatedInputValueCodingCriterionMock: InputValueScenarioCodingAutomatedCriterion = {
  __typename: "InputValueScenarioCodingAutomatedCriterion",
  id: "89867a6b-281b-417c-8ac0-e38b7c6c510b",
  itemId: "e9addac2-628b-44aa-ae10-ad42d0c7a304",
  officeTool: OfficeTool.SpreadsheetEditor,
  score: 50,
  fileId: "d2434b4f-c761-4c7c-b6a7-ae86f980f3fb",
  spreadsheetColumnIndex: null,
  spreadsheetRowIndex: null,
  value: "test"
}

export const automatedDocumentViewCodingCriterionMock: DocumentViewScenarioCodingAutomatedCriterion = {
  __typename: "DocumentViewScenarioCodingAutomatedCriterion",
  id: "89867a6b-281b-417c-8ac0-e38b7c6c510b",
  itemId: "e9addac2-628b-44aa-ae10-ad42d0c7a304",
  emailId: "d79c9cc2-71a2-482f-917c-237a2329e9be",
  erpRowId: null,
  erpTableType: null,
  fileId: null,
  referenceBookArticleId: null,
  sampleCompanyId: null,
  score: 50
}

export const automatedFeatureUsageCodingCriterionMock: FeatureUsageScenarioCodingAutomatedCriterion = {
  __typename: "FeatureUsageScenarioCodingAutomatedCriterion",
  id: "89867a6b-281b-417c-8ac0-e38b7c6c510b",
  itemId: "e9addac2-628b-44aa-ae10-ad42d0c7a304",
  officeTool: OfficeTool.EmailClient,
  score: 50,
  featureType: FeatureType.AnswerEmail
}
