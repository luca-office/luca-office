import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import pick from "lodash-es/pick"
import * as React from "react"
import {scenariosMock} from "shared/graphql/__mocks__"
import {updateEmailMutation} from "shared/graphql/mutations"
import {scenarioQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import wait from "waait"
import {emailsMock} from "../../../../hooks/__mocks__/emails.mock"
import {useEmailDelayModal} from "../use-email-delay-modal"

const email = emailsMock[0]
const getConnectedHook = () =>
  renderHook(() => useEmailDelayModal(email, []), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: updateEmailMutation,
              variables: {
                id: emailsMock[0].id,
                update: pick(emailsMock[0], [
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
                updateEmail: emailsMock[0]
              }
            }
          },
          {request: {query: scenarioQuery, variables: {id: emailsMock[0].scenarioId}}, result: {data: scenariosMock[0]}}
        ]}
        addTypename={true}>
        <React.Fragment>{children}</React.Fragment>
      </MockedProvider>
    )
  })

describe("use-email-delay-modal", () => {
  describe("formMethods", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.formMethods).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("maxFutureDelay", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.maxFutureDelay).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("receptionDelayOptions", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.receptionDelayOptions).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("selectedTemporalStage", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectedTemporalStage).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
