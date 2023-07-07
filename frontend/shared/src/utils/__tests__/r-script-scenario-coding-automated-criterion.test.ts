import * as apolloClient from "@apollo/client"
import {makeFakeClient} from "../../../tests/react-apollo/apollo-fake-client"
import {fakeTranslateWithOptions} from "../../../tests/utils/translate-mock"
import {rScriptScenarioCodingAutomatedCriterionMock, rScriptsMock} from "../../graphql/__mocks__"
import {getRScriptScenarioCodingAutomatedCriterionData} from "../r-script-scenario-coding-automated-criterion"

const rScript = {...rScriptsMock[0], id: rScriptScenarioCodingAutomatedCriterionMock.rScriptId}

const fakeClient = makeFakeClient({})
fakeClient.query = jest.fn(
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

const apolloClientSpy = jest.spyOn(apolloClient, "useApolloClient")

describe("r-script-scenario-coding-automated-criterion", () => {
  describe("getRScriptScenarioCodingAutomatedCriterionData", () => {
    it("correctly returns data", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      const result = await getRScriptScenarioCodingAutomatedCriterionData(
        fakeTranslateWithOptions,
        fakeClient,
        rScriptScenarioCodingAutomatedCriterionMock
      )
      expect(result).toEqual({name: `rating__r_script_used{"rScriptName":"${rScript.title}"}`})
    })
  })
})
