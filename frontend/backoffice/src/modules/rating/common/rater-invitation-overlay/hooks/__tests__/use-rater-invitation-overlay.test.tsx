import {MockedProvider} from "@apollo/client/testing"
import {renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {act} from "react-test-renderer"
import {checkLoginMock, surveysMock, userAccountsMock} from "shared/graphql/__mocks__"
import {inviteSurveyRatersMutation} from "shared/graphql/mutations"
import {checkLoginQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import wait from "waait"
import {useRaterInvitationOverlay} from "../use-rater-invitation-overlay"

const survey = surveysMock[0]
const emails = userAccountsMock.map(({email}) => email)

const getConnectedHook = () =>
  renderHook(() => useRaterInvitationOverlay({surveyId: survey.id, onDismiss: jest.fn()}), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
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
              query: inviteSurveyRatersMutation,
              variables: {surveyId: survey.id, emails}
            },
            result: {
              data: {
                inviteSurveyRaters: ""
              }
            }
          }
        ]}
        addTypename={true}>
        <React.Fragment>{children}</React.Fragment>
      </MockedProvider>
    )
  })

describe("use-rater-invitation-overlay", () => {
  describe("dataLoading", () => {
    it("should default to be true", async () => {
      const {result} = getConnectedHook()
      expect(result.current.dataLoading).toEqual(true)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("actionLoading", () => {
    it("should default to be false", async () => {
      const {result} = getConnectedHook()
      expect(result.current.actionLoading).toEqual(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("inviteRaters", () => {
    it("should be a function", async () => {
      const {result} = getConnectedHook()
      expect(typeof result.current.inviteRaters).toEqual("function")
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("setEmails", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(typeof result.current.setEmails).toEqual("function")
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("showRaterWarning", () => {
    it("should default to be false", async () => {
      const {result} = getConnectedHook()
      expect(result.current.showRaterWarning).toEqual(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
