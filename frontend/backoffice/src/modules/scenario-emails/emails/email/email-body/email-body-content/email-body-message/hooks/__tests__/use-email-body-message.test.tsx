import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import pick from "lodash-es/pick"
import * as React from "react"
import {sampleCompaniesMock, scenariosMock} from "shared/graphql/__mocks__"
import {updateEmailMutation} from "shared/graphql/mutations"
import {sampleCompanyQuery} from "shared/graphql/queries"
import {Scenario} from "shared/models"
import {Children} from "shared/styles"
import {Option} from "shared/utils"
import wait from "waait"
import {emailsMock} from "../../../../../../hooks/__mocks__/emails.mock"
import {useEmailBodyMessage} from "../use-email-body-message"

const scenario = scenariosMock[0]
const email = emailsMock[0]
const sampleCompany = sampleCompaniesMock[0]
const getConnectedHook = () =>
  renderHook(() => useEmailBodyMessage(email, Option.of(scenario as Scenario)), {
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
              query: updateEmailMutation,
              variables: {
                id: email.id,
                update: pick(email, [
                  "sender",
                  "ccRecipients",
                  "subject",
                  "directory",
                  "receptionDelayInSeconds",
                  "isInitiallyRead",
                  "relevance",
                  "message",
                  "scenarioId"
                ])
              }
            },
            result: {
              data: {
                updateEmail: email
              }
            }
          }
        ]}
        addTypename={true}>
        <React.Fragment>{children}</React.Fragment>
      </MockedProvider>
    )
  })

describe("use-email-body-message", () => {
  describe("dataLoading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.dataLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("sampleCompanyId", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.sampleCompanyId).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("sampleCompany", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.sampleCompany).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("sampleCompanyName", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.sampleCompanyName).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("sampleCompanyEmailSignature", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.sampleCompanyEmailSignature).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("emailMessage", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.emailMessage).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("emailMessageHasSignature", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.emailMessageHasSignature).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("emailMessageWithTemplateLabels", () => {
    it("has correct value", async () => {
      const {result} = getConnectedHook()
      expect(result.current.emailMessageWithTemplateLabels).toEqual(email.message)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("updateEmailMessageWithTemplate", () => {
    it("is a function", async () => {
      const {result} = getConnectedHook()
      expect(typeof result.current.updateEmailMessageWithTemplate).toEqual("function")
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
