import {InputValueScenarioCodingAutomatedCriterion} from "../../models"
import {OfficeTool} from "../generated/globalTypes"
import {automatedCodingItemMock} from "./coding-item.mock"
import {fileFragmentsMock} from "./files.mock"

export const inputValueScenarioCodingAutomatedCriterionMock: InputValueScenarioCodingAutomatedCriterion = {
  __typename: "InputValueScenarioCodingAutomatedCriterion",
  id: "931d7d9f-ac1d-4d83-9cc2-9c1af88fd66b",
  score: 12,
  itemId: automatedCodingItemMock.id,
  officeTool: OfficeTool.ImageViewer,
  fileId: fileFragmentsMock[0].id,
  spreadsheetRowIndex: null,
  spreadsheetColumnIndex: null,
  value: "input-mock"
}
