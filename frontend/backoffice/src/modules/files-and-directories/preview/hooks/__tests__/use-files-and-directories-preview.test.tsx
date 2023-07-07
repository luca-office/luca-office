import {MockedProvider} from "@apollo/client/testing"
import {renderHook} from "@testing-library/react-hooks"
import React from "react"
import {directoriesMock} from "shared/__mocks__"
import {fileFragmentsMock, sampleCompaniesMock, scenariosMock} from "shared/graphql/__mocks__"
import {
  filesForSampleCompanyQuery,
  filesForScenarioQuery,
  sampleCompanyQuery,
  scenarioQuery
} from "shared/graphql/queries"
import {Children} from "shared/styles"
import {Option} from "shared/utils"
import {directoriesForScenarioMock} from "../../../../../graphql/__mocks__"
import {directoriesForSampleCompanyQuery, directoriesForScenarioQuery} from "../../../../../graphql/queries"
import {useFilesAndDirectoriesPreview} from "../use-files-and-directories-preview"

const scenario = scenariosMock[0]
const getConnectedHook = () =>
  renderHook(() => useFilesAndDirectoriesPreview(scenario.id), {
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
              variables: {id: scenario.sampleCompanyId}
            },
            result: {
              data: {
                sampleCompany: sampleCompaniesMock[0]
              }
            }
          },
          {
            request: {
              query: directoriesForSampleCompanyQuery,
              variables: {sampleCompanyId: scenario.sampleCompanyId}
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
              variables: {sampleCompanyId: scenario.sampleCompanyId}
            },
            result: {
              data: {
                filesForSampleCompany: fileFragmentsMock
              }
            }
          }
        ]}
        addTypename={true}>
        <>{children}</>
      </MockedProvider>
    )
  })

describe("use-files-and-directories-preview", () => {
  describe("selectedDirectoryId", () => {
    it("should be defined and of the correct type", () => {
      const {result} = getConnectedHook()
      expect(result.current.selectedDirectoryId).toBeDefined()
      expect(result.current.selectedDirectoryId).toBeInstanceOf(Option)
    })
  })

  describe("selectedFileId", () => {
    it("should be defined and of the correct type", () => {
      const {result} = getConnectedHook()
      expect(result.current.selectedFileId).toBeDefined()
      expect(result.current.selectedFileId).toBeInstanceOf(Option)
    })
  })

  describe("isLoading", () => {
    it("should be defined and of the correct type", () => {
      const {result} = getConnectedHook()
      expect(result.current.isLoading).toBeDefined()
      expect(typeof result.current.isLoading).toBe("boolean")
    })
  })

  describe("directories", () => {
    it("should be defined and of the correct type", () => {
      const {result} = getConnectedHook()
      expect(result.current.directories).toBeDefined()
      expect(result.current.directories).toBeInstanceOf(Array)
    })
  })

  describe("files", () => {
    it("should be defined and of the correct type", () => {
      const {result} = getConnectedHook()
      expect(result.current.files).toBeDefined()
      expect(result.current.files).toBeInstanceOf(Array)
    })
  })

  describe("expandedDirectoryIds", () => {
    it("should be defined and of the correct type", () => {
      const {result} = getConnectedHook()
      expect(result.current.expandedDirectoryIds).toBeDefined()
      expect(result.current.expandedDirectoryIds).toBeInstanceOf(Array)
    })
  })

  describe("tree", () => {
    it("should be defined and of the correct type", () => {
      const {result} = getConnectedHook()
      expect(result.current.tree).toBeDefined()
      expect(result.current.tree.children).toBeInstanceOf(Array)
    })
  })
})
