import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {Provider} from "react-redux"
import {surveyParticipationInfoMock} from "shared/graphql/__mocks__"
import {surveyParticipationInfoQuery} from "shared/graphql/queries"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {surveyInvitationMock} from "../../../../../graphql/__mocks__"
import {initialAppState} from "../../../../../redux/state/app-state"
import {useLogin} from "../use-login"
import {Children} from "shared/styles"

const getConnectedHook = () =>
  renderHook(() => useLogin(), {
    wrapper: ({children}: Children) => (
      <Provider store={fakeStore(initialAppState(null))}>
        <MockedProvider
          mocks={[
            {
              request: {
                query: surveyParticipationInfoQuery,
                variables: {token: surveyInvitationMock.token}
              },
              result: {
                data: {
                  surveyParticipationInfo: {
                    ...surveyParticipationInfoMock,
                    surveyInvitation: surveyInvitationMock
                  }
                }
              }
            }
          ]}
          addTypename={true}>
          <React.Fragment>{children}</React.Fragment>
        </MockedProvider>
      </Provider>
    )
  })

describe("useLogin", () => {
  describe("show signup modal", () => {
    it("should default to be false", async () => {
      const {result} = getConnectedHook()
      expect(result.current.showSignUpModal).toBe(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
      // When: I fire the toggle handler
      act(() => {
        result.current.toggleShowSignUpModal()
      })
      // Then: I expect the menu visibility to toggle
      expect(result.current.showSignUpModal).toBe(true)
      // When: I fire the toggle handler again
      act(() => {
        result.current.toggleShowSignUpModal()
      })
      // Then: I expect the menu visibility to toggle back to false
      expect(result.current.showSignUpModal).toBe(false)
    })
  })
})
