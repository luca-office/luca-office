import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import {pick} from "lodash-es"
import * as React from "react"
import {Provider} from "react-redux"
import {fileMock, filesMock, scenariosMock} from "shared/graphql/__mocks__"
import {createFileMutation} from "shared/graphql/mutations"
import {filesForScenarioQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {directoriesForScenarioMock} from "../../../../../../graphql/__mocks__"
import {updateDirectoryMutation} from "../../../../../../graphql/mutations"
import {directoriesForScenarioQuery} from "../../../../../../graphql/queries"
import {initialAppState} from "../../../../../../redux/state/app-state"
import {useDirectoryDetail} from "../use-directory-detail"

const scenario = scenariosMock[0]
const directory = directoriesForScenarioMock[0]

const getConnectedHook = () =>
  renderHook(() => useDirectoryDetail(scenario.id), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: updateDirectoryMutation,
              variables: {id: directory.id, update: pick(directory, ["name", "parentDirectoryId"])}
            },
            result: {
              data: {
                updateDirectory: directory
              }
            }
          },
          {
            request: {
              query: createFileMutation,
              variables: {
                creation: pick(fileMock, ["usageType", "name", "relevance", "tags", "directoryId", "binaryFileId"])
              }
            },
            result: {
              data: {
                createFile: fileMock
              }
            }
          },
          {
            request: {
              query: directoriesForScenarioQuery,
              variables: {scenarioId: scenario.id}
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
              variables: {scenarioId: scenario.id}
            },
            result: {
              data: {
                filesForScenario: filesMock
              }
            }
          }
        ]}
        addTypename={true}>
        <Provider store={fakeStore(initialAppState)}>{children}</Provider>
      </MockedProvider>
    )
  })

describe("use-directory-detail", () => {
  describe("updateInProgress", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.updateInProgress).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("isCreateFileOverlayVisible", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isCreateFileOverlayVisible).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("isCreateSubdirectoryOverlayVisible", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isCreateSubdirectoryOverlayVisible).toBeDefined()
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
  describe("allDirectories", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.allDirectories).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("allFiles", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.allFiles).toBeDefined()
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
})
