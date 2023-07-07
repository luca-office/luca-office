import {MockedProvider} from "@apollo/client/testing"
import {renderHook} from "@testing-library/react-hooks"
import {pick} from "lodash-es"
import * as React from "react"
import {Provider} from "react-redux"
import {act} from "react-test-renderer"
import {interventionsMock} from "shared/__mocks__"
import {scenarioSampleCompanyFilesMock, scenariosMock} from "shared/graphql/__mocks__"
import {
  createScenarioSampleCompanyFileMutation,
  updateScenarioSampleCompanyFileMutation
} from "shared/graphql/mutations"
import {scenarioQuery, scenarioSampleCompanyFilesQuery} from "shared/graphql/queries"
import {interventionsQuery} from "shared/graphql/queries/interventions"
import {Children} from "shared/styles"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {initialAppState} from "../../../../../../../redux/state/app-state"
import {useFileDetailFooter} from "../use-file-detail-footer"

const scenarioSampleCompanyFile = scenarioSampleCompanyFilesMock[0]

const getConnectedHook = () =>
  renderHook(() => useFileDetailFooter(scenarioSampleCompanyFile.scenarioId, scenarioSampleCompanyFile.fileId), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: scenarioSampleCompanyFilesQuery,
              variables: {scenarioId: scenarioSampleCompanyFile.scenarioId}
            },
            result: {
              data: {
                scenarioSampleCompanyFiles: scenarioSampleCompanyFilesMock.slice(0, 3)
              }
            }
          },
          {
            request: {
              query: scenarioQuery,
              variables: {id: scenarioSampleCompanyFile.scenarioId}
            },
            result: {
              data: {
                scenario: scenariosMock[0]
              }
            }
          },
          {
            request: {
              query: createScenarioSampleCompanyFileMutation,
              variables: {creation: pick(scenarioSampleCompanyFile, ["scenarioId", "fileId", "relevance"])}
            },
            result: {
              data: {
                createScenarioSampleCompanyFile: scenarioSampleCompanyFile
              }
            }
          },
          {
            request: {
              query: updateScenarioSampleCompanyFileMutation,
              variables: {
                scenarioId: scenarioSampleCompanyFile.scenarioId,
                fileId: scenarioSampleCompanyFile.fileId,
                update: pick(scenarioSampleCompanyFile, ["relevance"])
              }
            },
            result: {
              data: {
                updateScenarioSampleCompanyFile: scenarioSampleCompanyFile
              }
            }
          },
          {
            request: {
              query: interventionsQuery,
              variables: {scenarioId: scenariosMock[0].id}
            },
            result: {
              data: {
                interventions: interventionsMock
              }
            }
          }
        ]}
        addTypename={true}>
        <Provider store={fakeStore(initialAppState)}>{children}</Provider>
      </MockedProvider>
    )
  })

describe("use-file-detail-footer", () => {
  describe("scenarioSampleCompanyFile", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.scenarioSampleCompanyFile).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("relevanceOptions", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.relevanceOptions).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
