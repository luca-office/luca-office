import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {ratingsMock, surveyIdMock, surveyInvitationsMock} from "shared/graphql/__mocks__"
import {SurveyInvitationsProps} from "shared/graphql/hooks"
import * as useSurveyInvitationsHook from "shared/graphql/hooks/queries/survey/use-survey-invitations"
import {finalizeRatingMutation} from "shared/graphql/mutations"
import {ratingsQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import wait from "waait"
import {UseProjectModuleRatingHook} from "../../../../hooks"
import * as useProjectModuleRatingHook from "../../../../hooks/use-project-module-rating"
import {useRatingActionButton} from "../use-rating-action-button"

const rating = ratingsMock[1]

const surveyInvitationsHookValuesDefault: SurveyInvitationsProps = {
  surveyInvitationsLoading: false,
  surveyInvitations: surveyInvitationsMock
}
const surveyInvitationsSpy = jest.spyOn(useSurveyInvitationsHook, "useSurveyInvitations")

const projectModuleRatingHookValuesDefault: UseProjectModuleRatingHook = {
  loading: false,
  areAllProjectModulesRated: jest.fn(() => false)
}
const projectModuleRatingSpy = jest.spyOn(useProjectModuleRatingHook, "useProjectModuleRating")

const getConnectedHook = () =>
  renderHook(() => useRatingActionButton(surveyIdMock), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: ratingsQuery,
              variables: {surveyId: surveyIdMock}
            },
            result: {
              data: {
                ratings: ratingsMock
              }
            }
          },
          {
            request: {
              query: finalizeRatingMutation,
              variables: {id: rating.id}
            },
            result: {
              data: {
                finalizeRating: rating
              }
            }
          }
        ]}
        addTypename={true}>
        <React.Fragment>{children}</React.Fragment>
      </MockedProvider>
    )
  })

describe("use-rating-action-button", () => {
  describe("dataLoading", () => {
    it("should default to be defined", async () => {
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      projectModuleRatingSpy.mockReturnValue(projectModuleRatingHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.dataLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("actionLoading", () => {
    it("should default to be defined", async () => {
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      projectModuleRatingSpy.mockReturnValue(projectModuleRatingHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.actionLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("buttonDisabled", () => {
    it("should default to be defined", async () => {
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      projectModuleRatingSpy.mockReturnValue(projectModuleRatingHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.buttonDisabled).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("showOrly", () => {
    it("contains correct value", async () => {
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      projectModuleRatingSpy.mockReturnValue(projectModuleRatingHookValuesDefault)
      const {result} = getConnectedHook()
      expect(typeof result.current.showOrly).toEqual("function")
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("onCancel", () => {
    it("contains correct value", async () => {
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      projectModuleRatingSpy.mockReturnValue(projectModuleRatingHookValuesDefault)
      const {result} = getConnectedHook()
      expect(typeof result.current.onCancel).toEqual("function")
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("onConfirm", () => {
    it("contains correct value", async () => {
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      projectModuleRatingSpy.mockReturnValue(projectModuleRatingHookValuesDefault)
      const {result} = getConnectedHook()
      expect(typeof result.current.onConfirm).toEqual("function")
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isOrlyVisible", () => {
    it("contains correct value", async () => {
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      projectModuleRatingSpy.mockReturnValue(projectModuleRatingHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.isOrlyVisible).toEqual(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
