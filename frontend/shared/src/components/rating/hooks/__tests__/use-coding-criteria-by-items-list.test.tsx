import * as apolloClient from "@apollo/client"
import {MockedProvider} from "@apollo/client/testing"
import {renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {act as actRenderer} from "react-test-renderer"
import wait from "waait"
import {scenarioErpComponentsMock} from "../../../../../tests/__mocks__"
import {makeFakeClient} from "../../../../../tests/react-apollo/apollo-fake-client"
import {codingCriteriaMock, codingDimensionsMock} from "../../../../graphql/__mocks__"
import {codingCriteriaQuery} from "../../../../graphql/queries"
import {Children} from "../../../../styles"
import {useCodingCriteriaByItemsList} from "../use-coding-criteria-by-items-list"

const codingItem = codingDimensionsMock[0].items[0]
const codingCriteria = codingCriteriaMock.map(mock => ({...mock, itemId: codingItem.id}))

const fakeClient = makeFakeClient({})
fakeClient.query = jest.fn(
  () =>
    new Promise(resolve => {
      setTimeout(() => resolve({data: {scenarioErpComponents: scenarioErpComponentsMock}}), 100)
    })
) as any

const apolloClientSpy = jest.spyOn(apolloClient, "useApolloClient")

const getConnectedHook = () =>
  renderHook(() => useCodingCriteriaByItemsList(), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: codingCriteriaQuery,
              variables: {itemId: codingItem.id}
            },
            result: {
              data: {codingCriteria}
            }
          }
        ]}
        addTypename={true}>
        <div>{children}</div>
      </MockedProvider>
    )
  })

describe("use-coding-criteria-by-items-list", () => {
  describe("codingCriteria", () => {
    it("should default to be defined", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      const {result} = getConnectedHook()
      expect(result.current.codingCriteria).toBeDefined()
      // Silence mock provider act warnings
      await actRenderer(() => wait(0))
    })
  })
  describe("codingCriteriaLoading", () => {
    it("should default to be defined", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      const {result} = getConnectedHook()
      expect(result.current.codingCriteriaLoading).toBeDefined()
      // Silence mock provider act warnings
      await actRenderer(() => wait(0))
    })
  })
})
