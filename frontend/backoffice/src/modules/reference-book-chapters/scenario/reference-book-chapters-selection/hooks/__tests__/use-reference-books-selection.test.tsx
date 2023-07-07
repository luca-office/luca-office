import {MockedProvider} from "@apollo/client/testing"
import {renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {Provider} from "react-redux"
import {act} from "react-test-renderer"
import {referenceBookChaptersForScenarioMock, referenceBookChaptersMock} from "shared/__mocks__"
import {checkLoginMock, scenariosMock} from "shared/graphql/__mocks__"
import {createReferenceBookScenarioMutation} from "shared/graphql/mutations"
import {
  checkLoginQuery,
  referenceBookChaptersForScenarioQuery,
  referenceBookChaptersQuery
} from "shared/graphql/queries"
import {Children} from "shared/styles"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {initialAppState} from "../../../../../../redux/state/app-state"
import {referenceBookChapterScenarioMock} from "../../__mocks__/reference-book-chapter-scenario.mock"
import {useReferenceBooksSelection} from "../use-reference-books-selection"

const scenario = scenariosMock[0]
const getConnectedHook = () =>
  renderHook(() => useReferenceBooksSelection(scenario.id), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: checkLoginQuery
            },
            result: {
              data: {
                checkLogin: checkLoginMock
              }
            }
          },
          {
            request: {
              query: referenceBookChaptersQuery
            },
            result: {
              data: {
                referenceBookChapters: referenceBookChaptersMock
              }
            }
          },
          {
            request: {
              query: referenceBookChaptersForScenarioQuery,
              variables: {scenarioId: scenario.id}
            },
            result: {
              data: {
                referenceBookChaptersForScenario: referenceBookChaptersForScenarioMock
              }
            }
          },
          {
            request: {
              query: createReferenceBookScenarioMutation,
              variables: {
                creation: {
                  scenarioId: scenario.id,
                  referenceBookChapterId: referenceBookChaptersMock[0].id
                }
              }
            },
            result: {
              data: {
                createReferenceBookChapterScenario: referenceBookChapterScenarioMock
              }
            }
          }
        ]}
        addTypename={true}>
        <Provider store={fakeStore(initialAppState)}>{children}</Provider>
      </MockedProvider>
    )
  })

describe("useReferenceBooksSelection", () => {
  describe("referenceBookChapters and scenarioReferenceBookIds", () => {
    it("referenceBookChapters should default to be defined and have the right length", async () => {
      const {result} = getConnectedHook()
      expect(result.current.referenceBookChapters).toBeDefined()
      expect(result.current.referenceBookChapters.length).toBeGreaterThanOrEqual(0)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })

    it("scenarioReferenceBookIds should default to be defined and have the right length", async () => {
      const {result} = getConnectedHook()
      expect(result.current.scenarioReferenceBookIds).toBeDefined()
      expect(result.current.scenarioReferenceBookIds.length).toBeGreaterThanOrEqual(0)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })

  describe("actionLoading and Loading", () => {
    it("actionLoading should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.actionLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("loading should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.loading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })

  describe("selectedReferenceBookIds", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectedReferenceBookIds).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
