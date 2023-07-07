import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {Provider} from "react-redux"
import {fileMock, filesMock, sampleCompaniesMock} from "shared/graphql/__mocks__"
import {updateFileMutation} from "shared/graphql/mutations"
import {filesForSampleCompanyQuery, sampleCompanyQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {directoriesForScenarioMock} from "../../../../../../graphql/__mocks__"
import {directoriesForSampleCompanyQuery} from "../../../../../../graphql/queries"
import {initialAppState} from "../../../../../../redux/state/app-state"
import {useFileDetail} from "../use-file-detail"

const sampleCompany = sampleCompaniesMock[0]

const getConnectedHook = () =>
  renderHook(() => useFileDetail(sampleCompany.id), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
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
              query: updateFileMutation
            },
            result: {
              data: {
                updateFile: fileMock
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
                directoriesForSampleCompany: directoriesForScenarioMock
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
  describe("filePreviewOption", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.filePreviewOption).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("isMoveOverlayVisible", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isMoveOverlayVisible).toBeDefined()
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
  describe("isSampleCompanyPublished", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isSampleCompanyPublished).toBeDefined()
      await act(() => wait(0))
    })
  })
})
