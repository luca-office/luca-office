import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {Provider} from "react-redux"
import {interventionsMock} from "shared/__mocks__"
import {directoriesMock} from "shared/__mocks__/directories.mock"
import {fileFragmentsMock, sampleCompaniesMock, scenariosMock} from "shared/graphql/__mocks__"
import {
  filesForSampleCompanyQuery,
  filesForScenarioQuery,
  sampleCompanyQuery,
  scenarioQuery
} from "shared/graphql/queries"
import {interventionsQuery} from "shared/graphql/queries/interventions"
import {Children} from "shared/styles"
import {Option} from "shared/utils"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {directoriesForScenarioMock} from "../../../../graphql/__mocks__"
import {directoriesForSampleCompanyQuery, directoriesForScenarioQuery} from "../../../../graphql/queries"
import {initialAppState} from "../../../../redux/state/app-state"
import {useFilesAndDirectories} from "../use-files-and-directories"

const scenario = scenariosMock[0]
const sampleCompany = sampleCompaniesMock[0]
const selectedDirectoryId = Option.none<UUID>()
const selectedFileId = Option.none<UUID>()

const getConnectedHook = () =>
  renderHook(() => useFilesAndDirectories({scenarioId: scenario.id, selectedDirectoryId, selectedFileId}), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
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
                filesForScenario: fileFragmentsMock
              }
            }
          },
          {
            request: {
              query: interventionsQuery,
              variables: {scenarioId: scenario.id}
            },
            result: {
              data: {
                interventions: interventionsMock
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
                scenario: scenario
              }
            }
          },
          {
            request: {
              query: sampleCompanyQuery,
              variables: {id: sampleCompany.id}
            },
            result: {
              data: {
                sampleCompany: sampleCompany
              }
            }
          },
          {
            request: {
              query: directoriesForSampleCompanyQuery,
              variables: {sampleCompanyId: sampleCompany.id}
            },
            result: {
              data: {
                directoriesForSampleCompany: directoriesMock
              }
            }
          },
          {
            request: {
              query: filesForSampleCompanyQuery,
              variables: {sampleCompanyId: sampleCompany.id}
            },
            result: {
              data: {
                filesForSampleCompany: fileFragmentsMock
              }
            }
          }
        ]}
        addTypename={true}>
        <Provider store={fakeStore(initialAppState)}>{children}</Provider>
      </MockedProvider>
    )
  })

describe("use-files-and-directories", () => {
  describe("isLoading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isLoading).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("isCreateDirectoryModalVisible", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isCreateDirectoryModalVisible).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("isPreviewVisible", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isPreviewVisible).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("sampleCompanyId", () => {
    it("should default to be undefined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.sampleCompanyId).toBeUndefined()
      await act(() => wait(0))
    })
  })
})
