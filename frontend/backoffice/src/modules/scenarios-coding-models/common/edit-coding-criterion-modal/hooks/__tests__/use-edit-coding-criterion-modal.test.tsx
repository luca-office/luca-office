import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {Provider} from "react-redux"
import {referenceBookChaptersForScenarioMock} from "shared/__mocks__"
import {codingCriteriaMock, filesMock, manualCodingItemMock} from "shared/graphql/__mocks__"
import {
  codingCriteriaQuery,
  codingItemQuery,
  emailsQuery,
  filesForScenarioQuery,
  referenceBookChaptersForScenarioQuery
} from "shared/graphql/queries"
import {Children} from "shared/styles"
import {Option} from "shared/utils"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {initialAppState} from "../../../../../../redux/state/app-state"
import {emailsMock} from "../../../../../scenario-emails/emails/hooks/__mocks__/emails.mock"
import {useEditCodingCriterionModal} from "../use-edit-coding-criterion-modal"

const codingItem = manualCodingItemMock

const scenarioId = "efaddde1-a331-4663-9c95-09a0565cb665"

const getConnectedHook = () =>
  renderHook(() => useEditCodingCriterionModal(codingItem.id, Option.none(), scenarioId, []), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: codingItemQuery,
              variables: {id: codingItem.id}
            },
            result: {
              data: {codingItem}
            }
          },
          {
            request: {
              query: codingCriteriaQuery,
              variables: {itemId: codingItem.id}
            },
            result: {
              data: {
                codingCriteria: codingCriteriaMock
              }
            }
          },
          {
            request: {
              query: filesForScenarioQuery,
              variables: {scenarioId}
            },
            result: {
              data: {
                filesForScenario: filesMock
              }
            }
          },
          {
            request: {
              query: emailsQuery,
              variables: {scenarioId: scenarioId}
            },
            result: {
              data: {
                emails: emailsMock
              }
            }
          },
          {
            request: {
              query: referenceBookChaptersForScenarioQuery,
              variables: {scenarioId: scenarioId}
            },
            result: {
              data: {
                referenceBookChaptersForScenario: referenceBookChaptersForScenarioMock
              }
            }
          }
        ]}
        addTypename={true}>
        <Provider store={fakeStore(initialAppState)}>{children}</Provider>
      </MockedProvider>
    )
  })

describe("use-edit-coding-criterion-modal", () => {
  describe("dataLoading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.dataLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("codingItem", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.codingItem).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("codingCriteria", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.codingCriteria).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("selectedCriterionId", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectedCriterionId).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
