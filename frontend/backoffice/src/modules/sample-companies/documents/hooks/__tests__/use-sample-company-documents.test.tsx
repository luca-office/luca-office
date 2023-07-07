import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {Provider} from "react-redux"
import {fileMock, filesMock, sampleCompaniesMock} from "shared/graphql/__mocks__"
import {filesForSampleCompanyQuery, sampleCompanyQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {directoriesForScenarioMock} from "../../../../../graphql/__mocks__"
import {directoriesForSampleCompanyQuery} from "../../../../../graphql/queries"
import {initialAppState} from "../../../../../redux/state/app-state"
import {useSampleCompanyDocuments} from "../use-sample-company-documents"

const sampleCompanyId = sampleCompaniesMock[0].id
const fileId = fileMock.id

const getConnectedHook = () =>
  renderHook(() => useSampleCompanyDocuments(sampleCompanyId, fileId), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: sampleCompanyQuery,
              variables: {id: sampleCompanyId}
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
              variables: {sampleCompanyId}
            },
            result: {
              data: {
                directoriesForSampleCompany: directoriesForScenarioMock
              }
            }
          },
          {
            request: {
              query: filesForSampleCompanyQuery,
              variables: {sampleCompanyId}
            },
            result: {
              data: {
                filesForSampleCompany: filesMock
              }
            }
          }
        ]}
        addTypename={true}>
        <Provider store={fakeStore(initialAppState)}>{children}</Provider>
      </MockedProvider>
    )
  })

describe("useFileDetail", () => {
  describe("loading", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.loading).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("tree", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.tree).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("expandedDirectoryIds", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.expandedDirectoryIds).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("selectedFile", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectedFile).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("isFileDisabled", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isFileDisabled).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("isCreateDirectoryModalVisible", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isCreateDirectoryModalVisible).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("selectedDirectory", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectedDirectory).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("subDirectories", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.subDirectories).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("filesInSelectedDirectory", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.filesInSelectedDirectory).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("isRootDirectorySelected", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isRootDirectorySelected).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("introFileId", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.introFileId).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("logoFileId", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.logoFileId).toBeDefined()
      await act(() => wait(0))
    })
  })
})
