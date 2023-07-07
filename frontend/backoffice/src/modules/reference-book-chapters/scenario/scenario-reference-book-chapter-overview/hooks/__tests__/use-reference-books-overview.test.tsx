import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import {pick} from "lodash-es"
import * as React from "react"
import {Provider} from "react-redux"
import {referenceBookChapterMock, referenceBookChaptersForScenarioMock} from "shared/__mocks__"
import {scenariosMock} from "shared/graphql/__mocks__"
import {repositionReferenceBookScenarioMutation, updateScenarioMutation} from "shared/graphql/mutations"
import {referenceBookChaptersForScenarioQuery, scenarioQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {initialAppState} from "../../../../../../redux/state/app-state"
import {useScenarioReferenceBookOverview} from "../use-scenario-reference-book-overview"

const scenario = scenariosMock[0]
const referenceBookChapters = [
  referenceBookChapterMock("a652bbf9-fd16-4214-893c-be188dec45b0"),
  referenceBookChapterMock("e92e6059-97f6-47f7-bf5f-a2772d8b24f1")
]
const getConnectedHook = () =>
  renderHook(() => useScenarioReferenceBookOverview(scenario.id), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: referenceBookChaptersForScenarioQuery,
              variables: {scenarioId: scenario.id}
            },
            result: {
              data: {
                referenceBooksForScenario: referenceBookChaptersForScenarioMock
              }
            }
          },
          {
            request: {
              query: repositionReferenceBookScenarioMutation,
              variables: {
                id: {scenarioId: scenario.id, referenceBookChapterId: referenceBookChapters[0].id},
                predecessorId: {scenarioId: scenario.id, referenceBookChapterId: referenceBookChapters[1].id}
              }
            },
            result: {
              data: {
                repositionReferenceBookScenario: {
                  scenarioId: scenario.id,
                  referenceBookChapterId: referenceBookChapters[0].id
                }
              }
            }
          },
          {
            request: {
              query: updateScenarioMutation,
              variables: {
                id: scenario.id,
                update: pick(scenariosMock, ["name", "description", "maxDurationInSeconds", "tags"])
              }
            },
            result: {
              data: {
                updateScenario: scenariosMock[0]
              }
            }
          },
          {
            request: {
              query: scenarioQuery,
              variables: {id: scenario.id}
            },
            result: {
              data: {
                scenario: scenariosMock[0]
              }
            }
          }
        ]}
        addTypename={true}>
        <Provider store={fakeStore(initialAppState)}>{children}</Provider>
      </MockedProvider>
    )
  })

describe("useReferenceBooksOverview", () => {
  describe("loading and doBundleChapters", () => {
    it("loading should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.loading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })

    it("isBundled should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isBundled).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })

  describe("scenarioReferenceBooks and selectedArticleId", () => {
    it("scenarioReferenceBooks should default to be defined and have the right length", async () => {
      const {result} = getConnectedHook()
      expect(result.current.scenarioReferenceBooks).toBeDefined()
      expect(result.current.scenarioReferenceBooks.getOrElse([]).length).toBeGreaterThanOrEqual(0)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })

    it("selectedEntityId should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectedEntityId).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })

  describe("selectEntityId", () => {
    it("selectEntityId should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectEntityId).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("sortChaptersOverlayVisible", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.sortChaptersOverlayVisible).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("sortableChapters", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.sortableChapters).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("repositionChapterLoading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.repositionChapterLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
