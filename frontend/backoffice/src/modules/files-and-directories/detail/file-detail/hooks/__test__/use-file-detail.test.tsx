import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import {pick} from "lodash-es"
import * as React from "react"
import {Provider} from "react-redux"
import {fileMock, filesMock, scenariosMock} from "shared/graphql/__mocks__"
import {updateFileMutation} from "shared/graphql/mutations"
import {filesForScenarioQuery, scenarioQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {directoriesForScenarioMock} from "../../../../../../graphql/__mocks__"
import {directoriesForScenarioQuery} from "../../../../../../graphql/queries"
import {initialAppState} from "../../../../../../redux/state/app-state"
import {useFileDetail} from "../use-file-detail"

const scenarioId = scenariosMock[0].id

const getConnectedHook = () =>
  renderHook(() => useFileDetail(scenarioId, "9af33555-16ae-49f0-9a0c-03c1d32cd749"), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: updateFileMutation,
              variables: {
                id: fileMock.id,
                update: pick(fileMock, ["name", "relevance", "tags", "directoryId", "binaryFileId"])
              }
            },
            result: {
              data: {
                updateFile: fileMock
              }
            }
          },
          {
            request: {
              query: directoriesForScenarioQuery,
              variables: {scenarioId}
            },
            result: {
              data: {
                directoriesForScenario: directoriesForScenarioMock
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
              query: scenarioQuery,
              variables: {id: scenarioId}
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

describe("use-file-detail", () => {
  describe("updateInProgress", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.updateInProgress).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("isUpdateDirectoryOverlayVisible", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isUpdateDirectoryOverlayVisible).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("dataLoading", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.dataLoading).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("isCreateInterventionModalVisible", () => {
    it("should be false", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isCreateInterventionModalVisible).toBe(false)
      await act(() => wait(0))
    })
  })
})
