import * as apolloClient from "@apollo/client"
import {makeFakeClient} from "../../../tests/react-apollo/apollo-fake-client"
import {fakeTranslateWithOptions} from "../../../tests/utils/translate-mock"
import {IconName} from "../../enums"
import {fileFragmentsMock, inputValueScenarioCodingAutomatedCriterionMock} from "../../graphql/__mocks__"
import {getInputValueScenarioCodingAutomatedCriterionData} from "../input-value-scenario-coding-automated-criterion"

const file = fileFragmentsMock[0]

const fakeClient = makeFakeClient({})
fakeClient.query = jest.fn(
  () =>
    new Promise(resolve => {
      setTimeout(() => resolve({data: {file}}), 100)
    })
) as any

const apolloClientSpy = jest.spyOn(apolloClient, "useApolloClient")

describe("input-value-scenario-coding-automated-criterion", () => {
  describe("getInputValueScenarioCodingAutomatedCriterionData", () => {
    it("correctly returns data", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      const result = await getInputValueScenarioCodingAutomatedCriterionData(
        fakeTranslateWithOptions,
        fakeClient,
        inputValueScenarioCodingAutomatedCriterionMock
      )
      expect(result).toEqual({
        name: `rating__input_in_file{"input":"${inputValueScenarioCodingAutomatedCriterionMock.value}","fileName":"${file.name}"}`,
        icon: IconName.Image
      })
    })
  })
})
