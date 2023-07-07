import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import pick from "lodash-es/pick"
import * as React from "react"
import {scenariosMock} from "shared/graphql/__mocks__"
import {EmailDirectory} from "shared/graphql/generated/globalTypes"
import {createEmailMutation} from "shared/graphql/mutations"
import {scenarioQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import wait from "waait"
import {Route} from "../../../../../routes"
import {emailsMock} from "../../../emails/hooks/__mocks__/emails.mock"
import {useEmailCreateModal} from "../use-email-create-modal"

const scenarioId = scenariosMock[0].id

const getConnectedHook = () =>
  renderHook(
    () =>
      useEmailCreateModal(
        scenarioId,
        {route: Route.ScenarioEmails, payload: {scenarioId}},
        false,
        false,
        EmailDirectory.Inbox
      ),
    {
      wrapper: ({children}: Children) => (
        <MockedProvider
          mocks={[
            {
              request: {
                query: scenarioQuery,
                variables: {id: scenarioId}
              },
              result: {
                data: {
                  scenario: scenariosMock[0]
                }
              }
            },
            {
              request: {
                query: createEmailMutation,
                variables: {
                  creation: pick(emailsMock[0], [
                    "sender",
                    "recipient",
                    "ccRecipients",
                    "subject",
                    "directory",
                    "isInitiallyRead",
                    "relevance",
                    "message",
                    "scenarioId"
                  ])
                }
              },
              result: {
                data: {
                  createEmail: emailsMock[0]
                }
              }
            }
          ]}
          addTypename={true}>
          <React.Fragment>{children}</React.Fragment>
        </MockedProvider>
      )
    }
  )

describe("use-email-create-modal", () => {
  describe("formMethods", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.formMethods).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("createEmailLoading", () => {
    it("should be false", async () => {
      const {result} = getConnectedHook()
      expect(result.current.createEmailLoading).toBeFalsy()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("directoryOptions", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.directoryOptions).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("senderCreationLabel", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.senderOrRecipientInputLabelKey).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isConfirmDisabled", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isConfirmDisabled).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
