import {MockedProvider} from "@apollo/client/testing"
import {renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {act} from "react-test-renderer"
import {interventionsMock} from "shared/__mocks__"
import {scenariosMock} from "shared/graphql/__mocks__"
import {emailQuery} from "shared/graphql/queries"
import {interventionsQuery} from "shared/graphql/queries/interventions"
import {Children} from "shared/styles"
import {Option} from "shared/utils"
import wait from "waait"
import {emailsMock} from "../../../hooks/__mocks__/emails.mock"
import {useEmail} from "../use-email"

const emailId = emailsMock[0].id
const getConnectedHook = () =>
  renderHook(() => useEmail(Option.of(scenariosMock[0]), Option.of(emailId)), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: emailQuery,
              variables: {id: emailId}
            },
            result: {
              data: {
                email: emailsMock[0]
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
        <React.Fragment>{children}</React.Fragment>
      </MockedProvider>
    )
  })

describe("use-email", () => {
  describe("emailLoading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.emailLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isIntroductionEmail", () => {
    it("should default to be false", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isIntroductionEmail).toBe(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
