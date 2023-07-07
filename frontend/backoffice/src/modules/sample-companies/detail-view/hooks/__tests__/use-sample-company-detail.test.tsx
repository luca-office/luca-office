import {MockedProvider} from "@apollo/client/testing"
import {renderHook} from "@testing-library/react-hooks"
import {pick} from "lodash-es"
import * as React from "react"
import {act} from "react-test-renderer"
import {checkLoginMock, sampleCompaniesMock} from "shared/graphql/__mocks__"
import {
  duplicateSampleCompanyMutation,
  publishSampleCompanyMutation,
  updateSampleCompanyMutation
} from "shared/graphql/mutations"
import {checkLoginQuery, sampleCompanyQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import wait from "waait"
import {useSampleCompanyDetail} from "../use-sample-company-detail"

const sampleCompany = sampleCompaniesMock[0]

const getConnectedHook = () =>
  renderHook(() => useSampleCompanyDetail(sampleCompany.id), {
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
                sampleCompany
              }
            }
          },
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
              query: updateSampleCompanyMutation,
              variables: {
                id: sampleCompany.id,
                update: pick(sampleCompany, [
                  "name",
                  "description",
                  "tags",
                  "emailSignature",
                  "profileFileId",
                  "logoFileId"
                ])
              }
            },
            result: {
              data: {
                updateSampleCompany: sampleCompany
              }
            }
          },
          {
            request: {
              query: publishSampleCompanyMutation,
              variables: {id: sampleCompany.id}
            },
            result: {
              data: {
                publishSampleCompany: sampleCompany
              }
            }
          },
          {
            request: {
              query: duplicateSampleCompanyMutation,
              variables: {id: sampleCompany.id}
            },
            result: {
              data: {
                duplicateSampleCompany: sampleCompany
              }
            }
          }
        ]}
        addTypename={true}>
        <React.Fragment>{children}</React.Fragment>
      </MockedProvider>
    )
  })

describe("use-sample-company-detail", () => {
  describe("sampleCompany", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.sampleCompany).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("dataLoading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.dataLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("formMethods", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.formMethods).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
