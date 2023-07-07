import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {interventionsMock} from "shared/__mocks__"
import {scenariosMock} from "shared/graphql/__mocks__"
import {EmailDirectory} from "shared/graphql/generated/globalTypes"
import {emailsQuery, scenarioQuery} from "shared/graphql/queries"
import {interventionsQuery} from "shared/graphql/queries/interventions"
import {Children} from "shared/styles"
import wait from "waait"
import {emailsMock} from "../__mocks__/emails.mock"
import {useEmails} from "../use-emails"

const scenarioId = scenariosMock[0].id
const emailId = emailsMock[0].id
const getConnectedHook = () =>
  renderHook(() => useEmails({scenarioId, selectedDirectory: EmailDirectory.Inbox, selectedEmailId: emailId}), {
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
              query: emailsQuery,
              variables: {scenarioId: scenarioId}
            },
            result: {
              data: {
                emails: emailsMock
              }
            }
          },
          {
            request: {
              query: interventionsQuery,
              variables: {scenarioId}
            },
            result: {
              data: {
                interventions: interventionsMock
              }
            }
          }
        ]}
        addTypename={true}>
        <React.Fragment>{children}</React.Fragment>
      </MockedProvider>
    )
  })

describe("use-emails", () => {
  describe("scenarioLoading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.scenarioLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("emailsLoading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.emailsLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("actionsDisabled", () => {
    it("should be false", async () => {
      const {result} = getConnectedHook()
      // true before view has loaded
      expect(result.current.actionsDisabled).toBeTruthy()
      // Silence mock provider act warnings
      await act(() => wait(0))
      // false because scenario mock is not finalized!
      expect(result.current.actionsDisabled).toBeFalsy()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
