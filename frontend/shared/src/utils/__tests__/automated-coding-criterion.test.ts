import * as apolloClient from "@apollo/client"
import {makeFakeClient} from "../../../tests/react-apollo/apollo-fake-client"
import {fakeTranslateWithOptions} from "../../../tests/utils/translate-mock"
import {IconName} from "../../enums"
import {
  documentViewScenarioCodingAutomatedCriterionMock,
  featureUsageScenarioCodingAutomatedCriterionMock,
  fileFragmentsMock,
  inputValueScenarioCodingAutomatedCriterionMock,
  rScriptScenarioCodingAutomatedCriterionMock,
  rScriptsMock,
  toolUsageScenarioCodingAutomatedCriterionMock
} from "../../graphql/__mocks__"
import {getAutomatedCodingCriterionDescriptionData, isAutomatedCodingCriterion} from "../automated-coding-criterion"

const file = fileFragmentsMock[0]
const rScript = {...rScriptsMock[0], id: rScriptScenarioCodingAutomatedCriterionMock.rScriptId}

const fileFakeClient = makeFakeClient({})
fileFakeClient.query = jest.fn(
  () =>
    new Promise(resolve => {
      setTimeout(() => resolve({data: {file}}), 100)
    })
) as any

const apolloFileClientSpy = jest.spyOn(apolloClient, "useApolloClient")

const rScriptFakeClient = makeFakeClient({})
rScriptFakeClient.query = jest.fn(
  () =>
    new Promise(resolve => {
      setTimeout(
        () =>
          resolve({
            data: {
              rScripts: [rScript, ...rScriptsMock.slice(1)]
            }
          }),
        100
      )
    })
) as any

const apolloRScriptClientSpy = jest.spyOn(apolloClient, "useApolloClient")

describe("automated-coding-criterion", () => {
  describe("isAutomatedCodingCriterion", () => {
    it("correctly checks if value is an automated coding criterion", () => {
      expect(isAutomatedCodingCriterion(rScriptScenarioCodingAutomatedCriterionMock)).toEqual(true)
      expect(isAutomatedCodingCriterion(inputValueScenarioCodingAutomatedCriterionMock)).toEqual(true)
      expect(isAutomatedCodingCriterion(documentViewScenarioCodingAutomatedCriterionMock)).toEqual(true)
      expect(isAutomatedCodingCriterion("mock")).toEqual(false)
      expect(isAutomatedCodingCriterion(1)).toEqual(false)
      expect(isAutomatedCodingCriterion({test: 1})).toEqual(false)
    })
  })
  describe("getAutomatedCodingCriterionDescriptionData", () => {
    it("correctly returns data for document-view-scenario-coding-automated-criterion", async () => {
      apolloFileClientSpy.mockReturnValue(fileFakeClient)
      const result = await getAutomatedCodingCriterionDescriptionData(
        fakeTranslateWithOptions,
        fileFakeClient,
        documentViewScenarioCodingAutomatedCriterionMock
      )
      expect(result).toEqual({name: `rating__document_opened{"name":"${file.name}"}`, icon: IconName.Image})
    })
    it("correctly returns data for feature-usage-scenario-coding-automated-criterion", async () => {
      const result = await getAutomatedCodingCriterionDescriptionData(
        fakeTranslateWithOptions,
        fileFakeClient,
        featureUsageScenarioCodingAutomatedCriterionMock
      )
      expect(result).toEqual({
        name:
          'rating__feature_usage{"featureName":"coding_models__automated_item_feature_usage_feature_type_answer_mail","toolName":"email__title"}',
        icon: IconName.Email
      })
    })
    it("correctly returns data for tool-usage-scenario-coding-automated-criterion", async () => {
      const result = await getAutomatedCodingCriterionDescriptionData(
        fakeTranslateWithOptions,
        fileFakeClient,
        toolUsageScenarioCodingAutomatedCriterionMock
      )
      expect(result).toEqual({
        name: 'rating__tool_usage{"toolName":"email__title"}',
        icon: IconName.Email
      })
    })
    it("correctly returns data for input-value-scenario-coding-automated-criterion", async () => {
      apolloFileClientSpy.mockReturnValue(fileFakeClient)
      const result = await getAutomatedCodingCriterionDescriptionData(
        fakeTranslateWithOptions,
        fileFakeClient,
        inputValueScenarioCodingAutomatedCriterionMock
      )
      expect(result).toEqual({
        name: `rating__input_in_file{"input":"${inputValueScenarioCodingAutomatedCriterionMock.value}","fileName":"${file.name}"}`,
        icon: IconName.Image
      })
    })
    it("correctly returns data for r-script-scenario-coding-automated-criterion", async () => {
      apolloRScriptClientSpy.mockReturnValue(rScriptFakeClient)
      const result = await getAutomatedCodingCriterionDescriptionData(
        fakeTranslateWithOptions,
        rScriptFakeClient,
        rScriptScenarioCodingAutomatedCriterionMock
      )
      expect(result).toEqual({name: `rating__r_script_used{"rScriptName":"${rScript.title}"}`})
    })
  })
})
