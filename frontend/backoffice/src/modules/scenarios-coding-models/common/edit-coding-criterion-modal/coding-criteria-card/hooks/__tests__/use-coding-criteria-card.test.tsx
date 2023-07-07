import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import {pick} from "lodash-es"
import * as React from "react"
import {Provider} from "react-redux"
import {automatedCodingCriteriaMock, codingCriteriaMock, codingItemMock} from "shared/graphql/__mocks__"
import {deleteCodingCriterionMutation, updateCodingCriterionMutation} from "shared/graphql/mutations"
import {Children} from "shared/styles"
import {Option} from "shared/utils"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {initialAppState} from "../../../../../../../redux/state/app-state"
import {useCodingCriteriaCard} from "../use-coding-criteria-card"

const codingItem = codingItemMock
const codingCriteria = codingCriteriaMock
const selectedCriterionId = Option.of(codingCriteria[0].id)
const deselectCriterion = jest.fn()

const getConnectedHook = () =>
  renderHook(
    () =>
      useCodingCriteriaCard({
        automatedCodingCriteria: automatedCodingCriteriaMock,
        codingItem: Option.of(codingItem),
        selectedCriterionId,
        codingCriteria,
        deselectCriterion,
        codingModelId: "d187a3e8-2a6f-4963-929c-eb6a8c1ec136"
      }),
    {
      wrapper: ({children}: Children) => (
        <MockedProvider
          mocks={[
            {
              request: {
                query: updateCodingCriterionMutation,
                variables: {
                  id: codingCriteria[0].id,
                  creation: pick(codingCriteria[0], ["description", "score"])
                }
              },
              result: {
                data: {
                  updateCodingCriterion: codingCriteriaMock[0]
                }
              }
            },
            {
              request: {
                query: deleteCodingCriterionMutation,
                variables: {id: codingCriteria[0].id}
              },
              result: {
                data: {
                  deleteCodingCriterion: codingCriteria[0].id
                }
              }
            }
          ]}
          addTypename={true}>
          <Provider store={fakeStore(initialAppState)}>{children}</Provider>
        </MockedProvider>
      )
    }
  )

describe("use-coding-criteria-card", () => {
  describe("selectedCriterion", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectedCriterion).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("score", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.score).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("description", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.description).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
