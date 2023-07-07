import * as apolloClient from "@apollo/client"
import {makeFakeClient} from "../../../tests/react-apollo/apollo-fake-client"
import {fakeTranslateWithOptions} from "../../../tests/utils/translate-mock"
import {IconName} from "../../enums"
import {documentViewScenarioCodingAutomatedCriterionMock, fileFragmentsMock} from "../../graphql/__mocks__"
import {getDocumentViewScenarioCodingAutomatedCriterionData} from "../document-view-scenario-coding-automated-criterion"

const file = fileFragmentsMock[0]

const fakeClient = makeFakeClient({})
fakeClient.query = jest.fn(
  () =>
    new Promise(resolve => {
      setTimeout(() => resolve({data: {file}}), 100)
    })
) as any

const apolloClientSpy = jest.spyOn(apolloClient, "useApolloClient")

describe("document-view-scenario-coding-automated-criterion", () => {
  describe("getDocumentViewScenarioCodingAutomatedCriterionData", () => {
    it("correctly returns data", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      const result = await getDocumentViewScenarioCodingAutomatedCriterionData(
        fakeTranslateWithOptions,
        fakeClient,
        documentViewScenarioCodingAutomatedCriterionMock
      )
      expect(result).toEqual({name: file.name, icon: IconName.Image})
    })
  })
})
