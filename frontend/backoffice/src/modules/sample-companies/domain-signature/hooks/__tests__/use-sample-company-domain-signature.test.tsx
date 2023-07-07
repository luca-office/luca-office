import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {sampleCompaniesMock} from "shared/graphql/__mocks__"
import {updateSampleCompanyMutation} from "shared/graphql/mutations"
import {sampleCompanyQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import wait from "waait"
import {useSampleCompanyDomainSignature} from "../use-sample-company-domain-signature"

const sampleCompany = sampleCompaniesMock[0]
const getConnectedHook = () =>
  renderHook(() => useSampleCompanyDomainSignature(sampleCompany.id), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: sampleCompanyQuery,
              variables: {
                id: sampleCompany.id
              }
            },
            result: {
              data: sampleCompany
            }
          },
          {
            request: {
              query: updateSampleCompanyMutation,
              variables: {
                id: sampleCompany.id,
                update: sampleCompany
              }
            },
            result: {
              data: {
                updateSampleCompany: sampleCompany
              }
            }
          }
        ]}
        addTypename={true}>
        <React.Fragment>{children}</React.Fragment>
      </MockedProvider>
    )
  })

describe("use-sample-company-domain-signature", () => {
  describe("dataLoading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.dataLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isDomainOverlayVisible", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isDomainOverlayVisible).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isPublished", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isPublished).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("sampleCompany", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.sampleCompany).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
