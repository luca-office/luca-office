import {withSurveyEventTestIndex} from "../../../tests/utils/survey-event-test-index-provider"
import {SurveyEventCreation, SurveyEventType} from "../../graphql/generated/globalTypes"
import {SpreadsheetCellContentInterventionCheckConfig, spreadsheetCellContentValueCheck} from "../../utils/intervention"

const invitationId = "e521f786-2e86-4925-8a99-87f16b07776c"
const surveyId = "433c9cd6-aa6e-443b-a0cc-8159f4440f94"
const fileId = "989040b0-5426-4bb7-90f9-c69e8c3a89a0"
const scenarioId = "ea93f160-8f51-4333-8a88-ff260e8e00c5"

const cellContentSurveyEvent: SurveyEventCreation[] = withSurveyEventTestIndex([
  {
    surveyId,
    invitationId,
    eventType: SurveyEventType.UpdateSpreadsheetCellValue,
    data:
      '{"fileId":"989040b0-5426-4bb7-90f9-c69e8c3a89a0","spreadsheetId":"b524e383-99a2-4aae-905f-0d570cf804bc","rowIndex":2,"columnIndex":4,"cellId":"9d4ec1fa-8522-4bbf-a95a-eef7fef14eaf","value":"2","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-09-14T07:22:15.488Z"
  },
  {
    surveyId,
    invitationId,
    eventType: SurveyEventType.UpdateSpreadsheetCellValue,
    data:
      '{"fileId":"989040b0-5426-4bb7-90f9-c69e8c3a89a0","spreadsheetId":"b524e383-99a2-4aae-905f-0d570cf804bc","rowIndex":1,"columnIndex":1,"cellId":"d02be8c9-0ad2-4de9-8c01-8f72df5a3f24","value":"Neu","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-09-14T07:22:41.042Z"
  },
  {
    surveyId,
    invitationId,
    eventType: SurveyEventType.UpdateSpreadsheetCellValue,
    data:
      '{"fileId":"989040b0-5426-4bb7-90f9-c69e8c3a89a0","spreadsheetId":"b524e383-99a2-4aae-905f-0d570cf804bc","rowIndex":1,"columnIndex":1,"cellId":"d02be8c9-0ad2-4de9-8c01-8f72df5a3f24","value":"NeuLater","scenarioId":"ea93f160-8f51-4333-8a88-ff260e8e00c5"}',
    timestamp: "2021-09-14T07:24:41.042Z"
  }
])

const defaultConfig: SpreadsheetCellContentInterventionCheckConfig = {
  columnIndex: 1,
  rowIndex: 1,
  fileId,
  scenarioId,
  isNegated: false,
  surveyEvents: cellContentSurveyEvent,
  valuesToCheck: ["test", "15", "42"]
}

describe("spreadsheet cell content intervention condition check", () => {
  it("should intervene (=true) because isNegated = true and there are no survey Events of Update Cell", async () => {
    expect(spreadsheetCellContentValueCheck({...defaultConfig, isNegated: true, surveyEvents: []})).toBe(true)
  })
  it("should intervene (=true) because isNegated = true and tested Value is not equal", async () => {
    expect(spreadsheetCellContentValueCheck({...defaultConfig, isNegated: true, valuesToCheck: ["Test"]})).toBe(true)
  })
  it("should intervene (=true) because isNegated = true and tested Value is not equal", async () => {
    expect(spreadsheetCellContentValueCheck({...defaultConfig, isNegated: true, valuesToCheck: ["Neu1"]})).toBe(true)
  })
  it("should not intervene (=false) because isNegated = true and tested Value is equal", async () => {
    expect(
      spreadsheetCellContentValueCheck({...defaultConfig, isNegated: true, valuesToCheck: ["Neu", "NeuLater"]})
    ).toBe(false)
  })
  it("should intervene (=true) because isNegated = true and tested Value is from cell without events", async () => {
    expect(
      spreadsheetCellContentValueCheck({
        ...defaultConfig,
        isNegated: true,
        valuesToCheck: ["Test"],
        columnIndex: 4,
        rowIndex: 20
      })
    ).toBe(true)
  })

  it("should not intervene (=true) because isNegated = false and there are no survey Events of Update Cell", async () => {
    expect(spreadsheetCellContentValueCheck({...defaultConfig, isNegated: false, surveyEvents: []})).toBe(false)
  })
  it("should intervene (=true) because isNegated = false and there are cell content is equal", async () => {
    expect(
      spreadsheetCellContentValueCheck({
        ...defaultConfig,
        isNegated: false,
        valuesToCheck: ["2"],
        rowIndex: 2,
        columnIndex: 4
      })
    ).toBe(true)
  })

  it("should not intervene (=false) because isNegated = false and cell content from newest event is not equal", async () => {
    expect(
      spreadsheetCellContentValueCheck({
        ...defaultConfig,
        isNegated: false,
        valuesToCheck: ["Neu"],
        columnIndex: 1,
        rowIndex: 1
      })
    ).toBe(false)
  })
  it("should intervene (=true) because isNegated = false and cell content from newest event is equal", async () => {
    expect(
      spreadsheetCellContentValueCheck({
        ...defaultConfig,
        isNegated: false,
        valuesToCheck: ["NeuLater"],
        columnIndex: 1,
        rowIndex: 1
      })
    ).toBe(true)
  })

  it("should  intervene (=true) because isNegated = true, cell content has equality, but different cell", async () => {
    expect(
      spreadsheetCellContentValueCheck({
        ...defaultConfig,
        isNegated: true,
        valuesToCheck: ["2", "3", "4"],
        columnIndex: 1,
        rowIndex: 1
      })
    ).toBe(true)
  })
})
